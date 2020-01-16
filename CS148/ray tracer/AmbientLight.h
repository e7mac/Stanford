//
//  AmbientLight.h
//  assignment9ray
//
//  Created by Mayank on 12/3/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#ifndef __assignment9ray__AmbientLight__
#define __assignment9ray__AmbientLight__

#include <iostream>
#include "st.h"
#include "Light.h"

class AmbientLight : public Light
{
public:
    AmbientLight(STColor3f wColor);
    STColor3f color;
private:

    
};

#endif /* defined(__assignment9ray__AmbientLight__) */
