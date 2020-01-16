// STPoint2.h
#ifndef __STPOINT2_H__
#define __STPOINT2_H__

#include "stForward.h"

#include <math.h>

/**
*  Simple struct to represent 2D points
*/
struct STPoint2
{
    inline STPoint2();
    inline STPoint2(float x, float y);
    inline explicit STPoint2(const STVector2& v);

    inline STPoint2& operator+=(const STVector2& right);
    inline STPoint2& operator-=(const STVector2& right);

    /**
    * Returns distance between two points
    * Called as STPoint2::Dist(left, right)
    */
    static inline float Dist(const STPoint2& left, const STPoint2& right);

    /**
    * Returns distance squared between two points
    * Called as STPoint2::DistSq(left, right)
    */
    static inline float DistSq(const STPoint2& left, const STPoint2& right);

    float x, y;

    static const STPoint2 Origin;
};

inline STPoint2 operator+(const STPoint2& left, const STVector2& right);
inline STPoint2 operator+(const STVector2& left, const STPoint2& right);
inline STPoint2 operator-(const STPoint2& left, const STVector2& right);

#include "STPoint2.inl"

#endif  // __STPOINT2_H__
