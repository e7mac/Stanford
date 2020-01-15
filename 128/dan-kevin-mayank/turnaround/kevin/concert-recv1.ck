// create our OSC receiver
OscRecv recv;
// use port
7777 => recv.port;
// start listening (launch thread)
recv.listen();

// create an address in the receiver, store in new variable
recv.event( "key/delay/vel, i, f, f" ) @=> OscEvent oe;

// Chord Machine
6 => int numInstr;
Wurley m[numInstr];
//Mandolin  m[numInstr];
ADSR e[numInstr];
JCRev r[numInstr];

for (0=>int i; i<numInstr; i++) {
    //m[i] => e[i] => r[i] => dac;
    m[i] => e[i] => r[i] => dac.chan(5);
    e[i].set( 10::ms, 8::ms, .5, 1000::ms );
    r[i].gain(0.75);
    r[i].mix(0.05);
    m[i].noteOn(0.0);
}

//SndBuf snd => Gain g => Envelope env => dac;
SndBuf snd => Gain g => Envelope env => dac.chan(4);
0.7 => g.gain;
1 => env.keyOn;

0 => int curInstr;
0 => int notescale;
0 => int chordscale;
0 => int toggleSurround;

50 => int root;   // Key of C harmonic minor
0.8 => float vel;

fun void play_single_note(float delay, int note, float vel, int instr) {
    delay::second => now;
    Std.rand2f(vel-0.1, vel+0.1) => vel;
    1 => e[instr].keyOn;
    Std.mtof(note) => m[instr].freq;
    vel => m[instr].noteOn;
    1::second => now;
    1 => e[instr].keyOff;
}

fun void play_IIm7b5_chord(float delay, int note, float vel) {
    delay::second => now;
    maybe => int flag1;
    maybe => int flag2;
    <<< flag1, flag2, flag1||flag2 >>>;
    spork ~ play_single_note(0, note+2-flag1*12, vel, 0);
    spork ~ play_single_note(0, note+5-flag1*maybe*12, vel, 1);
    spork ~ play_single_note(0, note+8-flag2*12, vel, 2);
    spork ~ play_single_note(0, note+12-(flag1||flag2)*maybe*12, vel, 3);
    2::second => now;
}

fun void play_V7_chord(float delay, int note, float vel) {
    delay::second => now;
    Std.rand2f(vel-0.1, vel+0.1) => vel;
    maybe => int flag1;
    maybe => int flag2;
    <<< flag1, flag2, flag1||flag2 >>>;
    spork ~ play_single_note(0, note+7-flag1*12, vel, 0);
    spork ~ play_single_note(0, note+11-flag1*maybe*12, vel, 1);
    spork ~ play_single_note(0, note+14-flag2*12, vel, 2);
    spork ~ play_single_note(0, note+17-(flag1||flag2)*maybe*12, vel, 3);
    2::second => now;
}

fun void play_Im_chord(float delay, int note, float vel) {
    delay::second => now;
    Std.rand2f(vel-0.1, vel+0.1) => vel;
    maybe => int flag;
    <<< flag >>>;
    spork ~ play_single_note(0, note+0-flag*12, vel, 0);
    spork ~ play_single_note(0, note+3-flag*maybe*12, vel, 1);
    spork ~ play_single_note(0, note+7-maybe*12, vel, 2);
    2::second => now;
}

fun void play_wave(float delay, string filename) {
    delay::second => now;
    filename => snd.read;
}

// infinite event loop
while( true )
{
    // wait on OSC event
    oe => now;
    
    // grab the next message from the queue. 
    while ( oe.nextMsg() != 0 )
    {
        oe.getInt() => int msgkey;
        oe.getFloat() => float delay;
        oe.getFloat() => float vel;
        <<< "got (via OSC):", msgkey, delay, vel >>>;
            
            // Shift octaves
            if (msgkey == 224) {   // Restore to no octave shifts
                0 => notescale;
                0=> chordscale;
            } if (msgkey == 227) {   // Shift notes up an octave
                notescale + 1 => notescale;
            } if (msgkey == 226) {   // Shift notes down an octave
                notescale - 1 => notescale;
            } if (msgkey == 230) {   // Shift chords up an octave
                chordscale + 1 => chordscale;
            } if (msgkey == 231) {   // Shift chords down an octave
                chordscale - 1 => chordscale;
            }

            // Play chords
            if (msgkey == 10) {
                spork ~ play_IIm7b5_chord(delay, root + chordscale*12, vel-0.3);
            } if (msgkey == 11) {
                spork ~ play_V7_chord(delay, root + chordscale*12, vel-0.3);
            } if (msgkey == 13) {
                spork ~ play_Im_chord(delay, root + chordscale*12, vel-0.3);
            } 
            
            // Play notes
            if (msgkey == 29) {
                spork ~ play_single_note(delay, root + notescale*12, vel, 5);
            } if (msgkey == 27) {
                spork ~ play_single_note(delay, root+2 + notescale*12, vel, 5);
            } if (msgkey == 6) {
                spork ~ play_single_note(delay, root+3 + notescale*12, vel, 5);
            } if (msgkey == 25) {
                spork ~ play_single_note(delay, root+5 + notescale*12, vel, 5);
            } if (msgkey == 5) {
                spork ~ play_single_note(delay, root+7 + notescale*12, vel, 5);
            } if (msgkey == 4) {
                spork ~ play_single_note(delay, root+7 + notescale*12, vel, 5);
            } if (msgkey == 22) {
                spork ~ play_single_note(delay, root+8 + notescale*12, vel, 5);
            } if (msgkey == 7) {
                spork ~ play_single_note(delay, root+11 + notescale*12, vel, 5);
            } if (msgkey == 9) {
                spork ~ play_single_note(delay, root+12 + notescale*12, vel, 5);
            } if (msgkey == 20) {
                spork ~ play_single_note(delay, root+12 + notescale*12, vel, 5);
            } if (msgkey == 26) {
                spork ~ play_single_note(delay, root+14 + notescale*12, vel, 5);
            } if (msgkey == 8) {
                spork ~ play_single_note(delay, root+15 + notescale*12, vel, 5);
            } if (msgkey == 21) {
                spork ~ play_single_note(delay, root+17 + notescale*12, vel, 5);
            } if (msgkey == 23) {
                spork ~ play_single_note(delay, root+19 + notescale*12, vel, 5);
            }
            
            // Play wave files
            if (msgkey == 30) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/whoosh.wav" );
            } if (msgkey == 31) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/steamWhistle.wav" );
            } if (msgkey == 32) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/chime.wav" );
            }
    }
}
