//
//  main.cpp
//  assignment9ray
//
//  Created by Mayank on 12/3/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#include <iostream>
#include "st.h"

#include <stdlib.h>

#include "Scene.h"



int main(int argc, const char * argv[])
{
    if (argc < 2)
    {
        std::cout<<"add arguemnt";
        return 1;
    }
    
    // insert code here...
    std::cout << "Hello, World!\n";
    for (int i=1;i<argc;i++)
    {
        Scene scene(argv[i]);
        scene.RayTrace();
        scene.Render();
    }
    
    return 0;
}

