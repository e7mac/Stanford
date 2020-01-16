/*
 *  TTTables.h
 *  FontEditor
 *
 *  This file contains structures for all tables necessary to write a valid
 *  TrueType/OpenType font file.
 *
 *  References:
 *      http://www.microsoft.com/typography/
 *      http://developer.apple.com/textfonts/TTRefMan/
 *
 *  Created by Sonny Chan, January 2009.
 *  Copyright 2009 Stanford University. All rights reserved.
 *
 */

#ifndef TTTABLES_H
#define TTTABLES_H

#include "TTDataStream.h"
#include "TTGlyph.h"

// Offset table
struct TToffset {
    TTuint32    sfntVersion;        // 0x00010000 for version 1.0
    TTuint16    numTables;
    TTuint16    searchRange;        // (max power 2 <= numTables) * 16
    TTuint16    entrySelector;      // log2(max power 2 <= numTables)
    TTuint16    rangeShift;         // numTables * 16 - searchRange

    TToffset(TTuint16 ntables);
};

// Table directory
struct TTdirectory {
    TTint8      tag[4];             // 4-byte identifier
    TTuint32    checkSum;           // checksum for this table
    TTuint32    offset;             // offset from beginning of file
    TTuint32    length;             // length of the table (actual)
};

// Character to glyph mapping
struct TTcmap {
    TTuint16    version;            // Table version number (0)
    TTuint16    numTables;          // we need two tables: Mac + Windows

    struct EncodingRecord {
        TTuint16    platformID;     // 1 for Macintosh
        TTuint16    encodingID;     // 0 for Roman
        TTuint32    offset;         // byte offset from beginning of table
    } encodingRecords[2];

    struct Format0 {
        TTuint16    format;         // set to 0
        TTuint16    length;         // length in bytes of this subtable
        TTuint16    language;       // 0 for language independent (Mac/Roman)
        TTuint8     glyphIdArray[256];  // maps char codes to glyph indices
    } subtable1;

    struct Format4 {
        static const int f4s = 2;   // storing 2 segments in format 4 table

        TTuint16    format;         // set to 4
        TTuint16    length;         // length in bytes of this subtable
        TTuint16    language;       // set to 0 for windows

        TTuint16    segCountX2;     // 2 x segCount
        TTuint16    searchRange;    // 2 x (2**floor(log2(segCount)))
        TTuint16    entrySelector;  // log2(searchRange/2)
        TTuint16    rangeShift;     // 2 x segCount - searchRange
        TTuint16    endCount[f4s];  // end charcode for each seg, last=0xFFFF
        TTuint16    reservedPad;    // set to 0
        TTuint16    startCount[f4s];// start character code for each segment
        TTint16     idDelta[f4s];   // delta for all character codes in segment
        TTuint16    idRangeOffset[f4s]; // offsets into glyphIdArray or 0
        TTuint16    glyphIdArray[128];  // glyph index array
    } subtable2;

    TTcmap();
};

// Font header
struct TThead {
    TTuint32    version;            // 0x00010000 for version 1.0
    TTuint32    fontRevision;       // 16.16 fixed, set by manufacturer
    TTuint32    checkSumAdjustment; // 0xB1B0AFBA - sum of whole font
    TTuint32    magicNumber;        // set to 0x5F0F3CF5
    TTuint16    flags;              // 0 should be okay?
    TTuint16    unitsPerEm;         // valid range is 16 to 16384
    TTlongDateTime created;         // seconds since midnight Jan 1, 1904
    TTlongDateTime modified;        // seconds since midnight Jan 1, 1904
    TTint16     xMin;               // for all glyph bounding boxes
    TTint16     yMin;               // for all glyph bounding boxes
    TTint16     xMax;               // for all glyph bounding boxes
    TTint16     yMax;               // for all glyph bounding boxes
    TTuint16    macStyle;           // 0 for no bold/italic/underline/outline/etc
    TTuint16    lowestRecPPEM;      // smallest readable size in pixels
    TTint16     fontDirectionHint;  // 2 for roman font with punctuation
    TTint16     indexToLocFormat;   // 1 for long offsets we're using
    TTint16     glyphDataFormat;    // 0 for current format

    TThead();
};

// Horizontal header
struct TThhea {
    TTuint32    version;            // 0x00010000 for version 1.0
    TTfword     ascender;           // baseline to highest ascender
    TTfword     descender;          // baseline to lowest descender
    TTfword     lineGap;            // 0 should be OK here
    TTufword    advanceWidthMax;    // max advance in htmx
    TTfword     minLefSideBearing;  // min left side bearing in htmx
    TTfword     minRightSideBearing;// min(aw - lsb - (xMax - xMin))
    TTfword     xMaxExtent;         // max(lsb + (xMax - xMin))
    TTint16     caretSlopeRise;     // slope of cursor, 1 for vertical
    TTint16     caretSlopeRun;      // 0 for vertical
    TTint16     caretOffset;        // amount slanted highlight is shifted
    TTint16     reserved[4];        // set to 0
    TTint16     metricDataFormat;   // 0 for current format
    TTuint16    numberOfHMetrics;   // number of hmetric entries in htmx

    TThhea();
};

// Horizontal metrics
struct TThmtx {
    int         numberOfHMetrics;   // not stored here; value is in hhea
    TTuint16   *advanceWidth;       // array of advance widths
    TTint16    *leftSideBearing;    // array of left side bearings
    // note above arrays are written as advance/lsb pairs for this table

    TThmtx(int nhmetrics);
    ~TThmtx()   { delete [] advanceWidth; delete [] leftSideBearing; }
};

// Maximum profile
struct TTmaxp {
    TTuint32    version;            // 0x00010000 for version 1.0
    TTuint16    numGlyphs;          // number of glyphs in the font
    TTuint16    maxPoints;          // maximum points in non-composite glyph
    TTuint16    maxContours;        // maximum contours in non-composite glyph
    TTuint16    maxCompositePoints;
    TTuint16    maxCompositeContours;
    TTuint16    maxZones;           // twilight zone; should be 2 most cases
    TTuint16    maxTwilightPonts;   // max points used in Z0
    TTuint16    maxStorage;         // number of storage area locations
    TTuint16    maxFunctionDefs;    // number of FDEFs
    TTuint16    maxInstructionDefs; // number of IDEFs
    TTuint16    maxStackElements;   // maximum stack depth
    TTuint16    maxSizeOfInstructions;
    TTuint16    maxComponentElements;
    TTuint16    maxComponentDepth;

    TTmaxp();
};

// Naming table
struct TTname {
    TTuint16    format;             // format seelctor (=0)
    TTuint16    count;              // number of name records
    TTuint16    stringOffset;       // offset to start of string storage

    static const int numRecords = 12;// need name IDs 1-6 for both Mac/Windows
    struct NameRecord {
        TTuint16    platformID;
        TTuint16    encodingID;     // platform-specific encoding ID
        TTuint16    languageID;
        TTuint16    nameID;
        TTuint16    length;         // string length (in bytes)
        TTuint16    offset;         // string offset from start of storage area
    } nameRecord[numRecords];       // array of count name records

    static const int numStrings = 4;
    struct StringRecord {
        std::string     str;        // Roman encoded string
        std::wstring    uniStr;     // unicode encoded string
        int             offset;     // position in table of Roman string
        int             uniOffset;  // position in table of unicode string
        void            SetString(const std::string &s);
    } stringTable[numStrings];

    TTname(std::string fontName = "MyFont", std::string version = "Version 1.00");
};

// OS/2 and Windows specific metrics
struct TTos2 {
    TTuint16    version;            // now at 4 for OpenType 1.5 (0x004)
    TTint16     xAvgCharWidth;      // average of all non-zero width glyphs
    TTuint16    usWeightClass;      // 400 for normal (regular)
    TTuint16    usWidthClass;       // 5 for medium (normal)
    TTuint16    fsType;             // 0 is installable embedding
    TTint16     ySubscriptXSize;
    TTint16     ySubscriptYSize;
    TTint16     ySubscriptXOffset;
    TTint16     ySubscriptYOffset;
    TTint16     ySuperscriptXSize;
    TTint16     ySuperscriptYSize;
    TTint16     ySuperscriptXOffset;
    TTint16     ySuperscriptYOffset;
    TTint16     yStrikeoutSize;
    TTint16     yStrikeoutPosition;
    TTint16     sFamilyClass;
    TTuint8     panose[10];
    TTuint32    ulUnicodeRange1;    // set bit 0 to 1 for basic latin (00-7F)
    TTuint32    ulUnicodeRange2;
    TTuint32    ulUnicodeRange3;
    TTuint32    ulUnicodeRange4;
    TTint8      achVendID[4];
    TTuint16    fsSelection;        // set bit 6 for regular weight/style
    TTuint16    usFirstCharIndex;
    TTuint16    usLastCharIndex;
    TTint16     sTypoAscender;      // typographic ascender
    TTint16     sTypoDescender;     // typographic descender
    TTint16     sTypoLineGap;
    TTuint16    usWinAscent;        // windows ascender metric (set to yMax)
    TTuint16    usWinDescent;       // windows descender metric (set to -yMin)
    TTuint32    ulCodePageRange1;
    TTuint32    ulCodePageRange2;
    TTint16     sxHeight;           // x Height
    TTint16     sCapHeight;         // Cap height
    TTuint16    usDefaultChar;      // usually set to 0 (not defined)
    TTuint16    usBreakChar;        // usually set to space
    TTuint16    usMaxContext;

    TTos2();
};

// PostScript information
struct TTpost {
    TTuint32    version;            // 0x00020000 for version 2.0 (TTF data)
    TTuint32    italicAngle;        // should be 16.16 fixed; use 0 for upright
    TTfword     underlinePosition;  // suggested top of underline from baseline
    TTfword     underlineThickness; // suggested underline thickness
    TTuint32    isFixedPitch;       // 0 if proportionally spaced
    TTuint32    minMemType42;       // min mem usage when OpenType downloaded
    TTuint32    maxMemType42;       // max mem usage when OpenType downloaded
    TTuint32    minMemType1;        // min mem usage of OpenType as Type 1
    TTuint32    maxMemType1;        // max mem usage of OpenType as Type 1

    // version 2.0 table information follows
    TTuint16    numberOfGlyphs;     // should be same as in maxp
    TTuint16   *glyphNameIndex;     // array of ordinal indices in string table
    // glyph names should follow here, but we will attempt to use Macintosh
    // standard ordering 0-257, avoiding special glyphs/names

    TTpost(int nglyphs);
    ~TTpost()   { delete [] glyphNameIndex; }
};

// Glyph data, one table for each glyph
struct TTglyf {
    // glyph header
    TTint16     numberOfContours;   // single glyph if >= 0, composite if < 0
    TTint16     xMin;               // min x for coordinate data;
    TTint16     yMin;               // min y for coordinate data;
    TTint16     xMax;               // max x for coordinate data;
    TTint16     yMax;               // max y for coordinate data;

    // simple glyph description
    TTuint16   *endPtsOfContours;   // array of n last points of each contour
    TTuint16    instructionLength;  // 0 for no instructions?
    TTuint8    *flags;              // array of flags, one for each point
    TTint16    *xCoordinates;       // arrays of coordinates for contour points
    TTint16    *yCoordinates;       // first is (0,0), others relative

    int         numPoints;          // total number of points (not stored)

    // the constructor needs to assemble a glyf from our Glyph structure
    TTglyf(const TTGlyph *const glyph);
    TTglyf(const TTglyf &other)     { copy(other); }
    ~TTglyf()   { destroy(); }
    TTglyf &operator = (const TTglyf &other);

private:
    void        copy(const TTglyf &other);
    void        destroy();
};

// Index to location
struct TTloca {
    // we use long version, storing actual offsets into glyf table
    int         n;                  // numGlyphs + 1 (from maxp)
    TTuint32   *offsets;            // array of n offsets

    TTloca(int nglyphs);
    ~TTloca() { delete [] offsets; }
};

// stream insertion functions that output all of these tables
TTDataStream &operator<<(TTDataStream &stream, const TToffset &t);
TTDataStream &operator<<(TTDataStream &stream, const TTdirectory &t);
TTDataStream &operator<<(TTDataStream &stream, const TTcmap &t);
TTDataStream &operator<<(TTDataStream &stream, const TThead &t);
TTDataStream &operator<<(TTDataStream &stream, const TThhea &t);
TTDataStream &operator<<(TTDataStream &stream, const TThmtx &t);
TTDataStream &operator<<(TTDataStream &stream, const TTmaxp &t);
TTDataStream &operator<<(TTDataStream &stream, const TTname &t);
TTDataStream &operator<<(TTDataStream &stream, const TTos2 &t);
TTDataStream &operator<<(TTDataStream &stream, const TTpost &t);
TTDataStream &operator<<(TTDataStream &stream, const TTglyf &t);
TTDataStream &operator<<(TTDataStream &stream, const TTloca &t);

#endif
