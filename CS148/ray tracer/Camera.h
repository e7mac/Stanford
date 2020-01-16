//
//  Camera.h
//  assignment9ray
//
//  Created by Mayank on 12/3/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#ifndef __assignment9ray__Camera__
#define __assignment9ray__Camera__

#include <iostream>
#include "st.h"
#include "Ray.h"

class Camera
{public:
    Camera(STPoint3 eye,STVector3 up,STPoint3 lookAt,float f,float a);
    Ray generateRayAtPoint(STPoint3 point);
    STPoint3 eye, lookAt;
    STVector3 up;
    float f,a;
    
private:
};


#endif /* defined(__assignment9ray__Camera__) */
