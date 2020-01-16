//
//  Triangle.cpp
//  assignment9ray
//
//  Created by Mayank on 12/4/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#include "Triangle.h"



Triangle::Triangle(STPoint3 p1,STPoint3 p2,STPoint3 p3)
{
    vertex[0] = p1;
    vertex[1] = p2;
    vertex[2] = p3;
    
}

//float Triangle::Intersect(Ray r)
//{
//    float M[3][3], invM[3][3], X[3], Y[3];
//    M[0][0] = (vertex[1]-vertex[0]).x;
//    M[0][1] = (vertex[1]-vertex[0]).y;
//    M[0][2] = (vertex[1]-vertex[0]).z;
//    
//    M[1][0] = (vertex[2]-vertex[0]).x;
//    M[1][1] = (vertex[2]-vertex[0]).y;
//    M[1][2] = (vertex[2]-vertex[0]).z;
//    
//    M[2][0] = r.direction.x;
//    M[2][1] = r.direction.y;
//    M[2][2] = r.direction.z;
//    
//    float a = M[0][0];
//    float b = M[1][0];
//    float c = M[2][0];
//    float d = M[0][1];
//    float e = M[1][1];
//    float f = M[2][1];
//    float g = M[0][2];
//    float h = M[1][2];
//    float k = M[2][2];
//    
//    Y[0] = (r.point - vertex[0]).x;
//    Y[1] = (r.point - vertex[0]).y;
//    Y[2] = (r.point - vertex[0]).z;
//    
//    invM[0][0] = e*k-f*h;
//    invM[0][1] = c*h-b*k;
//    invM[0][2] = b*f-c*e;
//    
//    invM[1][0] = f*g-d*k;
//    invM[1][1] = a*k-c*g;
//    invM[1][2] = c*d-a*f;
//    
//    invM[2][0] = d*h-e*g;
//    invM[2][1] = g*b-a*h;
//    invM[2][2] = a*e-b*d;
//    
//    float detM = a*(e*k-f*h)-b*(k*d-f*g)+c*(d*h-e*g);
//    
//    if (detM==0)
//    {
//        return -1;
//    }
//    
//    invM[0][0] /= detM;
//    invM[0][1] /= detM;
//    invM[0][2] /= detM;
//    
//    invM[1][0] /= detM;
//    invM[1][1] /= detM;
//    invM[1][2] /= detM;
//    
//    invM[2][0] /= detM;
//    invM[2][1] /= detM;
//    invM[2][2] /= detM;
//    
//    X[0]=0;
//    X[1]=0;
//    X[2]=0;
//    
//    
//    for (int i=0;i<3;i++)
//    {
//        for (int j=0;j<3;j++)
//        {
//            X[i] += (invM[j][i]*Y[i]);
//        }
//    }
//    
//    float beta = X[0];
//    float gamma = X[1];
//    float t = -X[2];
//    
//    for (int i=0;i<3;i++)
//    {
//        for (int j=0;j<3;j++)
//        {
//            std::cout<<X[i]<<" ";
//        }
//        std::cout<<std::endl;
//    }
//
//    
////    std::cout<<beta<<","<<gamma<<std::endl;
//    
//    if (beta<=1 && beta >=0 &&
//        gamma<=1 && gamma >=0)
//        return t;
//    
//    return -1;
//    
//}


float Triangle::Intersect(Ray r, STTransform4 matrix)
{
    STVector3 A[3],invA[3],invAactual[3];
    A[0] = vertex[1] - vertex[0];
    A[1] = vertex[2] - vertex[0];
    A[2] = r.direction;
    
    float detA = STVector3::Dot(A[0], STVector3::Cross(A[1], A[2]));
    
    invA[0] = STVector3::Cross(A[1], A[2]) / detA;
    invA[1] = STVector3::Cross(A[2], A[0]) / detA;
    invA[2] = STVector3::Cross(A[0], A[1]) / detA;
    
    //transpose
    invAactual[0].x = invA[0].x;
    invAactual[0].y = invA[1].x;
    invAactual[0].z = invA[2].x;

    invAactual[1].x = invA[0].y;
    invAactual[1].y = invA[1].y;
    invAactual[1].z = invA[2].y;

    invAactual[2].x = invA[0].z;
    invAactual[2].y = invA[1].z;
    invAactual[2].z = invA[2].z;

    
    //multiply
    STVector3 X;
    
    X.x = STVector3::Dot(invA[0], r.point - vertex[0]);
    X.y = STVector3::Dot(invA[1], r.point - vertex[0]);
    X.z = STVector3::Dot(invA[2], r.point - vertex[0]);
    
    
    float beta,gamma,t;
    beta = X.x;
    gamma = X.y;
    t = -X.z;
    
    if (beta<=1 && beta >=0 &&
        gamma<=1 && gamma >=0
        && beta+gamma <= 1
        && t >= r.tMin && t<=r.tMax
        )
    {
        return t;
    }

    
    return -1;
}


STVector3 Triangle::normalAtIntersection(Ray r,float t,STTransform4 transform)
{
    STVector3 normal = STVector3::Cross(vertex[0]-vertex[1], vertex[2]-vertex[1]);
    normal.Normalize();
    
    if (STVector3::Dot(r.direction, normal)>0)
        normal*=-1;
    return normal;
}