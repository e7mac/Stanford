// UIButton.h
#ifndef __UIBUTTON_H__
#define __UIBUTTON_H__

/**
* A UIButton is a widget with a simple
* label that responds to mouse events.
*/

#include "UIWidget.h"
#include "UIBox.h"
#include "UILabel.h"

class UIButton :
    public UIWidget
{
public:
    // Type of callbacks to handle button-press "fire" events.
    typedef void (*FireCallback)(UIButton* button);
    typedef void (*CaptureCallback)(UIWidget* widget);

    //
    // Constructor: Initialize a UI button with
    // a given font face and label text.
    //
    UIButton(STFont* font,
             const std::string& text,
             FireCallback callback);

    virtual void Display();
    
    void setCaptureCallbacks(CaptureCallback capture, CaptureCallback release);
    
    virtual void HandleMouseDown(const STPoint2& position);
    virtual void HandleMouseUp(const STPoint2& position);
    virtual void HandleMouseEnter();
    virtual void HandleMouseLeave();
    virtual void HandleMouseMove(const STPoint2& position);
private:
    // Font to use for text
    STFont* mFont;

    // Text
    std::string mText;

    // "Fire" event callback
    FireCallback mCallback;

    CaptureCallback mCapture;
    CaptureCallback mRelease;

    bool mDownState;
    bool mOverState;
};

#endif // __UIBUTTON_H__
