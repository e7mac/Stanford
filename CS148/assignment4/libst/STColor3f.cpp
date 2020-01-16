// STColor3f.cpp
#include "STColor3f.h"

#include "STColor4f.h"
#include "STColor4ub.h"

#include <math.h>

//

/* Constructors */
STColor3f::STColor3f() 
: r(0.f), g(0.f), b(0.f)
{
}

STColor3f::STColor3f(float _c)
: r(_c), g(_c), b(_c)
{
}

STColor3f::STColor3f(float _r, float _g, float _b) 
: r(_r), g(_g), b(_b)
{
}

STColor3f::STColor3f(const STColor3f& c) 
: r(c.r), g(c.g), b(c.b)
{
}

STColor3f::STColor3f(const STColor4f& c)
: r(c.r), g(c.g), b(c.b)
{
}


STColor3f::STColor3f(const STColor4ub& c) 
{
    this->r = c.r / 255.f;
    this->g = c.g / 255.f;
    this->b = c.b / 255.f;
}

/* Math operators */
STColor3f STColor3f::operator+(const STColor3f& rhs) const
{
    STColor3f rval;
    rval.r = this->r + rhs.r;
    rval.g = this->g + rhs.g;
    rval.b = this->b + rhs.b;
    return rval;
}

STColor3f& STColor3f::operator+=(const STColor3f& rhs)
{
    this->r += rhs.r;
    this->g += rhs.g;
    this->b += rhs.b;
    return *this;
}

STColor3f STColor3f::operator-(const STColor3f& rhs) const
{
    STColor3f rval;
    rval.r = this->r - rhs.r;
    rval.g = this->g - rhs.g;
    rval.b = this->b - rhs.b;
    return rval;
}

STColor3f& STColor3f::operator-=(const STColor3f& rhs)
{
    this->r -= rhs.r;
    this->g -= rhs.g;
    this->b -= rhs.b;
    return *this;
}

STColor3f STColor3f::operator*(const float s) const
{
    STColor3f rval;
    rval.r = this->r * s;
    rval.g = this->g * s;
    rval.b = this->b * s;
    return rval;
}

STColor3f STColor3f::operator*(const STColor3f& s) const
{
    STColor3f rval;
    rval.r = this->r * s.r;
    rval.g = this->g * s.g;
    rval.b = this->b * s.b;
    return rval;
}

STColor3f& STColor3f::operator*=(const float s)
{
    this->r *= s;
    this->b *= s;
    this->g *= s;
    return *this;
}

STColor3f& STColor3f::operator*=(const STColor3f& s)
{
    this->r *= s.r;
    this->b *= s.g;
    this->g *= s.b;
    return *this;
}

STColor3f STColor3f::operator/(const float s) const
{
    return *this * (1.f / s);
}

STColor3f STColor3f::operator/(const STColor3f& s) const
{
    STColor3f result;
    result.r = this->r / s.r;
    result.g = this->g / s.g;
    result.b = this->b / s.b;
    return result;
}
STColor3f& STColor3f::operator/=(const float s)
{
    this->r /= s;
    this->g /= s;
    this->b /= s;
    return *this;
}
STColor3f& STColor3f::operator/=(const STColor3f& s)
{
    this->r /= s.r;
    this->g /= s.g;
    this->b /= s.b;
    return *this;
}

/* Extra operator to allow float*Color expression */
STColor3f operator*(float lhs, STColor3f &rhs)
{
    // just flip it around
    return rhs * lhs;
}

/* Component-wise exponential */
STColor3f STColor3f::Exp() const
{
    STColor3f result;
    result.r = expf(this->r);
    result.g = expf(this->g);
    result.b = expf(this->b);
    return result;
}
/* Component-wise log */
STColor3f STColor3f::Log() const
{
    STColor3f result;
    result.r = logf(this->r);
    result.g = logf(this->g);
    result.b = logf(this->b);
    return result;
}

/* Luminance */
float STColor3f::Y() const
{
    return .2126f*this->r + .7152f*this->g + .0722f*this->b;
}
