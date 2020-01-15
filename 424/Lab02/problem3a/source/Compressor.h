//-------------------------------------------------------------------------------------------------------
// VST Effect Plug-in
//
// Filename     : Compressor.h
// Created by   : music424 staff
// Company      : CCRMA - Stanford
// Description  : 
//
// Date         : 4/5/12
//-------------------------------------------------------------------------------------------------------

#ifndef __compressor__
#define __compressor__

#include "public.sdk/source/vst2.x/audioeffectx.h"
#include <math.h>
#include <algorithm>

#ifndef dB
// if below -100dB, set to -100dB to prevent taking log of zero
#define dB(x)               20.0 * ((x) > 0.00001 ? log10(x) : log10(0.00001))
#endif

#ifndef dB2lin
#define dB2lin(x)           pow( 10.0, (x) / 20.0 )
#endif

#define kMaxLen             32


//-------------------------------------------------------------------------------------------------------
// Peak detector
class PeakDetector {

protected:
	float	b0_r, a1_r, b0_a, a1_a, levelEstimate;

public:
	PeakDetector() {
		
		// default to pass-through
		this->a1_r = 0; // release coeffs
		this->b0_r = 1; 
		this->a1_a = 0; // attack coeffs
		this->b0_a = 1;
		reset();
	}
	
	void setTauRelease(float tauRelease, float fs) {
		a1_r = exp( -1.0 / ( tauRelease * fs ) );
		b0_r = 1 - a1_r;
	}
    
	void setTauAttack(float tauAttack, float fs) {
		a1_a = exp( -1.0 / ( tauAttack * fs ) );
		b0_a = 1 - a1_a;
	}
	
	void reset() {
		// reset filter state
		levelEstimate=0;
	}
	
	void process (float input, float threshold, float& output) {        
		if ( input > levelEstimate )
            levelEstimate += b0_a * ( input - levelEstimate );
        else
            levelEstimate += b0_r * ( std::max(input - levelEstimate);
        output = levelEstimate;
	}
};


//-------------------------------------------------------------------------------------------------------
// The VST plug-in
class Compressor : public AudioEffectX
{
public:
	Compressor (audioMasterCallback audioMaster);
	~Compressor ();
    
	// Processing
	virtual void processReplacing (float** inputs, float** outputs, VstInt32 sampleFrames);
    
	// Program
	virtual void setProgramName (char* name);
	virtual void getProgramName (char* name);
    
	// Parameters
	virtual void setParameter (VstInt32 index, float value);
	virtual float getParameter (VstInt32 index);
	virtual void getParameterLabel (VstInt32 index, char* label);
	virtual void getParameterDisplay (VstInt32 index, char* text);
	virtual void getParameterName (VstInt32 index, char* text);
    
	virtual bool getEffectName (char* name);
	virtual bool getVendorString (char* text);
	virtual bool getProductString (char* text);
	virtual VstInt32 getVendorVersion ();
    
protected:
	// param IDs
	enum {
		kParamInputGain	= 0,
		kParamThreshold,
		kParamAttack,
		kParamRelease,
		kParamRatio,
		kParamOutputGain,
        kParamDetectorExponent,
		kNumParams
	};
    
    
	// knob vars
	float InputGainKnob;
	float AttackKnob;
	float ReleaseKnob;
	float ThresholdKnob;
	float RatioKnob;
	float OutputGainKnob;
	
	// config
	enum { 
		kNumProgs	= 1,
		kNumInputs	= 2,       // our process replacing assumes stereo inputs
		kNumOutputs	= 2
	};
    
	char	programName[kVstMaxProgNameLen + 1];
    
    
	// internal state var declaration and initialization
	float the_sample_rate;    // the sampling rate (this is usually set in the VST host,
                               // so don't hard-code it in your plug-in)
	float input_gain;         // input gain linear scale
	float output_gain;        // output gain linear scale
	float attack_time;        // attack time in seconds
	float release_time;       // release time in seconds
	float threshold;          // compression threshold in linear scale
	float logthresh;          // compression threshold in logarithmic scale
	float comp_ratio;         // compression ratio
    float detector_exponent;  // peak detector exponent
	float gainval;            // compressor's gain computer gain in linear scale
	float dbgainval;          // compressor's gain computer gain in dB scale
    
    // the compressor's detector
    PeakDetector peak_detector;
};


//-------------------------------------------------------------------------------------------------------
// Parameters (knobs) ranges and scale types

// input filter gain limits, dB; taper, exponent
const static float IGainLimits[2] = {-30.0, 30.0};
const static float IGainTaper = 1.0;

// output filter gain limits, dB; taper, exponent
const static float OGainLimits[2] = {-30.0, 30.0};
const static float OGainTaper = 1.0; 

// Threshold limits, dB; taper, exponent
const static float ThresholdLimits[2] = {-30.0, 0.0};
const static float ThresholdTaper = 1.0;

// Attack rate limits, seconds; taper, exponent
const static float ARateLimits[2] = {0.0001, 0.1};
const static float ARateTaper = -1.0;

// Release rate limits, seconds; taper, exponent
const static float RRateLimits[2] = {0.050, 5.0};
const static float RRateTaper = -1.0;

// Compression ratio limits; taper, exponent
const static float RatioLimits[2] = {1, 1000.0};
const static float RatioTaper = -1.0;


// "static" class to faciliate the knob handling
class SmartKnob {
public:
    // convert knob on [0,1] to value in [limits[0],limits[1]] according to taper
    static float knob2value(float knob, const float *limits, float taper)
    {
        float value;
        if (taper > 0.0) {  // algebraic taper
            value = limits[0] + (limits[1] - limits[0]) * pow(knob, taper);
        } else {            // exponential taper
            value = limits[0] * exp(log(limits[1]/limits[0]) * knob);
        }
        return value;
    };
    
    // convert value in [limits[0],limits[1]] to knob on [0,1] according to taper
    static float value2knob(float value, const float *limits, float taper)
    {
        float knob;
        if (taper > 0.0) {  // algebraic taper
            knob = pow((value - limits[0])/(limits[1] - limits[0]), 1.0/taper);
        } else {            // exponential taper
            knob = log(value/limits[0])/log(limits[1]/limits[0]);
        }
        return knob;
    };

};


#endif
