//
//  ImagePlane.h
//  assignment9ray
//
//  Created by Mayank on 12/3/12.
//  Copyright (c) 2012 CCRMA. All rights reserved.
//

#ifndef __assignment9ray__ImagePlane__
#define __assignment9ray__ImagePlane__

#include <iostream>
#include "st.h"



class ImagePlane
{
public:
    ImagePlane(){};
    ImagePlane(int height,int width,STPoint3 wul,STPoint3 wur,STPoint3 wll,STPoint3 wlr)
    {
        image = new STImage(height,width);
        for (int i=0;i<height;i++)
        {
            for (int j=0;j<width;j++)
            {
                image->SetPixel(i, j, STColor4ub(0,0,0,255));
                
            }
        }
        ul = wul;
        ur = wur;
        ll = wll;
        lr = wlr;
    }
    STPoint3 pointatUV(float u,float v);
    STImage *image;    
private:

    STPoint3 ul,ur,ll,lr;
};



#endif /* defined(__assignment9ray__ImagePlane__) */
