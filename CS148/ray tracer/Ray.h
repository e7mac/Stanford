//
//  Ray.h
//  assignment9ray
//
//  Created by Mayank on 12/3/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#ifndef __assignment9ray__Ray__
#define __assignment9ray__Ray__

#include <iostream>
#include "st.h"

#define TMIN 0.1
#define TMAX 100

class Ray
{
public:
    Ray(STPoint3 wpoint, STVector3 wdir, float wtMin = TMIN, float wtMax = TMAX)
    {
        point = wpoint;
        direction=wdir;
//        direction.Normalize();
        tMin = wtMin;
        tMax = wtMax;
    };
    STPoint3 point;
    STVector3 direction;
    float tMin,tMax;
private:
    
};


#endif /* defined(__assignment9ray__Ray__) */
