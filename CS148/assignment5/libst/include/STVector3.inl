// STVector3.inl
#ifndef __STVECTOR3_INL__
#define __STVECTOR3_INL__

/**
* Inline file for STVector3.h
*/

#include "STPoint3.h"
#include "STUtil.h" // for STMin, STMax

//

inline STVector3::STVector3()
{
    x = 0;
    y = 0;
    z = 0;
}

inline STVector3::STVector3(float inX, float inY, float inZ)
{
    x = inX;
    y = inY;
    z = inZ;
}

inline STVector3::STVector3(float s)
{
    x = s;
    y = s;
    z = s;
}

inline STVector3::STVector3(const STVector3 &v)
{
    x = v.x;
    y = v.y;
    z = v.z;
}

inline STVector3::STVector3(const STPoint3& p)
{
    x = p.x;
    y = p.y;
    z = p.z;
}

inline STVector3& STVector3::operator=(const STVector3 &v)
{
    x = v.x;
    y = v.y;
    z = v.z;
    return *this;
}

/**
* Length of vector
*/
inline float STVector3::Length() const
{
    return sqrtf(LengthSq());
}

/**
* Length squared of vector
*/
inline float STVector3::LengthSq() const
{
    return x * x + y * y + z * z;
}

/**
* True if all elements are real values
*/
inline bool STVector3::Valid() const
{
    // For standard floating-point math, the
    // "not-a-number" (NaN) representation
    // will test as not-equal to every value,
    // including itself!
    return ((x == x) && (y == y) && (z == z));
}

/**
* Sets the length of vector to 1
*/
inline void STVector3::Normalize()
{
    float len = Length();
    if (len != 0.0f) {
        (*this) /= len;
    }
}

/**
* Sets the length of vector to NewLength
*/
inline void STVector3::SetLength(float newLength)
{
    float len = Length();
    if (len != 0.0f) {
        (*this) *= newLength / len;
    }
}

/**
* Returns cross product of two vectors
*/
inline STVector3 STVector3::Cross(
    const STVector3& left, const STVector3& right)
{
    return STVector3(left.y * right.z - left.z * right.y,
                     left.z * right.x - left.x * right.z,
                     left.x * right.y - left.y * right.x);
}

/**
* Returns dot product of two vectors
*/
inline float STVector3::Dot(
    const STVector3& left, const STVector3& right)
{
    return left.x * right.x + left.y * right.y + left.z * right.z;
}

/**
* Returns direct product of two vectors
*/
inline STVector3 STVector3::DirectProduct(
    const STVector3& left, const STVector3& right)
{
    return STVector3(left.x * right.x, left.y * right.y, left.z * right.z);
}

/**
* Linearly interpolates between two vectors;
* s = 0 returns left, s = 1 returns right
*/
inline STVector3 STVector3::Lerp(
    const STVector3& left, const STVector3& right, float s)
{
    return left + s * (right - left);
}

/**
* Returns the vector that is the component-wise maximum of the given vectors
*/
inline STVector3 STVector3::ComponentMax(
    const STVector3& left, const STVector3& right)
{
    return STVector3(
        STMax(left.x, right.x),
        STMax(left.y, right.y),
        STMax(left.z, right.z));
}

/**
* Returns the vector that is the component-wise minimum of the given vectors
*/
inline STVector3 STVector3::ComponentMin(
    const STVector3& left, const STVector3& right)
{
    return STVector3(
        STMin(left.x, right.x),
        STMin(left.y, right.y),
        STMin(left.z, right.z));
}

inline STVector3 operator*(const STVector3& left, float right)
{
    STVector3 result(left);
    result *= right;
    return result;
}

inline STVector3 operator*(float left, const STVector3& right)
{
    STVector3 result(right);
    result *= left;
    return result;
}

inline STVector3 operator/(const STVector3& left, float right)
{
    STVector3 result(left);
    result /= right;
    return result;
}

inline STVector3 operator+(const STVector3& left, const STVector3& right)
{
    STVector3 result(left);
    result += right;
    return result;
}

inline STVector3 operator-(const STVector3& left, const STVector3& right)
{
    STVector3 result(left);
    result -= right;
    return result;
}

inline STVector3& STVector3::operator*=(float right)
{
    x *= right;
    y *= right;
    z *= right;
    return *this;
}

inline STVector3& STVector3::operator/=(float right)
{
    x /= right;
    y /= right;
    z /= right;
    return *this;
}

inline STVector3& STVector3::operator+=(const STVector3& right)
{
    x += right.x;
    y += right.y;
    z += right.z;
    return *this;
}

inline STVector3& STVector3::operator-=(const STVector3& right)
{
    x -= right.x;
    y -= right.y;
    z -= right.z;
    return *this;
}

inline STVector3 operator-(const STVector3& v)
{
    return STVector3(-v.x, -v.y, -v.z);
}

inline STVector3 operator-(const STPoint3& left, const STPoint3& right)
{
    return STVector3(left.x - right.x,
                     left.y - right.y,
                     left.z - right.z);
}

#endif  // __STVECTOR3_INL__
