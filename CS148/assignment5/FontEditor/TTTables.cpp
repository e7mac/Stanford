/*
 *  TTTables.cpp
 *  FontEditor
 *
 *  Support functions (mostly constructors and stream insertion operators)
 *  for OpenType/TrueType table data structures.  See accompanying header
 *  file for data structure definitions.
 *
 *  Created by Sonny Chan, January 2009.
 *  Copyright 2009 Stanford University. All rights reserved.
 *
 */
 
#include "TTTables.h"
#include <iterator>
#include <iostream>
#include <algorithm>
#include <cstdlib>
#include <ctime>

using namespace std;

// --------------------------------------------------------------------------
// 'offset' table 

TToffset::TToffset(TTuint16 ntables)
: numTables(ntables), sfntVersion(0x00010000)
{
    int mp2 = 1, l2mp2 = 0;
    while (mp2 * 2 <= numTables) mp2 *= 2, ++l2mp2;

    searchRange     = mp2 * 16;
    entrySelector   = l2mp2;
    rangeShift      = numTables * 16 - searchRange;
}

TTDataStream &operator<<(TTDataStream &stream, const TToffset &t)
{
    stream << t.sfntVersion << t.numTables
        << t.searchRange << t.entrySelector << t.rangeShift;
    return stream;
}

// --------------------------------------------------------------------------
// 'directory' table

TTDataStream &operator<<(TTDataStream &stream, const TTdirectory &t)
{
    stream  << t.tag[0] << t.tag[1] << t.tag[2] << t.tag[3]
        << t.checkSum << t.offset << t.length;
    return stream;
}

// --------------------------------------------------------------------------
// 'cmap' table

TTcmap::TTcmap()
{
    memset(this, 0, sizeof(*this));
    numTables           = 2;

    // Macintosh Roman encoding
    encodingRecords[0].platformID   = 1;
    encodingRecords[0].encodingID   = 0;
    encodingRecords[0].offset       = 4 + 8*numTables;

    subtable1.format        = 0;
    subtable1.length        = 262;
    subtable1.language      = 0;

    // Windows unicode encoding
    encodingRecords[1].platformID   = 3;
    encodingRecords[1].encodingID   = 1;
    encodingRecords[1].offset       = 4 + 8*numTables + subtable1.length;

    subtable2.format        = 4;
    subtable2.length        = 288;
    subtable2.language      = 0;
    subtable2.segCountX2    = Format4::f4s * 2;
    subtable2.searchRange   = 4;
    subtable2.entrySelector = 1;
    subtable2.rangeShift    = 2*Format4::f4s - subtable2.searchRange;
    subtable2.endCount[0]   = 0x007F;
    subtable2.endCount[1]   = 0xFFFF;
    subtable2.reservedPad   = 0;
    subtable2.startCount[0] = 0;
    subtable2.startCount[1] = 0XFFFF;
    subtable2.idDelta[0]    = 0;
    subtable2.idDelta[1]    = 1;
    subtable2.idRangeOffset[0] = 4;
    subtable2.idRangeOffset[1] = 0;
}

TTDataStream &operator<<(TTDataStream &stream, const TTcmap::EncodingRecord &t)
{
    stream << t.platformID << t.encodingID << t.offset;
    return stream;
}

TTDataStream &operator<<(TTDataStream &stream, const TTcmap::Format0 &t)
{
    stream << t.format << t.length << t.language;
    for (int i = 0; i < 256; ++i) stream << t.glyphIdArray[i];
    return stream;
}

TTDataStream &operator<<(TTDataStream &stream, const TTcmap::Format4 &t)
{
    stream << t.format << t.length << t.language
        << t.segCountX2 << t.searchRange << t.entrySelector << t.rangeShift;
    for (int i = 0; i < t.f4s; ++i) stream << t.endCount[i];
    stream << t.reservedPad;
    for (int i = 0; i < t.f4s; ++i) stream << t.startCount[i];
    for (int i = 0; i < t.f4s; ++i) stream << t.idDelta[i];
    for (int i = 0; i < t.f4s; ++i) stream << t.idRangeOffset[i];
    for (int i = 0; i < 128; ++i)   stream << t.glyphIdArray[i];
    return stream;
}

TTDataStream &operator<<(TTDataStream &stream, const TTcmap &t)
{
    stream << t.version << t.numTables;
    for (int i = 0; i < t.numTables; ++i)
        stream << t.encodingRecords[i];
    stream << t.subtable1;
    stream << t.subtable2;

    return stream;
}

// --------------------------------------------------------------------------
// 'head' table

TThead::TThead()
{
    memset(this, 0, sizeof(*this));
    TTlongDateTime now = 24107LL * 24 * 60 * 60 + time(0);

    version         = 0x00010000;
    fontRevision    = 0x00010000;
    magicNumber     = 0x5F0F3CF5;
    unitsPerEm      = 512;
    created         = now;
    modified        = now;
    lowestRecPPEM   = 8;
    fontDirectionHint = 2;
    indexToLocFormat= 1;
    glyphDataFormat = 0;
}

TTDataStream &operator<<(TTDataStream &stream, const TThead &t)
{
    stream << t.version << t.fontRevision << t.checkSumAdjustment << t.magicNumber
        << t.flags << t.unitsPerEm << t.created << t.modified
        << t.xMin << t.yMin << t.xMax << t.yMax
        << t.macStyle << t.lowestRecPPEM << t.fontDirectionHint 
        << t.indexToLocFormat << t.glyphDataFormat;
    return stream;
}

// --------------------------------------------------------------------------
// 'hhea' table

TThhea::TThhea()
{
    memset(this, 0, sizeof(*this));

    version         = 0x00010000;
    caretSlopeRise  = 1;
}

TTDataStream &operator<<(TTDataStream &stream, const TThhea &t)
{
    stream << t.version
        << t.ascender << t.descender << t.lineGap << t.advanceWidthMax
        << t.minLefSideBearing << t.minRightSideBearing << t.xMaxExtent
        << t.caretSlopeRise << t.caretSlopeRun << t.caretOffset
        << t.reserved[0] << t.reserved[1] << t.reserved[2] << t.reserved[3]
        << t.metricDataFormat << t.numberOfHMetrics;
    return stream;
}

// --------------------------------------------------------------------------
// 'htmx' table

TThmtx::TThmtx(int nhmetrics)
: numberOfHMetrics(nhmetrics)
{
    advanceWidth = new TTuint16 [numberOfHMetrics];
    leftSideBearing = new TTint16 [numberOfHMetrics];
}

TTDataStream &operator<<(TTDataStream &stream, const TThmtx &t)
{
    for (int i = 0; i < t.numberOfHMetrics; ++i)
        stream << t.advanceWidth[i] << t.leftSideBearing[i];
    return stream;
}

// --------------------------------------------------------------------------
// 'maxp' table

TTmaxp::TTmaxp()
{
    memset(this, 0, sizeof(*this));
    version     = 0x00010000;
    maxZones    = 2;

    // does this fix things?
    //maxStorage  = 64;
    //maxFunctionDefs = 10;
    //maxStackElements = 64;
    //maxSizeOfInstructions = 512;
    //maxComponentElements = 1;
    //maxComponentDepth = 6;
}

TTDataStream &operator<<(TTDataStream &stream, const TTmaxp &t)
{
    stream << t.version << t.numGlyphs
        << t.maxPoints << t.maxContours << t.maxCompositePoints 
        << t.maxCompositeContours << t.maxZones << t.maxTwilightPonts
        << t.maxStorage << t.maxFunctionDefs << t.maxInstructionDefs
        << t.maxStackElements << t.maxSizeOfInstructions
        << t.maxComponentElements << t.maxComponentDepth;
    return stream;
}

// --------------------------------------------------------------------------
// 'name' table

TTname::TTname(string fontName, string version)
{
    format          = 0;
    count           = numRecords;
    stringOffset    = 6 + 12*numRecords;
    
    // Compose string table and comput offsets, as follows:
    //  (0) font name / font full name / postscript name
    //  (1) font style ("Regular")
    //  (2) version string
    //  (3) unique font identifier
    stringTable[0].SetString(fontName);
    stringTable[1].SetString("Regular");
    stringTable[2].SetString(version);
    stringTable[3].SetString("Stanford CS148:" + fontName + ":2009");
    
    // now compute offsets, doing unicode first then roman strings
    int offset = 0;
    for (int i = 0; i < numStrings; ++i) {
        stringTable[i].uniOffset = offset;
        offset += stringTable[i].uniStr.length() * 2;
    }
    for (int i = 0; i < numStrings; ++i) {
        stringTable[i].offset = offset;
        offset += stringTable[i].str.length();
    }
    
    
    const int h = numRecords/2;
    int nameIDs[h]  = { 1, 2, 3, 4, 5, 6 };
    int stringIDs[h]= { 0, 1, 3, 0, 2, 0 };
    
    // Mac name records
    for (int i = 0; i < h; ++i) {
        nameRecord[i].platformID = 1;
        nameRecord[i].encodingID = 0;
        nameRecord[i].languageID = 0;
        nameRecord[i].nameID = nameIDs[i];
        nameRecord[i].length = stringTable[stringIDs[i]].str.length();
        nameRecord[i].offset = stringTable[stringIDs[i]].offset;
    }

    // Windows name records
    for (int i = 0; i < h; ++i) {
        nameRecord[i+h].platformID = 3;
        nameRecord[i+h].encodingID = 1;
        nameRecord[i+h].languageID = 0x409;
        nameRecord[i+h].nameID = nameIDs[i];
        nameRecord[i+h].length = stringTable[stringIDs[i]].uniStr.length()*2;
        nameRecord[i+h].offset = stringTable[stringIDs[i]].uniOffset;
    }

}

void TTname::StringRecord::SetString(const string &s)
{
    str = s;
    copy(s.begin(), s.end(), back_inserter(uniStr));
}

TTDataStream &operator<<(TTDataStream &stream, const TTname::NameRecord &t)
{
    stream << t.platformID << t.encodingID << t.languageID << t.nameID
        << t.length << t.offset;
    return stream;
}

TTDataStream &operator<<(TTDataStream &stream, const TTname &t)
{
    stream << t.format << t.count << t.stringOffset;

    // write all the name records
    for (int i = 0; i < t.numRecords; ++i)
        stream << t.nameRecord[i];

    // store Windows unicode strings first
    for (int i = 0; i < t.numStrings; ++i)
        stream << t.stringTable[i].uniStr;
    // then Store Mac ASCII strings
    for (int i = 0; i < t.numStrings; ++i)
        stream << t.stringTable[i].str;
    
    return stream;
}

// --------------------------------------------------------------------------
// 'OS/2' table

TTos2::TTos2()
{
    memset(this, 0, sizeof(*this));

//    version         = 4;        // MS font validator does not recognize v4
    version         = 3;        // but version 3 (OpenType 1.4) looks the same
    usWeightClass   = 400;      // Normal (Regular) - FW_NORMAL
    usWidthClass    = 5;        // Medium (normal) = FWIDTH_NORMAL
    yStrikeoutSize  = 25;
    yStrikeoutPosition = 115;
    ulUnicodeRange1 = 1;
    fsSelection     = 0x0040;   // standard weight/style
    usFirstCharIndex= 0x0000;
    usLastCharIndex = 0x007F;
    ulCodePageRange1= 1;
    usBreakChar     = 0x0020;
}

TTDataStream &operator<<(TTDataStream &stream, const TTos2 &t)
{
    stream << t.version << t.xAvgCharWidth << t.usWeightClass << t.usWidthClass << t.fsType
        << t.ySubscriptXSize << t.ySubscriptYSize << t.ySubscriptXOffset << t.ySubscriptYOffset
        << t.ySuperscriptXSize << t.ySuperscriptYSize << t.ySuperscriptXOffset << t.ySuperscriptYOffset
        << t.yStrikeoutSize << t.yStrikeoutPosition << t.sFamilyClass;
    for (int i = 0; i < 10; ++i)
        stream << t.panose[i];
    stream << t.ulUnicodeRange1 << t.ulUnicodeRange2 << t.ulUnicodeRange3 << t.ulUnicodeRange4
        << t.achVendID[0] << t.achVendID[1] << t.achVendID[2] << t.achVendID[3]
        << t.fsSelection << t.usFirstCharIndex << t.usLastCharIndex
        << t.sTypoAscender << t.sTypoDescender << t.sTypoLineGap
        << t.usWinAscent << t.usWinDescent << t.ulCodePageRange1 << t.ulCodePageRange2
        << t.sxHeight << t.sCapHeight << t.usDefaultChar << t.usBreakChar << t.usMaxContext;
    return stream;
}

// --------------------------------------------------------------------------
// 'post' table

TTpost::TTpost(int nglyphs)
{
    memset(this, 0, sizeof(*this));

    version             = 0x00020000;
    underlinePosition   = -50;
    underlineThickness  = 10;
    numberOfGlyphs      = nglyphs;

    glyphNameIndex      = new TTuint16 [nglyphs];
    memset(glyphNameIndex, 0, nglyphs * sizeof(TTuint16));
}

TTDataStream &operator<<(TTDataStream &stream, const TTpost &t)
{
    stream << t.version << t.italicAngle
        << t.underlinePosition << t.underlineThickness << t.isFixedPitch
        << t.minMemType42 << t.maxMemType42 << t.minMemType1 << t.maxMemType1;
    stream << t.numberOfGlyphs;
    for (int i = 0; i < t.numberOfGlyphs; ++i)
        stream << t.glyphNameIndex[i];
    return stream;
}

// --------------------------------------------------------------------------
// 'glyf' table

TTglyf::TTglyf(const TTGlyph *const glyph)
{
    memset(this, 0, sizeof(*this));

    numberOfContours    = glyph->NumContours();
    numPoints           = glyph->NumPoints();

    endPtsOfContours    = new TTuint16 [numberOfContours];
    flags               = new TTuint8 [numPoints];
    xCoordinates        = new TTint16 [numPoints];
    yCoordinates        = new TTint16 [numPoints];

    // if this glyph actually has points, initialize min/max values to sentries
    if (numPoints > 0) {
        xMin = 1000; xMax = -1000;
        yMin = 1000; yMax = -1000;
    }

    // now fill the coordinate and flag arrays with data from the glyph
    int ptidx = 0;
    TTint16 lastX = 0, lastY = 0;
    for (int c = 0; c < glyph->NumContours(); ++c) {
        TTContour *contour = glyph->GetContour(c);
        for (int p = 0; p < contour->NumPoints(); ++p, ++ptidx) {
            flags[ptidx] = contour->IsPointOnCurve(p) ? 1 : 0;
            TTPoint *point = contour->GetPoint(p);
            TTint16 x = TTint16(point->mCoordinates.x);
            TTint16 y = TTint16(point->mCoordinates.y);
            xMin = min(xMin, x); xMax = max(xMax, x);
            yMin = min(yMin, y); yMax = max(yMax, y);
            xCoordinates[ptidx] = x - lastX;
            yCoordinates[ptidx] = y - lastY;
            lastX = x; lastY = y;
        }
        endPtsOfContours[c] = ptidx-1;
    }
}

TTglyf &TTglyf::operator = (const TTglyf &other)
{
    if (this != &other) {
        destroy();
        copy(other);
    }
    return *this;
}

void TTglyf::copy(const TTglyf &other)
{
    memcpy(this, &other, sizeof(*this));
    endPtsOfContours    = new TTuint16 [numberOfContours];
    flags               = new TTuint8 [numPoints];
    xCoordinates        = new TTint16 [numPoints];
    yCoordinates        = new TTint16 [numPoints];
    memcpy(endPtsOfContours, other.endPtsOfContours, numberOfContours * sizeof(TTuint16));
    memcpy(flags, other.flags, numPoints * sizeof(TTuint8));
    memcpy(xCoordinates, other.xCoordinates, numPoints * sizeof(TTint16));
    memcpy(yCoordinates, other.yCoordinates, numPoints * sizeof(TTint16));
}

void TTglyf::destroy()
{
    delete [] endPtsOfContours;
    delete [] flags;
    delete [] xCoordinates;
    delete [] yCoordinates;
}

TTDataStream &operator<<(TTDataStream &stream, const TTglyf &t)
{
    if (t.numberOfContours > 0)
    {
        stream << t.numberOfContours << t.xMin << t.yMin << t.xMax << t.yMax;
        for (int i = 0; i < t.numberOfContours; ++i)
            stream << t.endPtsOfContours[i];
        stream << t.instructionLength;
        for (int i = 0; i < t.numPoints; ++i)   stream << t.flags[i];
        for (int i = 0; i < t.numPoints; ++i)   stream << t.xCoordinates[i];
        for (int i = 0; i < t.numPoints; ++i)   stream << t.yCoordinates[i];
    }
    return stream;
}

// --------------------------------------------------------------------------
// 'loca' table

TTloca::TTloca(int nglyphs)
    : n(nglyphs+1)
{
    offsets = new TTuint32 [n];
}

TTDataStream &operator<<(TTDataStream &stream, const TTloca &t)
{
    for (int i = 0; i < t.n; ++i)
        stream << t.offsets[i];
    return stream;
}

// --------------------------------------------------------------------------
