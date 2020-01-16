#ifndef STTRANSFORM4_H
#define STTRANSFORM4_H

#include "stForward.h"

class STTransform4
{
public:

	// Constructors
	STTransform4();
	STTransform4(const STTransform4& t);

	// Assignment
	STTransform4& operator = (const STTransform4& t);

	// Element access
	inline const float* operator [] (int row) const
	{
		return _Entries[row];
	}
	inline float* operator [] (int row)
	{
		return _Entries[row];
	}

	// Factory methods for constructing useful transformations
	static STTransform4 Identity();
	static STTransform4 Translation(float tx, float ty, float tz);
	static STTransform4 Scaling(float sx, float sy, float sz);
	static STTransform4 Rotation(float rx, float ry, float rz);

	// In-place arithmetic operators
	STTransform4& operator += (const STTransform4& t);
	STTransform4& operator -= (const STTransform4& t);
	STTransform4& operator *= (const STTransform4& t);
	STTransform4& operator *= (float s);
	STTransform4& operator /= (float s);

	// linear algebra: determinant, transpose, inverse (copy from matt's code)
	// Linear Algebra
    STTransform4 Transpose() const;
    STTransform4 Inverse() const;

private:
	float _Entries[4][4];
};

// Non in-place arithmetic operators
STTransform4 operator * (const STTransform4& left, const STTransform4& right);
STTransform4 operator * (const STTransform4& left, float right);
STTransform4 operator * (float left, const STTransform4& right);
STTransform4 operator / (const STTransform4& left, float right);
STTransform4 operator + (const STTransform4& left, const STTransform4& right);
STTransform4 operator - (const STTransform4& left, const STTransform4& right);
STVector3 operator * (const STTransform4& left, const STVector3& right);
STPoint3 operator * (const STTransform4& left, const STPoint3& right);


#endif

