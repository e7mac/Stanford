//------------------------------------------------------------------------------
// VST Effect Plug-in
//
// Filename     : Distortion.h
// Created by   : music424 staff
// Company      : CCRMA - Stanford University
// Description  : 
//
// Date         : 5/10/11
//------------------------------------------------------------------------------

#ifndef __Distortion__
#define __Distortion__

#include "public.sdk/source/vst2.x/audioeffectx.h"
#include <math.h>

#ifndef dB
// if below -100dB, set to -100dB to prevent taking log of zero
#define dB(x)               20.0 * ((x) > 0.00001 ? log10(x) : log10(0.00001))
#endif

#ifndef dB2mag
#define dB2mag(x)           pow( 10.0, (x) / 20.0 )
#endif

#define kMaxLen			32

#define pi 3.14159265358979


//------------------------------------------------------------------------------
// signal processing functions
struct Biquad {
    //  biquad filter section
    double	b0, b1, b2, a1, a2, z1, z2;
    
    Biquad() {
        this->b0=1.0;
        this->b1=0.0;
        this->b2=0.0;
        this->a1=0.0;
        this->a2=0.0;
        reset();
    }
    void setCoefs(double* coefs) {
        // set filter coefficients [b0 b1 b2 a1 a2]
        this->b0=*(coefs);
        this->b1=*(coefs+1);
        this->b2=*(coefs+2);
        this->a1=*(coefs+3);
        this->a2=*(coefs+4);
    }
    void reset() {
        // reset filter state
        z1=0;
        z2=0;
    }
    void process (double input, double& output) {
        // process input sample, direct form II transposed
        output = z1 + input*b0;
        z1 = z2 + input*b1 - output*a1;
        z2 = input*b2 - output*a2;
    }
};


//------------------------------------------------------------------------------
class Distortion : public AudioEffectX
{
public:
	Distortion (audioMasterCallback audioMaster);
	~Distortion ();
    
	// Processing
	virtual void processReplacing (float** inputs, float** outputs, 
                                   VstInt32 sampleFrames);
    
	// Program
	virtual void setProgramName (char* name);
	virtual void getProgramName (char* name);
    
	// Parameters
	virtual void setParameter (VstInt32 index, float value);
	virtual float getParameter (VstInt32 index);
	virtual void getParameterLabel (VstInt32 index, char* label);
	virtual void getParameterDisplay (VstInt32 index, char* text);
	virtual void getParameterName (VstInt32 index, char* text);
    
	void bilinearTranform(double acoefs[], double dcoeffs[]);
	void designParametric(double* peqcofs, double center, double gain, double qval);
    
	virtual bool getEffectName (char* name);
	virtual bool getVendorString (char* text);
	virtual bool getProductString (char* text);
	virtual VstInt32 getVendorVersion ();
    
    
protected:
	char	programName[kVstMaxProgNameLen + 1];
    
	// configuration
	enum { 
		kNumProgs	= 1,
		kNumInputs	= 2,
		kNumOutputs	= 2
	};
    
	// user interface parameters
	enum {
		kParamDrive,
		kParamLevel,
		kParamGainIn,
		kParamFcIn,
		kParamQIn,
		kParamGainOut,
		kParamFcOut,
		kParamQOut,
		kNumParams
	};
    
	float DriveKnob, DriveValue;	// input gain, dB
	float LevelKnob, LevelValue;	// output gain, dB
    
	float GainInKnob, GainInValue;	// input filter gain, dB
	float FcInKnob, FcInValue;	// input filter center frequency, Hz
	float QInKnob, QInValue;	// input filter resonance, ratio
    
	float GainOutKnob, GainOutValue;	// output filter gain, dB
	float FcOutKnob, FcOutValue;	// output filter center frequency, Hz
	float QOutKnob, QOutValue;	// output filter resonance, ratio
    
    
    // signal processing parameters and state
	double fs;	// sampling rate, Hz
    
	double drive, level;	// input, output gains, amplitude
    
	double InCoefs[5];	// input filter coefficients
	Biquad InFilter;	// input filter
    
	double OutCoefs[5];	// input filter coefficients
	Biquad OutFilter;	// output filter
    
	enum{kUSRatio = 8};	// upsampling factor, sampling rate ratio
	enum{kAAOrder = 1};	// antialiasing/antiimaging filter order, biquads
	Biquad AIFilter[kAAOrder];	// antiimaging filter
	Biquad AAFilter[kAAOrder];	// antialiasing filter
    
};


// antialiasing/antiimaging filter coefficients
// Needs modification (cutoff freq, number of biquads)
// If number of biquads changed, make sure to change kAAOrder above.


// TODO: Design the Anti-alias/Anti-imaging filter in matlab and input here
///////////////START//////////////////

const static double AACoefs[1][5] = {
	{0.2929,    1.0000,         0,    -0.4142,         0,},
};

////////////////END/////////////////////








// input drive limits, dB; taper, exponent
const static float DriveLimits[2] = {-24.0, 24.0};
const static float DriveTaper = 1.0;

// output level limits, dB; taper, exponent
const static float LevelLimits[2] = {-48.0, 24.0};
const static float LevelTaper = 1.0;


// input filter gain limits, dB; taper, exponent
const static float GainInLimits[2] = {-24.0, 24.0};
const static float GainInTaper = 1.0;

// input filter center frequency limits, hz; taper, exponent
const static float FcInLimits[2] = {50.0, 5000.0};
const static float FcInTaper = -1.0;

// input filter resonance limits, dB; taper, exponent
const static float QInLimits[2] = {0.25, 32.0};
const static float QInTaper = -1.0;


// output filter gain limits, dB; taper, exponent
const static float GainOutLimits[2] = {-24.0, 24.0};
const static float GainOutTaper = 1.0;

// output filter center frequency limits, hz; taper, exponent
const static float FcOutLimits[2] = {50.0, 5000.0};
const static float FcOutTaper = -1.0;

// output filter resonance limits, dB; taper, exponent
const static float QOutLimits[2] = {0.25, 32.0};
const static float QOutTaper = -1.0;


//------------------------------------------------------------------------------
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


#endif	// __Distortion_HPP


