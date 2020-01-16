/*
 *  TTGlyph.h
 *  FontEditor
 *
 *  This file actually contains definitions for point, contour, and glyph
 *  structures.  We model a font roughly as a containment hierarchy:
 *  Font ->* Glyph ->* Outline ->* Point, where ->* denotes a to-many
 *  relationship.  Each container carries an array of pointers to its child
 *  entities, takes memory ownership of all entities given it, and takes
 *  care of freeing the memory for its children on destruction.
 *
 *  Created by Sonny Chan, January 2009.
 *  Copyright 2009 Stanford University. All rights reserved.
 *
 */

#ifndef TTGLYPH_H
#define TTGLYPH_H

#include "st.h"
#include <vector>
#include <iostream>

// --------------------------------------------------------------------------
// 
// Point data structure for TrueType glyph contours.
//
struct TTPoint
{
    STPoint2    mCoordinates;       // coordinates in font units (em-space)
    bool        mOnCurve;           // true if curve point, false off-curve
    
    // construct a TTPoint from an STPoint2, default on the curve
    TTPoint(const STPoint2 &coords = STPoint2(0,0), bool onCurve = true)
        : mCoordinates(coords), mOnCurve(onCurve) { }

    // construct a TTPoint from x and y coordinates, default on the curve
    TTPoint(float x, float y, bool onCurve = true)
        : mCoordinates(x, y), mOnCurve(onCurve) { }
    
    void drawPoint()
    {
        glBegin(GL_TRIANGLES);
        if (mOnCurve)
            glColor3f(1, 0, 0);
        else
            glColor3f(0, 1, 0);
        glVertex2f(mCoordinates.x - 5, mCoordinates.y - 5);
        glVertex2f(mCoordinates.x - 5, mCoordinates.y + 5);
        glVertex2f(mCoordinates.x + 5, mCoordinates.y + 5);

        glVertex2f(mCoordinates.x + 5, mCoordinates.y + 5);        
        glVertex2f(mCoordinates.x + 5, mCoordinates.y - 5);
        glVertex2f(mCoordinates.x - 5, mCoordinates.y - 5);
        

        glEnd();
    }
};

// 
// iostream insertion and extraction operators for points
//
std::ostream &operator<<(std::ostream &stream, const TTPoint &p);
std::istream &operator>>(std::istream &stream, TTPoint &p);

// --------------------------------------------------------------------------
// 
// Contour data structure for TrueType glyph contours.
// Essentially consists of an array of TTContour pointers.
//
class TTContour
{
public:
                TTContour()                 { }
    virtual     ~TTContour()                { ClearPoints(); }

    // adds a point to the end of the contour point sequence
    void        AddPoint(TTPoint *point)    { mPoints.push_back(point); }
    void        AddPoint(const STPoint2 &point, bool onCurve = true)
                    { mPoints.push_back(new TTPoint(point, onCurve)); }

    // returns a pointer to the contour point at specified index
    TTPoint*    GetPoint(int index) const   { return mPoints[index]; }

    // returns the number of points in this contour
    int         NumPoints() const           { return mPoints.size(); }

    // inserts a point at the specified index, moving everthing back one
    void        InsertPoint(TTPoint *point, int index);

    // removes the point at the given index, moving everything up one
    void        RemovePoint(int index);

    // returns true if the the point at the given index is an on-curve point
    bool        IsPointOnCurve(int index) const { return mPoints[index]->mOnCurve; }

    // frees allocated memory for the points
    void        ClearPoints();
    
    // draws Contours
    void        DrawPoints();
    void        DrawContour();
    void    MovePoints(int x,int y);
    
    TTPoint* PrevTanPoint(int index);
    TTPoint* NextTanPoint(int index);


protected:
    // protected copy constructor and assignment to prevent shallow copies
                TTContour(const TTContour &other) { }
    TTContour&  operator=(const TTContour &other) { return *this; }

    std::vector<TTPoint*> mPoints;
};

// 
// iostream insertion and extraction operators for contours
//
std::ostream &operator<<(std::ostream &stream, const TTContour &c);
std::istream &operator>>(std::istream &stream, TTContour &c);

// --------------------------------------------------------------------------
// 
// Glyph data structure holds TrueType contours to describe the glyph,
// plus left side bearing and advance width values.
//
class TTGlyph
{
public:
    TTGlyph(int lsbearing = 0, int advance = 256);
    virtual     ~TTGlyph()                  { ClearContours(); }

    // setter and getter for this glyph's left side bearing
    void        SetLeftSideBearing(int lsb) { mLeftSideBearing = lsb; }
    int         GetLeftSideBearing() const  { return mLeftSideBearing; }

    // setter and getter for this glyph's advance width
    void        SetAdvanceWidth(int aw)     { mAdvanceWidth = aw; }
    int         GetAdvanceWidth() const     { return mAdvanceWidth; }

    // adds a new contour to the end of the glyph's contour list
    void        AddContour(TTContour* contour) { mContours.push_back(contour); }

    // returns a pointer to the contour at a given index
    TTContour*  GetContour(int index) const { return mContours[index]; }
    
    // returns the number contours, or number of points in all contours
    int         NumContours() const         { return mContours.size(); }
    int         NumPoints() const;
    
    // inserts a contour at the specified index, moving everthing back one
    void        InsertContour(TTContour* contour, int index);

    // removes the contour at the given index, moving everything up one
    void        RemoveContour(int index);
    
    // frees allocated memory for the contours
    void        ClearContours();

    // draws Contours
    void        DrawContours();
    void        DrawPoints();
    TTPoint* HitTest(int x,int y);
    TTContour* HitTestContour(int x,int y);
    int HitTestIndex(int x,int y);

    void DeletePoint(int x,int y);
    void DeleteCurve(int x,int y);
    void SaveToFile();
    void LoadFromFile();
    
protected:
    // protected copy constructor and assignment to prevent shallow copies
                TTGlyph(const TTGlyph &other) { }
    TTGlyph&    operator=(const TTGlyph &other) { return *this; }

    int                     mLeftSideBearing;
    int                     mAdvanceWidth;
    std::vector<TTContour*> mContours;
};

// 
// iostream insertion and extraction operators for glyphs
//
std::ostream &operator<<(std::ostream &stream, const TTGlyph &g);
std::istream &operator>>(std::istream &stream, TTGlyph &g);

// --------------------------------------------------------------------------

#endif
