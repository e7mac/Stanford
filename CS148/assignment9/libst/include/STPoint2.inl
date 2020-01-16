// STPoint2.inl
#ifndef __STPOINT2_INL__
#define __STPOINT2_INL__

#include "STVector2.h"

/**
* Inline file for STPoint2.h
*/

inline STPoint2::STPoint2()
{
    x = 0;
    y = 0;
}

inline STPoint2::STPoint2(float inX, float inY)
{
    x = inX;
    y = inY;
}

inline STPoint2::STPoint2(const STVector2& v)
{
    x = v.x;
    y = v.y;
}

inline STPoint2& STPoint2::operator+=(const STVector2& right)
{
    x += right.x;
    y += right.y;
    return *this;
}

inline STPoint2& STPoint2::operator-=(const STVector2& right)
{
    x -= right.x;
    y -= right.y;
    return *this;
}

/**
* Returns distance between two points
*/
inline float STPoint2::Dist(const STPoint2& left, const STPoint2& right)
{
    return (right - left).Length();
}

/**
* Returns distance squared between two points
*/
inline float STPoint2::DistSq(const STPoint2& left, const STPoint2& right)
{
    return (right - left).LengthSq();
}

inline STPoint2 operator+(const STPoint2& left, const STVector2& right)
{
    return STPoint2(left.x + right.x,
                    left.y + right.y);
}

inline STPoint2 operator+(const STVector2& left, const STPoint2& right)
{
    return STPoint2(left.x + right.x,
                    left.y + right.y);
}

inline STPoint2 operator-(const STPoint2& left, const STVector2& right)
{
    return STPoint2(left.x - right.x,
                    left.y - right.y);
}

#endif  // __STPOINT2_INL__
