/* parallelWalls.cpp - simulation of parallel walls system
   Compatible with STK version 4.4.4.

   Usage:

     parallelWalls

   Outputs the impulse response
*/
   
#include "FileWvIn.h"
#include "FileWvOut.h"
#include "Delay.h"
#include <stdlib.h>

using namespace stk;

int main(int argc,char *argv[])
{
    Stk::setSampleRate(44100);
    Delay *y;
    FileWvOut output("parallelWalls.wav");
    
    //setup state
    int x = 1;
    y = new Delay(258,258);
    
    for (int i=0;i<6000;i++)   { // output 6000 samples
        StkFloat outsamp = x - 0.8979*y->nextOut();     //store outsample since its IIR
        y->tick(outsamp);                               //input the calculated sample
        x = 0;
        output.tick(outsamp);
    }
}
