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
    
  ModalBar s => JCRev rev;
  rev.mix(0.2);
  Env amp, freq;
  fun void run() // sample loop to smoothly update gain
  { 
    while (true)
    {
      s.strike(0.5);
      s.freq(freq.e.last());
      s.damp(amp.e.last());
      s.stickHardness(1-amp.e.last());
      s.strikePosition(2*amp.e.last());
      //<<< freq.e.last() >>>;
      1::second => now;
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
    p.amp.target(w);
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
