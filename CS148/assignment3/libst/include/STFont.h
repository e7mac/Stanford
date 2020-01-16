// STFont.h
#ifndef __STFONT_H__
#define __STFONT_H__

#include "stForward.h"
#include "STUtil.h"

#include <string>

//
// The STFont type uses the "pImpl" idiom - it stores
// a pointer to an object that contains all the
// implementation-dependent details. This approach
// insulates clients who include this header from
// the FreeType2 headers that are used in the implemenation.
//
struct STFontImpl;

/**
*   An instance of STFont encapsulates a font face of a certain size,
*   and provides functions for computing metrics of the font face and for
*   drawing text in the font face.
*
*   The text rendering is performed using OpenGL bitmap glyphs. This
*   has an effect on how the interface is used:
*
*       - The lower-left corner of the text string will be based on the
*         origin of the OpenGL coordinate system at the time you call
*         DrawString(). This means you can use OpenGL transformations like
*         glTranslatef() place text in the window.
*
*       - The orientation of the text will always be aligned to the window.
*         OpenGL transformations can not be used to scale or rotate the text.
*
*       - If the lower-level corner of the text would be outside of the window
*         then no text will be drawn.
*
*   To create an STFont, specify the path to a TrueType font file,
*   and the size of the font face that should be loaded:
*
*       STFont* font = new STFont("arial.ttf", 12);
*
*   You can query some metrics of the font (in pixels)
*   such as the height, ascender and descender. You
*   can also use ComputeWidth() to determine the width
*   (in pixels) of a text string drawn in the font face:
*
*       const char* s = "Hello, World!";
*       float height = font->GetHeight();
*       float width = font->ComputeWidth(s);
*
*   To draw using the font face, set up an OpenGL coordinate
*   space that is one-to-one with the pixels of the window,
*   translate to the approrpiate position, and use DrawString():
*
*       glPushMatrix();
*       glTranslatef(100, 50, 0);
*       font->DrawString(s);
*       glPopMatrix();
*/
class STFont
{
public:
    //
    // Constructor: Create a new font-face with the
    // given size from a TrueType font file.
    //
    STFont(const std::string& fontName, int fontSize);

    //
    // Destructor: Clean up resources used by the font face.
    //
    ~STFont();

    //
    // Get the size of the font (in points).
    //
    int GetSize() const;

    //
    // Compute the width of a rendering string (in pixels).
    //
    float ComputeWidth(const std::string& str);

    //
    // Draw a string in the given color, starting at the
    // current OpenGL origin (projected into window coordintes).
    //
    float DrawString(const std::string& str, const STColor4f& color);

    //
    // Access various metrics of the font face (in pixels).
    //
    float GetHeight() const;
    float GetAscender() const;
    float GetDescender() const;

private:
    void SetSize(int fontSize);
    STStatus SetFace(const std::string& fontName, int fontSize);
    int GetBitmapIndex(unsigned int character);
    int GenerateBitmap(unsigned int character);

    static const int kDefaultFontSize = 12;

    STFontImpl* mImpl;
};

#endif // __STFONT_H__
