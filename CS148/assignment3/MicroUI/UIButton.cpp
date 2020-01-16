// UIButton.cpp
#include "UIButton.h"

#include "st.h"
#include "stgl.h"

//
// Constructor: Initialize a UI button with
// a given font face and label text.
//
UIButton::UIButton(STFont* font,
                   const std::string& text,
                   FireCallback callback)
    : mFont(font)
    , mText(text)
    , mCallback(callback)
{
    mDownState = 0;
    mOverState = 0;
}

void UIButton::Display()
{
    STColor4f c;
    if (mDownState && mOverState)
    {
        STColor4f tmpColor(1,0,0,1);
        c = tmpColor;
    }
    else if (mOverState || (mDownState && !mOverState))
    {
        STColor4f tmpColor(0,1,0,1);
        c = tmpColor;
    }
    else
    {
        STColor4f tmpColor(0,0,1,1);
        c = tmpColor;
    }
    
    UIRectangle r = GetRectangle();
    glColor4f(c.r, c.g, c.b, c.a);
    glRectf(r.pMin.x, r.pMin.y,
            r.pMax.x, r.pMax.y);
    
    glPushMatrix();
    STPoint2 pRectangleCenter,pText;
    
    pRectangleCenter.x = GetRectangle().pMin.x + (GetRectangle().pMax.x - GetRectangle().pMin.x)/2;
    pRectangleCenter.y = GetRectangle().pMin.y + (GetRectangle().pMax.y - GetRectangle().pMin.y)/2;
    
    pText.x = pRectangleCenter.x - mFont->ComputeWidth(mText)/2;
    pText.y = pRectangleCenter.y - mFont->GetHeight()/4;
    
    glTranslatef(pText.x, pText.y, 0);
    mFont->DrawString(mText,STColor4f(1,1,1,1));
    glPopMatrix();
    
}


void UIButton::setCaptureCallbacks(CaptureCallback capture, CaptureCallback release)
{
    mCapture = capture;
    mRelease = release;
}

void UIButton::HandleMouseDown(const STPoint2& position)
{
//    std::cout<<"down\n";
    mDownState = 1;
    mCapture(this);
}

void UIButton::HandleMouseUp(const STPoint2& position)
{
//    std::cout<<"up\n";
    if (mOverState && mDownState)
    {
        mCallback(this);
    }
    else
    {
        
    }
    mDownState = 0;
    mRelease(this);
}

void UIButton::HandleMouseEnter()
{
//    std::cout<<"enter\n";
    mOverState = 1;
}

void UIButton::HandleMouseLeave()
{
//    std::cout<<"leave\n";
    mOverState = 0;
}

void UIButton::HandleMouseMove(const STPoint2& position)
{
//    std::cout<<"move";
}
