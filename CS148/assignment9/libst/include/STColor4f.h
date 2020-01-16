// STColor4f.h
#ifndef __STCOLOR4F_H__
#define __STCOLOR4F_H__

// Forward-declare libst types.
#include "stForward.h"

/**
*  Simple class representing a color with 3 floating point color
*  values and a single floating-point transparency (alpha) value.
*  Only the values 0.f to 1.f are displayable, but the color can
*  contain any values.
*/
struct STColor4f
{
public:
    float r, g, b, a;

    /* Constructors */
    STColor4f();
    STColor4f(const STColor4f& c);
    STColor4f(float c, float a);
    STColor4f(float r, float g, float b, float a = 1.f);
    explicit STColor4f(const STColor3f& c, float a = 1.f);
    explicit STColor4f(const STColor4ub& c);

    /* In-place math operators  Work component-wise on all four components. */
    STColor4f& operator+=(const STColor4f& rhs);
    STColor4f& operator-=(const STColor4f& rhs);
    STColor4f& operator*=(const float rhs);
    STColor4f& operator*=(const STColor4f& rhs);
    STColor4f& operator/=(const float rhs);

    /* Component-wise exponential. Applies to color components only. */
    STColor4f Exp() const;
    /* Component-wise log. Applies to color components only. */
    STColor4f Log() const;

    /* Luminance. Applies to color components only. */
    float Y() const;
};

/* Math operators */
STColor4f operator+(const STColor4f& lhs, const STColor4f& rhs);
STColor4f operator-(const STColor4f& lhs, const STColor4f& rhs);
STColor4f operator*(const STColor4f& lhs, const STColor4f& rhs);
STColor4f operator*(float lhs, const STColor4f& rhs);
STColor4f operator*(const STColor4f& lhs, float rhs);
STColor4f operator/(const STColor4f& lhs, float rhs);

#endif //__STCOLOR4F_H__

