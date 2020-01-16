//
//  UILine.cpp
//  MicroUI
//
//  Created by Mayank on 10/11/12.
//
//

#include "UILine.h"
#include "stgl.h"

UILine::UILine()
{
    colors[0] = STColor3f(1,0,0);
    colors[1] = STColor3f(0,1,0);
    colors[2] = STColor3f(0,0,1);
}

UILine::UILine(STPoint2 start,STPoint2 end)
{
    colors[0] = STColor3f(1,0,0);
    colors[1] = STColor3f(0,1,0);
    colors[2] = STColor3f(0,0,1);

    startBox = new UIDraggableBox(STColor4f(1, 0, 0, 0));
    endBox = new UIDraggableBox(STColor4f(1, 0, 1, 0));
    setStartPoint(start);
    setEndPoint(end);
}


void UILine::Display(int col)
{
    int num = col%3;
    glPushMatrix();

    glBegin(GL_LINES);
    glColor3f(1, 1, 1);
    glVertex2d((startBox->GetRectangle().pMin.x+startBox->GetRectangle().pMax.x)/2, (startBox->GetRectangle().pMin.y+startBox->GetRectangle().pMax.y)/2);
    glColor3f(colors[num].r, colors[num].g, colors[num].b);
    if (col == -1)
        glColor3f(1, 1, 1);    
    glVertex2d((endBox->GetRectangle().pMin.x+endBox->GetRectangle().pMax.x)/2, (endBox->GetRectangle().pMin.y+endBox->GetRectangle().pMax.y)/2);
    glEnd();

//    drawArrow();

    glPopMatrix();
}


void UILine::drawArrow()
{
    STPoint2 start = getStartPoint();
    STPoint2 end = getEndPoint();
    float m = (end.y - start.y) / (end.x - start.x);
    float theta = atanf(m)*180/M_PI;
//    std::cout<<theta<<"\n";
    
    glTranslatef(end.x, end.y, 0);
    glRotatef(-90-m, 0, 0, 1);
    glBegin(GL_TRIANGLES);
    glVertex2d(0, 0);
    glVertex2d(-14, -10);
    glVertex2d(14, -10);
    glEnd();
    
}

void UILine::setStartPoint(STPoint2 point)
{
    startBox->SetRectangle(UIRectangle(STPoint2(point.x-BOXSIZE, point.y-BOXSIZE), STPoint2(point.x+BOXSIZE, point.y+BOXSIZE)));

}

void UILine::setEndPoint(STPoint2 point)
{
    endBox->SetRectangle(UIRectangle(STPoint2(point.x-BOXSIZE, point.y-BOXSIZE), STPoint2(point.x+BOXSIZE, point.y+BOXSIZE)));
}


STPoint2 UILine::getStartPoint()
{
    UIRectangle rect = startBox->GetRectangle();
    return STPoint2((rect.pMax.x+rect.pMin.x)/2,(rect.pMax.y+rect.pMin.y)/2);
}

STPoint2 UILine::getEndPoint()
{
    UIRectangle rect = endBox->GetRectangle();
    return STPoint2((rect.pMax.x+rect.pMin.x)/2,(rect.pMax.y+rect.pMin.y)/2);
}



//
//void UILine::HandleMouseDown(const STPoint2& position)
//{
//    startBox->HandleMouseDown(position);
//    endBox->HandleMouseDown(position);
//}
//void UILine::HandleMouseUp(const STPoint2& position)
//{
//    startBox->HandleMouseUp(position);
//    endBox->HandleMouseUp(position);
//}
//void UILine::HandleMouseEnter()
//{
//    startBox->HandleMouseEnter();
//    endBox->HandleMouseEnter();
//}
//void UILine::HandleMouseLeave()
//{
//    startBox->HandleMouseLeave();
//    endBox->HandleMouseLeave();
//}
//void UILine::HandleMouseMove(const STPoint2& position)
//{
//    startBox->HandleMouseMove(position);
//    endBox->HandleMouseMove(position);
//}
//
//void UILine::setDragCallbacks(CaptureCallback capture, CaptureCallback release)
//{
//    startBox->mCapture = capture;
//    startBox->mRelease = release;
//    endBox->mCapture = capture;
//    endBox->mRelease = release;
//
//}
