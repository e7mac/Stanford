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
    
  PulseOsc s => JCRev rev;
  rev.mix(0.2);
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
drywhite.setDataSource("mccleary5.dat");
drywhite.start(); 
Player p;
FilterBasic f;
0 => int i;

while (!drywhite.isFinished())
{
    // next data point, scaled in 0.0 - 1.0 range
    drywhite.scaledVal() => float w; 
    i++;
    p.amp.target(0.01 *Math.pow(w, 2.0));
    p.freq.target(Std.mtof(20.0 + w*40));
    int a;
    float y;
    1000*w  => y;
    y $ int => a;
    a % 2 => a;
    <<< a >>>;
    p.rev => dac.chan(a);

    update::ms => now;
}
