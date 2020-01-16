// STVector2.h
#ifndef __STVECTOR2_H__
#define __STVECTOR2_H__

#include "stForward.h"

#include <math.h>

/**
* STVector2 represents a 2-vector.
*/
struct STVector2
{
    //
    // Initalization
    //
    inline STVector2();
    inline STVector2(const STVector2& v);
    inline explicit STVector2(const STPoint2& p);
    inline STVector2(float x, float y);
    inline STVector2(float s);

    //
    // Assignment
    //
    inline STVector2& operator=(const STVector2& v);

    //
    // Overloaded operators
    //
    inline STVector2& operator*=(float right);
    inline STVector2& operator/=(float right);
    inline STVector2& operator+=(const STVector2& right);
    inline STVector2& operator-=(const STVector2& right);

    //
    // Normalization
    //
    inline void Normalize();
    inline void SetLength(float newLength);

    //
    // Math
    //
    inline float Length() const;
    inline float LengthSq() const;

    //
    // Validation
    //
    inline bool Valid() const;

    //
    // Component accessors
    //
    inline float& Component(unsigned int index)
    {
        return ((float *)this)[index];
    }

    inline float Component(unsigned int index) const
    {
        return ((const float *)this)[index];
    }

    //
    // Local members
    //
    float x, y;

    //
    // Constants
    //
    static const STVector2 Zero;
    static const STVector2 eX;
    static const STVector2 eY;

    //
    // Static math functions
    //
    inline static float Cross(const STVector2& left, const STVector2& right);
    inline static float Dot(const STVector2& left, const STVector2& right);
    inline static STVector2 DirectProduct(const STVector2& left, const STVector2& right);
    inline static STVector2 Lerp(const STVector2& left, const STVector2& right, float s);
    inline static STVector2 ComponentMax(const STVector2& left, const STVector2& right);
    inline static STVector2 ComponentMin(const STVector2& left, const STVector2& right);
};

inline STVector2 operator*(const STVector2& left, float right);
inline STVector2 operator*(float left, const STVector2& right);
inline STVector2 operator/(const STVector2& left, float right);
inline STVector2 operator+(const STVector2& left, const STVector2& right);
inline STVector2 operator-(const STVector2& left, const STVector2& right);
inline STVector2 operator-(const STVector2& v);

inline STVector2 operator-(const STPoint2& left, const STPoint2& right);

#include "STVector2.inl"

#endif  // __STVECTOR2_H__

