"" => string dataDir;
200.0 => float update; // update rate in ms

// new class to manage envelopes
class Env
{
  Step s => Envelope e => blackhole; // feed constant into env
  update::ms => e.duration; // set ramp time
  fun void target (float val) { e.target(val); }
}

class Player
{
    
  Saxofony s=>dac;
  Env amp, freq;

  fun void run() // sample loop to smoothly update gain
  { 
    while (true)
    {
      s.startBlowing(0.8);
      s.vibratoFreq(amp.e.last());
      s.gain(0.4);
      //s.damp()
      s.freq(300+100*amp.e.last());
      0.5::second => now;
      s.stopBlowing(0.8);
      0.01::second=>now;
    }
  }  spork ~ run(); // run run
}

DataReader drywhite;
drywhite.setDataSource("mccleary10.dat");
drywhite.start(); 
Player p;
FilterBasic f;
0 => int i;

   
   

while (!drywhite.isFinished())
{
    
    // next data point, scaled in 0.0 - 1.0 range
    drywhite.scaledVal() => float w; 
    i++;
    p.amp.target(w);


    update::ms => now;
}
