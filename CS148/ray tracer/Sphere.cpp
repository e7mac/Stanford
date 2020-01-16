//
//  Sphere.cpp
//  assignment9ray
//
//  Created by Mayank on 12/4/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#include "Sphere.h"

Sphere::Sphere(STPoint3 c, float r)
{
    center = c;
    radius = r;
}

float Sphere::Intersect(Ray r, STTransform4 transform)
{   
    for (float t=r.tMin ; t<r.tMax ; t+=0.005)
    {
        STVector3 x = (r.point + t*r.direction - transform*center);
        if (x.Length()<=radius)
        {
            return t;
        }
    }
    return -1;
}

STVector3 Sphere::normalAtIntersection(Ray r,float t,STTransform4 transform)
{
    STVector3 normal = r.point + t*r.direction - transform*center;
    normal.Normalize();
    return normal;
}