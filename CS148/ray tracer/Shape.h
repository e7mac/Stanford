//
//  Shape.h
//  assignment9ray
//
//  Created by Mayank on 12/3/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#ifndef __assignment9ray__Shape__
#define __assignment9ray__Shape__

#include <iostream>
#include "st.h"
#include "Ray.h"


class Shape
{
public:
    virtual float Intersect(Ray r,STTransform4 transform)=0;
    virtual STVector3 normalAtIntersection(Ray r,float t,STTransform4 transform) = 0;
private:
    
    
};


#endif /* defined(__assignment9ray__Shape__) */
