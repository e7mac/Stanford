// parseConfig.h
//
// Defines a function to parse config files for the line editor.
//
// Also includes functions to load and save line editor files
// (for extra credit).
//

#ifndef __PARSECONFIG_H__
#define __PARSECONFIG_H__

#include "stgl.h"
#include "STPoint2.h"
#include <vector>

// Specifies which image we are adding lines to
enum ImageChoice {IMAGE_1, IMAGE_2, BOTH_IMAGES};

// Parses config file configFname. These config files should have four entries.
// An example config file is provided as config.txt
//
// This function loads the two image files specified in the config file
// into STImage object out parameters im1out and im2out. This function
// allocates the two STImages.
//
// image1fnameOut and image2fnameOut are out parameters that are assigned
// values for background1 and background2 in the config file
//
// saveFnameOut and loadFnameOut are out parameters that are assigned the
// values for savefile and loadfile config file attributes
void parseConfigFile(
        const char configFname[],
        char image1fnameOut[],
        char image2fnameOut[],
        char saveFnameOut[],
        char loadFnameOut[],
        STImage** im1out,
        STImage** im2out
);

// Load background images and lines from the line editor file
// lineEditorFname.
//
// This function loads the two image files specified in the line editor file
// into STImage object out parameters im1out and im2out. This function
// allocates the two STImages.
//
// drawLineCallback is provided as a function which will actually
// create the lines. It is called in this routine to draw the lines
// specified in the line editor file.
//
// image1fnameOut and image2fnameOut are out parameters that return the
// values for the two images in the line editor file
void loadLineEditorFile(
        const char lineEditorFname[],
        void (*drawLineCallback)(STPoint2,STPoint2,ImageChoice),
        char image1fnameOut[],
        char image2fnameOut[],
        STImage** im1out,
        STImage** im2out
);

// Saves a line editor file to filename lineEditorFname.
//
// image1fname and image2fname are the two image filenames.
//
// lineEndpts1 and lineEndpts2 are a list of line endpoints.
// lineEndpts1 refers to lines drawn on the first image, and
// lineEndpts2 refers to lines drawn on the second image.
//
// The x and y values for each line endpoint should be given in
// coordinates relative to the bottom left corner of the image,
// NOT the window coordinates.
//
// Here is the format we expect for lineEndpt# parameters:
//
// index     0       1        2       3        4       5
// value     (x1,y1) (x2,y2)  (x3,y3) (x4,y4)  (x5,y5) (x6,y6)
//           ---------------  ---------------  ---------------
// lines     line 1           line 2           line 3
//
// The ith line specified in lineEndpts1 should correspond to
// the ith line specified in lineEndpts2.
void saveLineEditorFile(
        const char lineEditorFname[],
        const char image1fname[],
        const char image2fname[],
        const std::vector<STPoint2>& lineEndpts1,
        const std::vector<STPoint2>& lineEndpts2
);

#endif // __PARSECONFIG_H__
