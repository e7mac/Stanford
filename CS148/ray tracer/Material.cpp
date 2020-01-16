//
//  Material.cpp
//  assignment9ray
//
//  Created by Mayank on 12/3/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#include "Material.h"

Material::Material(STColor3f amb,STColor3f diffuse,STColor3f specular,STColor3f mirror,float shine)
{
    ambientR = amb;
    diffuseR = diffuse;
    specularR = specular;
    mirrorR = mirror;
    shininess = shine;
}
