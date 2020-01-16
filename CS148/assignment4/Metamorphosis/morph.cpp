/****************************************************************************
 * THE GRAND METAMORPHOSIS
 * CS148 Assignment #4 - Fall 2010, Stanford University
 ****************************************************************************/

#include "st.h"
#include "stglut.h"
#include "parseConfig.h"

#include <iostream>
#include <iomanip>
#include <sstream>
#include <string>
#include <vector>
#include <math.h>
// --------------------------------------------------------------------------
// Structure to contain an image feature for a morph. A feature is a directed
// line segment from P to Q, with coordinates in pixel units relative to the
// lower-left corner of the image.
// --------------------------------------------------------------------------

struct Feature
{
    STPoint2 P, Q;
    Feature(const STPoint2 &p, const STPoint2 &q) : P(p), Q(q) { }
};

// --------------------------------------------------------------------------
// Constants, a few global variables, and function prototypes
// --------------------------------------------------------------------------

const int kWindowWidth  = 512;
const int kWindowHeight = 512;
const int kFrames       = 30;   // number of frames to generate

STImage *gDisplayedImage = 0;   // an image to display (for testing/debugging)

std::vector<Feature> gSourceFeatures;   // feature set on source image
std::vector<Feature> gTargetFeatures;   // corresponding features on target

// Copies an image into the global image for display
void DisplayImage(STImage *image);

// --------------------------------------------------------------------------
// CS148 TODO: Implement the functions below to compute the morph
// --------------------------------------------------------------------------

/**
 * Compute a linear blend of the pixel colors in two provided images according
 * to a parameter t.
 */
STImage *BlendImages(STImage *image1, STImage *image2, float t)
{
    int height = image1->GetHeight();
    int width = image1->GetWidth();
    STImage *result = new STImage(width,height);
    for (int i = 0;i < width;i++)
    {
        for (int j = 0;j < height;j++)
        {
            STColor4ub pix1,pix2,pix3;
            pix1 = image2->GetPixel(i, j);
            pix2 = image1->GetPixel(i, j);
            pix3.r = (pix1.r*t+pix2.r*(1-t));
            pix3.g = (pix1.g*t+pix2.g*(1-t));
            pix3.b = (pix1.b*t+pix2.b*(1-t));
            pix3.a = (pix1.a*t+pix2.a*(1-t));
            result->SetPixel(i, j, pix3);
        }
        
    }
    return result;
}


STColor4ub GetPixelWithBilinearTransform(STImage *image,float x, float y)
{
    STColor4f color;

    int floorX = x;
    int floorY = y;
    int ceilX = x+1;
    int ceilY = y+1;
    //bound
    if (ceilX>=image->GetWidth())
        ceilX = image->GetWidth()-1;
    if (ceilY>=image->GetHeight())
        ceilY = image->GetHeight()-1;
    if (floorX>=image->GetWidth())
        floorX = image->GetWidth()-1;
    if (floorY>=image->GetHeight())
        floorY = image->GetHeight()-1;
    
    float tX = x - floorX;
    float tY = y - floorY;

    STColor4ub color11 = image->GetPixel(floorX, floorY);
    STColor4ub color21 = image->GetPixel(ceilX, floorY);
    STColor4ub color22 = image->GetPixel(ceilX, ceilY);
    STColor4ub color12 = image->GetPixel(floorX, ceilY);
    
    float area11 = (1-tX)*(1-tY);
    float area12 = (1-tX)*(tY);
    float area22 = (tX)*(tY);
    float area21 = (tX)*(1-tY);

    color.r = area11*color11.r+area21*color21.r+area22*color22.r+area12*color12.r;
    color.g = area11*color11.g+area21*color21.g+area22*color22.g+area12*color12.g;
    color.b = area11*color11.b+area21*color21.b+area22*color22.b+area12*color12.b;
    color.a = area11*color11.a+area21*color21.a+area22*color22.a+area12*color12.a;
    
    return STColor4ub(color.r,color.g,color.b,color.a);
}



/**
 * Compute a field morph on an image using two sets of corresponding features
 * according to a parameter t.  Arguments a, b, and p are weighting parameters
 * for the field morph, as described in Beier & Nelly 1992, section 3.
 */
STImage *FieldMorph(STImage *image,
                    const std::vector<Feature> &sourceFeatures,
                    const std::vector<Feature> &targetFeatures,
                    float t, float a, float b, float p)
{

    
    std::vector<Feature> interpolatedTargetFeatures;
    
    for (int i=0;i<targetFeatures.size();i++)
    {
        Feature currentFeature(sourceFeatures[i]);
        currentFeature.P.x = (1-t)*sourceFeatures[i].P.x + (t)*targetFeatures[i].P.x;
        currentFeature.P.y = (1-t)*sourceFeatures[i].P.y + (t)*targetFeatures[i].P.y;
        currentFeature.Q.x = (1-t)*sourceFeatures[i].Q.x + (t)*targetFeatures[i].Q.x;
        currentFeature.Q.y = (1-t)*sourceFeatures[i].Q.y + (t)*targetFeatures[i].Q.y;
        interpolatedTargetFeatures.push_back(currentFeature);
    }
    
    int width = image->GetWidth();
    int height = image->GetHeight();
    STImage *result = new STImage(width,height);
    
    for (int pX=0;pX<width;pX++)
    {
            for (int pY=0;pY<height;pY++)
            {
                STPoint2 X(pX,pY);
                STPoint2 X_prime(0,0);
                STVector2 displacement(0,0);
                STVector2 dsum(0,0);
                float weightsum = 0;
                for (int i=0;i<sourceFeatures.size();i++)
                {
                    Feature PQ = interpolatedTargetFeatures[i];
                    Feature PQ_prime = sourceFeatures[i];
                    
                    //get u,v
                    STVector2 XMinusP = X - PQ.P;
                    STVector2 QMinusP = PQ.Q - PQ.P;
                    STVector2 perpendicularQMinusP(-QMinusP.y,QMinusP.x);
                    
                    STVector2 QMinusP_prime = PQ_prime.Q - PQ_prime.P;
                    STVector2 perpendicularQMinusP_prime(-QMinusP_prime.y,QMinusP_prime.x);
                    
                    float u = STVector2::Dot(XMinusP, QMinusP) / QMinusP.LengthSq();
                    float v = STVector2::Dot(XMinusP, perpendicularQMinusP) / STPoint2::Dist(PQ.P, PQ.Q);
                    
                    X_prime = PQ_prime.P + u*(QMinusP_prime) + (v*perpendicularQMinusP_prime / STPoint2::Dist(PQ_prime.Q, PQ_prime.P));
                    displacement = X_prime - X;
                    float dist=0;
                    if (u<0)
                        dist = STPoint2::Dist(X, PQ.P);
                    else if (u>1)
                        dist = STPoint2::Dist(X, PQ.Q);
                    else
                        dist = sqrtf((X-PQ.P).LengthSq() - powf(STVector2::Dot(XMinusP, QMinusP)/QMinusP.Length(),2));
                    
                    if (dist!=dist)
                        dist = 0;
                    float weight = powf((powf(QMinusP.Length(),p) / (a + dist)),b);
                    dsum += displacement*weight;
                    weightsum+=weight;
                }
                STPoint2 X_prime_final = X + dsum / weightsum;
                
                if (X_prime_final.x<0)
                    X_prime_final.x = 0;
                if (X_prime_final.y<0)
                    X_prime_final.y = 0;
                if (X_prime_final.x>=width)
                    X_prime_final.x = width-1;
                if (X_prime_final.y>=height)
                    X_prime_final.y = height-1;
//                result->SetPixel(pX, pY, image->GetPixel(X_prime_final.x, X_prime_final.y));
                result->SetPixel(pX, pY, GetPixelWithBilinearTransform(image,X_prime_final.x, X_prime_final.y));
            }
    }
    return result;
}

/**
 * Compute a morph between two images by first distorting each toward the
 * other, then combining the results with a blend operation.
 */
STImage *MorphImages(STImage *sourceImage, const std::vector<Feature> &sourceFeatures,
                     STImage *targetImage, const std::vector<Feature> &targetFeatures,
                     float t, float a, float b, float p)
{
    STImage *result = 0;

    STImage *img1 = FieldMorph(sourceImage, sourceFeatures, targetFeatures, t, a, b, p);
    STImage *img2 = FieldMorph(targetImage, targetFeatures, sourceFeatures, 1 - t, a, b, p);
    
    result = BlendImages(img1, img2, t);

    return result;
}

/**
 * Compute a morph through time by generating appropriate values of t and
 * repeatedly calling MorphImages(). Saves the image sequence to disk.
 */
void GenerateMorphFrames(STImage *sourceImage, const std::vector<Feature> &sourceFeatures,
                         STImage *targetImage, const std::vector<Feature> &targetFeatures,
                         float a, float b, float p)
{
    // iterate and generate each required frame
    for (int i = 0; i < kFrames; ++i)
    {
        std::cout << "Metamorphosizing frame #" << i << "...";
        
        
        // **********
        // CS148 TODO: Compute a t value for the current frame and generate
        //             the morphed image here.
        // **********
        
        float t = (1 - cosf((float)i/(kFrames-1)*3.14159))*0.5;
        STImage *result = 0;
        
        result = MorphImages(sourceImage, sourceFeatures, targetImage, targetFeatures, t, a, b, p);

        // generate a file name to save
        std::ostringstream oss;
        oss << "frame_078_" << std::setw(3) << std::setfill('0') << i+1 << ".png";

        // write and deallocate the morphed image
        if (result) {
            result->Save(oss.str());
            delete result;
        }
        std::cout << " done." << std::endl;
    }
}

// --------------------------------------------------------------------------
// Utility and support code below that you do not need to modify
// --------------------------------------------------------------------------

/**
 * Copies an image into the global image for display
 */
void DisplayImage(STImage *image)
{
    // clean up the previous image
    if (gDisplayedImage) {
        delete gDisplayedImage;
        gDisplayedImage = 0;
    }

    // allocate a new image and copy it over
    if (image) {
        gDisplayedImage = new STImage(image->GetWidth(), image->GetHeight());
        size_t bytes = image->GetWidth() * image->GetHeight() * sizeof(STImage::Pixel);
        memcpy(gDisplayedImage->GetPixels(), image->GetPixels(), bytes);
    }
}

/**
 * Display callback function draws a single image to help debug
 */
void DisplayCallback()
{
    glClearColor(.2f, 2.f, 2.f, 1.f);
    glClear(GL_COLOR_BUFFER_BIT);

    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();

    if (gDisplayedImage)
        gDisplayedImage->Draw();

    glutSwapBuffers();
}

/**
 * Window resize callback function
 */
void ReshapeCallback(int w, int h)
{
    glViewport(0, 0, w, h);

    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluOrtho2D(0, w, 0, h);
}

/**
 * Keyboard callback function
 */
void KeyboardCallback(unsigned char key, int x, int y)
{
    switch (key)
    {
        // exit program on escape press
        case 27:
            exit(0);
            break;
        // save the currently displayed image if S is pressed
        case 's':
        case 'S':
            if (gDisplayedImage)
                gDisplayedImage->Save("screenshot.png");
            break;
        default:
            break;
    }
}

/**
 * This function is called by the parsing functions to populate the feature sets
 */
void AddFeatureCallback(STPoint2 p, STPoint2 q, ImageChoice image)
{
    if (image == IMAGE_1 || image == BOTH_IMAGES)
        gSourceFeatures.push_back(Feature(p, q));
    if (image == IMAGE_2 || image == BOTH_IMAGES)
        gTargetFeatures.push_back(Feature(p, q));
}

/**
 * Program entry point
 */
int main(int argc, char* argv[])
{
    glutInit(&argc, argv);
    glutInitDisplayMode( GLUT_DOUBLE | GLUT_RGB );
    glutInitWindowPosition(20, 20);
    glutInitWindowSize(kWindowWidth, kWindowHeight);
    glutCreateWindow("Metamorphosis: CS148 Assignment 4");

    glutDisplayFunc(DisplayCallback);
    glutReshapeFunc(ReshapeCallback);
    glutKeyboardFunc(KeyboardCallback);

    //
    // load the configuration from config.txt, or other file as specified
    //
    std::string configFile = "config.txt";
    if (argc > 1) configFile = argv[1];

    char sourceName[64], targetName[64];
    char saveName[64], loadName[64];
    STImage *sourceImage, *targetImage;
    parseConfigFile(configFile.c_str(),
                    sourceName, targetName,
                    saveName, loadName,
                    &sourceImage, &targetImage);
    delete sourceImage;
    delete targetImage;

    //
    // load the features from the saved features file
    //
    loadLineEditorFile(loadName, AddFeatureCallback,
                       sourceName, targetName,
                       &sourceImage, &targetImage);

    //
    // run the full morphing algorithm before going into the main loop to
    // display an image
    //

    // these weighting parameters (Beier & Nelly 1992) can be changed if desired
    const float a = 0.5f, b = 2.0f, p = 0.2f;

    GenerateMorphFrames(sourceImage, gSourceFeatures,
                        targetImage, gTargetFeatures,
                        a, b, p);


    //
    // display a test or debug image here if desired
    // (note: comment this out if you call DisplayImage from elsewhere)
    //
//    STImage *result = sourceImage;

    // use this to test your image blending
    
//    STImage *result = BlendImages(sourceImage, targetImage, 0.5f);
    

    // use this to test your field morph
//    STImage *result = FieldMorph(sourceImage, gSourceFeatures, gTargetFeatures,0.5f, a, b, p);

    // use this to test your image morphing

    STImage *result = MorphImages(sourceImage, gSourceFeatures,
                                  targetImage, gTargetFeatures,
                                  0.25f, a, b, p);

    
    DisplayImage(result);

    // enter the GLUT main loop
    glutMainLoop();

    return 0;
}

// --------------------------------------------------------------------------
