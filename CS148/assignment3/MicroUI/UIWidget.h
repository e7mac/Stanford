// UIWidget.h
#ifndef __UIWIDGET_H__
#define __UIWIDGET_H__

/**
* A UIWidget represents a single interactive control
* or panel in the user interface. This includes buttons,
* text labels, or aggregates of other widgets.
*
* Every widget is assigned a given rectangle within
* the GLUT window. This is stored as a UIRectangle.
*/

#include "UIRectangle.h"
#include <iostream>

class UIWidget
{
protected:
    /**
    *
    * The UIWidget constructor is "protected".
    * This means that users cannot construct a UIWidget
    * directly, but must instead construct an instance
    * of some subclass of UIWidget.
    */
    UIWidget();

public:
    /**
    *
    * The UIWidget destructor is "virtual".
    * This is important for any C++ class that will
    * have subclasses.
    */
    virtual ~UIWidget();

    /**
    *
    * The UIWidget::Display() function is used to
    * instruct a widget to display itself.
    *
    * By default, this functions doesn't draw anything.
    * Subclasses of UIWidget can provide their own
    * display logic by overriding Display().
    */
    virtual void Display();

    /**
    *
    * Every widget occupies some rectangle in the window.
    */
    UIRectangle GetRectangle() const { return mRectangle; }

    void SetRectangle(const UIRectangle& rectangle) { mRectangle = rectangle; }

    /**
    *
    * When mouse events occur, we need to determine
    * which widget, if any, is under the mouse cursor.
    *
    * The HitTest() function determines whether
    * this widget contains the specified position.
    * By default it does this by checking if the
    * point lies within the widget's rectangle.
    *
    * If a widget doesn't completely fill its
    * rectangle (perhaps it is an oval-shaped button).
    */
    virtual bool HitTest(const STPoint2& position);

    /**
    *
    * When a mouse event occurs, the event will be routed
    * to one of these mthods on the "right" widget.
    *
    * By default they do nothing. Invidivisual subclasses
    * can override these functions to implement their
    * own interaction logic.
    */
    virtual void HandleMouseDown(const STPoint2& position);
    virtual void HandleMouseUp(const STPoint2& position);
    virtual void HandleMouseEnter();
    virtual void HandleMouseLeave();
    virtual void HandleMouseMove(const STPoint2& position);

private:
    /**
    *
    * The 'mRectangle' member holds the current rectangle
    * of the widget within the window. It is "private,"
    * so subclasses should access the rectangle with
    * GetRectangle().
    */
    UIRectangle mRectangle;
};

#endif // __UIWIDGET_H__
