//
//  DirectionalLight.h
//  assignment9ray
//
//  Created by Mayank on 12/3/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#ifndef __assignment9ray__DirectionalLight__
#define __assignment9ray__DirectionalLight__

#include <iostream>
#include "st.h"
#include "Light.h"

class DirectionalLight : public Light
{
public:
    DirectionalLight(STColor3f wColor, STVector3 wDirection);
    STColor3f color;
    STVector3 direction;

private:
    
};


#endif /* defined(__assignment9ray__DirectionalLight__) */
