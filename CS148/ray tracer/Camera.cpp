//
//  Camera.cpp
//  assignment9ray
//
//  Created by Mayank on 12/3/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#include "Camera.h"

Camera::Camera(STPoint3 weye,STVector3 wup,STPoint3 wlookAt,float wf,float wa)
{
    eye = weye;
    up = wup;
    lookAt = wlookAt;
    f = wf;
    a = wa;
    
}

Ray Camera::generateRayAtPoint(STPoint3 point)
{
    STPoint3 E(eye);
    STVector3 D(point-eye);
    Ray R(E, D);
    return R;
}