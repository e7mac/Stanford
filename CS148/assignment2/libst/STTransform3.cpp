// STTransform3.cpp
#include "STTransform3.h"

// Fill in your implementation of STTransform here.

STTransform3::STTransform3()
{
    for (int i=0;i<3;i++)
    {
        for (int j=0;j<3;j++)
        {
            matrix[i][j]=0;
        }
        
    }
}

void STTransform3::loadIdentity()
{
    for (int i=0;i<3;i++)
    {
        for (int j=0;j<3;j++)
        {
            if (i!=j)
                matrix[i][j]=0;
            else
                matrix[i][j]=1;
        }
        
    }
}

void STTransform3::loadMatrix(STTransform3& right)
{
    for (int i=0;i<3;i++)
    {
        for (int j=0;j<3;j++)
        {
            matrix[i][j]=right.matrix[i][j];
        }
        
    }
}

float STTransform3::matrixElement(int i,int j)
{
    return matrix[i][j];
}

void STTransform3::setMatrixElement(float value, int i,int j)
{
    matrix[i][j] = value;
}

STTransform3 STTransform3::multiplyMatrix(const STTransform3& right)
{
    STTransform3 answer;
    for (int i=0;i<3;i++)
    {
        for (int j=0;j<3;j++)
        {
            answer.matrix[i][j]=0;
            for (int k=0;k<3;k++)
            {
                answer.matrix[i][j]+=matrix[i][k]*right.matrix[k][j];
            }
        }
    }
    return answer;
}

void STTransform3::addToCurrentTransform(STTransform3& right)
{
    STTransform3 final = multiplyMatrix(right);
    this->loadMatrix(final);
}


STPoint3 STTransform3::applyTransform(STPoint3 point)
{
    STPoint3 fixedPoint(0,0,0);
    fixedPoint.x = matrix[0][0]*point.x + matrix[1][0]*point.y+matrix[2][0]*1;
    fixedPoint.y = matrix[0][1]*point.x + matrix[1][1]*point.y+matrix[2][1]*1;
    return fixedPoint;
}
void STTransform3::scale(float xscale, float yscale)
{
    STTransform3 multiplyMatrix;
    multiplyMatrix.matrix[0][0] = xscale;
    multiplyMatrix.matrix[1][1] = yscale;
    addToCurrentTransform(multiplyMatrix);
}
void STTransform3::translate(float xtrans, float ytrans)
{
    STTransform3 transformMatrix;
    transformMatrix.loadIdentity();
    transformMatrix.matrix[2][0] = xtrans;
    transformMatrix.matrix[2][1] = ytrans;
    addToCurrentTransform(transformMatrix);
}

void STTransform3::rotate(float angle)
{
    STTransform3 transformMatrix;
    transformMatrix.loadIdentity();
    transformMatrix.matrix[0][0] = cosf(angle);
    transformMatrix.matrix[1][0] = -sinf(angle);
    
    transformMatrix.matrix[0][1] = sinf(angle);
    transformMatrix.matrix[1][1] = cosf(angle);
    addToCurrentTransform(transformMatrix);
}


#include <iostream.h>

void STTransform3::print()
{
    std::cout<<"---"<<endl;    
    for (int j=0;j<3;j++)
    {
        for (int i=0;i<3;i++)
        {
            std::cout<<matrix[i][j]<<" ";
        }
        std::cout<<endl;
    }
    std::cout<<"---"<<endl;
}