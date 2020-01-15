// 
//  MyAudio.cpp
//  stkExample
//  
//  Created by Jorge Herrera on 2011-10-26.
// 
//  ------------------
//  Class to abstract audio stream
//  IMPORTANT: it will quit the app if it can't setup or start!!!


#include "MyAudio.h"
#include <iostream>

// constructor
MyAudio::MyAudio( unsigned int nChann, float sr, unsigned int buffSize )
{
    m_audio = NULL;
    m_numChannels = nChann;
    m_sampleRate = sr;
    m_bufferSize = buffSize;
}

// destructor
MyAudio::~MyAudio()
{
    if( m_audio )
    {
        stop();
        delete m_audio;
    }
}

// RtAudio configuration
void MyAudio::setup( RtAudioCallback callback, void * userData )
{
    if( !callback )
    {
        std::cerr << "No callback provided!" << std::endl;
        exit(1);
    }
        
    try
    {
        m_audio = new RtAudio();
    }
        catch( RtError & err ) {
        err.printMessage();
        exit(1);
    }

    if( m_audio->getDeviceCount() < 1 )
    {
        // nopes
        std::cout << "no audio devices found!" << std::endl;
        exit(1);
    }
        
    // let RtAudio print messages to stderr.
    m_audio->showWarnings( true );

    // set input and output parameters
    RtAudio::StreamParameters iParams, oParams;
    iParams.deviceId = m_audio->getDefaultInputDevice();
    iParams.nChannels = m_numChannels;
    iParams.firstChannel = 0;
    oParams.deviceId = m_audio->getDefaultOutputDevice();
    oParams.nChannels = m_numChannels;
    oParams.firstChannel = 0;
    
    // set the callback and start stream
    try
    {
        m_audio->openStream( &oParams, 
                             &iParams, 
                             RTAUDIO_FLOAT64, 
                             m_sampleRate, 
                             &m_bufferSize, 
                             callback, 
                             userData);
        
        std::cerr << "Buffer size defined by RtAudio: " << m_bufferSize << std::endl;
    }
    catch( RtError & err )
    {
        err.printMessage();
        exit(1);
    }
    
}

// start audio stream
void MyAudio::start()
{
    try
    {
         m_audio->startStream();        
        // test RtAudio functionality for reporting latency.
        std::cout << "stream latency: " << m_audio->getStreamLatency() << " frames" << std::endl;
    }
    catch( RtError & err )
    {
        err.printMessage();
        exit(1);
    }
}

// stop audio stream
void MyAudio::stop()
{
    if( m_audio )
    {
        if ( m_audio->isStreamRunning() ) m_audio->stopStream();
        if ( m_audio->isStreamOpen() ) m_audio->closeStream();
    }
}
