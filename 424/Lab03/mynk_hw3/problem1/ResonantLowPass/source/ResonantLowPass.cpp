//------------------------------------------------------------------------------
// VST Resonant Low Pass Plug-In
//
// Filename     : ResonantLowPass.cpp
// 
//------------------------------------------------------------------------------

#include "ResonantLowPass.h"
#include <stdlib.h>

//------------------------------------------------------------------------------
AudioEffect* createEffectInstance (audioMasterCallback audioMaster)
{
	return new ResonantLowPass (audioMaster);
}

//------------------------------------------------------------------------------
ResonantLowPass::ResonantLowPass (audioMasterCallback audioMaster)
: AudioEffectX (audioMaster, kNumProgs, kNumParams)	// 1 program, 1 parameter only
{
	setNumInputs (kNumInputs);		// stereo in
	setNumOutputs (kNumOutputs);		// stereo out
	setUniqueID ('Dstn');	// identify
	canProcessReplacing ();	// supports replacing output

	vst_strncpy (programName, "Default", kVstMaxProgNameLen);	// default program name

	GainValue = (float) 0.0;	// input filter gain, dB
	FcValue = (float) 100.0;	// input filter center frequency, Hz
	QValue = (float) 5.0;	// input filter resonance, ratio

	GainKnob = SmartKnob::value2knob(GainValue, GainLimits, GainTaper);
	FcKnob = SmartKnob::value2knob(FcValue, FcLimits, FcTaper);
	QKnob = SmartKnob::value2knob(QValue, QLimits, QTaper);

	drive = 1.0;
 
	// signal processing parameter and state initialization
	fs = getSampleRate();	// sampling rate, Hz
	
	// design new input filter
	designResonantLowPass(lpCoefs, FcValue, QValue);
	lpFilter.setCoefs(lpCoefs);
	
}

//------------------------------------------------------------------------------
ResonantLowPass::~ResonantLowPass ()
{
	// nothing to do here
}

//------------------------------------------------------------------------------
void ResonantLowPass::setProgramName (char* name)
{
	vst_strncpy (programName, name, kVstMaxProgNameLen);
}

//------------------------------------------------------------------------------
void ResonantLowPass::getProgramName (char* name)
{
	vst_strncpy (name, programName, kVstMaxProgNameLen);
}

//------------------------------------------------------------------------------
void ResonantLowPass::setParameter(VstInt32 index, float value)
{

	// assign control and signal processing parameter values
	switch (index)
	{

	case kParamGain:
		// input filter gain, dB
		GainKnob = value;
		GainValue = SmartKnob::knob2value(GainKnob, GainLimits, GainTaper);
			
		// input gain, amplitude
		drive = dB2mag( GainValue );

		break;

	case kParamFc:
		// input filter center frequency, Hz
		FcKnob = value;
		FcValue = SmartKnob::knob2value(FcKnob, FcLimits, FcTaper);

			// design new input filter
			designResonantLowPass(lpCoefs, FcValue, QValue);
			lpFilter.setCoefs(lpCoefs);

		break;

	case kParamQ:
		// input filter resonance, ratio
		QKnob = value;
		QValue = SmartKnob::knob2value(QKnob, QLimits, QTaper);

			// design new input filter
			designResonantLowPass(lpCoefs, FcValue, QValue);
			lpFilter.setCoefs(lpCoefs);

		break;
	default :
		break;
	}

}


//------------------------------------------------------------------------------
float ResonantLowPass::getParameter(VstInt32 index)
{
	// return knob position
	switch (index)
	{
	case kParamGain:
		// input filter gain, dB
		return GainKnob;
		break;

	case kParamFc:
		// input filter center frequency, Hz
		return FcKnob;
		break;

	case kParamQ:
		// input filter resonance, ratio
		return QKnob;
		break;
	default:
		return 0.0;
	}
}

//------------------------------------------------------------------------------
void ResonantLowPass::getParameterName(VstInt32 index, char *label)
{
	// return knob name
	switch (index)
	{
	case kParamGain:
		// input filter gain, dB
		vst_strncpy(label, " Gain ", kVstMaxParamStrLen);
		break;

	case kParamFc:
		// input filter center frequency, Hz
		vst_strncpy(label, " Fc ", kVstMaxParamStrLen);
		break;

	case kParamQ:
		// input filter resonance, ratio
		vst_strncpy(label, " Q ", kVstMaxParamStrLen);
		break;
	default :
		*label = '\0';
		break;
	};
}

//------------------------------------------------------------------------------
void ResonantLowPass::getParameterDisplay(VstInt32 index, char *text)
{
	// return parameter value as text
	switch (index)
	{
	case kParamGain:
		// input filter gain, dB
		float2string(GainValue, text, kVstMaxParamStrLen);
		break;

	case kParamFc:
		// input filter center frequency, Hz
		float2string(FcValue, text, kVstMaxParamStrLen);
		break;

	case kParamQ:
		// input filter resonance, ratio
		float2string(QValue, text, kVstMaxParamStrLen);
		break;
	default :
		*text = '\0';
		break;
	};
}

//------------------------------------------------------------------------------
void ResonantLowPass::getParameterLabel(VstInt32 index, char *label)
{
	switch (index)
	{
	case kParamGain:
		// input filter gain, dB
		vst_strncpy(label, " dB ", kVstMaxParamStrLen);
		break;

	case kParamFc:
		// input filter center frequency, Hz
		vst_strncpy(label, " Hz ", kVstMaxParamStrLen);
		break;

	case kParamQ:
		// input filter resonance, ratio
		vst_strncpy(label, " Q ", kVstMaxParamStrLen);
		break;

	default :
		*label = '\0';
		break;
	};
}

//------------------------------------------------------------------------
bool ResonantLowPass::getEffectName (char* name)
{
	vst_strncpy (name, "Resonant Low Pass", kVstMaxEffectNameLen);
	return true;
}

//------------------------------------------------------------------------
bool ResonantLowPass::getProductString (char* text)
{
	vst_strncpy (text, "Resonant Low Pass", kVstMaxProductStrLen);
	return true;
}

//------------------------------------------------------------------------
bool ResonantLowPass::getVendorString (char* text)
{
	vst_strncpy (text, "Stanford/CCRMA MUS424", kVstMaxVendorStrLen);
	return true;
}

//------------------------------------------------------------------------------
VstInt32 ResonantLowPass::getVendorVersion ()
{ 
	return 1000; 
}



//------------------------------------------------------------------------------
void ResonantLowPass::processReplacing(float **inputs, float **outputs, 
                                       VstInt32 sampleFrames)
// overwrite output
{

	float*	in0 = inputs[0];
	float*  in1 = inputs[1];
	float*	out0 = outputs[0];
	float*  out1 = outputs[1];

	float isignal, osignal;

	for (int i = 0; i < sampleFrames; i++)
	{
		// assign input
		float inp0 = (*in0);
		float inp1 = (*in1);

		// add noise to input to prevent denormal
		isignal = inp0 + inp1;
		
		// apply input gain, input filter
		lpFilter.process(isignal, osignal);

		// apply gain, assign output
		*out0++ = osignal*drive;
		*out1++ = osignal*drive;

		// update input pointers
		in0++;in1++;
	}
}


//------------------------------------------------------------------------------
void ResonantLowPass::bilinearTranform(float acoefs[], float dcoefs[])
{
	float b0, b1, b2, a0, a1, a2;		//storage for continuous-time filter coefs
	float bz0, bz1, bz2, az0, az1, az2;	// coefs for discrete-time filter.
	
	// For easier looking code...unpack
	b0 = acoefs[0]; b1 = acoefs[1]; b2 = acoefs[2]; 
    a0 = acoefs[3]; a1 = acoefs[4]; a2 = acoefs[5];
	
	
	///////////////START//////////////////
    double az0_old = (4*fs*fs*a2+2*fs*a1+a0);
	bz0 = (4*fs*fs*b2-2*fs*b1+b0)/ az0_old; 
    bz1 = (2*b0-8*fs*fs*b2)/az0_old; 
    bz2 = (4*fs*fs*b2-2*fs*b1+b0)/az0_old; 
    az0 = 1.0; 
    az1 = (2*a0-8*fs*fs*a2)/az0_old;
    az2 = (4*fs*fs*a2-2*fs*a1+a0)/az0_old; 
	////////////////END/////////////////////    
    
    
	// return coefficients to the output
	dcoefs[0] = bz0; dcoefs[1] = bz1; dcoefs[2] = bz2; 
    dcoefs[3] = az1; dcoefs[4] = az2;

}

//------------------------------------------------------------------------------
void ResonantLowPass::designResonantLowPass(float* dcoefs, float center, float qval)
// design parametric filter based on input center frequency, gain, Q and sampling rate
{
	float b0, b1, b2, a0, a1, a2;		//storage for continuous-time filter coefs
	float acoefs[6];

	//Design parametric filter here. Filter should be of the form
	//
	//    2
	// b2s  + b1s + b0
	// ---------------
	//    2
	// a2s  + a1s + a0
	//
	// Parameters are center frequency in Hz, gain in dB, and Q.
	
	
	//TODO: design analog filter based on input gain, center frequency and Q	
 	///////////////START//////////////////
	b0 = 1.0; b1 = 0.0; b2 = 0.0; 
    a0 = 1.0; a1 = 1/(qval*2*pi*center); a2 = 1/(4*pi*pi*center*center);	
	////////////////END/////////////////////	
    

	// pack the analog coeffs into an array and apply the bilinear tranform
	acoefs[0] = b0; acoefs[1] = b1; acoefs[2] = b2; 
    acoefs[3] = a0; acoefs[4] = a1; acoefs[5] = a2;
	
	// inputs the 6 analog coeffs, output the 5 digital coeffs
	bilinearTranform(acoefs, dcoefs);
	
}




