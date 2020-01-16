/*
 *  MyFont.cpp
 *  FontEditor
 *
 *  This class (more like a data structure as everything is public) stores
 *  a number of metrics describing properties of a font, and keeps track
 *  of a mapping from ASCII characters to user-defined TTGlyph objects.
 *  Glyph objects stored in this class' mapping are "owned" by the class,
 *  and are deleted once this class is destroyed.
 *
 */

#include "MyFont.h"

#include <fstream>

using namespace std;

MyFont::MyFont()
{
    mFontName = "MyFont";
    mVersionString = "Version 1.00 (alpha)";

    // set up inital values for font metrics, assuming 512 units/Em
    mUnitsPerEm = 512;      // should be a power of two?
    mBaseline   = 0;
    mCapHeight  = 256;
    mXHeight    = 144;
    mAscender   = 288;
    mDescender  = -144;

    CreateSpecialGlyphs();
}

MyFont::~MyFont()
{
    // delete all the glyph objects
    ClearGlyphs();

    // delete special glyphs
    delete mNotDefGlyph;
    delete mNullGlyph;
    delete mCarriageReturnGlyph;
    delete mSpaceGlyph;
}

//
// The font takes ownership of the glyph when it adds it to the map
//
void MyFont::SetGlyphForCharacter(char ch, TTGlyph *glyph)
{
    if (mGlyphMap.find(ch) != mGlyphMap.end())
        delete mGlyphMap[ch];
    mGlyphMap[ch] = glyph;
}

//
// Returns null if there is currently no glyph for the specified character
//
TTGlyph* MyFont::GetGlyphForCharacter(char ch)
{
    if (mGlyphMap.find(ch) == mGlyphMap.end())
        return 0;
    return mGlyphMap[ch];
}

bool MyFont::HasGlyphForCharacter(char ch)
{
    return mGlyphMap.find(ch) != mGlyphMap.end();
}

//
// Carriage return and space advance widths should be kept in sync
//
void MyFont::SetSpaceAdvanceWidth(int advance)
{
    mCarriageReturnGlyph->SetAdvanceWidth(advance);
    mSpaceGlyph->SetAdvanceWidth(advance);
}

void MyFont::CreateSpecialGlyphs()
{
    // .notdef glyph - appears as a solid box
    TTContour *contour = new TTContour();
    contour->AddPoint(new TTPoint(40, 40, true));
    contour->AddPoint(new TTPoint(40, 200, true));
    contour->AddPoint(new TTPoint(120, 200, true));
    contour->AddPoint(new TTPoint(120, 40, true));

    mNotDefGlyph        = new TTGlyph(0, 160);
    mNotDefGlyph->AddContour(contour);

    // null, space, and carriage return - these have no contours
    mNullGlyph          = new TTGlyph(0, 0);
    mCarriageReturnGlyph= new TTGlyph();
    mSpaceGlyph         = new TTGlyph();
    SetSpaceAdvanceWidth(128);
}

void MyFont::ClearGlyphs()
{
    for (map<char, TTGlyph*>::iterator it = mGlyphMap.begin(); 
        it != mGlyphMap.end(); ++it)
    {
        if (it->second)
            delete it->second;
    }
    mGlyphMap.clear();
}

void MyFont::SaveData(string filename)
{
    ofstream out(filename.c_str());
    if (!out) return;

    // first save name and version on separate lines
    out << mFontName << endl;
    out << mVersionString << endl;

    // then write out font metrics
    out << mUnitsPerEm << ' ' << mBaseline << ' ' 
        << mCapHeight << ' ' << mXHeight << ' '
        << mAscender << ' ' << mDescender << endl;

    // next come the special glyphs
    out << *mNotDefGlyph
        << *mNullGlyph
        << *mCarriageReturnGlyph
        << *mSpaceGlyph;

    // finally, write all the general character glyphs
    out << mGlyphMap.size() << endl;
    for (map<char, TTGlyph*>::iterator it = mGlyphMap.begin(); 
        it != mGlyphMap.end(); ++it)
    {
        out << int(it->first) << endl;
        out << *it->second;
    }

    out.close();
}

void MyFont::LoadData(string filename)
{
    ifstream in(filename.c_str());
    if (!in) return;

    // read font name and version string
    getline(in, mFontName);
    getline(in, mVersionString);

    // read font metrics
    in >> mUnitsPerEm >> mBaseline >> mCapHeight >> mXHeight >> mAscender >> mDescender;

    // read special glyphs
    in >> *mNotDefGlyph >> *mNullGlyph >> *mCarriageReturnGlyph >> *mSpaceGlyph;

    // read general glyphs
    ClearGlyphs();
    int n, ch;
    in >> n;
    for (int i = 0; i < n; ++i) {
        in >> ch;
        TTGlyph *g = new TTGlyph;
        in >> *g;
        mGlyphMap[ch] = g;
    }

    in.close();
}
