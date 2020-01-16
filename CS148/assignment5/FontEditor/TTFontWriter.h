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

#ifndef TTFONTWRITER_H
#define TTFONTWRITER_H

#include "TTTables.h"
#include "MyFont.h"

#include <vector>
#include <string>

class TTFontWriter
{
public:
    //
    // Constructor initializes all tables with contents from the font object
    //
    TTFontWriter(const MyFont &font);
    ~TTFontWriter();

    //
    // Writes the contents of all font tables to the specified file
    //
    bool WriteToFile(const std::string filename = "MyFont.ttf");

private:
    //
    // Our font writes 10 separate font data tables, listed below
    //
    static const int numTables = 10;

    //
    // Helper function to keep track of current byte offset in the font
    // file as we add tables to it one by one
    //
    void AddTableToDirectory(const char *tag, const TTDataStream &ds);
    int directoryIndex;
    int directoryOffset;

    //
    // An instance of each required table in an OpenType font file
    // containing TrueType glyph outlines
    //
    TToffset    offset;
    TTdirectory directory[numTables];

    TTcmap      cmap;
    TThead      head;
    TThhea      hhea;
    TThmtx      hmtx;
    TTmaxp      maxp;
    TTname      name;
    TTos2       os2;
    TTpost      post;
    std::vector<TTglyf> glyfs;
    TTloca      loca;
};

#endif
