// STImage.h
#ifndef __STIMAGE_H__
#define __STIMAGE_H__

#include "STColor4ub.h"
#include "STUtil.h" // for STStatus

#include <string>

/**
* The STImage class encapsulates image pixel data, stored as an array
* of STColor4ub (8-bit RGBA) values. The image data is stored in a
* format that is consistent with OpenGL; row-major with the bottom row
* of the image being first in the array of pixels.
* This means that the bottom-left pixel in the image is the first pixel
* in the internal array.
*
* The easiest way to create an STImage is to construct one with the file
* name of an image:
*
*   STImage* frog = new STImage("./frog.png");
*
* Alternatively, you can construct a new image filled with a solid
* color of your choosing:
*
*   STImage* red = new STImage(640, 480, STColor4ub(255, 0, 0, 255));
*
* The pixels of an STImage can be read and written using GetPixel()
* and SetPixel(), respectively:
*
*   STColor4ub p = frog->GetPixel(10, 25);
*   red->SetPixel(10, 25, p);
*
* Any image can be written to a file by using Save():
*
*   red->Save("./output.ppm");
*/

class STImage
{
public:
    //
    // Type of pixels in an STImage.
    //
    typedef STColor4ub Pixel;

    //
    // Load a new image from an image file (PPM, JPEG
    // and PNG formats are supported).
    // Returns NULL on failure.
    //
    STImage(const std::string& filename);

    //
    // Construct a new image of the specified width and height,
    // filled completely with the specified pixel color.
    //
    STImage(int width, int height, Pixel color = Pixel(0,0,0,0));

    //
    // Delete and clean up an existing image.
    //
    ~STImage();

    //
    // Save the image to a file (PPM, JPEG and PNG
    // formats are supported).
    // Returns a non-zero value on error.
    //
    STStatus Save(const std::string& filename) const;

    //
    // Draw the image to the OpenGL window using glDrawPixels.
    // The bottom-left of the image will align with (0.0, 0.0)
    // in object space.
    //
    void Draw() const;

    //
    // Fills in image pixel data using a region of the OpenGL
    // framebuffer beginning at pixel (x, y). The size of the
    // region is determined by the size of the image.
    // This operation will replace any previous pixel data
    // in the STImage.
    //
    void Read(int x, int y);

    //
    // Get the width (in pixels) of the image.
    //
    int GetWidth() const { return mWidth; }

    //
    // Get the height (in pixels) of the image.
    //
    int GetHeight() const { return mHeight; }

    //
    // Read a pixel value given its (x,y) location.
    //
    Pixel GetPixel(int x, int y) const;

    //
    // Write a pixel value given its (x,y) location.
    //
    void SetPixel(int x, int y, Pixel value);

    //
    // Get read-only access to the "raw" array of pixel data.
    // The STImage object owns this data, and it is not valid
    // to use it after the image is deleted.
    //
    const Pixel* GetPixels() const { return mPixels; }

    //
    // Get read-write access to the "raw" array of pixel data.
    // The STImage object owns this data, and it is not valid
    // to use it after the image is deleted.
    //
    Pixel* GetPixels() { return mPixels; }

private:
    // Image height, in pixels.
    int mHeight;

    // Image width, in pixels.
    int mWidth;

    // An array of mWidth*mHeight pixels, stored in row-major
    // left-to-right, bottom-to-top order.
    Pixel* mPixels;

    //
    void Initialize(int width, int height);

    //
    // Format-specific routines for loading/saving
    // particular image file formats.
    //
    void LoadPPM(const std::string& filename);
    STStatus  SavePPM(const std::string& filename) const;

    void LoadPNG(const std::string& filename);
    STStatus  SavePNG(const std::string& filename) const;

    void LoadJPG(const std::string& filename);
    STStatus  SaveJPG(const std::string& filename) const;
};

#endif // __STIMAGE_H__
