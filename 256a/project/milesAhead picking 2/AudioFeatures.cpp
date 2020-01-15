//
//  AubioFeatures.cpp
//  MUSIC256AProject
//
//  Created by Christopher Fajardo on 12/8/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#include <iostream>
#include <math.h>
#include "AudioFeatures.h"

float * window = NULL;
int zpf = 1;
int fft_buff_size = 1024;
int use_window;

Aubio::Aubio()
{
    buffer_size                    = 1024;
    overlap_size                   = 512;
    usepitch = 1;
    channels = 1;
    samplerate = 44100;
    type_onset  = aubio_onset_hfc;
    threshold = 0.5;
    silence  = -50.;
    isonset = 0;
    
    pitch               = 0.;
    type_pitch = aubio_pitch_yinfft;
    mode_pitch = aubio_pitchm_freq;
    
}

Aubio::~Aubio(){
    aubio_del();
}

void Aubio::aubio_init(int bufferSize, int n_channels, int sampleRate){
    buffer_size                    = bufferSize;
    overlap_size                   = bufferSize/2;
    channels = n_channels;
    samplerate = sampleRate;
    
    parms = new_aubio_peakpicker(threshold);
    ibuf      = new_fvec(overlap_size, channels);
    fftgrain  = new_cvec(buffer_size, channels);
    /* phase vocoder */
    pv = new_aubio_pvoc(buffer_size, overlap_size, channels);
    /* onsets */
    
    o = new_aubio_onsetdetection(type_onset,buffer_size,channels);
    onset = new_fvec(1, channels);
    
    pitchdet = new_aubio_pitchdetection(buffer_size*4, 
                                        overlap_size, channels, samplerate, type_pitch, mode_pitch);
    aubio_pitchdetection_set_yinthresh(pitchdet, 0.7);
}

void Aubio::aubio_del()
{
    del_aubio_onsetdetection(o);
    del_aubio_peakpicker(parms);
    del_aubio_pvoc(pv);
    del_fvec(ibuf);
    del_cvec(fftgrain);
    del_fvec(onset);
    del_aubio_pitchdetection(pitchdet);
    aubio_cleanup();
    
}

bool Aubio::aubio_is_onset(fvec_t * ibuf){
    aubio_pvoc_do (pv,ibuf, fftgrain);
    aubio_onsetdetection(o,fftgrain, onset);
    return aubio_peakpick_pimrt(onset,parms);
}

int Aubio::aubio_get_onset(float *input)
{
    
    for (int i=0; i<overlap_size; i++){
        for (int j=0; j<channels; j++) {
            fvec_write_sample(ibuf, input[i], j, i);
        }
    }
    
    isonset = aubio_is_onset(ibuf);
    
    if (isonset) {
        /* test for silence */
        if (aubio_silence_detection(ibuf, silence)!=1)
            return 1;
    }
    
    return 0;
}

float Aubio::aubio_get_freq_pitch_on_onset(float *input)
{
    
    for (int i=0; i<overlap_size; i++){
        for (int j=0; j<channels; j++) {
            fvec_write_sample(ibuf, input[i], j, i);
        }
    }
    
    isonset = aubio_is_onset(ibuf);
    
    pitch = aubio_pitchdetection(pitchdet,ibuf);
    
    if (isonset) {
        /* test for silence */
        if (aubio_silence_detection(ibuf, silence)!=1)
            return pitch;
    }
    
    return 0;
}

float Aubio::aubio_get_midi_pitch_on_onset(float *input)
{
    float freq = aubio_get_freq_pitch_on_onset(input);
    if (freq){
        float midi = floor(aubio_freqtomidi(freq)+.5);
        return midi;
    }
    else return 0;
}

float getVariance(float *input, unsigned int bufferSize)
{
    float mean = 0;
    float var = 0;
    
    xtract[XTRACT_MEAN](input, bufferSize, NULL, &mean);
    xtract[XTRACT_VARIANCE](input, bufferSize, &mean, &var);
    
    return var;
}

void fft_init(int ZPF, int useWindow, int bufferSize){
    fft_buff_size = bufferSize;
    zpf = ZPF;
    use_window = useWindow;
    window = new float[fft_buff_size];
    
    make_window( window, fft_buff_size );
}

void fft_del()
{
    free(window);
}

void take_fft( float * in, float * fftBuff)
{
    memset( fftBuff, 0, zpf * fft_buff_size * sizeof(float) );
    
    for(size_t i = 0; i < fft_buff_size; ++i)
    {
        fftBuff[i] = in[i];
    }
    
    if( use_window ){
        apply_window( fftBuff, window, fft_buff_size );
    }
    
    rfft( fftBuff, zpf * fft_buff_size / 2, FFT_FORWARD );
}
