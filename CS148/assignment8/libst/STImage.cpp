// STImage.cpp
#include "STImage.h"

#include "stgl.h"
#include "st.h"

#include <assert.h>
#include <stdio.h>
#include <string>

//
// Load a new image from an image file (PPM, JPEG
// and PNG formats are supported).
// Returns NULL on failure.
//
STImage::STImage(const std::string& filename)
    : mWidth(-1)
    , mHeight(-1)
    , mPixels(NULL)
{

    // Determine the right routine based on the file's extension.
    // The format-specific subroutines are each implemented in
    // a different file.
    std::string ext = STGetExtension( filename );
    if (ext.compare("PPM") == 0) {
        LoadPPM(filename);
    }
    else if (ext.compare("PNG") == 0) {
        LoadPNG(filename);
    }
    else if (ext.compare("JPG") == 0 || ext.compare("JPEG") == 0) {
        LoadJPG(filename);
    }
    else {
        fprintf(stderr,
                "STImage::STImage() - Unknown image file type \"%s\".\n",
                filename.c_str());
        throw new std::runtime_error("Error creating STImage");
    } 
}

//
// Construct a new image of the specified width and height,
// filled completely with the specified pixel color.
//
STImage::STImage(int width, int height, Pixel color)
{
    Initialize(width, height);

    int numPixels = mWidth * mHeight;
    for (int ii = 0; ii < numPixels; ++ii) {
        mPixels[ii] = color;
    }
}

// Common initialization logic shared by all construcotrs.
void STImage::Initialize(int width, int height)
{
    if (width <= 0)
        throw std::runtime_error("STImage width must be positive");
    if (height <= 0)
        throw std::runtime_error("STImage height must be positive");

    mWidth = width;
    mHeight = height;

    int numPixels = mWidth * mHeight;
    mPixels = new Pixel[numPixels];
}

//
// Delete and clean up an existing image.
//
STImage::~STImage()
{
    if (mPixels != NULL) {
        delete [] mPixels;
    }
}

//
// Save the image to a file (PPM, JPEG and PNG
// formats are supported).
// Returns a non-zero value on error.
//
STStatus STImage::Save(const std::string& filename) const
{
    // Determine the right routine based on the file's extension.
    // The format-specific subroutines are each implemented in
    // a different file.
    std::string ext = STGetExtension( filename );

    if (ext.compare("PPM") == 0 ) {
        return SavePPM(filename);
    }
    else if (ext.compare("PNG") == 0) {
        return SavePNG(filename);
    }
    else if (ext.compare("JPG") == 0) {
        return SaveJPG(filename);
    }
    else {
        fprintf(stderr,
                "STImage::Save() - Unknown image file type \"%s\".\n",
                filename.c_str());
        assert(false);
        return ST_ERROR;
    } 
}

//
// Draw the image to the OpenGL window using glDrawPixels.
// The bottom-left of the image will align with (0.0, 0.0)
// in object space.
//
void STImage::Draw() const
{
    glRasterPos2f(0.0f, 0.0f);
    glDrawPixels(mWidth, mHeight,
                 GL_RGBA, GL_UNSIGNED_BYTE,
                 (GLvoid*) mPixels);
}

//
// Fills in image pixel data using a region of the OpenGL
// framebuffer beginning at pixel (x, y). The size of the
// region is determined by the size of the image.
// This operation will replace any previous pixel data
// in the STImage.
//
void STImage::Read(int x, int y)
{
    glReadPixels(x, y, mWidth, mHeight,
                 GL_RGBA, GL_UNSIGNED_BYTE,
                 (GLvoid*) mPixels);
}

//
// Read a pixel value given its (x,y) location.
//
STImage::Pixel STImage::GetPixel(int x, int y) const
{
    // Check that (x,y) is in range.
    assert(x >= 0 && x < mWidth);
    assert(y >= 0 && y < mHeight);

    return mPixels[y*mWidth + x];
}

//
// Write a pixel value given its (x,y) location.
//
void STImage::SetPixel(int x, int y, Pixel value)
{
    // Check that (x,y) is in range.
    assert(x >= 0 && x < mWidth);
    assert(y >= 0 && y < mHeight);

    mPixels[y*mWidth + x] = value;
}
