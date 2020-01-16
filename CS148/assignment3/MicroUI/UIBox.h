// UIBox.h
#ifndef __UIBOX_H__
#define __UIBOX_H__

/**
*   A UIBox is a widget that just displays a solid color.
*
*   It is provided to give an example of an as-simple-as-possible
*   complete widget implementation.
*/

#include "UIWidget.h"

#include "STColor4f.h"

class UIBox :
    public UIWidget
{
public:
    //
    // Constructor: Initialize a UI box with a given color.
    //
    UIBox(const STColor4f& color);

    //
    // Display the box to the current OpenGL context.
    //
    // Overrides UIWidget::Display
    //
    virtual void Display();

private:

    // Color
    STColor4f mColor;
};

#endif // __UIBOX_H__
