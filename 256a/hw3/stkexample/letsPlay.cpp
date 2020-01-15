// 
//  letsPlay.cpp
//  stkExample: shows how to use stkInstruments, generators and effects
//  RtAudio is abstracted into MyAudio class, to simplify this main file
//  
//  Created by Jorge Herrera on 2011-10-26.
//  
//  Uses: Stk (https://ccrma.stanford.edu/software/stk/)

#include <iostream>
#include <string>
#include <math.h>

#include "Definitions.h"
#include "MyAudio.h"

#include "stk/Blit.h"
#include "stk/ADSR.h"
#include "stk/JCRev.h"



unsigned int g_numChannels = NUM_CHANNS;



// struct to encapsulate and abstract our Synthetizer
struct Synthetizer
{
public:
    Synthetizer()
    {
        m_rev = stk::JCRev( 10 );
        m_blit.setFrequency( 220.0 );
        m_adsr.setAllTimes( 0.1, 0.1, 0.9, 0.01 );
        m_blit.setHarmonics( 10 );
    }
    
    SAMPLE tick()
    {
        return m_rev.tick( m_adsr.tick() * m_blit.tick() );
    }
    
    void noteOn( float freq )
    {
        m_blit.setFrequency( freq );
        m_adsr.keyOn();
    }

    void noteOff()
    {
        m_adsr.keyOff();
    }
    
    void setHarmonics( unsigned int harms )
    {
        m_blit.setHarmonics(harms);
    }

private:
    stk::Blit m_blit;
    stk::ADSR m_adsr;
    stk::JCRev m_rev;
};



//-----------------------------------------------
// name: audioCallback
// desc: ...
//-----------------------------------------------
int audioCallback( void * outputBuffer, void * inputBuffer, 
                   unsigned int bufferSize, double streamTime,
                   RtAudioStreamStatus status, void * userData )
{
    SAMPLE * out = (SAMPLE *)outputBuffer;
    SAMPLE * in = (SAMPLE *)inputBuffer;
    
    Synthetizer * instrument = (Synthetizer *)userData;
    
    for(size_t i = 0; i < bufferSize; ++i)
    {
        //out[i*g_numChannels] = in[i*g_numChannels];
        out[i*g_numChannels] = instrument->tick();
        
        
        for(size_t j = 1; j < g_numChannels; ++j)
        {
            out[i*g_numChannels+j] = out[i*g_numChannels];
        }
    }
    
    return 0;
}



//-----------------------------------------------
// name: initialize
// desc: initialize miscellaneous stuff
//-----------------------------------------------
void initialize()
{    
    // STK "globals"
    stk::Stk::setSampleRate( MY_SRATE );
    // some Stk classes read data from files (included in the Stk source). 
    // Use this method to tell the app where to look for those files
    stk::Stk::setRawwavePath("rawwaves/");
    
    // seed random number generator
    srand( time(NULL) );
}



//-----------------------------------------------
// name: main
// desc: entry point
//-----------------------------------------------
int main ( int argc, char *argv[] )
{    
    // init miselaneous stuff
    initialize();
    
    // Instantiate the synth
    Synthetizer instrument;
    
    // config audio 
    MyAudio audio( g_numChannels, MY_SRATE, BUFFER_SIZE );
    audio.setup( &audioCallback, &instrument );
        
    // start audio
    audio.start();
        
    // initialize the number of harmonics of the synth
    static float harms = 10;
    instrument.setHarmonics( harms );
    
    // "scale" 
    float scale[5] = {0, 2, 5, 7, 9};
    
    // wait for user input
    do {
        char c;
        std::cin >> c;
        if (c == 'u') // increase harmonics
            instrument.setHarmonics( ++harms );
        else if (c == 'd')  // decrease harmonics
            instrument.setHarmonics( --harms );
        else if (c == 'p')  // play a note
            instrument.noteOn( 440.0 * pow(2.0, scale[rand() % 5]/12.0f) );
        else if (c == 's')  // stops the playing note
            instrument.noteOff();
        else if (c == 'q')
            break;
    } while( true );
    
    // stop before quiting
    audio.stop();
    
    return 0;
}