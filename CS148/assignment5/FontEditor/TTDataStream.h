/*
 *  TTDataStream.h
 *  FontEditor
 *
 *  Data stream class that writes OpenType/TrueType data types to a buffer
 *  in the required big endian form.
 *
 *  Created by Sonny Chan, January 2009.
 *  Copyright 2009 Stanford University. All rights reserved.
 *
 */

#ifndef TTDATASTREAM_H
#define TTDATASTREAM_H

#include "stgl.h"
#include <string>

// define the data types the font file needs, in terms of the OpenGL ones
typedef GLbyte      TTint8;
typedef GLubyte     TTuint8;
typedef GLshort     TTint16;
typedef GLushort    TTuint16;
typedef GLint       TTint32;
typedef GLuint      TTuint32;
typedef TTint16     TTfword;
typedef TTuint16    TTufword;
typedef long long   TTlongDateTime;


class TTDataStream
{
public:
    TTDataStream();
    ~TTDataStream();

    // note: this class needs a copy constructor and assignment operator!

    TTuint8 *Data()         const { return mData; }
    int     PaddedLength()  const { return MultipleOf4(mSize); }
    int     ActualLength()  const { return mSize; }

    TTuint32 Checksum()     const;
    void    AdjustWord(int byteOffset, TTuint32 newValue);

    TTDataStream &operator << (TTint8 x)    { InsertGeneric(x); return *this; }
    TTDataStream &operator << (TTuint8 x)   { InsertGeneric(x); return *this; }
    TTDataStream &operator << (TTint16 x)   { InsertGeneric(x); return *this; }
    TTDataStream &operator << (TTuint16 x)  { InsertGeneric(x); return *this; }
    TTDataStream &operator << (TTint32 x)   { InsertGeneric(x); return *this; }
    TTDataStream &operator << (TTuint32 x)  { InsertGeneric(x); return *this; }
    TTDataStream &operator << (TTlongDateTime x) { InsertGeneric(x); return *this; }
    TTDataStream &operator << (const std::string &s);
    TTDataStream &operator << (const std::wstring &s);
    TTDataStream &operator << (const TTDataStream &other);

private:

    int     MultipleOf4(int x)   const { return ((x-1) | 3) + 1; }
    void    AllocateToAccommodate(int bytes);

    template <typename T>
    void InsertGeneric(T x);



    TTuint8 *mData;
    int     mSize;
    int     mAllocated;
};

#endif
