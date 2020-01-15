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
#include "AudioFeatures.h"

#define MY_SRATE 48000
#define SAMPLE float  // important: FluidSynth returns floats, so let's define SAMPLE as float to make it simple

using namespace std;

MidiEventQ g_playHuman;
MidiEventQ g_playComputer;
vector<MidiEvent> g_current;

float g_prob_melody=0.5,g_prob_rhythm=0.5;

Mutex g_mutex;

Aubio vocal_aubio;

// globals for FluidSynth
fluid_settings_t * g_settings; 
fluid_synth_t * g_synth;
fluid_synth_t * g_metronome; 
int g_t=0;
int g_tempo = 120;
int g_beat = MY_SRATE*60/g_tempo;
int g_bar = 4*g_beat;
int g_tradebars=2;
int g_trade=g_tradebars*g_bar;
int g_sixteenth=g_bar/16;
int g_eighth=g_bar/8;
int g_quarter=g_bar/4;
int g_half=g_bar/2;
bool turn_cpu=false;
int g_drumnote=51;
int g_metronome_on=1;
int g_beat_played = 0;


//global fretsizes
float g_fret_spill=1;     //extra fretboard beyond first and last string
float g_fretboard_h=25+g_fret_spill*2;
float g_fretboard_w=120;
float g_fret_h=g_fretboard_h;
float g_fret_w=1;
float g_string_h=0.5;
float g_string_w=g_fretboard_w+g_fret_w;

float g_continuous_x,g_quantization_x=(float)(g_fretboard_w+2)/(4*g_tradebars),g_timeline_x=0;

vector<int> g_played;
vector<int> g_stopped;


void tempoChange()
{
    g_beat = MY_SRATE*60/g_tempo;
    g_bar = 4*g_beat;
    g_trade=g_tradebars*g_bar;
    g_sixteenth=g_bar/16;
    g_eighth=g_bar/8;
    g_quarter=g_bar/4;
    g_half=g_bar/2;
    g_quantization_x=(g_fretboard_w+2)/(4*g_tradebars);
}

void corrected_fluid_synth_noteon(fluid_synth_t* g_synth,int chan,int pitch,int velocity ) {
    fluid_synth_noteon( g_synth, chan, pitch-1,velocity );         
}


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
    int midimessage=(int)message->at(0),pitch,velocity;
    
    if (nBytes > 0 )
    {
        if (midimessage==144)
        {
            pitch    = (int)message->at(1);
            velocity = (int)message->at(2);
            corrected_fluid_synth_noteon( g_synth, 1, pitch,velocity );         
            if (turn_cpu == 0)
            {
                if ( velocity==0 )
                {
                    for (int i=0;i<g_current.size();i++)
                    {
                        if (g_current[i].pitch() == pitch)
                        {
                            g_current[i].setEndTime(g_t);
                            g_playHuman.add(g_current[i]);
                            g_current.erase(g_current.begin()+i);
                        }
                    }
                }
            
                else 
            
                {
                    MidiEvent midz(pitch,velocity,g_quarter,g_t);
                    g_current.push_back(midz);
                }
            
            }
        
        }
        else if (midimessage == 128)
        {
            pitch    = (int)message->at(1);
            fluid_synth_noteoff( g_synth, 1, pitch);         
            if (turn_cpu == 0)
            {
                
                for (int i=0;i<g_current.size();i++)
                {
                    if (g_current[i].pitch() == pitch)
                    {
                        g_current[i].setEndTime(g_t);
                        g_playHuman.add(g_current[i]);
                        g_current.erase(g_current.begin()+i);
                    }
                }
            }

            
        }
    }
}

int audioCallback( void * outputBuffer, void * inputBuffer, 
            unsigned int bufferSize, double streamTime,
            RtAudioStreamStatus status, void * userData )
{
    SAMPLE * in = (SAMPLE *)inputBuffer;
    SAMPLE * out = (SAMPLE *)outputBuffer;
	int midi_pitch;
    midi_pitch = vocal_aubio.aubio_get_midi_pitch_on_onset(in);
    if(midi_pitch){
		cout<<midi_pitch;
    }

	SAMPLE acc[bufferSize*2];
    fluid_synth_write_float( g_synth, bufferSize, out, 0, 2, out, 1, 2 );
	for (int i=0;i<bufferSize*2;i++)
		acc[i]=out[i];
    fluid_synth_write_float( g_metronome, bufferSize, out, 0, 2, out, 1, 2 );
	for (int i=0;i<bufferSize*2;i++)
		out[i]+=acc[i];

    //turnaround - every n bars
    if (g_t >= g_trade)
	 	{
            g_timeline_x=0;
            turn_cpu=!(turn_cpu);
            //cout<<"swap"<<" "<<turn_cpu<<endl;
			
            //if the cpu plays - process once
            if (turn_cpu==1) 
            {   
                for (int i=0;i<g_current.size();i++)
                {
                        g_current[i].setEndTime(g_t-1);
                        g_playHuman.add(g_current[i]);
                        g_current.erase(g_current.begin()+i);
                }
                g_current.clear();
                //g_playHuman.printQ();
                g_playComputer = g_playHuman;
                g_playHuman.clear();
                //g_playComputer.printQ();
                g_playComputer.randomize(g_prob_melody,g_prob_rhythm,g_tradebars,g_trade);
                //g_playComputer.printQ();
                g_drumnote=50;
                g_played.clear();
                g_played.resize(g_playComputer.size(),0);
                g_stopped.clear();
                g_stopped.resize(g_playComputer.size(),0);
            }
            else
            {
                g_drumnote = 51;
                for (int i=40;i<110;i++)
                    fluid_synth_noteoff( g_synth, 1, i);
            }
            
	 		g_t=0;
            g_beat_played=0;
	 	}

    
    //if cpu, then please play
    if (turn_cpu && g_playComputer.size()>0 )
    {
     //   cout<<g_played.size();

        for (int i=0;i<g_playComputer.size();i++)
        {
        if ( g_playComputer.at(i).startTime()<=g_t && g_played[i]==0 )
        {

            corrected_fluid_synth_noteon( g_synth, 1, g_playComputer.at(i).pitch(),g_playComputer.at(i).velocity() );
            g_played[i]=1;
        }
        
        if ( (g_playComputer.at(i).startTime()+g_playComputer.at(i).duration()  <= g_t) && g_stopped[i]==0)
            {
                corrected_fluid_synth_noteon( g_synth, 1, g_playComputer.at(i).pitch(),0);
                g_stopped[i]=1;
            }       
        }
	}

    if (g_t==0 && g_metronome_on == 1)
         fluid_synth_noteon( g_metronome, 1, g_drumnote,90 );         
    if (g_t/g_beat > g_beat_played && g_metronome_on == 1 )
     {
         fluid_synth_noteon( g_metronome, 1, g_drumnote,90 );         
         g_beat_played++;
     }
    
    g_t += bufferSize;
    
    return 0;
}



void printHelp()
{
    cout<<"milesAhead\n";
    cout<<"------------------------------------\n";
    cout<<"Usage: milesAhead [tempo]\n";
    cout<<"tempo must be between 40 and 200\n";
    cout<<"If no tempo is specified, it defaults to 120\n";
    cout<<"------------------------------------\n";
}


int main (int argc, char ** argv)
{
    
    //parse tempo 
    if (argc>2)
    {
        cerr<<"Error in arguments\n";
        printHelp();
        exit(1);
    }
    else if (argc==2) 
    {
        g_tempo = atoi(argv[1]);
        if (g_tempo<40 && g_tempo>200)
        {
            cerr<<"Tempo out of bounds!\n";
            printHelp();
            exit(1);
        }
        tempoChange();
    }
    
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
    unsigned int bufferSize = 512;//g_sixteenth/100;

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
    if ( midiin->getPortCount() > 2)
        midiin->openPort( 1 );
    else 
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