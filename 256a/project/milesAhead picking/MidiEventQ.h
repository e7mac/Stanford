#ifndef MIDI_EVENT_Q_INCLUDED
#define MIDI_EVENT_Q_INCLUDED

//  MidiEventQ.h
//  Abstraction for MidiEvents vector
// 
//  Created by Mayank Sanganeria 11-23-11

#include <vector>
#include "MidiEvent.h"

using namespace std;

class MidiEventQ {
public:
	void add(MidiEvent mid);
	void removeAt(int i);
	
    int size();
    void clear();
    MidiEvent at(int pos);
    void printQ();
    void randomize(float,float,int,int);
    void replaceAt(int i,MidiEvent);
    
private:
	vector<MidiEvent> theQ;


};
#endif