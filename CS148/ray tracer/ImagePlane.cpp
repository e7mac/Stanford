//
//  ImagePlane.cpp
//  assignment9ray
//
//  Created by Mayank on 12/3/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#include "ImagePlane.h"

STPoint3 ImagePlane::pointatUV(float u,float v)
{
    STPoint3 point;
    point.x = (1-u)*((1-v)*ll.x + v*ul.x)+ u*((1-v)*lr.x + v * ur.x);
    point.y = (1-u)*((1-v)*ll.y + v*ul.y)+ u*((1-v)*lr.y + v * ur.y);
    point.z = (1-u)*((1-v)*ll.z + v*ul.z)+ u*((1-v)*lr.z + v * ur.z);
    return point;
}
