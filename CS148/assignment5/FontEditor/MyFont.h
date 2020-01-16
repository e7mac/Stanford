/*
 *  MyFont.h
 *  FontEditor
 *
 *  This class (more like a data structure as everything is public) stores
 *  a number of metrics describing properties of a font, and keeps track
 *  of a mapping from ASCII characters to user-defined TTGlyph objects.
 *  Glyph objects stored in this class' mapping are "owned" by the class,
 *  and are deleted once this class is destroyed.
 *
 */
 
#ifndef MYFONT_H
#define MYFONT_H

#include "TTGlyph.h"
#include <map>

class MyFont
{
public:
    MyFont();
    ~MyFont();

    //
    // Functions to get/set/check character to glyph mappings in this font
    //
    void        SetGlyphForCharacter(char ch, TTGlyph *glyph);
    TTGlyph*    GetGlyphForCharacter(char ch);
    bool        HasGlyphForCharacter(char ch);
    int         NumGlyphs() const { return mGlyphMap.size() + 4; }

    //
    // For creating and adjusting the 4 special glyphs
    //
    void        CreateSpecialGlyphs();
    void        SetSpaceAdvanceWidth(int advance);

    //
    // Erases (and deallocates) all the glyphs in the font
    //
    void        ClearGlyphs();

    //
    // Save or load this entire font data structure to the specified file
    //
    void        SaveData(std::string filename = "saved.dat");
    void        LoadData(std::string filename = "saved.dat");

    //
    // Set these to name and version your font if you'd like
    //
    std::string mFontName;
    std::string mVersionString;

    //
    // Adjust these properties to match your writing if needed
    //
    int         mUnitsPerEm;
    int         mBaseline;
    int         mCapHeight;
    int         mXHeight;
    int         mAscender;
    int         mDescender;

    //
    // Maps ASCII characters to their TrueType glyphs
    //
    std::map<char, TTGlyph*> mGlyphMap;

    //
    // Special glyphs required for the font
    //
    TTGlyph    *mNotDefGlyph;
    TTGlyph    *mNullGlyph;
    TTGlyph    *mCarriageReturnGlyph;
    TTGlyph    *mSpaceGlyph;
};

#endif
