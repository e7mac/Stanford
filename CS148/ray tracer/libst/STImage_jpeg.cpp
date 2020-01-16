// STImage_jpeg.cpp
#include "STImage.h"

#include "st.h"

extern "C" {
#include <jpeglib.h>    // libjpeg header
}

#include <assert.h>
#include <setjmp.h>
#include <stdio.h>

// Custom "context" type for error-handling routine.
struct STJpegErrorMgr
{
    jpeg_error_mgr pub;
    jmp_buf setjmpBuf;
};

// Custom error handling routine for use with libjpeg
METHODDEF(void)
STJpegErrorExit(j_common_ptr cinfo)
{
  STJpegErrorMgr* myerr = (STJpegErrorMgr*) cinfo->err;

  // Display the error message.
  (*cinfo->err->output_message)(cinfo);

  // Return control to the setjmp point
  longjmp(myerr->setjmpBuf, 1);
}

//
// Create an STImage from the contents of a JPG file via the libjpeg API
//
void STImage::LoadJPG(const std::string& filename)
{
    // Open image file.
    FILE* imgFile = fopen(filename.c_str(), "rb");
    if (!imgFile) {
        fprintf(stderr, "STImage::LoadJPG() - Could not open '%s'.\n",
                filename.c_str());
        throw std::runtime_error("Error in LoadJPG");
    }

    // Initialize libjpeg error handling.
    jpeg_decompress_struct cinfo;
    STJpegErrorMgr jerr;
    cinfo.err = jpeg_std_error(&jerr.pub);
    jerr.pub.error_exit = STJpegErrorExit;
    if (setjmp(jerr.setjmpBuf)) {
        jpeg_destroy_decompress(&cinfo);
        fclose(imgFile);
        throw std::runtime_error("Error in LoadJPG");
    }

    // Set up libjpeg to read from the file.
    jpeg_create_decompress(&cinfo);
    jpeg_stdio_src(&cinfo, imgFile);
    jpeg_read_header(&cinfo, TRUE);
    jpeg_start_decompress(&cinfo);

    int rowStride = cinfo.output_width * cinfo.output_components;

    // Create the STImage and get access to its raw pixel array.
    int width = cinfo.output_width;
    int height = cinfo.output_height;

    Initialize(width, height);
    STColor4ub* pixels = mPixels;

    // temporary buffer to hold the decompressed data from the JPEG
    // file before it is stuck into the mPixels array
    JSAMPARRAY rowBuffer = (*cinfo.mem->alloc_sarray)((j_common_ptr) &cinfo,
                                                      JPOOL_IMAGE,
                                                      rowStride, 1);

    // Load all rows of pixels.
    while (cinfo.output_scanline < cinfo.output_height) {

        STColor4ub* curPixel = &pixels[ width * (height-cinfo.output_scanline-1) ];

        jpeg_read_scanlines(&cinfo, rowBuffer, 1);

        unsigned char* buf = rowBuffer[0];
        if (cinfo.output_components == 3) {
            // RGB data
            for (int ii = 0; ii < width; ++ii) {
                curPixel->r = *buf++;
                curPixel->g = *buf++;
                curPixel->b = *buf++;
                curPixel->a = 255;
                curPixel++;
            }
        } else {
            // Greyscale data
            for (int ii = 0; ii < width; ++ii) {
                curPixel->r = curPixel->g = curPixel->b = *buf++;
                curPixel->a = 255;
                curPixel++;
            }
        }
    }

    // Clean up libjpeg.
    jpeg_finish_decompress(&cinfo);
    jpeg_destroy_decompress(&cinfo);
    fclose(imgFile);

    if (jerr.pub.num_warnings > 0) {
        fprintf(stderr, "STImage::LoadJPG() - Note: "
                "libjpeg produced warnings when reading '%s'.\n", filename.c_str());
    }
}


//
// Create a JPEG file from the pixel contents of the STImage, using libjpeg.
//
STStatus
STImage::SaveJPG(const std::string& filename) const
{
    // Open image file.
    FILE* imgFile = fopen(filename.c_str(), "wb");
    if (!imgFile) {
        fprintf(stderr, "STImage::SaveJPG() - Could not open '%s'.\n",
                filename.c_str());
        return ST_ERROR;
    }

    // Initialize libjpeg error handling.
    jpeg_compress_struct cinfo;
    STJpegErrorMgr jerr;
    cinfo.err = jpeg_std_error(&jerr.pub);
    jerr.pub.error_exit = STJpegErrorExit;
    if (setjmp(jerr.setjmpBuf)) {
        jpeg_destroy_compress(&cinfo);
        fclose(imgFile);
        return ST_ERROR;
    }

    // Initialize libjpeg for writing a file.
    jpeg_create_compress(&cinfo);
    jpeg_stdio_dest(&cinfo, imgFile);

    cinfo.image_width = mWidth;     
    cinfo.image_height = mHeight;
    cinfo.input_components = 3;        
    cinfo.in_color_space = JCS_RGB;     

    jpeg_set_defaults(&cinfo);
    jpeg_set_quality(&cinfo, 90, TRUE);
    jpeg_start_compress(&cinfo, TRUE);

    int rowStride = mWidth * 3;

    JSAMPARRAY buffer = (*cinfo.mem->alloc_sarray)((j_common_ptr) &cinfo, JPOOL_IMAGE, rowStride, 1);    

    // Walk through the rows of the image and write each in turn.
    while (cinfo.next_scanline < cinfo.image_height) {
        
        STColor4ub* curPixel = &mPixels[ mWidth * (mHeight-cinfo.next_scanline-1) ];

        JSAMPLE* buf = buffer[0];
        for (int i=0; i<mWidth; i++) {
            *buf++ = curPixel->r;
            *buf++ = curPixel->g;
            *buf++ = curPixel->b;
            curPixel++;
        }

        jpeg_write_scanlines(&cinfo, buffer, 1);
    }

    // Clean up libjpeg.
    jpeg_finish_compress(&cinfo);
    fclose(imgFile);
    jpeg_destroy_compress(&cinfo);

    return ST_OK;
}
