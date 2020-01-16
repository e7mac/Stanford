/*
 *  TTDataStream.cpp
 *  FontEditor
 *
 *  Data stream class that writes OpenType/TrueType data types to a buffer
 *  in the required big endian form.
 *
 *  Created by Sonny Chan, January 2009.
 *  Copyright 2009 Stanford University. All rights reserved.
 *
 */
 
#include "TTDataStream.h"

#include <algorithm>
#include <cstdlib>

using namespace std;

// --------------------------------------------------------------------------

// TrueType/OpenType fonts are stored in big endian format, so we will need
// some endian support code to properly write these data streams
// (most is shamelessly borrowed from Promit Roy's article on GameDev.net)

enum TTEndianism {
    kEndianUnknown,
    kEndianLittle,
    kEndianBig
};

static TTEndianism gMachineEndian = kEndianUnknown;

static void SetMachineEndian()
{
    TTint8 EndianTest[2] = { 1, 0 };
    TTint16 x = *reinterpret_cast<TTint16*>(EndianTest);
    if (x == 1) gMachineEndian = kEndianLittle;
    else        gMachineEndian = kEndianBig;
}

inline TTint8 SwapEndian(TTint8 x)
{
    return x;
}

inline TTuint8 SwapEndian(TTuint8 x)
{
    return x;
}

inline TTint16 SwapEndian(TTint16 x)
{
    TTuint8 b1 = x & 0xff;
    TTuint8 b2 = (x >> 8) & 0xff;
    return (b1 << 8) + b2;
}

inline TTuint16 SwapEndian(TTuint16 x)
{
    TTuint8 b1 = x & 0xff;
    TTuint8 b2 = (x >> 8) & 0xff;
    return (b1 << 8) + b2;
}

inline TTint32 SwapEndian(TTint32 x)
{
    TTuint8 b1 = x & 0xff;
    TTuint8 b2 = (x >>  8) & 0xff;
    TTuint8 b3 = (x >> 16) & 0xff;
    TTuint8 b4 = (x >> 24) & 0xff;
    return (b1 << 24) + (b2 << 16) + (b3 << 8) + b4;
}

inline TTuint32 SwapEndian(TTuint32 x)
{
    TTuint8 b1 = x & 0xff;
    TTuint8 b2 = (x >>  8) & 0xff;
    TTuint8 b3 = (x >> 16) & 0xff;
    TTuint8 b4 = (x >> 24) & 0xff;
    return (b1 << 24) + (b2 << 16) + (b3 << 8) + b4;
}

inline TTlongDateTime SwapEndian(TTlongDateTime x)
{
    union {
        TTuint8         bytes[8];
        TTlongDateTime  value;
    } u;
    u.value = x;
    for (int i = 0; i < 4; ++i) swap(u.bytes[i], u.bytes[7-i]);
    return u.value;
}

// --------------------------------------------------------------------------

// The TTDataStream class member definitions actually start here

TTDataStream::TTDataStream()
: mData(0), mSize(0), mAllocated(0)
{
    // detect machine endianism if we have not done so yet
    if (gMachineEndian == kEndianUnknown)
        SetMachineEndian();
}

TTDataStream::~TTDataStream()
{
    if (mData) delete [] mData;
}

TTuint32 TTDataStream::Checksum() const
{
    TTuint32 *table = reinterpret_cast<TTuint32*>(mData);
    TTuint32 sum = 0;
    TTuint32 nLongs = (mSize + 3) / 4;

    if (gMachineEndian == kEndianLittle)
        while (nLongs-- > 0)
            sum += SwapEndian(*table++);
    else
        while (nLongs-- > 0)
            sum += *table++;

    return sum;
}

void TTDataStream::AdjustWord(int byteOffset, TTuint32 newValue)
{
    if (byteOffset < ActualLength()) {
        if (gMachineEndian == kEndianLittle)
            newValue = SwapEndian(newValue);
        *reinterpret_cast<TTuint32*>(mData+byteOffset) = newValue;
    }
}

void TTDataStream::AllocateToAccommodate(int bytes)
{
    if (mSize + bytes <= mAllocated) return;

    if (mAllocated == 0) {
        mAllocated = MultipleOf4(bytes);
        mData = new TTuint8 [mAllocated];
    }
    else {
        while (mAllocated < mSize+bytes) mAllocated *= 2;
        TTuint8 *newspace = new TTuint8 [mAllocated];
        memset(newspace, 0, mAllocated);
        memcpy(newspace, mData, mSize);
        delete [] mData;
        mData = newspace;
    }
}

TTDataStream &TTDataStream::operator <<(const string &s)
{
    for (string::const_iterator it = s.begin(); it != s.end(); ++it)
        InsertGeneric(TTint8(*it));
    return *this;
}

TTDataStream &TTDataStream::operator <<(const wstring &s)
{
    for (wstring::const_iterator it = s.begin(); it != s.end(); ++it)
        InsertGeneric(TTuint16(*it));
    return *this;
}

TTDataStream &TTDataStream::operator <<(const TTDataStream &other)
{
    // first pad this stream to 4 byte boundary
    while (ActualLength() < PaddedLength())
        InsertGeneric(TTuint8(0));

    // the copy in the second stream, also padded to 4 byte boundary
    AllocateToAccommodate(other.PaddedLength());
    memcpy(mData + mSize, other.Data(), other.PaddedLength());
    mSize += other.PaddedLength();

    return *this;
}

template <typename T>
void TTDataStream::InsertGeneric(T x)
{
    if (gMachineEndian == kEndianLittle) x = SwapEndian(x);
    AllocateToAccommodate(sizeof(T));
    memcpy(mData + mSize, &x, sizeof(T));
    mSize += sizeof(T);
}

// explicit instantiations of insertion function for data types we need
template void TTDataStream::InsertGeneric<TTint8>(TTint8);
template void TTDataStream::InsertGeneric<TTuint8>(TTuint8);
template void TTDataStream::InsertGeneric<TTint16>(TTint16);
template void TTDataStream::InsertGeneric<TTuint16>(TTuint16);
template void TTDataStream::InsertGeneric<TTint32>(TTint32);
template void TTDataStream::InsertGeneric<TTuint32>(TTuint32);
template void TTDataStream::InsertGeneric<TTlongDateTime>(TTlongDateTime);

// --------------------------------------------------------------------------
