/*
 *  TemplateLayer.h
 *  FontEditor
 *
 *  Helper class the draws a moveable and scalable template image in the
 *  background along with a number of guides for creating a digital font.
 *
 *  Created by Sonny Chan, January 2009.
 *  Copyright 2009 Stanford University. All rights reserved.
 *
 */
 
#ifndef TEMPLATELAYER_H
#define TEMPLATELAYER_H

#include "st.h"
#include "MyFont.h"

class TemplateLayer
{
public:
    TemplateLayer(MyFont *font);
    ~TemplateLayer();

    // draws the template image in the background with guide lines
    void Draw();
    
    // draws several lines of preview text centered on the screen with the font
    void DrawPreview(STFont *font);

    // moves the template image by the given translation in screen coords
    void MoveImage(float dx, float dy);
    
    // zoom in if delta is postive, zoom out if delta is negative
    void ScaleImage(float delta);

    // set the coordinates of where the font unit space origin should be
    void SetOrigin(STVector2 origin)     { mOrigin = origin; }

private:

    // the ST image, shape, and texture are for drawing the template background
    STImage    *mImage;
    STShape    *mShape;
    STTexture  *mTexture;

    // pointer to the font object to read guide location values from
    MyFont     *mFont;

    // keeps track of where and how to draw the template image
    STVector2   mOrigin;
    STVector2   mTranslation;
    float       mScale;

    // minimum and maximum zoom values, so we don't totally lose the image
    static const float kScaleMin;
    static const float kScaleMax;
};

#endif
