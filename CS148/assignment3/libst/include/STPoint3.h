// STPoint3.h
#ifndef __STPOINT3_H__
#define __STPOINT3_H__

#include "stForward.h"

#include <math.h>

/**
*  Simple struct to represent 3D points
*/
struct STPoint3
{
    inline STPoint3();
    inline STPoint3(float x, float y, float z);
    inline explicit STPoint3(const STVector3& v);

    inline STPoint3& operator+=(const STVector3& right);
    inline STPoint3& operator-=(const STVector3& right);

    /**
    * Returns distance between two points
    * Called as STPoint3::Dist(left, right)
    */
    static inline float Dist(const STPoint3& left, const STPoint3& right);

    /**
    * Returns distance squared between two points
    * Called as STPoint3::DistSq(left, right)
    */
    static inline float DistSq(const STPoint3& left, const STPoint3& right);

    float x, y, z;

    static const STPoint3 Origin;
};

inline STPoint3 operator+(const STPoint3& left, const STVector3& right);
inline STPoint3 operator+(const STVector3& left, const STPoint3& right);
inline STPoint3 operator-(const STPoint3& left, const STVector3& right);

#include "STPoint3.inl"

#endif  // __STPOINT3_H__
