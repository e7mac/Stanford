//-----------------------------------------------------------------------------
// name: ks.h
// desc: karplus strong class definition
//
// author: Ge Wang (ge@ccrma.stanford.edu)
//   date: fall 2011
//   uses: RtAudio by Gary Scavone
//-----------------------------------------------------------------------------
#ifndef __KS_H__
#define __KS_H__


// our datetype
#define SAMPLE double




//-----------------------------------------------------------------------------
// name: class KS
// desc: ...
//-----------------------------------------------------------------------------
class KS
{
public:
    // constructor
    KS();
    // destructor
    ~KS();

public:
    // initialize
    void init( int maxDelay, int initialDelay, long srate );
    // set the frequency
    void setFrequency( float freq );
    // pluck it!
    void pluck();
    // generate samples
    void synthesize( SAMPLE * buffer, int numFrames );

protected:
    // delay buffer
    SAMPLE * m_delayBuffer;
    // attenuation
    SAMPLE m_attenuation;
    // max delay possible
    int m_maxAmountOfDelay;
    // amount of delay
    int m_amountOfDelay;
    // read and write indices
    long m_reader;
    long m_writer;
    // sample rate
    long m_srate;
};




#endif
