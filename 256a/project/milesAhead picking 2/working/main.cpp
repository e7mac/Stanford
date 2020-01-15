// 
//  main.cpp
//  milesAhead interactive jamming program
// 
//  Created by Mayank Sanganeria
#define DEBUG

#ifdef __MACOSX_CORE__
#include <GLUT/glut.h>
#else
#include <GL/gl.h>
#include <GL/glu.h>
#include <GL/glut.h>
#endif

#include <iostream>
#include "RtAudio.h"
#include "RtMidi.h"
#include <fluidsynth.h>
#include <vector>
#include <algorithm>
#include <iterator>
#include "MidiEvent.h"
#include "MidiEventQ.h"
#include <cstdlib>
#include "Thread.h"

#define MY_SRATE 48000
#define SAMPLE float  // important: FluidSynth returns floats, so let's define SAMPLE as float to make it simple

using namespace std;

MidiEventQ g_playHuman;
MidiEventQ g_playComputer;
MidiEvent g_current;

Mutex g_mutex;

// globals for FluidSynth
fluid_settings_t * g_settings; 
fluid_synth_t * g_synth;
fluid_synth_t * g_metronome; 
float g_t=0;
float g_tempo = 120;
float g_beat = MY_SRATE*60/g_tempo;
float g_bar = 16*g_beat;
float g_sixteenth=g_bar/16;
float g_eighth=g_bar/8;
float g_quarter=g_bar/4;
float g_half=g_bar/2;
bool turn_cpu=false;
int g_drumnote=51;




#include "gfx.cpp"

//-----------------------------------------------------------------------------
// name: midi_callback()
// desc: callback that is called every time a new MIDI message is received
//-----------------------------------------------------------------------------
void midi_callback( double deltatime, 
				 std::vector< unsigned char > *message, 
				 void *userData )
{
    unsigned int nBytes = message->size();
	int pitch,velocity;
    if (nBytes > 0 && (int)message->at(0) == 144 )
    {
		pitch    = (int)message->at(1);
		velocity = (int)message->at(2);
		fluid_synth_noteon( g_synth, 1, pitch,velocity );         
        if (turn_cpu == 0)
        {
            if (velocity==0 && g_current.endTime() == 0 )
            {g_current.setEndTime(g_t);
                g_playHuman.add(g_current);}
            else {
                MidiEvent midz(pitch,velocity,g_quarter,g_t);
                g_current = midz;
            }
            
            /*
            if (velocity==0 && g_playHuman.size()) 
                {
                    if (pitch==g_playHuman.at(g_playHuman.size()-1).pitch())
                    { g_playHuman.at(g_playHuman.size()-1).setEndTime(100);
                        cout<<"yeah";}
                }
                else 
                {
                    MidiEvent midz(pitch,velocity,g_t);
                    g_playHuman.add(midz);
                }
             */
        }
        
	}
}


int audioCallback( void * outputBuffer, void * inputBuffer, 
            unsigned int bufferSize, double streamTime,
            RtAudioStreamStatus status, void * userData )
{
    SAMPLE * out = (SAMPLE *)outputBuffer;
	SAMPLE acc[bufferSize*2];
    fluid_synth_write_float( g_synth, bufferSize, out, 0, 2, out, 1, 2 );
	for (int i=0;i<bufferSize*2;i++)
		acc[i]=out[i];
    fluid_synth_write_float( g_metronome, bufferSize, out, 0, 2, out, 1, 2 );
	for (int i=0;i<bufferSize*2;i++)
		out[i]+=acc[i];


	//cout<<g_t<<" "<<g_bar<<endl;

    //turnaround - every n bars
    if (g_t == g_bar)
	 	{
            g_timeline_x=0;
            turn_cpu=!(turn_cpu);
            //cout<<"swap"<<" "<<turn_cpu<<endl;
			
            //if the cpu plays - process once
            if (turn_cpu==1) 
            {   
                //g_playHuman.printQ();
                //cout<<"cpu's turn!";
                g_playComputer = g_playHuman;
                g_playHuman.clear();
                //g_playComputer.printQ();
                //cout<<"----------:"<<endl;
                g_playComputer.randomize(0.5);
                //g_playComputer.printQ();
                g_drumnote=50;
            }
            else
            {
                g_drumnote = 51;
            }
            
	 		g_t=0;
	 	}

    
    //if cpu, then please play
    if (turn_cpu)
    {
        for (int i=0;i<g_playComputer.size();i++)
        {
        if ( g_playComputer.at(i).startTime()==g_t )
            fluid_synth_noteon( g_synth, 1, g_playComputer.at(i).pitch(),g_playComputer.at(i).velocity() );
        
        if ( g_playComputer.at(i).endTime()==g_t )
            {
                fluid_synth_noteon( g_synth, 1, g_playComputer.at(i).pitch(),0);
            }       
        }
	}
    
    
     if ((int)g_t%(int)(g_beat) == 0)
     {
         fluid_synth_noteon( g_metronome, 1, g_drumnote,90 );         
     }
     if ((int)g_t%(int)(g_beat) == bufferSize)
     {
         fluid_synth_noteon( g_metronome, 1, g_drumnote,0 );         
     }
    
    g_t += bufferSize;
    
    return 0;
}


int main (int argc, char ** argv)
{
    
     
    
    
    
    
    // set up fluid synth stuff
    // TODO: error checking!!!!
    g_settings = new_fluid_settings(); 
    g_synth = new_fluid_synth( g_settings );
    g_metronome = new_fluid_synth( g_settings );  
    
    
    //fluid_player_t* player;
    //player = new_fluid_player(g_synth);
    //fluid_player_add(player, "backing.mid");
    //fluid_player_play(player);

    
    
    if (fluid_synth_sfload(g_synth, "piano.sf2", 1) == -1)
    {
        cerr << "Error loading sound font" << endl;
        exit(1);
    }
    
    if (fluid_synth_sfload(g_metronome, "drum.sf2", 1) == -1)
    {
        cerr << "Error loading sound font" << endl;
        exit(1);
    }
    
    
    // RtAudio config + init

    // pointer to RtAudio object
    RtMidiIn * midiin = NULL;    
	RtAudio *  audio = NULL;
    unsigned int bufferSize = 60;

    // MIDI config + init
    try 
    {
        midiin = new RtMidiIn();
    }
    catch( RtError & err ) {
        err.printMessage();
       // goto cleanup;
    }
    
    // Check available ports.
    if ( midiin->getPortCount() == 0 )
    {
        std::cout << "No ports available!\n";
       // goto cleanup;
    }
    // use the first available port
    midiin->openPort( 0 );

    // set midi callback
    midiin->setCallback( &midi_callback );

    // Don't ignore sysex, timing, or active sensing messages.
    midiin->ignoreTypes( false, false, false );

    // create the object
    try
    {
        audio = new RtAudio();
        cerr << "buffer size: " << bufferSize << endl;
    }
        catch( RtError & err ) {
        err.printMessage();
        exit(1);
    }

    if( audio->getDeviceCount() < 1 )
    {
        // nopes
        cout << "no audio devices found!" << endl;
        exit( 1 );
    }
        
    // let RtAudio print messages to stderr.
    audio->showWarnings( true );

    // set input and output parameters
    RtAudio::StreamParameters iParams, oParams;
    iParams.deviceId = audio->getDefaultInputDevice();
    iParams.nChannels = 1;
    iParams.firstChannel = 0;
    oParams.deviceId = audio->getDefaultOutputDevice();
    oParams.nChannels = 2;
    oParams.firstChannel = 0;
        
    // create stream options
    RtAudio::StreamOptions options;

    // set the callback and start stream
    try
    {
        audio->openStream( &oParams, &iParams, RTAUDIO_FLOAT32, MY_SRATE, &bufferSize, &audioCallback, NULL, &options);
        audio->startStream();
        
        // test RtAudio functionality for reporting latency.
        cout << "stream latency: " << audio->getStreamLatency() << " frames" << endl;
    }
    catch( RtError & err )
    {
        err.printMessage();
        goto cleanup;
    }

    // wait for user input
    cout << "Type CTRL+C to quit:";
    
    //initialize graphics
    gfxInit(&argc,argv);
    
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
    if(audio)
    {
        audio->closeStream();
        delete audio;
    }

    
    return 0;
}