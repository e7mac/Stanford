// UIRectangle.h
#ifndef __UIRECTANGLE_H__
#define __UIRECTANGLE_H__

/**
* A UIRectangle describes a rectangular region
* of the window, using the minimum (bottom-left)
* and maximum (top-right) points.
*/

#include "STPoint2.h"
#include "STVector2.h"

#include <stdexcept> // for std::runtime_error

class UIRectangle
{
public:
    //
    // Constructor: Defines an empty rectangle.
    //
    UIRectangle() {}

    //
    // Constructor: Defines a rectangle given
    // minimum and maximum points.
    //
    UIRectangle(const STPoint2& _pMin,
                const STPoint2& _pMax)
        : pMin(_pMin)
        , pMax(_pMax)
    {
    }

    //
    // Test whether the provided point lies within the rectangle.
    //
    bool Contains(const STPoint2& point)
    {
        return (pMin.x <= point.x && pMin.y <= point.y)
			&& (pMax.x >= point.x && pMax.y >= point.y);
    }

    //
    // Minimum (bottom-left) point.
    //
    STPoint2 pMin;

    //
    // Maximum (top-right) point.
    //
    STPoint2 pMax;
};

#endif // __UIRECTANGLE_H__
