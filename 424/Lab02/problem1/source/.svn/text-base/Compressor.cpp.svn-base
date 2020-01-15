//-------------------------------------------------------------------------------------------------------
// VST Effect Plug-in
//
// Filename     : Compressor.cpp
// Created by   : music424 staff
// Company      : CCRMA - Stanford
// Description  : 
//
// Date         : 4/5/12
//-------------------------------------------------------------------------------------------------------

#include "Compressor.h"
#include <math.h>

//-------------------------------------------------------------------------------------------------------
AudioEffect* createEffectInstance (audioMasterCallback audioMaster)
{
	return new Compressor (audioMaster);
}

//-------------------------------------------------------------------------------------------------------
Compressor::Compressor (audioMasterCallback audioMaster)
: AudioEffectX (audioMaster, 1, kNumParams)	// 1 program, 1 parameter only
{
	setNumInputs (kNumInputs);       // stereo in
	setNumOutputs (kNumOutputs);     // stereo out
	setUniqueID ('Cmpr');            // identify
	canProcessReplacing ();          // supports replacing output
    
    
	vst_strncpy (programName, "Default", kVstMaxProgNameLen);	// default program name
    
	// internal state var declaration and initialization
	the_sample_rate = getSampleRate(); // read the Sample Rate from the VST host
    
    
    // initial knob values (position in the slider)
	InputGainKnob = 0.5;    // must be in the [0,1] range
	OutputGainKnob = 0.5;   // must be in the [0,1] range
	ThresholdKnob = 0.75;   // must be in the [0,1] range
	AttackKnob = 0.0;       // must be in the [0,1] range
	ReleaseKnob = 0.125;    // must be in the [0,1] range
	RatioKnob = 1.0;        // must be in the [0,1] range
    
    
    // translate knob position into parameter values
	input_gain = dB2lin(SmartKnob::knob2value(InputGainKnob, IGainLimits, IGainTaper));
	output_gain = dB2lin(SmartKnob::knob2value(OutputGainKnob, OGainLimits, OGainTaper));
	threshold = dB2lin(SmartKnob::knob2value(ThresholdKnob, ThresholdLimits, ThresholdTaper));
	logthresh = dB(threshold);
    attack_time = SmartKnob::knob2value(AttackKnob, ARateLimits, ARateTaper);
	release_time = SmartKnob::knob2value(ReleaseKnob, RRateLimits, RRateTaper);
    peak_detector.setTauAttack( attack_time, the_sample_rate);
    peak_detector.setTauRelease( release_time, the_sample_rate);
    
    
    ////////////////////////////////////////////////////////////////////////////
    // TODO - Problem 2: handle the compression ratio knob
    ////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////
    // TODO - Problem 3: handle the detector exponent (p) knob
    ////////////////////////////////////////////////////////////////////////////
    
	gainval = 1.0;
	dbgainval = 0.0;
    
}

//-------------------------------------------------------------------------------------------------------
Compressor::~Compressor ()
{
	// nothing to do here
}

//-------------------------------------------------------------------------------------------------------
void Compressor::setProgramName (char* name)
{
	vst_strncpy (programName, name, kVstMaxProgNameLen);
}

//-----------------------------------------------------------------------------------------
void Compressor::getProgramName (char* name)
{
	vst_strncpy (name, programName, kVstMaxProgNameLen);
}

//-----------------------------------------------------------------------------------------
void Compressor::setParameter (VstInt32 index, float value)
{
	switch (index)
	{
        case kParamInputGain :
            InputGainKnob=value;
            input_gain = dB2lin(SmartKnob::knob2value(InputGainKnob, IGainLimits, IGainTaper));
            break;
        case kParamThreshold:
            ThresholdKnob=value;
            threshold = dB2lin(SmartKnob::knob2value(ThresholdKnob, ThresholdLimits, ThresholdTaper));
            logthresh=dB(threshold);
            break;
        case kParamAttack :
            AttackKnob = value;
            attack_time = SmartKnob::knob2value(AttackKnob, ARateLimits, ARateTaper);
            peak_detector.setTauAttack( attack_time, the_sample_rate );
            break;
        case kParamRelease:
            ReleaseKnob = value;
            release_time = SmartKnob::knob2value(ReleaseKnob, RRateLimits, RRateTaper);
            peak_detector.setTauRelease( release_time, the_sample_rate );
            break;
        case kParamOutputGain:
            OutputGainKnob=value;
            output_gain = dB2lin(SmartKnob::knob2value(OutputGainKnob, OGainLimits, OGainTaper));
            break;
        case kParamRatio:
            ////////////////////////////////////////////////////////////////////////////
            // TODO - Problem 2: implement
            ////////////////////////////////////////////////////////////////////////////
            break;
        case kParamDetectorExponent:
            ////////////////////////////////////////////////////////////////////////////
            // TODO - Problem 3: implement
            ////////////////////////////////////////////////////////////////////////////
            break;
        default :
            break;
	}
}

//-----------------------------------------------------------------------------------------
float Compressor::getParameter (VstInt32 index)
{
	switch (index)
	{
        case kParamInputGain :
            return InputGainKnob;
            break;
        case kParamThreshold:
            return ThresholdKnob;
            break;
        case kParamAttack:
            return AttackKnob;
            break;
        case kParamRelease:
            return ReleaseKnob;
            break;
        case kParamRatio:
            return RatioKnob;
            break;
        case kParamOutputGain:
            return OutputGainKnob;
            break;
        case kParamDetectorExponent:
            return DetectorExponentKnob;
            break;
        default :
            return 0.0;
	}
}

//-----------------------------------------------------------------------------------------
void Compressor::getParameterName (VstInt32 index, char* label)
{
	switch (index)
	{
        case kParamInputGain :
            vst_strncpy(label, "InGain ",kVstMaxParamStrLen);
            break;
        case kParamThreshold:
            vst_strncpy(label, "Thresh ",kVstMaxParamStrLen);
            break;
        case kParamAttack:
            vst_strncpy(label, "At Time ",kVstMaxParamStrLen);
            break;
        case kParamRelease:
            vst_strncpy(label, "Rel Time ",kVstMaxParamStrLen);
            break;
        case kParamRatio:
            vst_strncpy(label, "Ratio ",kVstMaxParamStrLen);
            break;
        case kParamOutputGain:
            vst_strncpy(label, "OutGain ",kVstMaxParamStrLen);
            break;
        case kParamDetectorExponent:
            vst_strncpy(label, "Det Exp ",kVstMaxParamStrLen);
            break;
        default :
            *label = '\0';
            break;
	};
}

//-----------------------------------------------------------------------------------------
void Compressor::getParameterDisplay (VstInt32 index, char* text)
{
	switch (index)
	{
        case kParamInputGain :
            float2string(dB(input_gain), text,kVstMaxParamStrLen);
            break;
        case kParamThreshold :
            float2string(logthresh, text,kVstMaxParamStrLen);
            break;
        case kParamAttack:
            float2string(1000.0*attack_time, text, kVstMaxParamStrLen);
            break;
        case kParamRelease:
            float2string(1000.0*release_time, text, kVstMaxParamStrLen);
            break;
        case kParamOutputGain:
            float2string(dB(output_gain), text, kVstMaxParamStrLen);
            break;
        case kParamRatio:
            float2string(comp_ratio, text, kVstMaxParamStrLen);
            break;
        case kParamDetectorExponent:
            float2string(detector_exponent, text, kVstMaxParamStrLen);
            break;
        default :
            *text = '\0';
            break;
	};
}

//-----------------------------------------------------------------------------------------
void Compressor::getParameterLabel (VstInt32 index, char* label)
{
	switch (index)
	{
        case kParamInputGain :
            vst_strncpy(label, "dB", kVstMaxParamStrLen);
            break;
        case kParamThreshold:
            vst_strncpy(label, "dB", kVstMaxParamStrLen);
            break;
        case kParamAttack:
            vst_strncpy(label, "mSec", kVstMaxParamStrLen);
            break;
        case kParamRelease:
            vst_strncpy(label, "mSec", kVstMaxParamStrLen);
            break;
        case kParamRatio:
            vst_strncpy(label, " ", kVstMaxParamStrLen);
            break;
        case kParamOutputGain:
            vst_strncpy(label, "dB", kVstMaxParamStrLen);
            break;
        case kParamDetectorExponent:
            vst_strncpy(label, " ", kVstMaxParamStrLen);
            break;
        default :
            *label = '\0';
            break;
	};
}

//------------------------------------------------------------------------
bool Compressor::getEffectName (char* name)
{
	vst_strncpy (name, "BasicLimiter", kVstMaxEffectNameLen);
	return true;
}

//------------------------------------------------------------------------
bool Compressor::getProductString (char* text)
{
	vst_strncpy (text, "BasicLimiter", kVstMaxProductStrLen);
	return true;
}

//------------------------------------------------------------------------
bool Compressor::getVendorString (char* text)
{
	vst_strncpy (text, "Stanford MUS424", kVstMaxVendorStrLen);
	return true;
}

//-----------------------------------------------------------------------------------------
VstInt32 Compressor::getVendorVersion ()
{ 
	return 1000; 
}

//-----------------------------------------------------------------------------------------
void Compressor::processReplacing (float** inputs, float** outputs, VstInt32 sampleFrames)
{
    float* in1  =  inputs[0];
    float* in2  =  inputs[1];
    float* out1 = outputs[0];
    float* out2 = outputs[1];
    
    float level_estimate, log_level;
    
	for (int i = 0; i < sampleFrames; i++)
	{
		///////////// Process Loop (sample by sample) //////////////
        
		// Apply Input Gain to Signal
		float inp0=(*in1)*input_gain;
		float inp1=(*in2)*input_gain;		
        
        
		///////////  PEAK DETECTOR  //////////////////////////
        peak_detector.process(max(inp0, inp1), level_estimate);
        
        ////////////////////////////////////////////////////////////////////////////
        // TODO - Problem 2: replace the peak-detection scheme with an RMS detector
        ////////////////////////////////////////////////////////////////////////////
        
        ////////////////////////////////////////////////////////////////////////////
        // TODO - Problem 3: replace the peak-detection scheme with an RMp detector
        ////////////////////////////////////////////////////////////////////////////
        
        
		/////////////  GAIN COMPUTER  ///////////////////
        log_level = dB(level_estimate);
        
        // limiter setup
        dbgainval = min(0.0, dB(threshold/level_estimate));

        ////////////////////////////////////////////////////////////////////////////
        // TODO - Problem 2: implement the gain computer logic here, to turn the 
        //                   limiter into a basic compressor
        ////////////////////////////////////////////////////////////////////////////
        
		// Compute linear gain for compressor
		gainval = dB2lin(dbgainval);		
		
		// Apply compressor gain and output gain to signal
		*out1++ = inp0*gainval*output_gain;
		*out2++ = inp1*gainval*output_gain;
        
		// increment input buffer pointer for next sample
		in1++;in2++;
        
        
	}
}
