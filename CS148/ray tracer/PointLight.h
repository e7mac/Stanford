//
//  PointLight.h
//  assignment9ray
//
//  Created by Mayank on 12/3/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#ifndef __assignment9ray__PointLight__
#define __assignment9ray__PointLight__

#include <iostream>
#include "st.h"
#include "Light.h"

class PointLight : public Light
{
public:
    PointLight(STColor3f,STPoint3);
    STColor3f color;
    STPoint3 point;
private:
    
};


#endif /* defined(__assignment9ray__PointLight__) */
