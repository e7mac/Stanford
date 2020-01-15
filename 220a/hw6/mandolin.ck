"" => string dataDir;
400.0 => float update; // update rate in ms

// new class to manage envelopes
class Env
{
  Step s => Envelope e => blackhole; // feed constant into env
  update::ms => e.duration; // set ramp time
  fun void target (float val) { e.target(val); }
}

class Player
{
  Mandolin s => dac;
  //Env amp, freq;
  fun void run() // sample loop to smoothly update gain
  { 
    while (true)
    {
      0.1::second=>now;
    }
  }  spork ~ run(); // run run
}

DataReader drywhite;
drywhite.setDataSource("mccleary7.dat");
drywhite.start(); 
Player p;
FilterBasic f;
0 => int i;

   


while (!drywhite.isFinished())
{
    // next data point, scaled in 0.0 - 1.0 range
    drywhite.scaledVal() => float w; 
   // p.amp.target(0.5 * Math.pow(w, 1.0));
    p.s.freq(200+100*w);
    p.s.pluck((1-w)/2);
    p.s.stringDamping(w);
    update::ms => now;
}
