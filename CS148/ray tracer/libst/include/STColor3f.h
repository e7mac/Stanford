// STColor3f.h
#ifndef __STCOLOR3F_H__
#define __STCOLOR3F_H__

// Forward-declare libst types.
#include "stForward.h"

/**
*  Simple class representing a color with 3 floating point values
*  Only the values 0.f to 1.f are displayable, but the color can
*  contain any values.
*/
struct STColor3f
{
public:
    float r, g, b;

    /* Constructors */
    STColor3f();
    explicit STColor3f(float _c);
    STColor3f(float _r, float _g, float _b);
    STColor3f(const STColor3f& c);
    explicit STColor3f(const STColor4f& c);
    explicit STColor3f(const STColor4ub& c);

    /* Math operators */
    STColor3f operator+(const STColor3f& rhs) const;
    STColor3f& operator+=(const STColor3f& rhs);
    STColor3f operator-(const STColor3f& rhs) const;
    STColor3f& operator-=(const STColor3f& rhs);
    STColor3f operator*(const float s) const;
    STColor3f operator*(const STColor3f& s) const;
    STColor3f& operator*=(const float s);
    STColor3f& operator*=(const STColor3f& s);
    STColor3f operator/(const float s) const;
    STColor3f operator/(const STColor3f& s) const;
    STColor3f& operator/=(const float s);
    STColor3f& operator/=(const STColor3f& s);

    /* Component-wise exponential */
    STColor3f Exp() const;
    /* Component-wise log */
    STColor3f Log() const;

    /* Luminance */
    float Y() const;
};

/* Extra operator to allow float*Color expression */
STColor3f operator*(float lhs, const STColor3f &rhs);

#endif //__STCOLOR3F_H__

