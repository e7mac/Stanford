//------------------------------------------------------------------------------
// VST WahWah Plug-In
//
// Filename     : WahWah.h
//
//------------------------------------------------------------------------------

#ifndef __WahWah__
#define __WahWah__

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
#define eps 2.220446049250313e-16


//------------------------------------------------------------------------------
//  biquad filter section
class Biquad {
    
protected:
    float	b0, b1, b2, a1, a2, z1, z2;
    
public:
    Biquad() {
        this->b0=1.0;
        this->b1=0.0;
        this->b2=0.0;
        this->a1=0.0;
        this->a2=0.0;
        reset();
    }
    
    void setCoefs(float* coefs) {
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
    
    void process (float input, float& output) {
        // process input sample, direct form II transposed
        output = z1 + input*b0;
        z1 = z2 + input*b1 - output*a1;
        z2 = input*b2 - output*a2;
    }
};


//------------------------------------------------------------------------------
// signal processing functions
class SlewedParameter {
	
protected:
	float	b0, a1, z1;
	
public:
	SlewedParameter() {
		
		// default pass through
		this->a1 = 0;
		this->b0 = 1;
		reset();
	}
	
	void setTau(float tau, float fs) {
		///////////////START//////////////////
        a1 = exp( -1.0 / ( tau * fs ) );
		b0 = 1 - a1;
		///////////////END//////////////////
	}
	
	void reset() {
		// reset filter state
		z1=0;
	}
	void process (float input, float& output) {
		///////////////START//////////////////
        z1 += b0 * ( input - z1 );
		output = z1;
		///////////////END//////////////////
	}
};



//---------------------------------------------------------
// Peak detector
class PeakDetector 
{    
protected:
	float	b0_r, a1_r, b0_a, a1_a, levelEstimate;
    
public:
	PeakDetector() 
    {
		
		// default to pass-through
		this->a1_r = 0; // release coeffs
		this->b0_r = 1; 
		this->a1_a = 0; // attack coeffs
		this->b0_a = 1;
		reset();
	}
	
	void setTauRelease(float tauRelease, float fs) 
    {
		a1_r = exp( -1.0 / ( tauRelease * fs ) );
		b0_r = 1 - a1_r;
	}
    
	void setTauAttack(float tauAttack, float fs) 
    {
		a1_a = exp( -1.0 / ( tauAttack * fs ) );
		b0_a = 1 - a1_a;
	}
	
	void reset() 
    {
		// reset filter state
		levelEstimate=0;
	}
	
	void process (float input, float& output) 
    {        
		if ( input > levelEstimate )
            levelEstimate += b0_a * ( input - levelEstimate );
        else
            levelEstimate += b0_r * ( input - levelEstimate );
            output = levelEstimate;
    }
};


//------------------------------------------------------------------------------
class WahWah : public AudioEffectX
{
public:
	WahWah (audioMasterCallback audioMaster);
	~WahWah ();

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

	void bilinearTranform(float acoefs[], float dcoeffs[]);
	void designResonantLowPass(float* dcoefs, float center, float qval);
	float LFO(float f0);
	float frequencyComputer(float fc, float rate, float depth);

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
		kParamFc,
		kParamQ,
		kParamRate,
		kParamDepth,
		kParamGain,
		kNumParams
	};


	float GainKnob, GainValue;	// filter gain, dB
	float FcKnob, FcValue;	// filter center frequency, Hz
	float QKnob, QValue;	// filter resonance, ratio
	float drive;
	
	float RateKnob, RateValue;
	float DepthKnob, DepthValue;

	// signal processing parameters and state
	float fs;	// sampling rate, Hz
	
	SlewedParameter fcSlewer, gSlewer, qSlewer, modSlewer;
	
	
	float lpCoefs[5];	// filter coefficients
	Biquad lpFilter;		// filter
    
    PeakDetector peak_detector;

};


// input filter gain limits, dB; taper, exponent
const static float GainLimits[2] = {-24.0, 24.0};
const static float GainTaper = 1.0;

// input filter center frequency limits, hz; taper, exponent
const static float FcLimits[2] = {50.0, 5000.0};
const static float FcTaper = -1.0;

// input filter resonance limits, dB; taper, exponent
const static float QLimits[2] = {0.25, 32.0};
const static float QTaper = -1.0;

const static float RateLimits[2] = {0.01, 10.0};
const static float RateTaper = -1.0;

const static float DepthLimits[2] = {0.01, 100.0};
const static float DepthTaper = -1.0;
 
 

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



#endif	// __WahWah_HPP


