// 
//  midi.cpp
//  MUSIC256a/CS476a - Lecture 4a
//  -----------------------------
//  A very simple example of midi + real-time audio
//  Uses RtAudio and RtMidi by Gary Scavone and ks by Ge Wang
//  
//  Created by Jorge Herrera on 2011-10-17.

#include <iostream>
#include <cstdlib>
#include "RtMidi.h"
#include "RtAudio.h"
#include <math.h>
#include "ks.h"

using namespace std;

#define SAMPLE double
#define MY_SRATE 44100

// multiple strings
const int g_stringnos=16;
KS g_ks[g_stringnos];
int g_string=0;

// intermediate buffer
SAMPLE g_intermediate[20000];


//-----------------------------------------------------------------------------
// name: midi_callback()
// desc: callback that is called every time a new MIDI message is received
//-----------------------------------------------------------------------------
void midi_callback( double deltatime, 
				 std::vector< unsigned char > *message, 
				 void *userData )
{
    unsigned int nBytes = message->size();

    // // print incoming message (uncomment for debugging)
    // for ( unsigned int i=0; i<nBytes; i++ )
    //     std::cout << "Byte " << i << " = " << (int)message->at(i) << ", ";
    // if ( nBytes > 0 )
    //     std::cout << "stamp = " << deltatime << std::endl;
	
    // if a NoteOn message is received, pluck the string
    if (nBytes > 0 && (int)message->at(0) == 144 )
    {
	g_string++;
	g_string %= g_stringnos;
	g_ks[g_string].setFrequency( 440*pow(2,((int)message->at(1)-57)/(float)12.0 ));
        // Only pluck if the velocity is not 0
        if( (int)message->at(2) != 0 )
            {g_ks[g_string].pluck();
		}			
    }
}



//-----------------------------------------------------------------------------
// name: audio_callback()
// desc: callback that is called every time a new audio buffer is required by 
//		 the ADC
//-----------------------------------------------------------------------------
int audio_callback( void * output_buffer, void * input_buffer,
            unsigned int buffer_size, double stream_time,
            RtAudioStreamStatus status, void * user_data )
{
    // cast!
    SAMPLE * buffy = (SAMPLE *)output_buffer;
	
    // zero out the output
    for( int j = 0; j < buffer_size; j++ )
    {
        buffy[j] = 0;
    }
    

    for( int i = 0; i < g_stringnos; i++ )
    {
        // generate samples from our KS instance
        g_ks[i].synthesize( g_intermediate, buffer_size );
        
        // accumulate into output
        for( int j = 0; j < buffer_size; j++ )
        {
            buffy[j] += g_intermediate[j];
        }
    }



    
    return 0;
}


//-----------------------------------------------------------------------------
// name: main()
// desc: entry point
//-----------------------------------------------------------------------------
int main()
{
    // Pointers to RtMidi and RtAudio objects
    RtMidiIn * midiin = NULL;
    RtAudio * audio = NULL;
	
    // MIDI config + init
    try 
    {
        midiin = new RtMidiIn();
    }
    catch( RtError & err ) {
        err.printMessage();
        goto cleanup;
    }
    
    // Check available ports.
    if ( midiin->getPortCount() == 0 )
    {
        std::cout << "No ports available!\n";
        goto cleanup;
    }
    // use the first available port
    midiin->openPort( 0 );

    // set midi callback
    midiin->setCallback( &midi_callback );

    // Don't ignore sysex, timing, or active sensing messages.
    midiin->ignoreTypes( false, false, false );

	

    // RtAudio config + init
    try
    {
        // create the RtAudio object
        audio = new RtAudio();
    }
    catch( RtError & err ) {
        err.printMessage();
        exit(1);
    }


    // now is a good time to initialize our KS string model
for (int i=0;i<g_stringnos;i++)
    g_ks[i].init( 2*MY_SRATE, 440, MY_SRATE );
	
	
    // set audio callback
    try
    {
        unsigned int buffer_size = 128;
        cerr << "buffer size: " << buffer_size << endl;

        RtAudio::StreamParameters parameters;
        parameters.deviceId = audio->getDefaultOutputDevice();
        parameters.nChannels = 1;
        parameters.firstChannel = 0;

        audio->openStream( &parameters, NULL, RTAUDIO_FLOAT64,
                           MY_SRATE, &buffer_size, &audio_callback, NULL);
        audio->startStream();
    }
    catch( RtError & err )
    {
        err.printMessage();
        goto cleanup;
    }

    // wait ...
    char input;
    cout << "Reading MIDI from port 0 ... press <enter> to quit" << endl;
    cin.get(input);
	
    // if we get here, stop!
    try
    {
        audio->stopStream();
    }
    catch( RtError & err )
    {
        err.printMessage();
    }
	
    

// Clean up
cleanup:
    if( midiin )
        delete midiin;
    if(audio)
    {
        if ( audio->isStreamOpen() )
            audio->closeStream();
        delete audio;
    }

    return 0;
}
