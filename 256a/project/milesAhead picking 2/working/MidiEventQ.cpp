//  MidiEventQ.cpp
//  Abstraction for Midi queues

//  Created by Mayank Sanganeria 11-23-11

#include "MidiEventQ.h"
#include <iostream>

void MidiEventQ::add(MidiEvent mid)
{
    theQ.push_back(mid);
}

int MidiEventQ::size()
{
    return theQ.size();
}

MidiEvent MidiEventQ::at(int pos)
{
    return theQ[pos];
}

void MidiEventQ::removeAt(int pos)
{
    theQ.erase(theQ.begin()+pos);
}

void MidiEventQ::clear()
{
    theQ.clear();
}

void MidiEventQ::printQ()
{
    std::cout<<endl;
    for (int i=0;i<theQ.size();i++)
        theQ[i].print();
}

void MidiEventQ::randomize(float prob)
{
    vector<MidiEvent> newQ;
    for (int i=0;i<theQ.size();i++)
    {   
        MidiEvent current=theQ[i];
        if ( (float)rand()/RAND_MAX > prob ) current=theQ[rand()%theQ.size()];
        newQ.push_back(current);
    }
    cout<<theQ.size()<<" "<<newQ.size()<<endl;
    theQ=newQ;
}