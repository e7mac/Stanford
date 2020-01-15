//-----------------------------------------------------------------------------
// name: ks.cpp
// desc: karplus strong class implementation
//
// author: Ge Wang (ge@ccrma.stanford.edu)
//   date: fall 2011
//   uses: RtAudio by Gary Scavone
//-----------------------------------------------------------------------------
#include "ks.h"
#include <stdlib.h>
#include <iostream>
using namespace std;


// constructor
KS::KS()
{
    // delay
    m_delayBuffer = NULL;
    m_attenuation = .99;
    m_maxAmountOfDelay = 0;
    m_amountOfDelay = 0;
    m_reader = 0;
    m_writer = 0;
    m_srate = 0;
}


// destructor
KS::~KS()
{
}


// initialize
void KS::init( int maxDelay, int initialDelay, long srate )
{
    // set
    m_maxAmountOfDelay = maxDelay;
    m_amountOfDelay = initialDelay;
    m_srate = srate;

    // allocate the delay buffer
    m_delayBuffer = new SAMPLE[m_maxAmountOfDelay];
    // iterate
    //for( int i = 0; i < m_maxAmountOfDelay; i++ )
    //{
    //    m_delayBuffer[i] = 2*(rand() / (SAMPLE)RAND_MAX) - 1;
    //}
    
    // set indices
    m_reader = m_writer - m_amountOfDelay;
    // wrap
    if( m_reader < 0 ) m_reader += m_maxAmountOfDelay;
    
    cerr << "reader: " << m_reader << " writer: " << m_writer << endl;
}


// set the frequency
void KS::setFrequency( float freq )
{
    // TODO: check for crazy values

    // compute delay length
    float length = m_srate / freq;
    // round to nearest integer
    m_amountOfDelay = (int)(length + .5);
    // set indices
    m_reader = m_writer - m_amountOfDelay;
    // wrap
    if( m_reader < 0 ) m_reader += m_maxAmountOfDelay;
}


// pluck it!
void KS::pluck()
{
    // iterate
    for( int i = 0; i < m_maxAmountOfDelay; i++ )
    {
        m_delayBuffer[i] = 2*(rand() / (SAMPLE)RAND_MAX) - 1;
    }    
}


// generate samples
void KS::synthesize( SAMPLE * buffer, int numFrames )
{
    // iterate
    for( int i = 0; i < numFrames; i++ )
    {
        // read the next output sample from the delay buffer
		buffer[i] = (m_delayBuffer[m_reader]+m_delayBuffer[m_reader-1])/2;
        // put the next input samples in the delay buffer
        m_delayBuffer[m_writer] = buffer[i] * m_attenuation;
        
        // advance the indices
        m_writer++;
        m_reader++;
        
        // warp
        m_writer %= m_maxAmountOfDelay;
        m_reader %= m_maxAmountOfDelay;
    }
}
