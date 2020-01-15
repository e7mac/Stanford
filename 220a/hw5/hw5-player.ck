"" => string dataDir;
50.0 => float update; // update rate in ms

// new class to manage envelopes
class Env
{
  Step s => Envelope e => blackhole; // feed constant into env
  update::ms => e.duration; // set ramp time
  fun void target (float val) { e.target(val); }
}

class Player
{
    
  TriOsc s => Echo e => NRev rev;
  e.mix(0.5);
  rev.mix(0.1);
  Env amp, freq;
  fun void run() // sample loop to smoothly update gain
  { 
    while (true)
    {
      s.gain(amp.e.last());
      s.freq(freq.e.last());
      //<<< freq.e.last() >>>;
      1::samp => now;
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
    p.amp.target(0.1 *Math.pow(w, 2.0));
    p.freq.target(Std.mtof(40+w*5));
    p.rev => dac;

    update::ms => now;
}
