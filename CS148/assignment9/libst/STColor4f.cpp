// STColor4f.cpp
#include "STColor4f.h"

#include "STColor3f.h"
#include "STColor4ub.h"
#include "STUtil.h"

/* Constructors */
STColor4f::STColor4f()
    : r(0.f), g(0.f), b(0.f), a(0.f)
{
}

STColor4f::STColor4f(const STColor4f& c)
    : r(c.r), g(c.g), b(c.b), a(c.a)
{
}

STColor4f::STColor4f(float c, float _a)
    : r(c), g(c), b(c), a(_a)
{
}

STColor4f::STColor4f(float _r, float _g, float _b, float _a)
    : r(_r), g(_g), b(_b), a(_a)
{
}

STColor4f::STColor4f(const STColor3f& c, float _a)
    : r(c.r), g(c.g), b(c.b), a(_a)
{
}

STColor4f::STColor4f(const STColor4ub& c)
    : r(c.r / 255.f), g(c.g / 255.f), b(c.b / 255.f), a(c.a / 255.f)
{
}

/* In-place math operators  Work component-wise on all four components. */
STColor4f& STColor4f::operator+=(const STColor4f& rhs)
{
    r += rhs.r;
    g += rhs.g;
    b += rhs.b;
    a += rhs.a;
    return *this;
}

STColor4f& STColor4f::operator-=(const STColor4f& rhs)
{
    r -= rhs.r;
    g -= rhs.g;
    b -= rhs.b;
    a -= rhs.a;
    return *this;
}

STColor4f& STColor4f::operator*=(const float rhs)
{
    r *= rhs;
    g *= rhs;
    b *= rhs;
    a *= rhs;
    return *this;
}

STColor4f& STColor4f::operator*=(const STColor4f& rhs)
{
    r *= rhs.r;
    g *= rhs.g;
    b *= rhs.b;
    a *= rhs.a;
    return *this;
}

STColor4f& STColor4f::operator/=(const float rhs)
{
    r /= rhs;
    g /= rhs;
    b /= rhs;
    a /= rhs;
    return *this;
}

/* Component-wise exponential. Applies to color components only. */
STColor4f STColor4f::Exp() const
{
    STColor3f rgb(*this);
    return STColor4f(rgb.Exp(), a);
}

/* Component-wise log. Applies to color components only. */
STColor4f STColor4f::Log() const
{
    STColor3f rgb(*this);
    return STColor4f(rgb.Log(), a);
}

/* Luminance. Applies to color components only. */
float STColor4f::Y() const
{
    return STColor3f(*this).Y();
}

/* Math operators */
STColor4f operator+(const STColor4f& lhs, const STColor4f& rhs)
{
    STColor4f result(lhs);
    result += rhs;
    return result;
}

STColor4f operator-(const STColor4f& lhs, const STColor4f& rhs)
{
    STColor4f result(lhs);
    result -= rhs;
    return result;
}

STColor4f operator*(const STColor4f& lhs, const STColor4f& rhs)
{
    STColor4f result(lhs);
    result *= rhs;
    return result;
}

STColor4f operator*(float lhs, const STColor4f& rhs)
{
    STColor4f result(rhs);
    result *= lhs;
    return result;
}

STColor4f operator*(const STColor4f& lhs, float rhs)
{
    STColor4f result(lhs);
    result *= rhs;
    return result;
}

STColor4f operator/(const STColor4f& lhs, float rhs)
{
    STColor4f result(lhs);
    result /= rhs;
    return result;
}
