// STColor4ub.h
#ifndef __STCOLOR4UB_H__
#define __STCOLOR4UB_H__

// Forward-declare libst types.
#include "stForward.h"

/**
*  Represents a color with 8-bit unsigned RGBA components.
*  Values in [0, 255] map to the range [0.0, 1.0], and
*  intensities outside of this range are not representable.
*
*  Because this color representation is lacking in both
*  precision and range, it is reccomended to convert to
*  an equivalent floating-point color type for any color math.
*/
struct STColor4ub
{
public:
    typedef unsigned char Component;
    Component r, g, b, a;

    /* Constructors */
    STColor4ub();
    STColor4ub(const STColor4ub& c);
    STColor4ub(Component c, Component a);
    STColor4ub(Component r, Component g, Component b, Component a = 255);
    explicit STColor4ub(const STColor3f& c, Component a = 255);
    explicit STColor4ub(const STColor4f& c);
};

#endif //__STCOLOR4UB_H__

