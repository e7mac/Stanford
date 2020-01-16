// UIWidget.cpp
#include "UIWidget.h"

#include "st.h"
#include "stgl.h"

//
// Constructor: Initialize a UI widget.
//
UIWidget::UIWidget()
{
}

//
// Destructor: Finalize a UI widget.
//
UIWidget::~UIWidget()
{
}

//
// Display the widget to the current OpenGL context.
//
void UIWidget::Display()
{
}

//
// Determine if this widget or any sub-widget
// is under the specified point.
//

bool UIWidget::HitTest(const STPoint2& position)
{
//    if (!GetRectangle().Contains(position))
//    {
////        std::cout<<position.x<<" "<<position.y<<std::endl;
////        std::cout<<GetRectangle().pMin.x<<" "<<GetRectangle().pMin.y<<":"<<GetRectangle().pMax.x<<" "<<GetRectangle().pMax.y<<std::endl;
//    }
//    else std::cout << "FUUUUCK YEAAAAH";
//    std::cout<<GetRectangle().Contains(position)<<std::endl;
    return GetRectangle().Contains(position);
}


void UIWidget::HandleMouseDown(const STPoint2& position) {std::cout<<"down wid";}

void UIWidget::HandleMouseUp(const STPoint2& position) {std::cout<<"up wid";}

void UIWidget::HandleMouseEnter() {std::cout<<"enter wid";}

void UIWidget::HandleMouseLeave() {std::cout<<"leave wid";}

void UIWidget::HandleMouseMove(const STPoint2& position) {std::cout<<"move wid";}
