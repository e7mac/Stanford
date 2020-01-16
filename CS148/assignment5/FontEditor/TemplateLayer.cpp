/*
 *  TemplateLayer.cpp
 *  FontEditor
 *
 *  Helper class the draws a moveable and scalable template image in the
 *  background along with a number of guides for creating a digital font.
 *
 *  Created by Sonny Chan, January 2009.
 *  Copyright 2009 Stanford University. All rights reserved.
 *
 */
 
#include "TemplateLayer.h"

#include "stglut.h"
#include <iostream>
#include <algorithm>

using namespace std;

const float TemplateLayer::kScaleMin = 0.25f;
const float TemplateLayer::kScaleMax = 25.0f;

TemplateLayer::TemplateLayer(MyFont *font)
: mImage(0), mShape(0), mTexture(0), mTranslation(0.0f, 0.0f), mScale(1.0f)
{
    //
    // use STImage to load the template with the writing sample on it
    //
    mImage = new STImage("Template.png");
    if (mImage) {
        mTexture = new STTexture(mImage);
        mTexture->SetFilter(GL_LINEAR, GL_LINEAR_MIPMAP_LINEAR);
        mShape = STShapes::CreateRect(mImage->GetWidth(), mImage->GetHeight());
    }
    else
        cerr << "Could not load template image (Template.png)" << endl;

    mOrigin = STVector2(0, 0);
    mFont   = font;
}

TemplateLayer::~TemplateLayer()
{
    if (mShape)     delete mShape;
    if (mTexture)   delete mTexture;
    if (mImage)     delete mImage;
}

void TemplateLayer::Draw()
{
    //
    // get the size of the current viewport
    //
    int viewport[4];
    glGetIntegerv(GL_VIEWPORT, viewport);
    int vw = viewport[2], vh = viewport[3];

    glMatrixMode(GL_MODELVIEW);

    //
    // draw the template image in the background
    //
    glPushMatrix();
        glTranslatef(vw/2, vh/2, 0);
        glScalef(mScale, mScale, 1);
        glTranslatef(mTranslation.x, mTranslation.y, 0);
        mTexture->Bind();
        glTexEnvi(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_REPLACE);
        mShape->Draw();
        mTexture->UnBind();
    glPopMatrix();

    //
    // then draw font metric guides on the screen
    //
    glDisable(GL_TEXTURE_2D);
    glPushMatrix();
        glTranslatef(mOrigin.x + 0.5f, mOrigin.y + 0.5f, 0);
        glColor3f(0.0f, 0.0f, 1.0f);

        // draw the stippled guide lines
        glLineStipple(4, 0xAAAA);
        glEnable(GL_LINE_STIPPLE);
        glBegin(GL_LINES);
            glVertex2i(-vw, mFont->mDescender); glVertex2i(vw, mFont->mDescender);
            glVertex2i(-vw, mFont->mXHeight);   glVertex2i(vw, mFont->mXHeight);
            glVertex2i(-vw, mFont->mAscender);  glVertex2i(vw, mFont->mAscender);
        glEnd();

        // then draw the solid guide lines
        glDisable(GL_LINE_STIPPLE);
        glBegin(GL_LINES);
            glVertex2i(-vw, mFont->mBaseline);  glVertex2i(vw, mFont->mBaseline);
            glVertex2i(-vw, mFont->mCapHeight); glVertex2i(vw, mFont->mCapHeight);
            glVertex2i(0, -vh);                 glVertex2i(0, vh);
        glEnd();
    glPopMatrix();
}

void TemplateLayer::DrawPreview(STFont *font)
{
    //
    // get the size of the current viewport
    //
    int viewport[4];
    glGetIntegerv(GL_VIEWPORT, viewport);
    int vw = viewport[2], vh = viewport[3];


    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    
    //
    // draw a tinted rectangle as a backdrop for the preview text
    //
    glColor4f(1.f, .95f, .8f, .8f);
    glBegin(GL_QUADS);
        glVertex2f(   32,    32); glVertex2f(vw-32,    32);
        glVertex2f(vw-32, vh-32); glVertex2f(   32, vh-32);
    glEnd();
    
    //
    // these strings together hopefully give a good sampling of the font
    //
    string text[] = {
        "CS 148",
        "ABCDEFGHIJKLM",
        "NOPQRSTUVWXYZ",
        "abcdefghijklm",
        "nopqrstuvwxyz",
        "0123456789:;<=>?",
        "!\"#$%&'()*+,-./",
        "The quick brown fox",
        "jumps over the lazy dog."
    };
    
    //
    // center ourselves in the viewport, and draw each string in trun
    //    
    glMatrixMode(GL_MODELVIEW);
    glPushMatrix();
        glTranslatef(vw/2, vh/2, 0);
        
        float fh = font->GetHeight();
        for (int i = 0; i < 9; ++i) {
            glPushMatrix();
                float w = font->ComputeWidth(text[i].c_str());
                glTranslatef(-w/2, fh*(4-i), 0);
                font->DrawString(text[i].c_str(), STColor4f(0,1));
            glPopMatrix();
        }
        
    glPopMatrix();
    
    glDisable(GL_BLEND);    
}

//
// moves the backgound image be changing the translation
//
void TemplateLayer::MoveImage(float dx, float dy)
{
    mTranslation.x += dx / mScale;
    mTranslation.y += dy / mScale;
}

//
// zooms in/out by changing the scale
//
void TemplateLayer::ScaleImage(float delta)
{
    mScale *= expf(0.1f * delta);
    mScale = min(max(kScaleMin, mScale), kScaleMax);
}
