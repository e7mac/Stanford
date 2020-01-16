//
//  UIDraggableBox.cpp
//  MicroUI
//
//  Created by Mayank on 10/11/12.
//
//

#include "UIDraggableBox.h"
#include "stgl.h"

UIDraggableBox::UIDraggableBox(const STColor4f& color)
: mColor(color)
{
    
}

void UIDraggableBox::Display()
{
    STColor4f c = mColor;
    UIRectangle r = GetRectangle();
    glPushMatrix();
    glColor4f(c.r, c.g, c.b, c.a);
    glRectf(r.pMin.x, r.pMin.y,
            r.pMax.x, r.pMax.y);
    glPopMatrix();
}


void UIDraggableBox::beginDrag()
{
    mDrag = 1;
}
void UIDraggableBox::endDrag()
{
    mDrag = 0;
}

void UIDraggableBox::HandleMouseDown(const STPoint2& position)
{
    std::cout<<"downA\n";
    beginDrag();
    mDragPosMin.x = position.x - GetRectangle().pMin.x;
    mDragPosMin.y = position.y - GetRectangle().pMin.y;
    mDragPosMax.x = position.x - GetRectangle().pMax.x;
    mDragPosMax.y = position.y - GetRectangle().pMax.y;
    mCapture(this);
}
void UIDraggableBox::HandleMouseUp(const STPoint2& position)
{
    std::cout<<"upA\n";
    endDrag();
    mRelease(this);
}
void UIDraggableBox::HandleMouseMove(const STPoint2& position)
{
    std::cout<<"drag happening\n";
    if (mDrag)
        SetRectangle(UIRectangle(STPoint2(position.x-mDragPosMin.x,position.y-mDragPosMin.y),STPoint2(position.x-mDragPosMax.x,position.y-mDragPosMax.y)));
}


void UIDraggableBox::setDragCallbacks(CaptureCallback capture, CaptureCallback release)
{
    mCapture = capture;
    mRelease = release;
}
