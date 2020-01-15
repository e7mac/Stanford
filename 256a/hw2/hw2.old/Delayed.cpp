//-----------------------------------------------------------------------------
// name: Delayed.cpp
// desc: delayed expample real-time
//
// author: Ge Wang (ge@ccrma.stanford.edu)
//   date: fall 2011
//   uses: RtAudio by Gary Scavone
//-----------------------------------------------------------------------------
#include "RtAudio.h"
#include "ks.h"
#include <math.h>
#include <iostream>
#include <cstdlib>
#include "RtMidi.h"

using namespace std;

// our datetype
#define SAMPLE double
// corresponding format for RtAudio
#define MY_FORMAT RTAUDIO_FLOAT64
// sample rate
#define MY_SRATE 44100
// number of channels
#define MY_CHANNELS 1
// number of strings
#define MY_NUMSTRINGS 6
// for convenience
#define MY_PIE 3.14159265358979



// our KS instances
KS g_ks[MY_NUMSTRINGS];
// next string to play
int g_currString = 0;
// intermediate buffer
SAMPLE g_intermediate[20000];

int g_flag = 0;


//-----------------------------------------------------------------------------
// name: callme()
// desc: audio callback
//-----------------------------------------------------------------------------
int callme( void * outputBuffer, void * inputBuffer, unsigned int numFrames,
            double streamTime, RtAudioStreamStatus status, void * data )
{
    // cast
    SAMPLE * input = (SAMPLE *)inputBuffer;
    SAMPLE * output = (SAMPLE *)outputBuffer;
    
    // zero out the output
    for( int j = 0; j < numFrames; j++ )
    {
        output[j] = 0;
    }
    
    for( int i = 0; i < MY_NUMSTRINGS; i++ )
    {
        // generate samples from our KS instance
        g_ks[i].synthesize( g_intermediate, numFrames );
        
        // accumulate into output
        for( int j = 0; j < numFrames; j++ )
        {
            output[j] += g_intermediate[j];
        }
    }

    return 0;
}




void mycallback( double deltatime, std::vector< unsigned char > *message, void *userData )
{
  unsigned int nBytes = message->size();
  for ( int i=0; i<nBytes; i++ )
 {   std::cout << "Byte " << i << " = " << (int)message->at(i) << ", ";
if (i==0 && (int)message->at(i)==144) {g_ks[g_currString].setFrequency( 440*pow(2,((int)message->at(i+1)-57)/(float)12.0 ));
cout<<"\n"<<((int)message->at(i+1)-57)/(float)12.0<<"\n";}
  if ( nBytes > 0 )
    std::cout << "stamp = " << deltatime << std::endl;
}
	g_ks[g_currString].pluck();
        g_currString = (g_currString+1)%MY_NUMSTRINGS;
}




//-----------------------------------------------------------------------------
// name: main()
// desc: entry point
//-----------------------------------------------------------------------------
int main( int argc, char ** argv )
{

 RtMidiIn *midiin = new RtMidiIn();

  // Check available ports.
  unsigned int nPorts = midiin->getPortCount();
  if ( nPorts == 0 ) {
    std::cout << "No ports available!\n";
    //goto cleanup;
  }

  midiin->openPort( 0 );

  // Set our callback function.  This should be done immediately after
  // opening the port to avoid having incoming messages written to the
  // queue.
  midiin->setCallback( &mycallback );

  // Don't ignore sysex, timing, or active sensing messages.
  midiin->ignoreTypes( false, false, false );

  std::cout << "\nReading MIDI input ... press <enter> to quit.\n";
  char input;
  std::cin.get(input);


    // instantiate RtAudio object
    RtAudio audio;
    // variables
    unsigned int bufferBytes = 0;
    // frame size
    unsigned int numFrames = 512;
    
    // check for audio devices
    if( audio.getDeviceCount() < 1 )
    {
        // nopes
        cout << "no audio devices found!" << endl;
        exit( 1 );
    }
    
    // let RtAudio print messages to stderr.
    audio.showWarnings( true );
    
    // set input and output parameters
    RtAudio::StreamParameters iParams, oParams;
    iParams.deviceId = audio.getDefaultInputDevice();
    iParams.nChannels = MY_CHANNELS;
    iParams.firstChannel = 0;
    oParams.deviceId = audio.getDefaultOutputDevice();
    oParams.nChannels = MY_CHANNELS;
    oParams.firstChannel = 0;
    
    // create stream options
    RtAudio::StreamOptions options;
    
    // go for it
    try {
        // open a stream
        audio.openStream( &oParams, &iParams, MY_FORMAT, MY_SRATE, &numFrames, &callme, NULL, &options );
    }
    catch( RtError& e )
    {
        // error!
        cout << e.getMessage() << endl;
        exit( 1 );
    }
    
    // compute
    bufferBytes = numFrames * MY_CHANNELS * sizeof(SAMPLE);
    
    // test RtAudio functionality for reporting latency.
    cout << "stream latency: " << audio.getStreamLatency() << " frames" << endl;
    
    for( int i = 0; i < MY_NUMSTRINGS; i++ )
    {
        // intialize
        g_ks[i].init( MY_SRATE*2, 440, MY_SRATE );
	
    }
    
    // go for it
    try {
        // start stream
        audio.startStream();
	char input;
        std::cout << "Press any key to quit ";
	std::cin.get(input);
        
        // stop the stream.
        audio.stopStream();
    }
    catch( RtError& e )
    {
        // print error message
        cout << e.getMessage() << endl;
        goto cleanup;
    }
    
cleanup:
    // close if open
    if( audio.isStreamOpen() )
        audio.closeStream();
    delete midiin;
    
    // done
    return 0;
}

