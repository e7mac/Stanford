//
//  Material.h
//  assignment9ray
//
//  Created by Mayank on 12/3/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#ifndef __assignment9ray__Material__
#define __assignment9ray__Material__

#include <iostream>
#include "st.h"


class Material
{
public:
    Material() {};
    Material(STColor3f,STColor3f,STColor3f,STColor3f,float);

    STColor3f ambientR;
    STColor3f diffuseR;
    STColor3f specularR;
    STColor3f mirrorR;
    float shininess;
    
private:
};


#endif /* defined(__assignment9ray__Material__) */
