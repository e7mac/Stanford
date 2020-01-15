// The Variable MandoGuitar

Hid hi;
HidMsg msg;
Mandolin m => JCRev r => dac;
.75 => r.gain;
.05 => r.mix;

Hid hi_tp;
hi_tp.open(7, 0);
HidMsg msg_tp;

// Define note => key relationships
int notes[256];
61 => notes[29];
63 => notes[27];
65 => notes[4];
66 => notes[22];
68 => notes[7];
70 => notes[20];
72 => notes[26];
73 => notes[8];

int chords[256];
61 => chords[55];
63 => chords[56];
65 => chords[15];
66 => chords[51];
68 => chords[52];
70 => chords[18];
72 => chords[19];
73 => chords[47];

0 => int shiftdown;
0 => int notescale;
0 => int chordscale;

// TODO have an active-keys list and only allow those to pluck.

// which keyboard
0 => int device;
// get from command line
if( me.args() ) me.arg(0) => Std.atoi => device;

// open keyboard (get device number from command line)
if( !hi.openKeyboard( device ) ) me.exit();
<<< "keyboard '" + hi.name() + "' ready", "" >>>;

fun void play_single_note(int freq, float vel) {
    Std.mtof(freq) => m.freq;
    vel => m.pluck;
}

fun void play_major_chord(int freq, float vel) { //major=7, 12, 16
    spork ~ play_single_note(freq, vel-0.4);
    50::ms => now;
    spork ~ play_single_note(freq+7, vel-0.2);
    65::ms => now;
    spork ~ play_single_note(freq+12, vel);
    80::ms => now;
    if (shiftdown == 0) {
        spork ~ play_single_note(freq+16, vel);
    } else {
        spork ~ play_single_note(freq+15, vel);
    }
    90::ms => now;
    spork ~ play_single_note(freq+19, vel);
    105::ms => now;
    spork ~ play_single_note(freq+24, vel);
    
    2000::ms => now;
}

fun void watch_tp() {
    while(true) {
        hi_tp => now;

        while(hi_tp.recv(msg_tp)) {
            <<< msg_tp.which, msg_tp.touchX, msg_tp.touchY, msg_tp.touchSize >>>;
            msg_tp.touchX => m.stringDetune;
            msg_tp.touchY => m.bodySize;
        }
    }
}

spork ~ watch_tp();

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
            if (msg.key == 225) {
                1 => shiftdown;
            } else if (msg.key == 227) {
                notescale+1 => notescale;
            } else if (msg.key == 226) {
                notescale-1 => notescale;
            } else if (msg.key == 230) {
                chordscale+1 => chordscale;
            } else if (msg.key == 231) {
                chordscale-1 => chordscale;
            } else if (notes[msg.key] > 0) {
                spork ~ play_single_note(notes[msg.key] + notescale*12, 0.8);
            } else if (chords[msg.key] > 0) {
                spork ~ play_major_chord(chords[msg.key] + chordscale*12, 0.8);
            }
        }
        
        else
        {
            if (msg.key == 225) {
                0 => shiftdown;
            }
            //<<< "up:", msg.which, "(code)", msg.key, "(usb key)", msg.ascii, "(ascii)" >>>;
        }
    }
}
