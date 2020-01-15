8 => int numChannels;

fun void beep(int channel)
{
    SinOsc foo;
    1 => foo.gain;
    440 => foo.freq;
    foo => dac.chan(channel);
    1::ms => now;
    0=>foo.gain;
    foo =< dac;
}



for( 0 => int i;i < numChannels; i++)
{
    for( 0 => int j; j <= i ; j++)
    {
        spork ~ beep(i);
        100::ms => now;
    }
0.5::second => now;
}