/* twoechoes.cpp - simple test program for echo simulation.
 Compatible with STK version 4.4.4.
 
 Usage:
 
 twoechoes 2 4
 
 Plays the input soundfile (hard wired to test.wav) summed
 with itself delayed by 2 seconds and 4 seconds. You thus hear three
 instances of the input sound separated by the echo delays.
 If not specified, the echo delay defaults to 1 and 0.5 seconds.
 It can be any nonnegative real value.
 */

#include "FileWvIn.h"
#include "FileWvOut.h"
#include "Delay.h"
#include <stdlib.h> // for atof()
//#include <math.h> // for floor()

using namespace stk;

int main(int argc,char *argv[])
{
    // Delay cant have 2 read taps so creating 2 different delayLines
    const int numDelays = 2;
    Delay *delayLine[numDelays];
    FileWvIn input("test.wav");
    FileWvOut output(argv[0]); // Writes echo.wav normally
    // longer delay first - is swapped if not
    double del[2] = {1.0,0.5};
    if (argc>numDelays) {
        for (int i=0;i<numDelays;i++) {
            del[0] = atof(argv[1]);
            del[1] = atof(argv[2]);
        }
        
        // swap to ensure the bigger one is first
        if (del[1]>del[0]) {
            double tmp = del[0];
            del[0] = del[1];
            del[1] = tmp;
        }
    }

    //again create the right number of copies of all vars
    long delsamps[numDelays];
    
    for (int i=0;i<numDelays;i++) {
        delsamps[i] = (long)floor(del[i]*Stk::sampleRate()+0.5);
        delayLine[i] = new Delay(delsamps[i],delsamps[i]);
    }
    
    long nsamps = input.getSize();
    for (long i=0;i<nsamps;i++)   {
        StkFloat insamp = input.tick();
        output.tick(0.5*insamp + 0.5*delayLine[0]->tick(insamp) + 0.5*delayLine[1]->tick(insamp));
    }
    for (long i=0;i<delsamps[1];i++)   {
        output.tick(0.5*delayLine[0]->tick(0) + 0.5*delayLine[1]->tick(0));
    }
    for (long i=delsamps[1];i<delsamps[0];i++)   {
        output.tick(0.5*delayLine[0]->tick(0));
    }
    return(0);
}