//-----------------------------------------------------------------------------
// name: HelloSine.cpp
// desc: hello sine wave, real-time
//
// author: Ge Wang (ge@ccrma.stanford.edu)
//   date: fall 2011
//   uses: RtAudio by Gary Scavone
//-----------------------------------------------------------------------------
#include "RtAudio.h"
#include <math.h>
#include <iostream>
#include <cstring>
#include <cstdlib>
#include <fstream>

using namespace std;

// our datetype
#define SAMPLE double
// corresponding format for RtAudio
#define MY_FORMAT RTAUDIO_FLOAT64
// sample rate
#define MY_SRATE 44100
// number of channels
#define MY_CHANNELS 2
// for convenience
#define MY_PIE 3.14159265358979

enum WaveType {sine, saw, pulse, noise, impulse};

struct callbackData {
	// global for frequency
	SAMPLE g_freq;// = 440;
	// global sample number variable
	SAMPLE g_t;// = 0;
	// global for width;
	SAMPLE g_width;// = 0;
	//global for input
	bool g_input;//=0;
	//global for wave type
	WaveType g_wave;
};

ofstream outfile("out.m");

//-----------------------------------------------------------------------------
// name: callme()
// desc: audio callback
//-----------------------------------------------------------------------------
int callme( void * outputBuffer, void * inputBuffer, unsigned int numFrames,
            double streamTime, RtAudioStreamStatus status, void * userData )
{
    // debug print something out per callback
	cerr << ".";
	
    // cast!
    SAMPLE * buffy = (SAMPLE *)outputBuffer;
	SAMPLE * inbuffy = (SAMPLE *)inputBuffer;
	callbackData *data = (callbackData *)userData;

	if (data->g_wave==sine) 
	{
    	for( int i = 0; i < numFrames; i++ )
    	{
	
        	// generate signal
        	buffy[i*MY_CHANNELS] = sin( 2 * MY_PIE * data->g_freq * data->g_t / MY_SRATE );
			
			
			// copy into other channels
        	for( int j = 1; j < MY_CHANNELS; j++ )
            	buffy[i*MY_CHANNELS+j] = buffy[i*MY_CHANNELS];
            outfile<<buffy[i*MY_CHANNELS]<<endl;


  		//multiply with input if needed
		if (data->g_input)
		buffy[i*MY_CHANNELS] = buffy[i*MY_CHANNELS]*inbuffy[i*MY_CHANNELS];

        	// increment sample number
        	data->g_t += 1.0;
		}
    }
    
	if (data->g_wave==saw) 
	{
		double slope1,slope2;
		slope1=data->g_freq/(MY_SRATE*data->g_width);
		slope2=data->g_freq/(MY_SRATE*(data->g_width-1));			
		cout<<slope1<<"           "<<slope2<<endl;
    	for( int i = 0; i < numFrames; i++ )
    	{


        	// generate signal
			if ((int)data->g_t % (int)(MY_SRATE/data->g_freq) < data->g_width*MY_SRATE/data->g_freq)
				buffy[i*MY_CHANNELS] = slope1*((int)data->g_t % (int)(MY_SRATE/data->g_freq));
			else
				buffy[i*MY_CHANNELS] = slope2*(((int)data->g_t % (int)(MY_SRATE/data->g_freq))-MY_SRATE/data->g_freq);
    
			// copy into other channels
	        	for( int j = 1; j < MY_CHANNELS; j++ )
	            	buffy[i*MY_CHANNELS+j] = buffy[i*MY_CHANNELS];
	            outfile<<buffy[i*MY_CHANNELS]<<endl;


	  		//multiply with input if needed
			if (data->g_input)
			buffy[i*MY_CHANNELS] = buffy[i*MY_CHANNELS]*inbuffy[i*MY_CHANNELS];

	
        	// increment sample number
				outfile<<buffy[i*MY_CHANNELS]<<endl;
        	data->g_t += 1.0;
		}
    }

	if (data->g_wave==pulse) 
	{
    	for( int i = 0; i < numFrames; i++ )
    	{
			int value;
        	// generate signal
			if ((int)data->g_t % (int)(MY_SRATE/data->g_freq) < data->g_width*MY_SRATE/data->g_freq)
				value = 1;
			else if ((int)data->g_t % (int)(MY_SRATE/data->g_freq) > data->g_width*MY_SRATE/data->g_freq)
				value = 0;
			

			buffy[i*MY_CHANNELS] = value;

			// copy into other channels
	        for( int j = 1; j < MY_CHANNELS; j++ )
	            buffy[i*MY_CHANNELS+j] = buffy[i*MY_CHANNELS];
	        outfile<<buffy[i*MY_CHANNELS]<<endl;


	  		//multiply with input if needed
			if (data->g_input)
			buffy[i*MY_CHANNELS] = buffy[i*MY_CHANNELS]*inbuffy[i*MY_CHANNELS];



        	// increment sample number
        	data->g_t += 1.0;
		}
    }

	if (data->g_wave==noise) 
	{
    	for( int i = 0; i < numFrames; i++ )
    	{
        	// generate signal
			buffy[i*MY_CHANNELS] = inbuffy[i+MY_CHANNELS]*(rand()%2);
        	outfile<<buffy[i*MY_CHANNELS]<<endl;
			// copy into other channels
	        for( int j = 1; j < MY_CHANNELS; j++ )
	            buffy[i*MY_CHANNELS+j] = buffy[i*MY_CHANNELS];
	        outfile<<buffy[i*MY_CHANNELS]<<endl;


	  		//multiply with input if needed
			if (data->g_input)
			buffy[i*MY_CHANNELS] = buffy[i*MY_CHANNELS]*inbuffy[i*MY_CHANNELS];
		}
    }


	if (data->g_wave==impulse) 
	{
    	for( int i = 0; i < numFrames; i++ )
    	{
        	// generate signal
			if ((int)data->g_t % (int)(MY_SRATE/data->g_freq) == 0)
				buffy[i*MY_CHANNELS] = 1;
			else
				buffy[i*MY_CHANNELS] = 0;
        outfile<<buffy[i*MY_CHANNELS]<<endl;
			// copy into other channels
	        for( int j = 1; j < MY_CHANNELS; j++ )
	            buffy[i*MY_CHANNELS+j] = buffy[i*MY_CHANNELS];
	        outfile<<buffy[i*MY_CHANNELS]<<endl;


	  		//multiply with input if needed
			if (data->g_input)
			buffy[i*MY_CHANNELS] = buffy[i*MY_CHANNELS]*inbuffy[i*MY_CHANNELS];
        	// increment sample number
        	data->g_t += 1.0;
		}

	}
    
	return 0;
}

//-----------------------------------------------------------------------------
// name: usageText()
// desc: prints the correct usage syntax
//-----------------------------------------------------------------------------

void usageText()
{	
	cout << "\nUSAGE";
	cout << "\n-----";
	cout << "\nprocreate [type] [frequency] [width] [--input]";
	cout << "\n          [type]: --sine | --saw | --pulse | --noise | --impulse";
	cout << "\n          [frequency]: (a number > 0, applicable to sine or impulse)";
	cout << "\n          [width]: (a number [0.0,1.0], applicable to sawtooth or pulse)";
	cout << "\n          [--input]: multiply output with input\n";
}

//-----------------------------------------------------------------------------
// name: parse()
// desc: checks validity of program parameters. Returns 0 if there's an error
//-----------------------------------------------------------------------------

int parse( int argc, char ** argv , callbackData &data)
{	
	if (argc>5)
	{
		cerr<<"ERROR: Excess number of arguments\n";
		usageText();
		return 0;
	}
	
	if (!(strcmp(argv[1],"--sine")==0 || strcmp(argv[1],"--saw")==0 || 
		 strcmp(argv[1],"--pulse")==0 || strcmp(argv[1],"--noise")==0 || strcmp(argv[1],"--impulse")==0 ))
	{
		cerr<<"ERROR: Wrong waveform specified\n";
		usageText();
		return 0;
	}
	
	if (strcmp(argv[1],"--sine")==0 || strcmp(argv[1],"--impulse")==0 )
	{
		if (!(argc==3 || argc==4))
		{
			cerr<<"ERROR: Wrong number of arguments\n";
			usageText();
			return 0;
		}
		double freq=atof(argv[2]);
		if (freq<=0)
		{
			cerr<<"ERROR: The frequency must be greater than zero\n";
			return 0;
		}
		data.g_freq=freq;
	
	if (argc==4)
		if (strcmp(argv[3],"--input")==0)
			data.g_input=1;
		else
		{
			cerr<<"ERROR: input flag not specified properly\n";
			usageText();
			return 0;
		}
	}

	if (strcmp(argv[1],"--saw")==0 || strcmp(argv[1],"--pulse")==0 )
	{
		if (!(argc==4 || argc==5))
		{
			cerr<<"ERROR: Wrong number of arguments\n";
			usageText();
			return 0;
		}
		
		double freq=atof(argv[2]);
		if (freq<=0)
		{
			cerr<<"ERROR: The frequency must be greater than zero\n";
			return 0;
		}
		data.g_freq=freq;

		double width=atof(argv[3]);
		if (width<0 || width>1)
		{
			cerr<<"ERROR: The width must be within [0.0,1.0]\n";
			return 0;
		}
		data.g_width=width;
		if (argc==5)
			if (strcmp(argv[4],"--input")==0)
				data.g_input=1;
			else
			{
				cerr<<"ERROR: input flag not specified properly\n";
				usageText();
				return 0;
			}
	}
	
	if (strcmp(argv[1],"--noise")==0)
	{
		if (!(argc==2 || argc==3))
		{
			cerr<<"ERROR: Wrong number of arguments\n";
			usageText();
			return 0;
		}
			
		if (argc==3)
		if (strcmp(argv[2],"--input")==0)
			data.g_input=1;
		else
		{
			cerr<<"ERROR: input flag not specified properly\n";
			usageText();
			return 0;
		}
	}
	
	if (strcmp(argv[1],"--sine")==0) data.g_wave=sine;
	else if (strcmp(argv[1],"--saw")==0) data.g_wave=saw;
	else if (strcmp(argv[1],"--pulse")==0) data.g_wave=pulse;	
	else if (strcmp(argv[1],"--noise")==0) data.g_wave=noise;	
	else if (strcmp(argv[1],"--impulse")==0) data.g_wave=impulse;
		
	return 1;
}



//-----------------------------------------------------------------------------
// name: main()
// desc: entry point
//-----------------------------------------------------------------------------
int main( int argc, char ** argv )
{

	
	
	callbackData data;
		// global for frequency
		data.g_freq=440;
		// global sample number variable
		data.g_t = 0;
		// global for width;
		data.g_width = 0;
		//global for input
		data.g_input=0;
		
	
	//check parameters and parse input
	if (!parse(argc,argv,data))
	{
		exit(0);
	}

    // instantiate RtAudio object
    RtAudio adac;
    // variables
    unsigned int bufferBytes = 0;
    // frame size
    unsigned int bufferFrames = 512;
    
    // check for audio devices
    if( adac.getDeviceCount() < 1 )
    {
        // nopes
        cout << "no audio devices found!" << endl;
        exit( 1 );
    }

    // let RtAudio print messages to stderr.
    adac.showWarnings( true );

    // set input and output parameters
    RtAudio::StreamParameters iParams, oParams;
    iParams.deviceId = adac.getDefaultInputDevice();
    iParams.nChannels = MY_CHANNELS;
    iParams.firstChannel = 0;
    oParams.deviceId = adac.getDefaultOutputDevice();
    oParams.nChannels = MY_CHANNELS;
    oParams.firstChannel = 0;
    
    // create stream options
    RtAudio::StreamOptions options;

    // go for it
    try {
        // open a stream
        adac.openStream( &oParams, &iParams, MY_FORMAT, MY_SRATE, &bufferFrames, &callme, (void *)&data, &options );
    }
    catch( RtError& e )
    {
        // error!
        cout << e.getMessage() << endl;
        exit( 1 );
    }

    // compute
    bufferBytes = bufferFrames * MY_CHANNELS * sizeof(SAMPLE);
    
    // test RtAudio functionality for reporting latency.
    cout << "stream latency: " << adac.getStreamLatency() << " frames" << endl;

    // go for it
    try {
        // start stream
        adac.startStream();

        // get input
        char input;
        std::cout << "running... press <enter> to quit (buffer frames: " << bufferFrames << ")" << endl;
        std::cin.get(input);
        
        // stop the stream.
        adac.stopStream();
    }
    catch( RtError& e )
    {
        // print error message
        cout << e.getMessage() << endl;
        goto cleanup;
    }
    
cleanup:
    // close if open
    if( adac.isStreamOpen() )
        adac.closeStream();
    
    // done
    outfile<<"];\nplot(x)";
    return 0;
}
