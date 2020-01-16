//
//  UIDraggableBox.h
//  MicroUI
//
//  Created by Mayank on 10/11/12.
//
//

#ifndef __MicroUI__UIDraggableBox__
#define __MicroUI__UIDraggableBox__

#include "UIWidget.h"
#include "STColor4f.h"

class UIDraggableBox : public UIWidget
{public:
    
    UIDraggableBox(const STColor4f& color);
    typedef void (*CaptureCallback)(UIWidget* widget);
    void beginDrag();
    void endDrag();

    virtual void HandleMouseDown(const STPoint2& position);
    virtual void HandleMouseUp(const STPoint2& position);
    virtual void HandleMouseMove(const STPoint2& position);
    virtual void Display();

    void setDragCallbacks(CaptureCallback capture, CaptureCallback release);

    CaptureCallback mCapture;
    CaptureCallback mRelease;

protected:
    bool mDrag;
    STColor4f mColor;
    STPoint2 mDragPosMin,mDragPosMax;


    
};

#endif /* defined(__MicroUI__UIDraggableBox__) */
