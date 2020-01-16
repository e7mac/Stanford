// STFont.cpp
#include "STFont.h"

#include "st.h"
#include "stgl.h"

#include <map>
#include <vector>
#include <stdlib.h>

// freetype2 headers
#include "ft2build.h"
#include FT_FREETYPE_H

// Simple struct used to encapsulate all the necessary information about 
// a bitmap glyph
struct STBitmapGlyph
{
    // currently stores 2 bytes per pixel, a luminance component and an alpha component
    unsigned char* data;

    // all the following fields are in units of pixels.  advanceX is
    // of type float to provide subpixel precision when manipulating
    // the OpenGL raster position when drawing font glyphs

    int width;        // width of bitmap
    int height;       // height of bitmap
    int pitch;        // bytes between start of bitmap rows
    int offsetX;      // offset of origin of bitmap from origin in coordinate system
    int offsetY;      
    float advanceX;   // pixel advancement to next character        
};

/*
 *  Implementation type for the STFont. This struct holds all the member
 *  data for the font face, so that we don't have to expose these details
 *  in the public interface.
 */

struct STFontImpl
{
    FT_Face ftFace;
    int size; // in points

    std::map<unsigned int,int> charMap;
    std::vector<STBitmapGlyph> glyphBitmaps;
};


// Some notes on Freetype:
// Freetype provides many values in 26.6 pixel format = 1/64 of a pixel
// This is a 32-bit fixed point format  
static FT_Library* sFTLibrary = NULL;


/**
* Create an instance of the font class with given font file and size
*/
STFont::STFont(const std::string& fontName, int fontSize)
    : mImpl(new STFontImpl())
{
    // Start members as "invalid"
    mImpl->size = -1;
    mImpl->ftFace = NULL;

    FT_Error fterr;

    // Need to initialized the freetype2 library
    if (!sFTLibrary) {

        sFTLibrary = new FT_Library();

        fterr = FT_Init_FreeType(sFTLibrary);

        if ( fterr ) {
            fprintf(stderr, "Fatal: Could not initialize freetype library. Error code %d\n", fterr);
            throw new std::runtime_error("Error creating STFont");
        }
    }

    // Once freetype2 library is initialized, load the requested font face
    if (SetFace(fontName, fontSize) != ST_OK) {
        throw new std::runtime_error("Error creating STFont");
    }
}

/**
* Destructor just cleans up the Freetype Face object
*/
STFont::~STFont()
{
    if (mImpl->ftFace)
        FT_Done_Face(mImpl->ftFace);
    delete mImpl;
}

/**
* Resets the truetype face and size of the font (in points)
*/
STStatus
STFont::SetFace(const std::string& fontName, int fontSize)
{
    // tell FreeType we're done with the old face if there is one
    if (mImpl->ftFace)
        FT_Done_Face(mImpl->ftFace);

    FT_Error fterr = FT_New_Face(*sFTLibrary, fontName.c_str(), 0, &mImpl->ftFace);

    if (fterr) {
        fprintf(stderr,
                "Warning: Font face %s could not be loaded\n", fontName.c_str());
        return ST_ERROR;
    }

    // note, the call to setSize() will cause cleanup of existing glyphs
    mImpl->size = -1;
    SetSize(fontSize);

    return ST_OK;
}


/**
* Sets the size of the face in points.
*/
void
STFont::SetSize(int fontSize)
{
    if (fontSize <= 0) {
        fprintf(stderr, "Warning: Invalid font size: %d.  Defaulting to %dpt\n",
                        fontSize, STFont::kDefaultFontSize);
        fontSize = STFont::kDefaultFontSize;
    }

    // trivial optimization, do nothing if no change
    if (fontSize == mImpl->size)
        return;

    // Express font size in units of 1/64 of a point
    // note: Using default DPI (which happens to be 72 DPI)
    FT_Error fterr = FT_Set_Char_Size(mImpl->ftFace, 0, fontSize*64, 0, 0); 

    if (fterr) {
        fprintf(stderr, "Error setting character size of font.\n");
        return;
    }

    mImpl->size = fontSize;

    // We just changed the face size, so all the existing bitmap glyphs are
    // now stale. Destroy all the old pixmaps.  We'll recreate them on demand
    // for the new size

    mImpl->charMap.clear();

    for (size_t i=0; i<mImpl->glyphBitmaps.size(); i++)
        delete [] mImpl->glyphBitmaps[i].data;

    mImpl->glyphBitmaps.clear();

}


/**
* Return size of the face in points
*/
int
STFont::GetSize() const
{
    return mImpl->size;
}


/**
* Return height of the face in pixels.
*/
float
STFont::GetHeight() const
{
    if (mImpl->ftFace == NULL) return 0.0f;
    return (float) mImpl->ftFace->size->metrics.height / 64.0f;
}


/**
* Return value of face ascender in pixels
*/
float
STFont::GetAscender() const
{
    if (mImpl->ftFace == NULL) return 0.0f;
    return (float) mImpl->ftFace->size->metrics.ascender / 64.0f;
}


/**
* Return value of face descender in pixels
*/
float
STFont::GetDescender() const
{
    if (mImpl->ftFace == NULL) return 0.0f;
    return (float) mImpl->ftFace->size->metrics.descender / 64.0f;
}


/**
* Renders a string of text using this face
* Returns the width of the rendered text in pixels (at subpixel accuracy)
*/
float
STFont::DrawString(const std::string& str, const STColor4f& color)
{
    if (str.length() == 0 || mImpl->ftFace == NULL)
        return 0.0f;

    //
    // Set up OpenGL state for rendering text, and push
    // attributes so that we can restore when done.
    //
    glPushAttrib( GL_ENABLE_BIT | GL_PIXEL_MODE_BIT | GL_COLOR_BUFFER_BIT);
    glPushClientAttrib( GL_CLIENT_PIXEL_STORE_BIT);

    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

    glDisable(GL_TEXTURE_2D);

    glPixelTransferf(GL_RED_SCALE, color.r);
    glPixelTransferf(GL_GREEN_SCALE, color.g);
    glPixelTransferf(GL_BLUE_SCALE, color.b);
    glPixelTransferf(GL_ALPHA_SCALE, color.a);

    glRasterPos2f(0.0f, 0.0f);

    //
    // Draw each character in order.
    //
    float totalAdvance = 0.0f;
    unsigned int useKerning = FT_HAS_KERNING(mImpl->ftFace);

    // Render glyph for each character in the string
    int strLength = (int)str.length();
    for (int i=0; i<strLength; i++) {

        unsigned int ch = str[i];

        int bitmapIndex = GetBitmapIndex( ch );

        // Pixmap for this character hasn't been generated.  Do that now.
        if (bitmapIndex == -1) {
            if (ch == ' ') {
                glBitmap( 0, 0, 0.0f, 0.0f, (float) mImpl->size / 4.0f, 0.0f, (const GLubyte*)0 );
                totalAdvance += (float) mImpl->size / 4.0f;
                continue;
            } 
            else {
                bitmapIndex = GenerateBitmap( ch );
            }
        }

        STBitmapGlyph& bitmapGlyph = mImpl->glyphBitmaps[bitmapIndex];
        
        // Move the raster position by (offsetX, offsetY)
        glBitmap(0, 0, 0.0f, 0.0f, (float) bitmapGlyph.offsetX,
                 (float) bitmapGlyph.offsetY, NULL);

        // Render the glyph to the framebuffer
        glPixelStorei(GL_UNPACK_ROW_LENGTH, 0);
        glPixelStorei(GL_UNPACK_ALIGNMENT, 2);
        glDrawPixels(bitmapGlyph.width, bitmapGlyph.height,
                     GL_LUMINANCE_ALPHA, GL_UNSIGNED_BYTE,
                     (const GLvoid*) bitmapGlyph.data);
        
        // Restore raster position
        glBitmap(0, 0, 0.0f, 0.0f,
                 (float) -bitmapGlyph.offsetX, (float) -bitmapGlyph.offsetY,
                 NULL);
        
        // Get the kerning offset for the next character.
        FT_Vector kerning = {0,0};
        if( useKerning && (i < strLength-1) ) {
            FT_Get_Kerning(mImpl->ftFace,
                           FT_Get_Char_Index(mImpl->ftFace, str[i] ),
                           FT_Get_Char_Index(mImpl->ftFace, str[i+1] ),
                           0, &kerning );
        }

        // Move the raster position to where it should be for the next character.
        glBitmap(0, 0, 0.0f, 0.0f,
                 (float) (bitmapGlyph.advanceX + kerning.x/64.0f), 0.0f, NULL);

        totalAdvance += bitmapGlyph.advanceX + kerning.x/64.0f;
    }

    //
    // Restore OpenGL state.
    //
    glPopClientAttrib();
    glPopAttrib();

    return totalAdvance;
}


/**
* Returns the width of the string 'str' in pixels (at subpixel accuracy)
* had the string been rendered in this face.  this is the same logic as in
* DrawString() without issuing the GL commands to actually draw to the screen
*/
float
STFont::ComputeWidth(const std::string& str)
{
    if (str.length() == 0 || mImpl->ftFace == NULL)
        return 0.0f;

    float totalAdvance = 0.0f;
    unsigned int useKerning = FT_HAS_KERNING(mImpl->ftFace);

    int strLength = (int)str.length();
    for (int i=0; i<strLength; i++) {

        unsigned int ch = str[i];

        int bitmapIndex = GetBitmapIndex( ch );

        if (bitmapIndex == -1) {
            if (ch == ' ') {
                totalAdvance += (float)mImpl->size / 4.0f;
                continue;
            } 
            else {
                bitmapIndex = GenerateBitmap( ch );
            }
        }

        // Get the kerning offset for the next character.
        FT_Vector kerning = {0,0};
        if( useKerning && (i < strLength-1) ) {
            FT_Get_Kerning(mImpl->ftFace,
                           FT_Get_Char_Index(mImpl->ftFace, str[i] ),
                           FT_Get_Char_Index(mImpl->ftFace, str[i+1] ),
                           0, &kerning);
        }

        totalAdvance += mImpl->glyphBitmaps[bitmapIndex].advanceX + kerning.x/64.0f;
    }

    return totalAdvance;
}


/**
* return an index into the mImpl->glyphBitmaps vector that cooresponds to the
* the character 'character'.  Returns -1 if a bitmap for the character
* done not exist
*/
int
STFont::GetBitmapIndex(unsigned int character)
{

    std::map<unsigned int, int>::iterator it;

    it = mImpl->charMap.find(character);

    if (it == mImpl->charMap.end())
        return -1;
    else
        return it->second;
}

/**
* Creates a bitmap representation of the glyph for character 'character'
* in this face
*/
int
STFont::GenerateBitmap(unsigned int character)
{
    
    FT_Load_Char(mImpl->ftFace, character, FT_LOAD_RENDER );

    FT_GlyphSlot glyph = mImpl->ftFace->glyph;
    FT_Bitmap bitmap = glyph->bitmap;

    if (bitmap.width == 0 || bitmap.rows == 0) {
        // failure: the character might not exist in this face, so attempt to
        // use the glyph for character 0, which is usually rendered as the "missing
        // character" glyph
        if (FT_Load_Char(mImpl->ftFace, 0, FT_LOAD_RENDER | FT_LOAD_MONOCHROME )) {
            fprintf(stderr, "Could not load bitmap glyph for char '%c' (value=%d)\n", character, (int)character);
        }

        return -1;
    }
    

    int bitmapIndex = (int)mImpl->glyphBitmaps .size();
    mImpl->charMap[character] = bitmapIndex;
    mImpl->glyphBitmaps .resize(mImpl->glyphBitmaps .size()+1);

    STBitmapGlyph& bitmapGlyph = mImpl->glyphBitmaps [bitmapIndex];

    unsigned int srcWidth = bitmap.width;
    unsigned int srcHeight = bitmap.rows;
    unsigned int srcPitch = bitmap.pitch;

    // Set all the fields in our structure to represent the glyph

    bitmapGlyph.width = srcWidth;
    bitmapGlyph.height = srcHeight;
    bitmapGlyph.pitch = srcPitch;
    bitmapGlyph.offsetX = glyph->bitmap_left;
    bitmapGlyph.offsetY = glyph->bitmap_top - glyph->bitmap.rows;
    bitmapGlyph.advanceX = (float)glyph->advance.x / 64.0f;

    bitmapGlyph.data = new unsigned char[bitmapGlyph.width * bitmapGlyph.height * 2];

    // Like most image formats a rendered bitmap representation of the face's
    // character is going to begin with the top row of the bitmap.  OpenGL 
    // bitmaps begin with the bottom row, so we need to reshuffle the data here

    unsigned char* dest = bitmapGlyph.data + (( bitmapGlyph.height - 1) * bitmapGlyph.width * 2);
    unsigned char* src = bitmap.buffer;
    size_t destStep = bitmapGlyph.width * 2 * 2;

    for( unsigned int y = 0; y < srcHeight; ++y)
    {
        for( unsigned int x = 0; x < srcWidth; ++x)
        {
            *dest++ = static_cast<unsigned char>(255);
            *dest++ = *src++;
        }
        dest -= destStep;
    }

    return bitmapIndex;
}
