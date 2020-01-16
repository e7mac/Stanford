/*
 *  TTGlyph.cpp
 *  FontEditor
 *
 *  Support functions for Glyph, Contour, and Point data structures.
 *  See the accompanying header file for data structure definitions.
 *
 *  Created by Sonny Chan, January 2009.
 *  Copyright 2009 Stanford University. All rights reserved.
 *
 */


#include "TTGlyph.h"
#include <fstream>
#include <algorithm>
using namespace std;

// --------------------------------------------------------------------------
// TTPoint

ostream &operator<<(ostream &stream, const TTPoint &p)
{
    stream << p.mCoordinates.x << ' '
        << p.mCoordinates.y << ' '
        << p.mOnCurve;
    return stream;
}

istream &operator>>(istream &stream, TTPoint &p)
{
    stream >> p.mCoordinates.x >> p.mCoordinates.y >> p.mOnCurve;
    return stream;
}

// --------------------------------------------------------------------------
// TTContour

void TTContour::InsertPoint(TTPoint *point, int index)
{
    if (0 <= index && index <= int(mPoints.size())) {
        mPoints.push_back(0);
        copy_backward(mPoints.begin()+index, mPoints.end()-1, mPoints.end());
        mPoints[index] = point;
    }
}

void TTContour::RemovePoint(int index)
{
    if (0 <= index && index < int(mPoints.size())) {
        delete mPoints[index];
        copy(mPoints.begin()+index+1, mPoints.end(), mPoints.begin()+index);
        mPoints.pop_back();
    }
}

void TTContour::ClearPoints()
{
    for (vector<TTPoint*>::iterator it = mPoints.begin(); it != mPoints.end(); ++it)
        delete *it;
    mPoints.clear();
}

ostream &operator<<(ostream &stream, const TTContour &c)
{
    stream << c.NumPoints();
    for (int i = 0; i < c.NumPoints(); ++i)
        stream << ' ' << *c.GetPoint(i);
    stream << endl;
    return stream;
}

istream &operator>>(istream &stream, TTContour &c)
{
    int n;
    stream >> n;
    c.ClearPoints();
    for (int i = 0; i < n; ++i) {
        TTPoint *p = new TTPoint();
        stream >> *p;
        c.AddPoint(p);
    }
    return stream;
}

// --------------------------------------------------------------------------
// TTGlyph

TTGlyph::TTGlyph(int lsbearing, int advance)
{
    mLeftSideBearing    = lsbearing;
    mAdvanceWidth       = advance;
}

int TTGlyph::NumPoints() const
{
    int total = 0;
    for (vector<TTContour*>::const_iterator it = mContours.begin(); it != mContours.end(); ++it)
        total += (*it)->NumPoints();
    return total;
}

void TTGlyph::InsertContour(TTContour* contour, int index)
{
    if (0 <= index && index <= int(mContours.size())) {
        mContours.push_back(0);
        copy_backward(mContours.begin()+index, mContours.end()-1, mContours.end());
        mContours[index] = contour;
    }
}

void TTGlyph::RemoveContour(int index)
{
    if (0 <= index && index < int(mContours.size())) {
        delete mContours[index];
        copy(mContours.begin()+index+1, mContours.end(), mContours.begin()+index);
        mContours.pop_back();
    }
}

void TTGlyph::ClearContours()
{
    for (vector<TTContour*>::const_iterator it = mContours.begin(); it != mContours.end(); ++it)
        delete *it;
    mContours.clear();
}

ostream &operator<<(ostream &stream, const TTGlyph &g)
{
    stream << g.GetLeftSideBearing() << ' ' << g.GetAdvanceWidth() << ' '
        << g.NumContours() << endl;
    for (int i = 0; i < g.NumContours(); ++i)
        stream << *g.GetContour(i);
    return stream;
}

istream &operator>>(istream &stream, TTGlyph &g)
{
    int lsb, aw, n;
    stream >> lsb >> aw >> n;
    g.ClearContours();
    g.SetLeftSideBearing(lsb);
    g.SetAdvanceWidth(aw);
    for (int i = 0; i < n; ++i) {
        TTContour *c = new TTContour();
        stream >> *c;
        g.AddContour(c);
    }
    return stream;
}


void drawLine(TTPoint *startPoint, TTPoint *endPoint)
{
    glColor3f(0, 0, 0);
    glBegin(GL_LINES);
    glVertex2f(startPoint->mCoordinates.x, startPoint->mCoordinates.y);
    glVertex2f(endPoint->mCoordinates.x, endPoint->mCoordinates.y);
    glEnd();
}

void drawBezier(TTPoint *startPoint, TTPoint *endPoint, TTPoint *controlPoint)
{
    STPoint2 p0(startPoint->mCoordinates.x,startPoint->mCoordinates.y);
    STPoint2 p1(controlPoint->mCoordinates.x,controlPoint->mCoordinates.y);
    STPoint2 p2(endPoint->mCoordinates.x,endPoint->mCoordinates.y);
    STPoint2 q0,q1,bt;
    glBegin(GL_LINE_STRIP);
    glVertex2f(startPoint->mCoordinates.x, startPoint->mCoordinates.y);
    for (float t=0;t<=1;t+=0.01)
    {
        q0.x = (1-t)*p0.x+t*p1.x;
        q0.y = (1-t)*p0.y+t*p1.y;
        q1.x = (1-t)*p1.x+t*p2.x;
        q1.y = (1-t)*p1.y+t*p2.y;
        bt.x = (1-t)*q0.x+t*q1.x;
        bt.y = (1-t)*q0.y+t*q1.y;
        glVertex2f(bt.x, bt.y);
    }
    glVertex2f(endPoint->mCoordinates.x, endPoint->mCoordinates.y);
    glEnd();
}

void TTContour::DrawContour()
{
    TTPoint *startPoint = new TTPoint;
    TTPoint *endPoint = new TTPoint;
    TTPoint *controlPoint = new TTPoint;
    
    for (int j=0;j<NumPoints();j++)
    {
        glColor3f(0, 0, 0);
        startPoint->mCoordinates.x = GetPoint(j)->mCoordinates.x;
        startPoint->mCoordinates.y = GetPoint(j)->mCoordinates.y;
        startPoint->mOnCurve = GetPoint(j)->mOnCurve;
        if (startPoint->mOnCurve)
        {
            if (j+1<NumPoints())
            {
                if (GetPoint(j+1)->mOnCurve)
                {
                    endPoint->mCoordinates.x = GetPoint(j+1)->mCoordinates.x;
                    endPoint->mCoordinates.y = GetPoint(j+1)->mCoordinates.y;
                    endPoint->mOnCurve = GetPoint(j+1)->mOnCurve;
                    drawLine(startPoint, endPoint);
                }
                else if (!GetPoint(j+1)->mOnCurve)
                {
                    if (j+2<NumPoints())
                    {
                        if (GetPoint(j+2)->mOnCurve)
                        {
                            controlPoint->mCoordinates.x = GetPoint(j+1)->mCoordinates.x;
                            controlPoint->mCoordinates.y = GetPoint(j+1)->mCoordinates.y;
                            controlPoint->mOnCurve = GetPoint(j+1)->mOnCurve;
                            
                            endPoint->mCoordinates.x = GetPoint(j+2)->mCoordinates.x;
                            endPoint->mCoordinates.y = GetPoint(j+2)->mCoordinates.y;
                            endPoint->mOnCurve = GetPoint(j+2)->mOnCurve;
                            
                            drawBezier(startPoint, endPoint, controlPoint);

                        }
                        else if (!GetPoint(j+2)->mOnCurve)
                        {
                            controlPoint->mCoordinates.x = GetPoint(j+1)->mCoordinates.x;
                            controlPoint->mCoordinates.y = GetPoint(j+1)->mCoordinates.y;
                            controlPoint->mOnCurve = GetPoint(j+1)->mOnCurve;
                            
                            endPoint->mCoordinates.x = 0.5*(GetPoint(j+2)->mCoordinates.x+GetPoint(j+1)->mCoordinates.x);
                            endPoint->mCoordinates.y = 0.5*(GetPoint(j+2)->mCoordinates.y + GetPoint(j+1)->mCoordinates.y);
                            endPoint->mOnCurve = GetPoint(j+2)->mOnCurve;
                            
                            drawBezier(startPoint, endPoint, controlPoint);
                        }
                    }
                }
            }
        }
        else if (!startPoint->mOnCurve && j>0)
        {
            glColor3f(0, 0, 0);
            if (!GetPoint(j-1)->mOnCurve)
            {
                startPoint->mCoordinates.x = 0.5*(GetPoint(j-1)->mCoordinates.x+GetPoint(j)->mCoordinates.x);
                startPoint->mCoordinates.y = 0.5*(GetPoint(j-1)->mCoordinates.y + GetPoint(j)->mCoordinates.y);
                startPoint->mOnCurve = GetPoint(j)->mOnCurve;

                if (j+1<NumPoints())
                {
                    if (GetPoint(j+1)->mOnCurve)
                    {
                        controlPoint->mCoordinates.x = GetPoint(j)->mCoordinates.x;
                        controlPoint->mCoordinates.y = GetPoint(j)->mCoordinates.y;
                        controlPoint->mOnCurve = GetPoint(j)->mOnCurve;
                        
                        endPoint->mCoordinates.x = GetPoint(j+1)->mCoordinates.x;
                        endPoint->mCoordinates.y = GetPoint(j+1)->mCoordinates.y;
                        endPoint->mOnCurve = GetPoint(j+1)->mOnCurve;
                        drawBezier(startPoint, endPoint, controlPoint);
                    }
                    else if (!GetPoint(j+1)->mOnCurve)
                    {
                        controlPoint->mCoordinates.x = GetPoint(j)->mCoordinates.x;
                        controlPoint->mCoordinates.y = GetPoint(j)->mCoordinates.y;
                        controlPoint->mOnCurve = GetPoint(j)->mOnCurve;
                        
                        endPoint->mCoordinates.x = 0.5*(GetPoint(j+1)->mCoordinates.x+GetPoint(j)->mCoordinates.x);
                        endPoint->mCoordinates.y = 0.5*(GetPoint(j+1)->mCoordinates.y+GetPoint(j)->mCoordinates.y);
                        endPoint->mOnCurve = GetPoint(j+1)->mOnCurve;
                        drawBezier(startPoint, endPoint, controlPoint);
                    }
                }
            }
        }
    }
    delete startPoint,controlPoint,endPoint;
}



//void TTContour::DrawContour()
//{
//    bool prevControlPoint = false;
//    for (int j=0;j<NumPoints();j++)
//    {
//        TTPoint *startPoint = 0, *endPoint = 0, *controlPoint = 0,*virtualEndPoint = 0;
//        if (GetPoint(j)->mOnCurve)
//        {
//            startPoint = GetPoint(j);
//            virtualEndPoint = 0;
//            for (int k=j+1;k<NumPoints();k++)
//            {
//                if (GetPoint(k)->mOnCurve)
//                {
//                    endPoint = GetPoint(k);
//                    k=NumPoints();
//                    prevControlPoint = false;
//                    delete virtualEndPoint;
//                }
//                else if (prevControlPoint)
//                {
//                    virtualEndPoint = new TTPoint(*GetPoint(k));
//                    virtualEndPoint->mCoordinates.x = 0.5*(virtualEndPoint->mCoordinates.x + controlPoint->mCoordinates.x);
//                    virtualEndPoint->mCoordinates.y = 0.5*(virtualEndPoint->mCoordinates.y + controlPoint->mCoordinates.y);
//                }
//                else
//                {
//                    controlPoint = GetPoint(k);
//                    prevControlPoint = true;
//                    delete virtualEndPoint;
//                }
//            }
//            if (!endPoint)
//                endPoint = GetPoint(0);
//
//            if (controlPoint && endPoint!=startPoint && !virtualEndPoint)
//            {
//                drawBezier(startPoint, endPoint, controlPoint);
//            }
//            else if (controlPoint && virtualEndPoint)
//            {
//                drawBezier(startPoint, virtualEndPoint, controlPoint);
//            }
//
//            else
//            {
//                glColor3f(0, 0, 0);
//                glBegin(GL_LINES);
//                glVertex2f(startPoint->mCoordinates.x, startPoint->mCoordinates.y);
//                glVertex2f(endPoint->mCoordinates.x, endPoint->mCoordinates.y);
//                glEnd();
//
//                
//            }
//        }
//    }
//
//    
//}



void TTGlyph::DrawContours()
{
    glPushMatrix();
    for (int i=0;i<mContours.size();i++)
    {
        mContours[i]->DrawContour();
    }
    glPopMatrix();
}

void TTGlyph::DrawPoints()
{
    for (int i =0;i<NumContours();i++)
        for (int j=0;j<mContours[i]->NumPoints();j++)
        {
            mContours[i]->GetPoint(j)->drawPoint();
        }
}




void TTContour::DrawPoints()
{
    for (int i=0;i<mPoints.size();i++)
    {
        mPoints[i]->drawPoint();
    }

    glColor3f(0, 0, 0);
    
    //just for debugging purposes
//    glBegin(GL_LINES);
//    for (int i=0;i<mPoints.size();i++)
//    {
//        cout<<mPoints[i]->mCoordinates.x<<","<<mPoints[i]->mCoordinates.y<<endl;
//        glVertex2f(mPoints[i]->mCoordinates.x, mPoints[i]->mCoordinates.y);
//    }
//    glEnd();
}


void TTGlyph::DeletePoint(int x,int y)
{
    for (int i=0;i<mContours.size();i++)
    {
        for (int j=0;j<mContours[i]->NumPoints();j++)
        {
            TTPoint* currentPoint = mContours[i]->GetPoint(j);
            //            cout<<currentPoint->mCoordinates.x<<","<<currentPoint->mCoordinates.y<<endl;
            if (fabsf(currentPoint->mCoordinates.x-x) < 5 && fabsf(currentPoint->mCoordinates.y-y))
            {
                mContours[i]->RemovePoint(j);
            }
        }
        
    }
}

void TTGlyph::DeleteCurve(int x,int y)
{
    for (int i=0;i<mContours.size();i++)
    {
        for (int j=0;j<mContours[i]->NumPoints();j++)
        {
            TTPoint* currentPoint = mContours[i]->GetPoint(j);
            //            cout<<currentPoint->mCoordinates.x<<","<<currentPoint->mCoordinates.y<<endl;
            if (fabsf(currentPoint->mCoordinates.x-x) < 5 && fabsf(currentPoint->mCoordinates.y-y))
            {
                RemoveContour(i);
            }
        }
        
    }
}


TTPoint* TTGlyph::HitTest(int x,int y)
{
    for (int i=0;i<mContours.size();i++)
    {
        for (int j=0;j<mContours[i]->NumPoints();j++)
        {
            TTPoint* currentPoint = mContours[i]->GetPoint(j);
            //            cout<<currentPoint->mCoordinates.x<<","<<currentPoint->mCoordinates.y<<endl;
            if (fabsf(currentPoint->mCoordinates.x-x) < 5 && fabsf(currentPoint->mCoordinates.y-y) < 5)
            {
                return currentPoint;
            }
        }
        
    }
    return NULL;
}


TTContour* TTGlyph::HitTestContour(int x,int y)
{
    for (int i=0;i<mContours.size();i++)
    {
        for (int j=0;j<mContours[i]->NumPoints();j++)
        {
            TTPoint* currentPoint = mContours[i]->GetPoint(j);
//            cout<<currentPoint->mCoordinates.x<<","<<currentPoint->mCoordinates.y<<endl;
            if (fabsf(currentPoint->mCoordinates.x-x) < 5 && fabsf(currentPoint->mCoordinates.y-y)<5)
            {
                return mContours[i];
            }
        }

    }
    return NULL;
}

int TTGlyph::HitTestIndex(int x,int y)
{
    for (int i=0;i<mContours.size();i++)
    {
        for (int j=0;j<mContours[i]->NumPoints();j++)
        {
            TTPoint* currentPoint = mContours[i]->GetPoint(j);
            //            cout<<currentPoint->mCoordinates.x<<","<<currentPoint->mCoordinates.y<<endl;
            if (fabsf(currentPoint->mCoordinates.x-x) < 5 && fabsf(currentPoint->mCoordinates.y-y))
            {
                return j;
            }
        }
        
    }
    return NULL;
}


void TTGlyph::SaveToFile()
{
    ofstream filestr ("file919.txt");
    filestr<<*this;
    filestr.close();
}
void TTGlyph::LoadFromFile()
{
    fstream filestr ("file919.txt");
    filestr>>*this;
    filestr.close();
}

void TTContour::MovePoints(int dx,int dy)
{
    for (int i=0;i<NumPoints();i++)
    {
        TTPoint *point = GetPoint(i);
        point->mCoordinates.x += dx;
        point->mCoordinates.y += dy;

    }
}

TTPoint* TTContour::PrevTanPoint(int index)
{
    TTPoint *offControlPoint = 0;
    TTPoint *controlPoint=0;
    TTPoint *currentPoint = GetPoint(index);
    bool wasPreviousOnCurve = false;
    for (int i=index-1;i>=0;i--)
    {

        TTPoint *point = GetPoint(i);
        if (point->mOnCurve && wasPreviousOnCurve)
        {
            return NULL;
        }
        else if (point->mOnCurve && !controlPoint)
        {
            wasPreviousOnCurve = true;
            controlPoint = point;
            cout<<i<<endl;
        }
        else if (!point->mOnCurve && !offControlPoint)
        {
            offControlPoint = point;
            wasPreviousOnCurve = false;
        }
    }
    if (offControlPoint && controlPoint)
    {
        float slope = (currentPoint->mCoordinates.y - controlPoint->mCoordinates.y)/(currentPoint->mCoordinates.x - controlPoint->mCoordinates.x);
        float b = currentPoint->mCoordinates.y - slope*currentPoint->mCoordinates.x;
        offControlPoint->mCoordinates.y = slope*offControlPoint->mCoordinates.x + b;
    }
    return NULL;
}

TTPoint* TTContour::NextTanPoint(int index)
{
    TTPoint *offControlPoint = 0;
    TTPoint *controlPoint=0;
    TTPoint *currentPoint = GetPoint(index);
    bool wasPreviousOnCurve = false;
    for (int i=index+1;i<NumPoints();i++)
    {
        
        TTPoint *point = GetPoint(i);
        if (point->mOnCurve && wasPreviousOnCurve)
        {
            return NULL;
        }
        else if (point->mOnCurve && !controlPoint)
        {
            wasPreviousOnCurve = true;
            controlPoint = point;
            cout<<i<<endl;
        }
        else if (!point->mOnCurve && !offControlPoint)
        {
            offControlPoint = point;
            wasPreviousOnCurve = false;
        }
    }
    if (offControlPoint && controlPoint)
    {
        float slope = (currentPoint->mCoordinates.y - controlPoint->mCoordinates.y)/(currentPoint->mCoordinates.x - controlPoint->mCoordinates.x);
        float b = currentPoint->mCoordinates.y - slope*currentPoint->mCoordinates.x;
        offControlPoint->mCoordinates.y = slope*offControlPoint->mCoordinates.x + b;
    }
    return NULL;
}

