// stForward.h
#ifndef __STFORWARD_H__
#define __STFORWARD_H__

/*
*  This file forward declares the classes and structs defined in libst.
*  By including this file instead of manually forward-declaring each
*  needed in a header, we can reduce the number of lines of boilerplate
*  code, and also make certain changes easier to propagate (e.g. changing
*  a class to a struct or vice versa).
*/

struct STColor3f;
struct STColor4f;
struct STColor4ub;
class STFont;
class STImage;
class STJoystick;
struct STPoint2;
struct STPoint3;
class STShape;
class STTexture;
class STTimer;
struct STVector2;
struct STVector3;
class STTransform4;

#endif  // __STFORWARD_H__
