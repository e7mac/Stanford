// UIBox.cpp
#include "UIBox.h"

#include "stgl.h"

//
// Constructor: Initialize a UI box with a given color.
//
UIBox::UIBox(const STColor4f& color)
      : mColor(color)
{
}

//
// Display the box to the current OpenGL context.
//
void UIBox::Display()
{
    STColor4f c = mColor;
    UIRectangle r = GetRectangle();

    glColor4f(c.r, c.g, c.b, c.a);
    glRectf(r.pMin.x, r.pMin.y,
            r.pMax.x, r.pMax.y);
}
