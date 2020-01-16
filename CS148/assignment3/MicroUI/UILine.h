//
//  UILine.h
//  MicroUI
//
//  Created by Mayank on 10/11/12.
//
//

#ifndef __MicroUI__UILine__
#define __MicroUI__UILine__

#include <iostream>
#include "STColor3f.h"
#include "UIDraggableBox.h"

#define BOXSIZE 4

class UILine
{
public:
    
    UILine();
    UILine(STPoint2 start,STPoint2 end);
    UIDraggableBox *startBox,*endBox;
    
    void Display(int col);
    
    void setStartPoint(STPoint2 point);
    void setEndPoint(STPoint2 point);
    STPoint2 getStartPoint();
    STPoint2 getEndPoint();

private:
    void drawArrow();
    STColor3f colors[3];
};


#endif /* defined(__MicroUI__UILine__) */
