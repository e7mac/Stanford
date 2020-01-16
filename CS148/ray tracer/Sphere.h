//
//  Sphere.h
//  assignment9ray
//
//  Created by Mayank on 12/4/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#ifndef __assignment9ray__Sphere__
#define __assignment9ray__Sphere__

#include <iostream>
#include "st.h"
#include "Shape.h"


class Sphere : public Shape
{
public:
    Sphere(STPoint3 c, float r);
    float Intersect(Ray r,STTransform4 transform);
    STVector3 normalAtIntersection(Ray r,float t,STTransform4 transform);
private:
    STPoint3 center;
    float radius;
    
};



#endif /* defined(__assignment9ray__Sphere__) */
