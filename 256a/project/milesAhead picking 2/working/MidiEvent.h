#ifndef MIDI_EVENT_INCLUDED
#define MIDI_EVENT_INCLUDED

//  MidiEvent.h
//  Abstraction for Midi events
// 
//  Created by Mayank Sanganeria 11-23-11


class MidiEvent {
public:
	MidiEvent();
	MidiEvent(int note,int velocity,int beat,float time_on);
	MidiEvent(int note,int velocity,int beat,float time_on,float time_off);
	
	void setPitch(int pitch);
	int pitch();

	void setStartTime(float with_time_on);
	void setEndTime(float with_time_off);
	float startTime();
	float endTime();
    
	void setDuration(float duration);
	float duration();

	void setVelocity(int velocity);
	float velocity();
	
	void print();
	
private:
	int note;
	float time_on;
	float time_off;
	int vel;
    int quarter_note;
    float rhythm;
};
#endif