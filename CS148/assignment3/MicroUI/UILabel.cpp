// UILabel.cpp
#include "UILabel.h"

#include "st.h"
#include "stgl.h"

//
// Constructor: Initialize a UI label with
// a given font face and text string.
//
UILabel::UILabel(STFont* font, const std::string& text)
    : mFont(font)
    , mText(text)
{
}

//
// Display the label to the current OpenGL context.
//
void UILabel::Display()
{
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
