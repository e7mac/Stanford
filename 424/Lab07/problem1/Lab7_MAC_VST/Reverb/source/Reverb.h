//------------------------------------------------------------------------------
// VST Effect Plug-in
//
// Filename     : Reverb.h
// Created by   : jorgeh
// Company      : Stanford
// Description  : 
//
// Date         : 5/3/11
//------------------------------------------------------------------------------

#ifndef __Reverb__
#define __Reverb__

#include "public.sdk/source/vst2.x/audioeffectx.h"
#include <math.h>

#ifndef max
#define max(a,b)			(((a) > (b)) ? (a) : (b))
#endif

#ifndef min
#define min(a,b)			(((a) < (b)) ? (a) : (b))
#endif

#ifndef dB
// if below -100dB, set to -100dB to prevent taking log of zero
#define dB(x)               20.0 * ((x) > 0.00001 ? log10(x) : log10(0.00001))
#endif

#ifndef dB2mag
#define dB2mag(x)           pow( 10.0, (x) / 20.0 )
#endif

#define kMaxLen			32


//------------------------------------------------------------------------------
//  one-pole, one-zero shelf filter
struct HalfBiquad {			
    double	a1, b0, b1, z1;
    
    HalfBiquad()		{	this->a1=0.0; this->b0=1.0; this->b1=0.0; Reset();	}
    void	SetCoefs (double* coefs)		//pointer to array: [b0 b1 b2 a1 a2]
    {	this->a1=*(coefs+2); this->b0=*(coefs); this->b1=*(coefs+1);}
    void	Reset()	{	z1=0; }
    void	Process (double input, double& output)
    {
        //Transposed Direct II Form (PREFERRED)
        output = z1+input*b0;
        z1=input*b1-output*a1;
        
    }
};


//------------------------------------------------------------------------------
//  delay line
#define kMaxDelay 8192
struct DelayLine {			// delay line
    double	dly[kMaxDelay];							// double-precision delay line
    long	wp,rp,theDelay;							// read, write pointers and delay length
    DelayLine()		{
        int indx;
        for (indx=0; indx<kMaxDelay ; indx++){
            dly[indx]=0.0;							// clear delay line on instantiation
        }
        wp=0;rp=0;									// init write and read pointers to zero
    }
    void SetDelay(long aDelay)
    {	theDelay=aDelay;}
    void Write(double data)
    {	dly[wp]=data;}								// write data into line
    double Read()
    {	return dly[rp];}							// read data from line
    void UpdatePointers()							// advance read, write pointers
    {	wp--;
        if(wp<0)
            wp=kMaxDelay-1;
        rp=wp+theDelay;
        if(rp>kMaxDelay-1)
            rp-=kMaxDelay;
        if(rp>kMaxDelay-1)
            rp=kMaxDelay-1;
        if(rp<0)
            rp=0;
    }
};



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
class Reverb : public AudioEffectX
{
public:
	Reverb (audioMasterCallback audioMaster);
	~Reverb ();
    
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
    
	void designShelf(double* pcofs, long theLength, double transition, double T60low, double T60high);
    void bilinearTransform(double acoefs[], double dcoefs[]);
    void designParametric(double* dcoefs, double center, double gain, double qval);
    float getAlpha(float tau, float T60)
    {
        return pow(10,-3*tau/fs/T60);
    };
    
    
protected:
	// param IDs
	enum {
		kParamT60low	= 0,
		kParamT60high,
		kParamTransition,
		kParamWetDry,
        kParamQ,
        kParamGamma,
        kParamFc,
		kNumParams
	};
    
    
	// knob vars
	float T60LowKnob, T60LowValue;
	float T60HighKnob, T60HighValue;
	float TransitionKnob, TransitionValue;
	float WetDryKnob; // since the mix in the [0,1] range, we can use the knob value directly
    float ParametricQKnob, ParametricQValue;
    float ParametricGammaKnob, ParametricGammaValue;
    float ParametricFcKnob, ParametricFcValue;
	
	// config
	enum { 
		kNumProgs	= 1,
		kNumInputs	= 2,
		kNumOutputs	= 2
	};
    
	char	programName[kVstMaxProgNameLen + 1];
        
    
	// internal state var declaration and initialization
	double fs;
#define kNumDelays	12
	HalfBiquad fbfilt[kNumDelays];
	DelayLine dl[kNumDelays];
	double coefs[3];
	double*	pcoefs;
    
    // parametric section
    double parametric_coefs[5];
    Biquad parametric[2];
    
    
};

const static float InVecL[kNumDelays]={1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0};
const static float InVecR[kNumDelays]={0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0};
const static float OutVecL[kNumDelays]={1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0};
const static float OutVecR[kNumDelays]={0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0,0.0,1.0};
const static float dlens[kNumDelays]={2023,2153,2291,2438,2595,2761,2939,3127,3328,3542,3769,4011};


// UI controls limits and tapers
const static float T60LowLimits[2] = {0.01, 10.0};
const static float T60LowTaper = -1;

const static float T60HighLimits[2] = {0.01, 10.0};
const static float T60HighTaper = -1;

const static float TransitionLimits[2] = {50.0, 16000.0};
const static float TransitionTaper = -1;

const static float ParametricGammaLimits[2] = {-24.0, 24.0};
const static float ParametricGammaTaper = 1.0;

const static float ParametricFcLimits[2] = {50.0, 16000.0};
const static float ParametricFcTaper = -1.0;

const static float ParametricQLimits[2] = {0.25, 32.0};
const static float ParametricQTaper = -1.0;


/*
const static double FB[kNumDelays][kNumDelays]={	
    //Identity Mixing Matrix (no mixing, actually)
    {+1.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, },
    {+0.00000, +1.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, },
    {+0.00000, +0.00000, +1.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, },
    {+0.00000, +0.00000, +0.00000, +1.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, },
    {+0.00000, +0.00000, +0.00000, +0.00000, +1.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, },
    {+0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +1.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, },
    {+0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +1.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, },
    {+0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +1.00000, +0.00000, +0.00000, +0.00000, +0.00000, },
    {+0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +1.00000, +0.00000, +0.00000, +0.00000, },
    {+0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +1.00000, +0.00000, +0.00000, },
    {+0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +1.00000, +0.00000, },
    {+0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +0.00000, +1.00000, },
    */
// TODO: replace the identity "mixing" matrix with a matrix that actaully mixes! 
// You can use the Hadamard matrix provided below or you can create a different
// one using the orthonorm.m matlab script provided.

    

 //Hadamard Mixing Matrix
 const static double FB[kNumDelays][kNumDelays]={	
 {0.2887,    0.2887,    0.2887,    0.2887,    0.2887,    0.2887,    0.2887,    0.2887,    0.2887,    0.2887,    0.2887,    0.2887,},
 {0.2887,   -0.2887,    0.2887,   -0.2887,    0.2887,    0.2887,    0.2887,   -0.2887,   -0.2887,   -0.2887,    0.2887,   -0.2887,},
 {0.2887,   -0.2887,   -0.2887,    0.2887,   -0.2887,    0.2887,    0.2887,    0.2887,   -0.2887,   -0.2887,   -0.2887,    0.2887,},
 {0.2887,    0.2887,   -0.2887,   -0.2887,    0.2887,   -0.2887,    0.2887,    0.2887,    0.2887,   -0.2887,   -0.2887,   -0.2887,},
 {0.2887,   -0.2887,    0.2887,   -0.2887,   -0.2887,    0.2887,   -0.2887,    0.2887,    0.2887,    0.2887,   -0.2887,   -0.2887,},
 {0.2887,   -0.2887,   -0.2887,    0.2887,   -0.2887,   -0.2887,    0.2887,   -0.2887,    0.2887,    0.2887,    0.2887,   -0.2887,},
 {0.2887,   -0.2887,   -0.2887,   -0.2887,    0.2887,   -0.2887,   -0.2887,    0.2887,   -0.2887,    0.2887,    0.2887,    0.2887,},
 {0.2887,    0.2887,   -0.2887,   -0.2887,   -0.2887,    0.2887,   -0.2887,   -0.2887,    0.2887,   -0.2887,    0.2887,    0.2887,},
 {0.2887,    0.2887,    0.2887,   -0.2887,   -0.2887,   -0.2887,    0.2887,   -0.2887,   -0.2887,    0.2887,   -0.2887,    0.2887,},
 {0.2887,    0.2887,    0.2887,    0.2887,   -0.2887,   -0.2887,   -0.2887,    0.2887,   -0.2887,   -0.2887,    0.2887,   -0.2887,},
 {0.2887,   -0.2887,    0.2887,    0.2887,    0.2887,   -0.2887,   -0.2887,   -0.2887,    0.2887,   -0.2887,   -0.2887,    0.2887,},
 {0.2887,    0.2887,   -0.2887,    0.2887,    0.2887,    0.2887,   -0.2887,   -0.2887,   -0.2887,    0.2887,   -0.2887,   -0.2887,},


};




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



#endif	// __Reverb__
