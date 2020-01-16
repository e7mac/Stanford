// STHDRImage.h
#ifndef __STHDRIMAGE_H__
#define __STHDRIMAGE_H__

#include "STColor3f.h"
#include "STUtil.h" // for STStatus

#include <cstring>
#include <cstdio>

/**
 * This class is similar to the STHDRImage class except that pixels
 * are represented as floats rather than unsigned chars.
 * Also, it it only loads from and saves as PFM files.
*/

class STHDRImage
{
public:
    typedef STColor3f Pixel;

    STHDRImage(const std::string& filename);

    STHDRImage(int width, int height, Pixel color = Pixel(0,0,0));

    ~STHDRImage();

    STStatus Save(const std::string& filename) const;

    void Draw() const;

    void Read(int x, int y);

    int GetWidth() const { return mWidth; }

    int GetHeight() const { return mHeight; }

    Pixel GetPixel(int x, int y) const;

    void SetPixel(int x, int y, Pixel value);

    const Pixel* GetPixels() const { return mPixels; }

    Pixel* GetPixels() { return mPixels; }

private:
    int mHeight;
    int mWidth;

    Pixel* mPixels;

	  STStatus LoadPFM(const char* filename);
	  STStatus SavePFM(const char* filename) const;
};

#endif // __STHDRIMAGE_H__
