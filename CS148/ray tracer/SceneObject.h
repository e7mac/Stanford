//
//  SceneObject.h
//  assignment9ray
//
//  Created by Mayank on 12/3/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#ifndef __assignment9ray__SceneObject__
#define __assignment9ray__SceneObject__

#include <iostream>
#include "st.h"
#include "Sphere.h"
#include "Triangle.h"
#include "Material.h"

class SceneObject
{
public:
    SceneObject(Shape *sh,STTransform4 matrix,Material mat)
    {
        shape = sh;
        transform = matrix;
        material = mat;
    }
    Shape *shape;
    STTransform4 transform;
    Material material;
    float Intersect(Ray r)
    {
        return shape->Intersect(r,transform);
    }
    
    STVector3 normalAtIntersection(Ray ray,float t)
    {
        return shape->normalAtIntersection(ray, t,transform);
    }
    
private:
    
};


#endif /* defined(__assignment9ray__SceneObject__) */
