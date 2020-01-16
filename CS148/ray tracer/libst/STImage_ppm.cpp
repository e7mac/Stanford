// STImage_ppm.cpp
#include "STImage.h"

#include "st.h"

#include <string.h>
#include <stdio.h>

// The PPM format guarantees no line in the file is longer
// than 70 characters. We are a little conservative here.
static const int MAX_PPM_LINE = 80;

//
// Pulls the next line of a PPM file out of the file stream and
// strips out any comments.
//
static int
PPMNextLine(FILE* ppmFile, char* line)
{
    if (fgets(line, MAX_PPM_LINE, ppmFile) != NULL ) {
        char* commentChar = strchr(line, '#');
        if (commentChar)
            *commentChar = '\0';
            return 1;
    } else {
        return 0;
    }
}

//
// Creates an STImage from the contents of a PPM file
//
void STImage::LoadPPM(const std::string& filename)
{
    FILE* imgFile = fopen(filename.c_str(), "r");
    if (!imgFile) {
        fprintf(stderr, "STImage::LoadPPM() - Could not open '%s'.\n",
                filename.c_str());
        throw std::runtime_error("Error in LoadPPM");
    }

    // Read the PPM header, it should begin with the characters 'P3'.
    // If it doesn't, complain about an invalid format
    char line[MAX_PPM_LINE];
    fgets(line, 3, imgFile);

    if (strcmp(line, "P3") != 0) {
        fprintf(stderr, "Invalid PPM file format.\n");
        throw std::runtime_error("Error in LoadPPM");
    }

    // Parse the width, height and maximum pixel value from the header.
    // These may appear on a single line or multiple lines, so we
    // parse until we have read all three.
    int pos = 0;
    int header[3];
    while (pos < 3 && PPMNextLine(imgFile, line)) {
        char* tok = strtok(line, " \t\n");
        while (tok) {
            int val = 0;
            sscanf(tok, "%d", &val);
            header[pos++] = val;
            tok = strtok(NULL, " \t\n");
        } 
    }

    int width = header[0];
    int height = header[1];
    int maxVal = header[2];

    int numPixels = width * height;
    int curComponent = 0;

    Initialize(width, height);
    STColor4ub* pixels = mPixels;

    int pixelValues[3];

    pos = 0;

    while ( pos < numPixels && PPMNextLine(imgFile, line)) {

        char* tok = strtok(line, " \t\n");

        while (tok) {
            int val = 0;
            sscanf(tok, "%d", &val); 
            //printf("Scanned: %d\n", val);
            pixelValues[curComponent] = val;
            
            if (curComponent == 2) {
                // done with this pixel, store the pixel and move to next
                pixels[pos].r = pixelValues[0] * 255 / maxVal;
                pixels[pos].g = pixelValues[1] * 255 / maxVal;
                pixels[pos].b = pixelValues[2] * 255 / maxVal;
                pixels[pos].a = 255;

                curComponent = 0;
                pos++;
            }
            else {
                curComponent++;
            }

            tok = strtok(NULL, " \t\n");
        } 
    }
    
    fclose(imgFile);
}

//
// Create a PPM file from the pixel contents of the STImage
//
STStatus
STImage::SavePPM(const std::string& filename) const
{
    FILE* imgFile = fopen(filename.c_str(), "w");
    if (!imgFile) {
        fprintf(stderr, "STImage::SavePPM() - Could not open '%s'.\n",
                filename.c_str());
        return ST_ERROR;
    }

    fprintf(imgFile, "P3\n");
    fprintf(imgFile, "%d %d\n", mWidth, mHeight);
    fprintf(imgFile, "255\n");

    int numPixels = mWidth * mHeight;
    for (int ii = 0; ii < numPixels; ++ii) {
        STColor4ub pixel = mPixels[ii];
        fprintf(imgFile,"%d %d %d\n", pixel.r, pixel.g, pixel.b);
    }
    fclose(imgFile);

    return ST_OK;
}
