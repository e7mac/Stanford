// Create OSC Sender
6 => int numStations;   // # of SLOrk stations (up to 6)
8888 => int port;   // same listening port # for all stations
OscSend xmit[numStations];
string stationIPadd[numStations];
float delay[numStations];
LPF lpf;
// type in IP Address for each station
// localhost is computer that runs this program
0 => int local;

"albacore.local" => stationIPadd[(0+local)%numStations];
"empanada.local" => stationIPadd[(1+local)%numStations];
"foiegras.local" => stationIPadd[(2+local)%numStations];
"donut.local" => stationIPadd[(3+local)%numStations];
"chowder.local" => stationIPadd[(4+local)%numStations];
"banhmi.local" => stationIPadd[(5+local)%numStations];

for ( 0 => int i; i<numStations; i++ )
    xmit[i].setHost( stationIPadd[i], port );

// Chord Machine
6 => int numInstr;
Moog m[numInstr];
ADSR e[numInstr];
JCRev r[numInstr];

for (0=>int i; i<numInstr; i++) {
    //m[i] => e[i] => r[i] => lpf => dac;
    m[i] => e[i] => r[i] => lpf => dac.chan(i);
    e[i].set( 10::ms, 8::ms, .5, 1000::ms );
    r[i].gain(0.75);
    r[i].mix(0.05);
    m[i].noteOn(0.0);
}

//SndBuf snd => Gain g => Envelope env => lpf => dac;
SndBuf snd => Gain g => Envelope env => lpf => dac.chan(4);
0.7 => g.gain;
1 => env.keyOn;

0 => int curInstr;
0 => int notescale;
0 => int chordscale;
0 => int toggleSurround;

60 => int root;   // Key of C harmonic minor
0.8 => float vel;

fun void motion()
{
    HidIn hi;
    HidMsg msg;
    
    // open tilt sensor
    if( !hi.openTiltSensor() )
    {
        <<< "tilt sensor unavailable", "" >>>;
        me.exit();
    }
    
    // print
    <<< "tilt sensor ready", "" >>>;
    
    // infinite while loop
    while( true )
    {
        // poll the tilt sensor, expect to get back 3 element array of ints
        // (9 for now means accelerometer, 0 selects 0th accelerometer)
        hi.read( 9, 0, msg );
        // print results, note these are "absolute" tilt in each axis
        <<< msg.x, msg.y, msg.z >>>;
        lpf.freq(Math.max(500,Math.min(1000+5*msg.x+5*msg.y,10000)));
        // advance time
        100::ms => now;
    }
}
spork ~motion();


// Setup Keyboard
Hid hi;
HidMsg msg;
// which keyboard
0 => int device;   // Built in keyboard
//1 => int device;   // Wireless keyboard
// get from command line
if( me.args() ) me.arg(0) => Std.atoi => device;

// open keyboard (get device number from command line)
if( !hi.openKeyboard( device ) ) me.exit();
<<< "keyboard '" + hi.name() + "' ready", "" >>>;

fun void play_single_note(int note, float vel, int instr) {
    Std.rand2f(vel-0.1, vel+0.1) => vel;
    1 => e[instr].keyOn;
    Std.mtof(note) => m[instr].freq;
    vel => m[instr].noteOn;
    1::second => now;
    1 => e[instr].keyOff;
}

fun void play_IIm7b5_chord(int note, float vel) {
    maybe => int flag1;
    maybe => int flag2;
    <<< flag1, flag2, flag1||flag2 >>>;
    spork ~ play_single_note(note+2-flag1*12, vel, 0);
    spork ~ play_single_note(note+5-flag1*maybe*12, vel, 1);
    spork ~ play_single_note(note+8-flag2*12, vel, 2);
    spork ~ play_single_note(note+12-(flag1||flag2)*maybe*12, vel, 3);
    2::second => now;
}

fun void play_V7_chord(int note, float vel) {
    Std.rand2f(vel-0.1, vel+0.1) => vel;
    maybe => int flag1;
    maybe => int flag2;
    <<< flag1, flag2, flag1||flag2 >>>;
    spork ~ play_single_note(note+7-flag1*12, vel, 0);
    spork ~ play_single_note(note+11-flag1*maybe*12, vel, 1);
    spork ~ play_single_note(note+14-flag2*12, vel, 2);
    spork ~ play_single_note(note+17-(flag1||flag2)*maybe*12, vel, 3);
    2::second => now;
}

fun void play_Im_chord(int note, float vel) {
    Std.rand2f(vel-0.1, vel+0.1) => vel;
    maybe => int flag;
    <<< flag >>>;
    spork ~ play_single_note(note+0-flag*12, vel, 0);
    spork ~ play_single_note(note+3-flag*maybe*12, vel, 1);
    spork ~ play_single_note(note+7-maybe*12, vel, 2);
    2::second => now;
}

fun void play_wave( string filename ) {
    filename => snd.read;
}

// infinite event loop
while( true )
{
    // wait on event
    hi => now;
    
    // get one or more messages
    while( hi.recv( msg ) )
    {
        // check for action type
        if( msg.isButtonDown() )
        {
            <<< "down:", msg.which, "(code)", msg.key, "(usb key)", msg.ascii, "(ascii)" >>>;
            
            // Shift octaves
              if (msg.key == 224) {   // Restore to no octave shifts
                 0 => notescale;
                 0=> chordscale;
            } if (msg.key == 227) {   // Shift notes up an octave
                 notescale + 1 => notescale;
            } if (msg.key == 226) {   // Shift notes down an octave
                 notescale - 1 => notescale;
            } if (msg.key == 230) {   // Shift chords up an octave
                 chordscale + 1 => chordscale;
            } if (msg.key == 231) {   // Shift chords down an octave
                 chordscale - 1 => chordscale;
            }
            
            // Play chords
              if (msg.key == 10) {
                  spork ~ play_IIm7b5_chord(root + chordscale*12, vel-0.3);
            } if (msg.key == 11) {
                  spork ~ play_V7_chord(root + chordscale*12, vel-0.3);
            } if (msg.key == 13) {
                  spork ~ play_Im_chord(root + chordscale*12, vel-0.3);
            } 
            
            // Play notes
              if (msg.key == 29) {
                  spork ~ play_single_note(root + notescale*12, vel, 5);
            } if (msg.key == 27) {
                  spork ~ play_single_note(root+2 + notescale*12, vel, 5);
            } if (msg.key == 6) {
                  spork ~ play_single_note(root+3 + notescale*12, vel, 5);
            } if (msg.key == 25) {
                  spork ~ play_single_note(root+5 + notescale*12, vel, 5);
            } if (msg.key == 5) {
                  spork ~ play_single_note(root+7 + notescale*12, vel, 5);
            } if (msg.key == 4) {
                  spork ~ play_single_note(root+7 + notescale*12, vel, 5);
            } if (msg.key == 22) {
                  spork ~ play_single_note(root+8 + notescale*12, vel, 5);
            } if (msg.key == 7) {
                  spork ~ play_single_note(root+11 + notescale*12, vel, 5);
            } if (msg.key == 9) {
                  spork ~ play_single_note(root+12 + notescale*12, vel, 5);
            } if (msg.key == 20) {
                  spork ~ play_single_note(root+12 + notescale*12, vel, 5);
            } if (msg.key == 26) {
                  spork ~ play_single_note(root+14 + notescale*12, vel, 5);
            } if (msg.key == 8) {
                  spork ~ play_single_note(root+15 + notescale*12, vel, 5);
            } if (msg.key == 21) {
                  spork ~ play_single_note(root+17 + notescale*12, vel, 5);
            } if (msg.key == 23) {
                  spork ~ play_single_note(root+19 + notescale*12, vel, 5);
            }
            
              if (msg.key == 39) {
                  1-toggleSurround => toggleSurround;
            }

            <<< "Notescale: ", notescale, "Chordscale: ", chordscale, "Send: ", toggleSurround >>>;

            // Send surround
            if ( toggleSurround ) {
                
                // Play wave files
                if (msg.key == 30) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/whoosh.wav" );
                } if (msg.key == 31) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/steamWhistle.wav" );
                } if (msg.key == 32) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/chime.wav" );
                } 
                
                for ( 1 => int i; i<numStations; i++ )
                {
                    // start the message...
                    xmit[i].startMsg( "key/delay/vel, i, f, f" );
                    msg.key => xmit[i].addInt;
              
                    0.2*i => delay[i] => xmit[i].addFloat;
                    vel - 0.05*i => xmit[i].addFloat;

                    <<< "sent (via OSC):", msg.key, delay[i] >>>;
                }
            }
        }
    }
}
