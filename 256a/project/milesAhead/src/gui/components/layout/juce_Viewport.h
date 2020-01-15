/*
  ==============================================================================

   This file is part of the JUCE library - "Jules' Utility Class Extensions"
   Copyright 2004-11 by Raw Material Software Ltd.

  ------------------------------------------------------------------------------

   JUCE can be redistributed and/or modified under the terms of the GNU General
   Public License (Version 2), as published by the Free Software Foundation.
   A copy of the license is included in the JUCE distribution, or can be found
   online at www.gnu.org/licenses.

   JUCE is distributed in the hope that it will be useful, but WITHOUT ANY
   WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
   A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

  ------------------------------------------------------------------------------

   To release a closed-source product which uses JUCE, commercial licenses are
   available: visit www.rawmaterialsoftware.com/juce for more information.

  ==============================================================================
*/

#ifndef __JUCE_VIEWPORT_JUCEHEADER__
#define __JUCE_VIEWPORT_JUCEHEADER__

#include "juce_ScrollBar.h"


//==============================================================================
/**
    A Viewport is used to contain a larger child component, and allows the child
    to be automatically scrolled around.

    To use a Viewport, just create one and set the component that goes inside it
    using the setViewedComponent() method. When the child component changes size,
    the Viewport will adjust its scrollbars accordingly.

    A subclass of the viewport can be created which will receive calls to its
    visibleAreaChanged() method when the subcomponent changes position or size.

*/
class JUCE_API  Viewport  : public Component,
                            private ComponentListener,
                            private ScrollBar::Listener
{
public:
    //==============================================================================
    /** Creates a Viewport.

        The viewport is initially empty - use the setViewedComponent() method to
        add a child component for it to manage.
    */
    explicit Viewport (const String& componentName = String::empty);

    /** Destructor. */
    ~Viewport();

    //==============================================================================
    /** Sets the component that this viewport will contain and scroll around.

        This will add the given component to this Viewport and position it at (0, 0).

        (Don't add or remove any child components directly using the normal
        Component::addChildComponent() methods).

        @param newViewedComponent   the component to add to this viewport, or null to remove
                                    the current component.
        @param deleteComponentWhenNoLongerNeeded    if true, the component will be deleted
                                    automatically when the viewport is deleted or when a different
                                    component is added. If false, the caller must manage the lifetime
                                    of the component
        @see getViewedComponent
    */
    void setViewedComponent (Component* newViewedComponent,
                             bool deleteComponentWhenNoLongerNeeded = true);

    /** Returns the component that's currently being used inside the Viewport.

        @see setViewedComponent
    */
    Component* getViewedComponent() const noexcept                  { return contentComp; }

    //==============================================================================
    /** Changes the position of the viewed component.

        The inner component will be moved so that the pixel at the top left of
        the viewport will be the pixel at position (xPixelsOffset, yPixelsOffset)
        within the inner component.

        This will update the scrollbars and might cause a call to visibleAreaChanged().

        @see getViewPositionX, getViewPositionY, setViewPositionProportionately
    */
    void setViewPosition (int xPixelsOffset, int yPixelsOffset);

    /** Changes the position of the viewed component.

        The inner component will be moved so that the pixel at the top left of
        the viewport will be the pixel at the specified coordinates within the
        inner component.

        This will update the scrollbars and might cause a call to visibleAreaChanged().

        @see getViewPositionX, getViewPositionY, setViewPositionProportionately
    */
    void setViewPosition (const Point<int>& newPosition);

    /** Changes the view position as a proportion of the distance it can move.

        The values here are from 0.0 to 1.0 - where (0, 0) would put the
        visible area in the top-left, and (1, 1) would put it as far down and
        to the right as it's possible to go whilst keeping the child component
        on-screen.
    */
    void setViewPositionProportionately (double proportionX, double proportionY);

    /** If the specified position is at the edges of the viewport, this method scrolls
        the viewport to bring that position nearer to the centre.

        Call this if you're dragging an object inside a viewport and want to make it scroll
        when the user approaches an edge. You might also find Component::beginDragAutoRepeat()
        useful when auto-scrolling.

        @param mouseX       the x position, relative to the Viewport's top-left
        @param mouseY       the y position, relative to the Viewport's top-left
        @param distanceFromEdge     specifies how close to an edge the position needs to be
                            before the viewport should scroll in that direction
        @param maximumSpeed the maximum number of pixels that the viewport is allowed
                            to scroll by.
        @returns            true if the viewport was scrolled
    */
    bool autoScroll (int mouseX, int mouseY, int distanceFromEdge, int maximumSpeed);

    /** Returns the position within the child component of the top-left of its visible area.
    */
    const Point<int> getViewPosition() const noexcept       { return lastVisibleArea.getPosition(); }

    /** Returns the position within the child component of the top-left of its visible area.
        @see getViewWidth, setViewPosition
    */
    int getViewPositionX() const noexcept                   { return lastVisibleArea.getX(); }

    /** Returns the position within the child component of the top-left of its visible area.
        @see getViewHeight, setViewPosition
    */
    int getViewPositionY() const noexcept                   { return lastVisibleArea.getY(); }

    /** Returns the width of the visible area of the child component.

        This may be less than the width of this Viewport if there's a vertical scrollbar
        or if the child component is itself smaller.
    */
    int getViewWidth() const noexcept                       { return lastVisibleArea.getWidth(); }

    /** Returns the height of the visible area of the child component.

        This may be less than the height of this Viewport if there's a horizontal scrollbar
        or if the child component is itself smaller.
    */
    int getViewHeight() const noexcept                      { return lastVisibleArea.getHeight(); }

    /** Returns the width available within this component for the contents.

        This will be the width of the viewport component minus the width of a
        vertical scrollbar (if visible).
    */
    int getMaximumVisibleWidth() const;

    /** Returns the height available within this component for the contents.

        This will be the height of the viewport component minus the space taken up
        by a horizontal scrollbar (if visible).
    */
    int getMaximumVisibleHeight() const;

    //==============================================================================
    /** Callback method that is called when the visible area changes.

        This will be called when the visible area is moved either be scrolling or
        by calls to setViewPosition(), etc.
    */
    virtual void visibleAreaChanged (const Rectangle<int>& newVisibleArea);

    //==============================================================================
    /** Turns scrollbars on or off.

        If set to false, the scrollbars won't ever appear. When true (the default)
        they will appear only when needed.
    */
    void setScrollBarsShown (bool showVerticalScrollbarIfNeeded,
                             bool showHorizontalScrollbarIfNeeded);

    /** True if the vertical scrollbar is enabled.
        @see setScrollBarsShown
    */
    bool isVerticalScrollBarShown() const noexcept              { return showVScrollbar; }

    /** True if the horizontal scrollbar is enabled.
        @see setScrollBarsShown
    */
    bool isHorizontalScrollBarShown() const noexcept            { return showHScrollbar; }

    /** Changes the width of the scrollbars.

        If this isn't specified, the default width from the LookAndFeel class will be used.

        @see LookAndFeel::getDefaultScrollbarWidth
    */
    void setScrollBarThickness (int thickness);

    /** Returns the thickness of the scrollbars.

        @see setScrollBarThickness
    */
    int getScrollBarThickness() const;

    /** Changes the distance that a single-step click on a scrollbar button
        will move the viewport.
    */
    void setSingleStepSizes (int stepX, int stepY);

    /** Shows or hides the buttons on any scrollbars that are used.

        @see ScrollBar::setButtonVisibility
    */
    void setScrollBarButtonVisibility (bool buttonsVisible);

    /** Returns a pointer to the scrollbar component being used.
        Handy if you need to customise the bar somehow.
    */
    ScrollBar* getVerticalScrollBar() noexcept                  { return &verticalScrollBar; }

    /** Returns a pointer to the scrollbar component being used.
        Handy if you need to customise the bar somehow.
    */
    ScrollBar* getHorizontalScrollBar() noexcept                { return &horizontalScrollBar; }


    //==============================================================================
    /** @internal */
    void resized();
    /** @internal */
    void scrollBarMoved (ScrollBar* scrollBarThatHasMoved, double newRangeStart);
    /** @internal */
    void mouseWheelMove (const MouseEvent& e, float wheelIncrementX, float wheelIncrementY);
    /** @internal */
    bool keyPressed (const KeyPress& key);
    /** @internal */
    void componentMovedOrResized (Component& component, bool wasMoved, bool wasResized);
    /** @internal */
    bool useMouseWheelMoveIfNeeded (const MouseEvent& e, float wheelIncrementX, float wheelIncrementY);

private:
    //==============================================================================
    WeakReference<Component> contentComp;
    Rectangle<int> lastVisibleArea;
    int scrollBarThickness;
    int singleStepX, singleStepY;
    bool showHScrollbar, showVScrollbar, deleteContent;
    Component contentHolder;
    ScrollBar verticalScrollBar;
    ScrollBar horizontalScrollBar;

    void updateVisibleArea();
    void deleteContentComp();

   #if JUCE_CATCH_DEPRECATED_CODE_MISUSE
    // If you get an error here, it's because this method's parameters have changed! See the new definition above..
    virtual int visibleAreaChanged (int, int, int, int) { return 0; }
   #endif

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (Viewport);
};


#endif   // __JUCE_VIEWPORT_JUCEHEADER__
