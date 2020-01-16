/*
 *  TTFontWriter.h
 *  FontEditor
 *
 *  Class that takes an object of MyFont type and turns it into a set of
 *  OpenType/TrueType tables that can be written to disk.  Building of the
 *  tables takes place in the constructor, so we can more or less consider
 *  this as a "use once" then destroy type of object.
 *
 *  Created by Sonny Chan, January 2009.
 *  Copyright 2009 Stanford University. All rights reserved.
 *
 */

#include "TTFontWriter.h"
#include "TTDataStream.h"

#include <iostream>
#include <fstream>

using namespace std;

TTFontWriter::TTFontWriter(const MyFont &font)
    : offset(numTables), 
      hmtx(font.NumGlyphs()), 
      name(font.mFontName, font.mVersionString), 
      post(font.NumGlyphs()),
      loca(font.NumGlyphs())
{
    maxp.numGlyphs = font.NumGlyphs();
    int sumWidth = 0;

    // construct postcript name mapping index
    string psnames = 
        "    !\"#$%&'()*+,-./0123456789:;<=>?@"
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`"
        "abcdefghijklmnopqrstuvwxyz{|}~";
    map<char, char> psmap;
    for (unsigned int i = 0; i < psnames.length(); ++i)
        if (psnames[i] != ' ') psmap[psnames[i]] = i;
    psmap[' '] = 3;

    // set values in head table
    head.unitsPerEm = font.mUnitsPerEm;

    // first store the 4 special glyphs, in order
    const TTGlyph *specialGlyph[] = { 
        font.mNotDefGlyph,         font.mNullGlyph, 
        font.mCarriageReturnGlyph, font.mSpaceGlyph
    };
    for (int i = 0; i < 4; ++i) {
        glyfs.push_back(TTglyf(specialGlyph[i]));
        post.glyphNameIndex[i]  = i;
        hmtx.advanceWidth[i]    = specialGlyph[i]->GetAdvanceWidth();
        hmtx.leftSideBearing[i] = specialGlyph[i]->GetLeftSideBearing();
        sumWidth += hmtx.advanceWidth[i] - hmtx.leftSideBearing[i];
    }

    // set special mappings of ASCII control codes
    int controlGlyph[] = { 
        1, 0, 0, 0, 0, 0, 0, 0, 0,      // 00 - 07
        1, 3, 0, 0, 0, 2, 0, 0, 0,      // 08 - 0F
        0, 0, 0, 0, 0, 0, 0, 0, 0,      // 10 - 17
        0, 0, 0, 0, 0, 1, 0, 0, 0,      // 18 - 1F
        3                               // 20 (space)
    };
    for (int i = 0; i <= 0x20; ++i)
        cmap.subtable2.glyphIdArray[i] = cmap.subtable1.glyphIdArray[i] = controlGlyph[i];

    // then store all the remaining glyphs
    int i = 4; char lastChar = 0;
    for (map<char, TTGlyph*>::const_iterator it = font.mGlyphMap.begin();
        it != font.mGlyphMap.end(); ++it, ++i)
    {
        // store a glyf table for this glyph
        glyfs.push_back(TTglyf(it->second));

        // update the format 0 and format 4 character map
        cmap.subtable1.glyphIdArray[it->first] = i;
        cmap.subtable2.glyphIdArray[it->first] = i;
        
        // set postscript name of glyph
        post.glyphNameIndex[i] = psmap[it->first];

        // update last valid character in font
        lastChar = max(lastChar, it->first);

        // store values in horizontal metrics table
        hmtx.advanceWidth[i]    = it->second->GetAdvanceWidth();
        hmtx.leftSideBearing[i] = it->second->GetLeftSideBearing();
        sumWidth += hmtx.advanceWidth[i] - hmtx.leftSideBearing[i];

        // update maxima in maxp table
        maxp.maxPoints = max<TTuint16>(maxp.maxPoints, it->second->NumPoints());
        maxp.maxContours = max<TTuint16>(maxp.maxContours, it->second->NumContours());

        // update bounding box in head table
        head.xMin = min(head.xMin, glyfs[i].xMin);
        head.yMin = min(head.yMin, glyfs[i].yMin);
        head.xMax = max(head.xMax, glyfs[i].xMax);
        head.yMax = max(head.yMax, glyfs[i].yMax);

        // update measurements in hhea table
        hhea.advanceWidthMax = max(hhea.advanceWidthMax, hmtx.advanceWidth[i]);
        hhea.minLefSideBearing = min(hhea.minLefSideBearing, hmtx.leftSideBearing[i]);
        hhea.minRightSideBearing = min<TTfword>(hhea.minRightSideBearing,
            hmtx.advanceWidth[i] - hmtx.leftSideBearing[i] - (glyfs[i].xMax - glyfs[i].xMin));
        hhea.xMaxExtent = max<TTfword>(hhea.xMaxExtent, 
            hmtx.leftSideBearing[i] + (glyfs[i].xMax - glyfs[i].xMin));
    }

    // set hhea ascender/descender values to what I think
    hhea.ascender = max<TTint16>(font.mAscender, head.yMax);
    hhea.descender = min<TTint16>(font.mDescender, head.yMin);
    hhea.numberOfHMetrics = font.NumGlyphs();

    // fill in OS/2 and Windows specific table
    os2.xAvgCharWidth   = sumWidth / maxp.numGlyphs;
    os2.sTypoAscender   = font.mAscender;
    os2.sTypoDescender  = font.mDescender;
    os2.usWinAscent     = hhea.ascender;
    os2.usWinDescent    = -hhea.descender;
    os2.sxHeight        = font.mXHeight;
    os2.sCapHeight      = font.mCapHeight;
    os2.usLastCharIndex = lastChar;
}

TTFontWriter::~TTFontWriter()
{
}

bool TTFontWriter::WriteToFile(const string filename)
{
    directoryIndex  = 0;
    directoryOffset = 12 + numTables * 16;

    // the table directory must contain the tables ordered lexicographically
    // by tag, so we will build the font by concatenating tables in that order
    
    TTDataStream dsOS2;
    dsOS2 << os2;
    AddTableToDirectory("OS/2", dsOS2);

    TTDataStream dsCmap;
    dsCmap << cmap;
    AddTableToDirectory("cmap", dsCmap);

    // compose glyf and loca tables from individual glyfs (loca tracks offsets)
    TTDataStream dsGlyf;
    for (unsigned int i = 0; i < glyfs.size(); ++i) {
        loca.offsets[i] = dsGlyf.ActualLength();
        dsGlyf << glyfs[i];
    }
    loca.offsets[glyfs.size()] = dsGlyf.ActualLength();
    AddTableToDirectory("glyf", dsGlyf);

    TTDataStream dsHead;
    dsHead << head;
    AddTableToDirectory("head", dsHead);

    TTDataStream dsHhea;
    dsHhea << hhea;
    AddTableToDirectory("hhea", dsHhea);

    TTDataStream dsHmtx;
    dsHmtx << hmtx;
    AddTableToDirectory("hmtx", dsHmtx);

    TTDataStream dsLoca;
    dsLoca << loca;
    AddTableToDirectory("loca", dsLoca);

    TTDataStream dsMaxp;
    dsMaxp << maxp;
    AddTableToDirectory("maxp", dsMaxp);

    TTDataStream dsName;
    dsName << name;
    AddTableToDirectory("name", dsName);

    TTDataStream dsPost;
    dsPost << post;
    AddTableToDirectory("post", dsPost);

    // construct the master data stream by concatenating directory and tables
    TTDataStream ds;
    ds << offset;
    for (int i = 0; i < numTables; ++i)
        ds << directory[i];
    ds << dsOS2;
    ds << dsCmap;
    ds << dsGlyf;   int csaOffset = ds.PaddedLength() + 8;
    ds << dsHead;
    ds << dsHhea;
    ds << dsHmtx;
    ds << dsLoca;
    ds << dsMaxp;
    ds << dsName;
    ds << dsPost;

    // finally, we compute the whole font's checksum adjustment, then insert
    // the value into the appropriate place in the datastream
    TTuint32 csa = 0xB1B0AFBA - ds.Checksum();
    ds.AdjustWord(csaOffset, csa);

    // now we are ready to full font datastream to the specified file
    ofstream outfile;
    outfile.open(filename.c_str(), ios::binary);
    if (outfile) 
    {
        outfile.write(reinterpret_cast<char*>(ds.Data()), ds.PaddedLength());
        outfile.close();
    }
    else return false;

    return true;
}

void TTFontWriter::AddTableToDirectory(const char *tag, const TTDataStream &ds)
{
    for (int i = 0; i < 4; ++i)
        directory[directoryIndex].tag[i] = tag[i];
    directory[directoryIndex].checkSum   = ds.Checksum();
    directory[directoryIndex].offset     = directoryOffset;
    directory[directoryIndex].length     = ds.ActualLength();

    directoryOffset += ds.PaddedLength();
    ++directoryIndex;
}
