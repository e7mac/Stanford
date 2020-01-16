//
//  Intersection.h
//  assignment9ray
//
//  Created by Mayank on 12/3/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#ifndef __assignment9ray__Intersection__
#define __assignment9ray__Intersection__

#include <iostream>
#include "st.h"
#include "Ray.h"
//#include "SceneObject.h"

class SceneObject;

class Intersection
{
public:
    Intersection() {};
    Intersection(Ray *wr,float t,SceneObject *wobject, STVector3 wnormal, STPoint3 wpoint=STPoint3(0,0,0))
    {
        ray = wr;
        minT = t;
        object = wobject;
        normal = wnormal;
        point = wpoint;
    }
    
    Ray *ray;
    float minT;
    SceneObject *object;
    STVector3 normal;
    STPoint3 point;
private:
    
};


#endif /* defined(__assignment9ray__Intersection__) */
