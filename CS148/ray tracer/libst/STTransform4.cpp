#include "STTransform4.h"
#include "STVector3.h"
#include "STPoint3.h"

STTransform4::STTransform4()
{
	for (int i = 0; i < 4; i++) for (int j = 0; j < 4; j++)
	{
		_Entries[i][j] = 0.0f;
	}
}

STTransform4::STTransform4(const STTransform4& t)
{
	for (int i = 0; i < 4; i++) for (int j = 0; j < 4; j++)
	{
		_Entries[i][j] = t._Entries[i][j];
	}
}


STTransform4& STTransform4::operator = (const STTransform4& t)
{
	for (int i = 0; i < 4; i++) for (int j = 0; j < 4; j++)
	{
		_Entries[i][j] = t._Entries[i][j];
	}
	return *this;
}

STTransform4 STTransform4::Identity()
{
	STTransform4 id;
	for (int i = 0; i < 4; i++) for (int j = 0; j < 4; j++)
	{
		if (i == j)
			id[i][j] = 1.0f;
		else
			id[i][j] = 0.0f;
	}
	return id;
}

STTransform4 STTransform4::Translation(float tx, float ty, float tz)
{
	STTransform4 trans = Identity();
	trans[0][3] = tx;
	trans[1][3] = ty;
	trans[2][3] = tz;
	return trans;
}

STTransform4 STTransform4::Scaling(float sx, float sy, float sz)
{
	STTransform4 scale = Identity();
	scale[0][0] = sx;
	scale[1][1] = sy;
	scale[2][2] = sz;
	return scale;
}

STTransform4 STTransform4::Rotation(float rx, float ry, float rz)
{
	STTransform4 rotx, roty, rotz;
	rotx[3][3] = 1.0f;
	roty[3][3] = 1.0f;
	rotz[3][3] = 1.0f;
	float cosrx, sinrx, cosry, sinry, cosrz, sinrz;
	cosrx = cosf(rx); sinrx = sinf(rx);
	cosry = cosf(ry); sinry = sinf(ry);
	cosrz = cosf(rz); sinrz = sinf(rz);

	rotx[0][0] = 1.0f;
	rotx[1][1] = cosrx; rotx[1][2] = -sinrx;
	rotx[2][1] = sinrx; rotx[2][2] = cosrx;

	roty[1][1] = 1.0f;
	roty[0][0] = cosry; roty[2][0] = -sinry;
	roty[0][2] = sinry; roty[2][2] = cosry;

	rotz[2][2] = 1.0f;
	rotz[0][0] = cosrz; rotz[0][1] = -sinrz;
	rotz[1][0] = sinrz; rotz[1][1] = cosrz;

	return rotx * roty * rotz;
}


STTransform4& STTransform4::operator += (const STTransform4& t)
{
	for (int i = 0; i < 4; i++) for (int j = 0; j < 4; j++)
	{
		_Entries[i][j] += t._Entries[i][j];
	}
	return *this;
}

STTransform4& STTransform4::operator -= (const STTransform4& t)
{
	for (int i = 0; i < 4; i++) for (int j = 0; j < 4; j++)
	{
		_Entries[i][j] -= t._Entries[i][j];
	}
	return *this;
}

STTransform4& STTransform4::operator *= (const STTransform4& t)
{
	(*this) = (*this) * t;
	return *this;
}

STTransform4& STTransform4::operator *= (float s)
{
	for (int i = 0; i < 4; i++) for (int j = 0; j < 4; j++)
	{
		_Entries[i][j] *= s;
	}
	return *this;
}

STTransform4& STTransform4::operator /= (float s)
{
	for (int i = 0; i < 4; i++) for (int j = 0; j < 4; j++)
	{
		_Entries[i][j] /= s;
	}
	return *this;
}

STTransform4 STTransform4::Transpose() const
{
	STTransform4 result;
	for (int i = 0; i < 4; i++) for (int j = 0; j < 4; j++)
	{
		result._Entries[i][j] = _Entries[j][i];
	}
	return result;
}

STTransform4 STTransform4::Inverse() const
{
	//
	// Inversion by Cramer's rule.  Code taken from an Intel publication
	// (adapted by Matt Fisher)
	//
	double Result[4][4];
	double tmp[12]; /* temp array for pairs */
	double src[16]; /* array of transpose source matrix */
	double det; /* determinant */
	/* transpose matrix */
	for (unsigned int i = 0; i < 4; i++)
	{
		src[i + 0 ] = (*this)[i][0];
		src[i + 4 ] = (*this)[i][1];
		src[i + 8 ] = (*this)[i][2];
		src[i + 12] = (*this)[i][3];
	}
	/* calculate pairs for first 8 elements (cofactors) */
	tmp[0] = src[10] * src[15];
	tmp[1] = src[11] * src[14];
	tmp[2] = src[9] * src[15];
	tmp[3] = src[11] * src[13];
	tmp[4] = src[9] * src[14];
	tmp[5] = src[10] * src[13];
	tmp[6] = src[8] * src[15];
	tmp[7] = src[11] * src[12];
	tmp[8] = src[8] * src[14];
	tmp[9] = src[10] * src[12];
	tmp[10] = src[8] * src[13];
	tmp[11] = src[9] * src[12];
	/* calculate first 8 elements (cofactors) */
	Result[0][0] = tmp[0]*src[5] + tmp[3]*src[6] + tmp[4]*src[7];
	Result[0][0] -= tmp[1]*src[5] + tmp[2]*src[6] + tmp[5]*src[7];
	Result[0][1] = tmp[1]*src[4] + tmp[6]*src[6] + tmp[9]*src[7];
	Result[0][1] -= tmp[0]*src[4] + tmp[7]*src[6] + tmp[8]*src[7];
	Result[0][2] = tmp[2]*src[4] + tmp[7]*src[5] + tmp[10]*src[7];
	Result[0][2] -= tmp[3]*src[4] + tmp[6]*src[5] + tmp[11]*src[7];
	Result[0][3] = tmp[5]*src[4] + tmp[8]*src[5] + tmp[11]*src[6];
	Result[0][3] -= tmp[4]*src[4] + tmp[9]*src[5] + tmp[10]*src[6];
	Result[1][0] = tmp[1]*src[1] + tmp[2]*src[2] + tmp[5]*src[3];
	Result[1][0] -= tmp[0]*src[1] + tmp[3]*src[2] + tmp[4]*src[3];
	Result[1][1] = tmp[0]*src[0] + tmp[7]*src[2] + tmp[8]*src[3];
	Result[1][1] -= tmp[1]*src[0] + tmp[6]*src[2] + tmp[9]*src[3];
	Result[1][2] = tmp[3]*src[0] + tmp[6]*src[1] + tmp[11]*src[3];
	Result[1][2] -= tmp[2]*src[0] + tmp[7]*src[1] + tmp[10]*src[3];
	Result[1][3] = tmp[4]*src[0] + tmp[9]*src[1] + tmp[10]*src[2];
	Result[1][3] -= tmp[5]*src[0] + tmp[8]*src[1] + tmp[11]*src[2];
	/* calculate pairs for second 8 elements (cofactors) */
	tmp[0] = src[2]*src[7];
	tmp[1] = src[3]*src[6];
	tmp[2] = src[1]*src[7];
	tmp[3] = src[3]*src[5];
	tmp[4] = src[1]*src[6];
	tmp[5] = src[2]*src[5];

	tmp[6] = src[0]*src[7];
	tmp[7] = src[3]*src[4];
	tmp[8] = src[0]*src[6];
	tmp[9] = src[2]*src[4];
	tmp[10] = src[0]*src[5];
	tmp[11] = src[1]*src[4];
	/* calculate second 8 elements (cofactors) */
	Result[2][0] = tmp[0]*src[13] + tmp[3]*src[14] + tmp[4]*src[15];
	Result[2][0] -= tmp[1]*src[13] + tmp[2]*src[14] + tmp[5]*src[15];
	Result[2][1] = tmp[1]*src[12] + tmp[6]*src[14] + tmp[9]*src[15];
	Result[2][1] -= tmp[0]*src[12] + tmp[7]*src[14] + tmp[8]*src[15];
	Result[2][2] = tmp[2]*src[12] + tmp[7]*src[13] + tmp[10]*src[15];
	Result[2][2] -= tmp[3]*src[12] + tmp[6]*src[13] + tmp[11]*src[15];
	Result[2][3] = tmp[5]*src[12] + tmp[8]*src[13] + tmp[11]*src[14];
	Result[2][3] -= tmp[4]*src[12] + tmp[9]*src[13] + tmp[10]*src[14];
	Result[3][0] = tmp[2]*src[10] + tmp[5]*src[11] + tmp[1]*src[9];
	Result[3][0] -= tmp[4]*src[11] + tmp[0]*src[9] + tmp[3]*src[10];
	Result[3][1] = tmp[8]*src[11] + tmp[0]*src[8] + tmp[7]*src[10];
	Result[3][1] -= tmp[6]*src[10] + tmp[9]*src[11] + tmp[1]*src[8];
	Result[3][2] = tmp[6]*src[9] + tmp[11]*src[11] + tmp[3]*src[8];
	Result[3][2] -= tmp[10]*src[11] + tmp[2]*src[8] + tmp[7]*src[9];
	Result[3][3] = tmp[10]*src[10] + tmp[4]*src[8] + tmp[9]*src[9];
	Result[3][3] -= tmp[8]*src[9] + tmp[11]*src[10] + tmp[5]*src[8];
	/* calculate determinant */
	det=src[0]*Result[0][0]+src[1]*Result[0][1]+src[2]*Result[0][2]+src[3]*Result[0][3];
	/* calculate matrix inverse */
	det = 1.0f / det;

	STTransform4 FloatResult;
	for (unsigned int i = 0; i < 4; i++)
	{
		for (unsigned int j = 0; j < 4; j++)
		{
			FloatResult[i][j] = float(Result[i][j] * det);
		}
	}
	return FloatResult;
}


STTransform4 operator * (const STTransform4& left, const STTransform4& right)
{
	STTransform4 result;
	for(unsigned int i = 0; i < 4; i++)
    {
        for(unsigned int i2 = 0; i2 < 4; i2++)
        {
            float total = 0.0f;
            for(unsigned int i3 = 0; i3 < 4; i3++)
            {
                total += left[i][i3] * right[i3][i2];
            }
            result[i][i2] = total;
        }
    }
	return result;
}

STTransform4 operator * (const STTransform4& left, float right)
{
	STTransform4 result = left;
	result *= right;
	return result;
}

STTransform4 operator * (float left, const STTransform4& right)
{
	STTransform4 result = right;
	result *= left;
	return result;
}

STTransform4 operator / (const STTransform4& left, float right)
{
	STTransform4 result = left;
	result /= right;
	return result;
}

STTransform4 operator + (const STTransform4& left, const STTransform4& right)
{
	STTransform4 result = left;
	result += right;
	return result;
}

STTransform4 operator - (const STTransform4& left, const STTransform4& right)
{
	STTransform4 result = left;
	result -= right;
	return result;
}

STVector3 operator * (const STTransform4& left, const STVector3& right)
{
	STVector3 result;
	result.x = left[0][0]*right.x + left[0][1]*right.y + left[0][2]*right.z;
	result.y = left[1][0]*right.x + left[1][1]*right.y + left[1][2]*right.z;
	result.z = left[2][0]*right.x + left[2][1]*right.y + left[2][2]*right.z;
	return result;
}

STPoint3 operator * (const STTransform4& left, const STPoint3& right)
{
	STPoint3 result;
	result.x = left[0][0]*right.x + left[0][1]*right.y + left[0][2]*right.z + left[0][3]*1.0f;
	result.y = left[1][0]*right.x + left[1][1]*right.y + left[1][2]*right.z + left[1][3]*1.0f;
	result.z = left[2][0]*right.x + left[2][1]*right.y + left[2][2]*right.z + left[2][3]*1.0f;
	return result;
}
