// UILabel.h
#ifndef __UILABEL_H__
#define __UILABEL_H__

/**
* A UILabel is a widget that draws a simple
* text label in a provided font.
*/

#include "UIWidget.h"

class UILabel :
    public UIWidget
{
public:
    //
    // Constructor: Initialize a UI label with
    // a given font face and text string.
    //
    UILabel(STFont* font, const std::string& text);

    //
    // Display the label to the current OpenGL context.
    //
    // Overrides UIWidget::Display
    //
    virtual void Display();

private:
    // Font face to use.
    STFont* mFont;

    // Text string to draw.
    std::string mText;
};

#endif // __UILABEL_H__
