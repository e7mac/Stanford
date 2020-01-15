//
//  AudioFeatures.h
//  MUSIC256AProject
//
//  Created by Christopher Fajardo on 12/7/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//
//  Uses varius libraries to get the features that I need from audio input
//  aubio, libxtract, chuck_fft

#ifndef MUSIC256AProject_AudioFeatures_h
#define MUSIC256AProject_AudioFeatures_h

#include "aubio.h"
#include "aubioext.h"
#include "xtract/libxtract.h"
#include "chuck_fft.h"
#include <iostream>
using namespace std;

//aubio class to get the features that I need
class Aubio
{
public:
    Aubio();
    ~Aubio();
    
    //---------------------------------------------------------
    // name: aubio_get_pitch_on_onset()
    // desc: using aubio, extract the pitch if onset detected
    //---------------------------------------------------------
    float aubio_get_freq_pitch_on_onset(float *input);
    float aubio_get_midi_pitch_on_onset(float *input);
    int aubio_get_onset(float *input);
    
    //---------------------------------------------------------
    // name: aubio_init, aubio_del
    // desc: aubio keeps state over time 
    //       needs to be initialized and deleted
    //---------------------------------------------------------
    void aubio_init(int bufferSize, int n_channels, int sampleRate);
    void aubio_del();
    
protected:
    aubio_pickpeak_t * parms;
    uint_t buffer_size;
    uint_t overlap_size;
    uint_t usepitch;
    uint_t channels;
    uint_t samplerate;
    aubio_onsetdetection_type type_onset;
    smpl_t threshold;
    smpl_t silence;
    aubio_pvoc_t * pv;
    fvec_t * ibuf;
    cvec_t * fftgrain;
    aubio_onsetdetection_t *o;
    fvec_t *onset;
    int isonset;
    
    smpl_t pitch;
    aubio_pitchdetection_t * pitchdet;
    aubio_pitchdetection_type type_pitch;
    aubio_pitchdetection_mode mode_pitch;

    bool aubio_is_onset(fvec_t * ibuf);
};

//---------------------------------------------------------
// name: getVariance
// desc: using libxtract
//---------------------------------------------------------
float getVariance(float *input, unsigned int bufferSize);

//---------------------------------------------------------
// name: take_fft
// desc: using chuck_fft
//---------------------------------------------------------
void fft_init(int zpf, int useWindow, int bufferSize);
void fft_del();
void take_fft(float * in, float * fftBuff);

#endif
