// STVector2.inl
#ifndef __STVECTOR2_INL__
#define __STVECTOR2_INL__

/**
* Inline file for STVector2.h
*/

#include "STPoint2.h"
#include "STUtil.h" // for STMin, STMax

//

inline STVector2::STVector2()
{
    x = 0;
    y = 0;
}

inline STVector2::STVector2(float inX, float inY)
{
    x = inX;
    y = inY;
}

inline STVector2::STVector2(float s)
{
    x = s;
    y = s;
}

inline STVector2::STVector2(const STVector2 &v)
{
    x = v.x;
    y = v.y;
}

inline STVector2::STVector2(const STPoint2& p)
{
    x = p.x;
    y = p.y;
}

inline STVector2& STVector2::operator=(const STVector2 &v)
{
    x = v.x;
    y = v.y;
    return *this;
}

/**
* Length of vector
*/
inline float STVector2::Length() const
{
    return sqrtf(LengthSq());
}

/**
* Length squared of vector
*/
inline float STVector2::LengthSq() const
{
    return x * x + y * y;
}

/**
* True if all elements are real values
*/
inline bool STVector2::Valid() const
{
    // For standard floating-point math, the
    // "not-a-number" (NaN) representation
    // will test as not-equal to every value,
    // including itself!
    return ((x == x) && (y == y));
}

/**
* Sets the length of vector to 1
*/
inline void STVector2::Normalize()
{
    float len = Length();
    if (len != 0.0f) {
        (*this) /= len;
    }
}

/**
* Sets the length of vector to NewLength
*/
inline void STVector2::SetLength(float newLength)
{
    float len = Length();
    if (len != 0.0f) {
        (*this) *= newLength / len;
    }
}

/**
* Returns cross product of two vectors
*/
inline float STVector2::Cross(
    const STVector2& left, const STVector2& right)
{
    return left.x * right.y - left.y * right.x;
}

/**
* Returns dot product of two vectors
*/
inline float STVector2::Dot(
    const STVector2& left, const STVector2& right)
{
    return left.x * right.x + left.y * right.y;
}

/**
* Returns direct product of two vectors
*/
inline STVector2 STVector2::DirectProduct(
    const STVector2& left, const STVector2& right)
{
    return STVector2(left.x * right.x, left.y * right.y);
}

/**
* Linearly interpolates between two vectors;
* s = 0 returns left, s = 1 returns right
*/
inline STVector2 STVector2::Lerp(
    const STVector2& left, const STVector2& right, float s)
{
    return left + s * (right - left);
}

/**
* Returns the vector that is the component-wise maximum of the given vectors
*/
inline STVector2 STVector2::ComponentMax(
    const STVector2& left, const STVector2& right)
{
    return STVector2(
        STMax(left.x, right.x),
        STMax(left.y, right.y));
}

/**
* Returns the vector that is the component-wise minimum of the given vectors
*/
inline STVector2 STVector2::ComponentMin(
    const STVector2& left, const STVector2& right)
{
    return STVector2(
        STMin(left.x, right.x),
        STMin(left.y, right.y));
}

inline STVector2 operator*(const STVector2& left, float right)
{
    STVector2 result(left);
    result *= right;
    return result;
}

inline STVector2 operator*(float left, const STVector2& right)
{
    STVector2 result(right);
    result *= left;
    return result;
}

inline STVector2 operator/(const STVector2& left, float right)
{
    STVector2 result(left);
    result /= right;
    return result;
}

inline STVector2 operator+(const STVector2& left, const STVector2& right)
{
    STVector2 result(left);
    result += right;
    return result;
}

inline STVector2 operator-(const STVector2& left, const STVector2& right)
{
    STVector2 result(left);
    result -= right;
    return result;
}

inline STVector2& STVector2::operator*=(float right)
{
    x *= right;
    y *= right;
    return *this;
}

inline STVector2& STVector2::operator/=(float right)
{
    x /= right;
    y /= right;
    return *this;
}

inline STVector2& STVector2::operator+=(const STVector2& right)
{
    x += right.x;
    y += right.y;
    return *this;
}

inline STVector2& STVector2::operator-=(const STVector2& right)
{
    x -= right.x;
    y -= right.y;
    return *this;
}

inline STVector2 operator-(const STVector2& v)
{
    return STVector2(-v.x, -v.y);
}

inline STVector2 operator-(const STPoint2& left, const STPoint2& right)
{
    return STVector2(left.x - right.x,
                     left.y - right.y);
}

#endif  // __STVECTOR2_INL__
