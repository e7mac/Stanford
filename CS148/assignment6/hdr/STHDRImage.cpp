
#include <assert.h>
#include "st.h"
#include "STHDRImage.h"

/* Create an HDR image w x h in dimension and clear all values to 0. */
STHDRImage::STHDRImage(int w, int h, STHDRImage::Pixel color) {
  mWidth = w;
  mHeight = h;
  int numPixels = mWidth * mHeight;
  mPixels = new STHDRImage::Pixel[numPixels];
  for (int ii = 0; ii < numPixels; ++ii) {
      mPixels[ii] = color;
  }
}

/**
* Loads an image off disk.  This method does not do any real work, it
* just calls a format specific method based on the image format (format
* determined by file extension)
*/ 
STHDRImage::STHDRImage(const std::string& filename) {
  // Determine how to load the file from the file's extension
  // The ST library currently only supports hdr images of type PFM

  std::string ext = STGetExtension( filename );

  if (ext.compare("PFM") == 0)
    LoadPFM(filename.c_str());
  else {
    throw new std::runtime_error("HDR image file extension must be PFM.");
  } 
}

/* Destroy the HDR image. */
STHDRImage::~STHDRImage() {
  if (mPixels)
    delete[] mPixels;
}

/* Pixel accessor, pixels in HDR images are floating point colors. */
STHDRImage::Pixel
STHDRImage::GetPixel(int x, int y) const {
  // Check that (x,y) is in range.
  assert(x >= 0 && x < mWidth);
  assert(y >= 0 && y < mHeight);

  return mPixels[y*mWidth+x]; 
}

// Write a pixel value given its (x,y) location.
void STHDRImage::SetPixel(int x, int y, Pixel value)
{
  // Check that (x,y) is in range.
  assert(x >= 0 && x < mWidth);
  assert(y >= 0 && y < mHeight);

  mPixels[y*mWidth + x] = value;
}
/* Load image data from file in PFM format */
STStatus
STHDRImage::LoadPFM(const char* filename) {
  FILE* fin = fopen(filename, "rb");
  char buffer[128];

  if (fin == NULL) {
    printf("Error opening file: %s\n", filename);
    return ST_ERROR;
  }

  // Check the format
  char format;
  fgets(buffer, 80, fin);
  if ( sscanf(buffer, "P%c", &format) != 1 || (format != 'f' && format != 'F') ) {
    printf("Invalid PFM file\n");
    fclose(fin);
    return ST_ERROR;
  }
  // Get the dimensions
  int w, h;
  fgets(buffer, 80, fin);
  if ( sscanf(buffer, "%i %i", &w, &h) != 2 || w <= 0 || h <= 0 ) {
    printf("Invalid PFM file\n");
    fclose(fin);
    return ST_ERROR;
  }
  // Get the scale factor, we just discard this
  // FIXME endianness
  float scale;
  fgets(buffer, 80, fin);
  if ( sscanf(buffer, "%f", &scale) != 1 ) {
    printf("Invalid PFM file\n");
    fclose(fin);
    return ST_ERROR;
  }

  mWidth = w;
  mHeight = h;
  mPixels = new STHDRImage::Pixel[w*h];

  // Now we can read the data
  if (format == 'f') { // grayscale
    float gval;
    for(int j = 0; j < h; j++) {
      for(int i = 0; i < w; i++) {
        if ( fread(&gval, sizeof(float), 1, fin) != 1 ) {
          printf("Invalid PFM file\n");
          fclose(fin);
          return ST_ERROR;
        }
        SetPixel(i,j, STHDRImage::Pixel(gval, gval, gval));
      }
    }
  }
  else { // if (format == 'F') color
    if ( fread(mPixels, sizeof(STHDRImage::Pixel), w*h, fin) != w*h ) {
      printf("Invalid PFM file\n");
      fclose(fin);
      return ST_ERROR;
    }
  }

  fclose(fin);

  return ST_OK;
}

/**
* Saves an image to disk.  This method does not do any real work, it
* just calls a format specific method based on the image format
* (format determined by file extension)
*/ 
STStatus 
STHDRImage::Save(const std::string& filename) const {
  if (mPixels == NULL)
    return ST_ERROR;

  std::string ext = STGetExtension( filename );

  if (ext.compare("PFM") == 0)
    return SavePFM(filename.c_str());
  else {
    fprintf(stderr, "Unknown image file type.\n");
    return ST_ERROR;
  } 
}

/* Writes image information in PFM format. */
STStatus 
STHDRImage::SavePFM(const char* filename) const {
  FILE* fout = fopen(filename, "wb");
  if (fout == NULL) {
    printf("Error opening file: %s\n", filename);
    return ST_ERROR;
  }
  fprintf(fout, "PF\n");
  fprintf(fout, "%i %i\n", mWidth, mHeight);
  fprintf(fout, "-1\n"); // FIXME endianness
  fwrite(mPixels, sizeof(STHDRImage::Pixel), mWidth*mHeight, fout);
  fclose(fout);

  return ST_OK;
}

