//
//  Triangle.h
//  assignment9ray
//
//  Created by Mayank on 12/4/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#ifndef __assignment9ray__Triangle__
#define __assignment9ray__Triangle__

#include <iostream>
#include "st.h"
#include "Shape.h"


class Triangle : public Shape
{
public:
    Triangle(STPoint3 p1,STPoint3 p2,STPoint3 p3);
    float Intersect(Ray,STTransform4 transform);
    STVector3 normalAtIntersection(Ray r,float t,STTransform4 transform);
private:
    STPoint3 vertex[3];
    
};



#endif /* defined(__assignment9ray__Triangle__) */
