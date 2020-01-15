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

void MidiEventQ::replaceAt(int i,MidiEvent newmidi)
{
    theQ[i]=newmidi;
}

void MidiEventQ::printQ()
{
    std::cout<<endl;
    for (int i=0;i<theQ.size();i++)
        theQ[i].print();
}

void MidiEventQ::randomize(float prob_melody,float prob_rhythm,int bars,int g_trade)
{
    if (theQ.size()<1) return;
    vector<MidiEvent> newQ;
    
    for (int i=0;i<theQ.size();i++)
    {   
        MidiEvent current=theQ[i];
        if ( (float)rand()/RAND_MAX < prob_melody ) 
            current.setPitch( (theQ[rand()%theQ.size()] ).pitch() );
        if ( (float)rand()/RAND_MAX < prob_rhythm ) 
        {
            int tradetime=bars*4*current.quarterNote();
            float tmpstart=current.startTime()+ rand()%4 *current.quarterNote();
            if (tmpstart<0) tmpstart+=tradetime;
            else if (tmpstart>tradetime) tmpstart-=tradetime;
            current.setStartTime( tmpstart );
            current.setDuration(theQ[rand()%theQ.size()].duration() );
            
        }

        
        
        newQ.push_back(current);
    }
    
    
    for (int i=0;i<newQ.size()-1;i++)
    {
    
        for (int j=i+1;j<newQ.size();j++)
        {
            MidiEvent ati=newQ[i];
            MidiEvent atj=newQ[j];
            if ( ati.startTime() > atj.startTime() )
            {
                newQ[i]=atj;
                newQ[j]=ati;
            }
        }
    }

    
    
    theQ=newQ;
}