//  MidiEvent.cpp
//  Abstraction for Midi events
//  http://www.schristiancollins.com/generaluser.php (renamed to testSounds.sf2 for brevity)
// 
//  Created by Mayank Sanganeria 11-23-11

#include "MidiEvent.h"
#include <assert.h>
#include <iostream>

MidiEvent::MidiEvent()
{
	note=0;
	time_on=0;
	time_off=0;
	vel=0;
}


MidiEvent::MidiEvent(int with_note,int with_velocity,int with_quarternote, float with_time_on)
{
	//assert(note>20 && note<109);
	note=with_note;
	
	time_on=with_time_on;

	time_off=0;
	//assert(vel<128 && vel>0);
	vel=with_velocity;
    
    quarter_note = with_quarternote;
}


MidiEvent::MidiEvent(int with_note,int with_velocity,int with_quarternote,float with_time_on,float with_time_off)
{
	//assert(with_note>20 && with_note<109);
	note=with_note;
	
	//assert(with_time_off>with_time_on);
	time_on=with_time_on;
	time_off=with_time_off;
	
	//assert(with_velocity<128 && with_velocity>0);
	vel=with_velocity;	
    
    
    quarter_note = with_quarternote;
    dur = time_off - time_on; 
    rhythm = dur / quarter_note;
}




void MidiEvent::setPitch(int with_note)
{
	//assert(with_note>20 && with_note<109);
	note=with_note;
}


int MidiEvent::pitch()
{
	return note;
}


void MidiEvent::setStartTime(float with_time_on)
{
	time_on=with_time_on;
}
void MidiEvent::setEndTime(float with_time_off)
{
	//assert(with_time_off>time_on);
	time_off=with_time_off;
    dur = time_off - time_on; 
    rhythm = dur / quarter_note;
}

float MidiEvent::duration()
{
	return dur;
}

void MidiEvent::setDuration(float with_dur)
{
	//assert(with_dur>0);
	time_off=time_on+with_dur;
    dur = with_dur;
    rhythm = dur / quarter_note;
}
void MidiEvent::setVelocity(int with_velocity)
{
	//assert(with_velocity<128 && with_velocity>0);
	vel=with_velocity;
}


float MidiEvent::startTime()
{
	return time_on;
}


float MidiEvent::endTime()
{
	return time_off;
}

float MidiEvent::velocity()
{
	return vel;
}

void MidiEvent::print()
{
	std::cout<<"Note: "<<note<<" Velocity: "<<vel<<" Time ON: "<<time_on<<"\n";
}