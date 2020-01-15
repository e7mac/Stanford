#include <iostream>
#include <math.h>
#include <cstring>
#include <cstdlib>

#include "osc/OscOutboundPacketStream.h"
#include "osc/OscReceivedElements.h"
#include "osc/OscPacketListener.h"
#include "ip/UdpSocket.h"

#include "Thread.h"

#include "RtMidi.h"
#include "RtAudio.h"
#include "ks.h"


#define SAMPLE double
#define MY_SRATE 44100
#define OUTPUT_BUFFER_SIZE 1024



//to avoid global variables for ip address passing
struct ipData{
	char *hostName;
	int inPort;
	int outPort;
};


using namespace std;

// multiple KS models
int g_stringnos=16;
vector<KS> g_ks(g_stringnos);
int g_string=0;
// intermediate buffer
SAMPLE g_intermediate[20000];

//function prototype
void playNotes(int,int);

//--------------------------------------------------------------------
// Class required by oscpack, to implement the 
// ProcessMessage() method
//--------------------------------------------------------------------
class OSCListener : public osc::OscPacketListener {
protected:

    // Implement the required ProcessMessage()
    virtual void ProcessMessage( const osc::ReceivedMessage& m, 
				const IpEndpointName& remoteEndpoint )
    {
        try{
                osc::ReceivedMessageArgumentStream args = m.ArgumentStream();
                float a1, a2;
                args >> a1 >> a2 >> osc::EndMessage;    
                //uncomment to check osc status
				//std::cout << "received '" << m.AddressPattern() << "' message with arguments: "<< a1 << " " << a2 << "\n";

				playNotes(a1,a2);

            }      
            
        catch( osc::Exception& e ){
            // any parsing errors such as unexpected argument types, or 
            // missing arguments get thrown as exceptions.
            std::cout << "error while parsing message: "
                << m.AddressPattern() << ": " << e.what() << "\n";
        }
    }
};

//--------------------------------------------------------------------
// name: oscListener
// desc: starts a separate thread to listen for incoming messages
//--------------------------------------------------------------------
void * oscListener( void * userData )
{
	ipData *ipAdds = (ipData *)userData;
    cerr << "Starting listening thread!" << endl;
    OSCListener listener;
    UdpListeningReceiveSocket s(
            IpEndpointName( IpEndpointName::ANY_ADDRESS, ipAdds->inPort ),
            &listener );

    //s.RunUntilSigInt();
    s.Run();
    cerr << "Exiting thread!" << endl;
    
}

//--------------------------------------------------------------------
// name: sendOSCMessage(format: /midi note velocity)
// desc: exactly what the name says
//--------------------------------------------------------------------
void sendOSCMessage(float note, float velocity, ipData* ipAdds)
{
    UdpTransmitSocket transmitSocket( IpEndpointName( ipAdds->hostName, ipAdds->outPort ) );
        
    char buffer[OUTPUT_BUFFER_SIZE];
    osc::OutboundPacketStream p( buffer, OUTPUT_BUFFER_SIZE );
    // form the message
    p << osc::BeginMessage( "/midi" ) << note << velocity << osc::EndMessage;
    // send the OSC message
    transmitSocket.Send( p.Data(), p.Size() );
}

//-----------------------------------------------------------------------------
// name: midi_callback()
// desc: callback that is called every time a new MIDI message is received
//-----------------------------------------------------------------------------
void midi_callback( double deltatime, 
				 std::vector< unsigned char > *message, 
				 void *userData )
{
    unsigned int nBytes = message->size();
	ipData *ipAdds = (ipData *)userData;
	float note = (float)message->at(1);
	float velocity = (float)message->at(2);
	
	sendOSCMessage(note,velocity,ipAdds);
    if (nBytes > 0 && (int)message->at(0) == 144 )
    {
		playNotes(note,velocity);
    }
}

//--------------------------------------------------------------------
// name: playNotes
// desc: adds amplitude data for the note and velocity specified
//--------------------------------------------------------------------

void playNotes(int note,int velocity)
{
	g_string++;
	g_string %= g_stringnos;
	g_ks[g_string].setFrequency( 440*pow(2,(note-57)/(float)12.0 ));
    // Only pluck if the velocity is not 0
    if( velocity != 0 )
       g_ks[g_string].pluck();
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
            buffy[j] += g_intermediate[j];
    }
    return 0;
}


//-----------------------------------------------------------------------------
// name: midi_init()
// desc: sets up the RtMidi and RtAudio objects
//-----------------------------------------------------------------------------
void midi_init(void *ipAdds)
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
    midiin->setCallback( &midi_callback , ipAdds);

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

}