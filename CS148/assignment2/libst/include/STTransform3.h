// STColor3f.h
#ifndef __STTRANSFORM3_H__
#define __STTRANSFORM3_H__

// Forward-declare libst types.
#include "stForward.h"
#include "STPoint3.h"
/**
*  Class representing a 3x3 matrix that can be used to
*  apply transforms to 2D points and vectors
*/
class STTransform3
{
public:
    //Constructor
    STTransform3();

    //Init / Copy methods
    void loadIdentity();
    void loadMatrix(STTransform3 &right);

    //Element Getter / Setter
    float matrixElement(int i,int j);
    void setMatrixElement(float value, int i,int j);

    
    void addToCurrentTransform(STTransform3& right);
    STPoint3 applyTransform(STPoint3 point);
    STTransform3 multiplyMatrix(const STTransform3&);

    void scale(float xscale, float yscale);
    void translate(float xtrans, float ytrans);
    void rotate(float angle);
    void print();
private:
    float matrix[3][3];
    STVector3 currentTransform[3];
};

#endif