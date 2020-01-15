// BOOM-a-rang
// Mayank's SLOrk-tastic Instrument
//----------------------------------------------------
// Description:
// The Boom-a-rang is an instrument that maps the keyboard
// to a guitar fret and mashes it together with a simulated
// Leslie speaker output on a slork hemi and 
// feedback. If the leslie is off, one can choose to 
// spatialize the sound emanating from the Slork hemi 
// speakers.

// Usage:
// Letters are mapped to guitar fret
// When Leslie is on, mouse direction changes frequency
// mouse direction controls the delay length
// Number 5 switches Pan mode
// Number 6 switches Leslie
// Control the feedback by physically covering the mouse

//----------------------------------------------------
//Setup code
6 => int numChan;
int flags[11];

if( numChan > dac.channels() )
{
    // error
    <<< "dac has less than the requested number of channels...", "" >>>;
    <<< "   (try starting chuck/miniAudicle with more output channels?", "" >>>;
    me.exit();
}

Envelope env[numChan];
Envelope master;
master.value(1);

for (0 => int i;i<numChan;i++)
{
   env[i].value(0.7);
   env[i].time(0.05);
   master => env[i] => dac.chan(i);
}

//----------------------------------------------------
// Motion sensor code
HidMsg motion_msg;
fun void getMotion()
{
    // instantiate a HidIn object
    Hid hi;
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
        hi.read( 9, 0, motion_msg );

        // Motion sensor panning
        if (flags[5]==2) //number 5
            panHid(motion_msg);
        else if (flags[0] == 5)
            for (0 => int i;i<numChan;i++)
                env[i].target(0.7);
        
        // advance time
        100::ms => now;
    }
}
//----------------------------------------------------
//Leslie on the hemi

int leslie_time;
5000 => int leslie_freq;
fun void leslie()
{
    while (true)
    {
        if (flags[6]==2)
        {
            leslie_time++;
            leslie_time % 200 => leslie_time;
            pan(Math.sin(2*3.14*leslie_freq*leslie_time),1-Math.sin(2*3.14*leslie_freq*leslie_time),00);
        }
            100::ms => now;
    }
    
}

//----------------------------------------------------
//Actual Panning code
fun void panHid(HidMsg msg)
{
    pan(msg.x/263.0,msg.y/263.0,msg.z/263.0);
}

fun void pan(float x,float y,float z)
{
    //top speaker
    float val[6];
    (1.0 - Std.fabs(y)) => val[5];
    env[5].target(val[5]);
    //env[5].time(0.05);
    
    //speaker 0
    (1.0 - (y))/(2.0) => val[0];
    env[0].target(val[0]);
    //env[0].time(0.05);
    
    //speaker 1
    (1.0 + (x))/(2.0) => val[1];
    env[1].target(val[1]);
    //env[1].time(0.05);
    
    //speaker 4
    (-1.0 + (x))/(2.0) => val[4];
    env[4].target(val[4]);
    //env[4].time(0.05);    
    
    //speaker 2
    (1.0 + (x))/(2.0) => val[2];
    0.8*val[2] + 0.2*val[1] => val[2];
    
    env[2].target(val[2]);
    //env[2].time(0.05);
    
    //speaker 3
    (-1.0 + (x))/(2.0) => val[3];
    0.8*val[3] + 0.2*val[4] => val[3];   
    env[3].target(val[3]);
    //env[3].time(0.05); 
}


//-----------------------------------------------------------------------------
//Keyboard Stuff
// base and register

12 => int base;
3 => int register;
0 => int reg_change;

// keyboard
Hid kb;
// hid message
HidMsg msg;

// open
if( !kb.openKeyboard( 0 ) ) me.exit();
<<< "Ready?", "" >>>;

// sound synthesis
StifKarp bar => JCRev r => Echo d => master;
50::second => d.max;
0.5 => d.mix;
10 => float del;
del::second => d.delay;

adc => Gain g => Dyno dy => master;
dy.compress();


SinOsc s => g;

// multiply inputs at g
3=> g.op;

// presets
400.0 => s.freq;
// set mix
.01 => r.mix;
// bar settings
//4 => bar.preset;

// key map
int key[256];
// key and pitch
0 => key[29];
1 => key[27];
2 => key[6];
3 => key[25];
4 => key[5];
5 => key[4] => key[17];
6 => key[22] => key[16];
7 => key[7] => key[54];
8 => key[9] => key[55];
9 => key[10] => key[56];
10 => key[20] => key[11];
11 => key[26] => key[13];
12 => key[8] => key[14];
13 => key[21] => key[15];
14 => key[23] => key[51];
15 => key[28] => key[52];
16 => key[24];
17 => key[12];
18 => key[18];
19 => key[19];
20 => key[47];
21 => key[48];
22 => key[49];
// which is current
0 => int current;

// increase octaves
fun void registerUp()
{
    if( register < 6 ) { register++; 1 => reg_change; }
    <<< "register:", register >>>;
}

// decrease octaves
fun void registerDown()
{
    if( register > 0 ) { register--; 1 => reg_change; }
    <<< "register:", register >>>;
}

// infinite event loop
fun void kbFunc()
{
    while( true )
    {
        // wait for event
        kb => now;
        
        // get message
        while( kb.recv( msg ) )
        {
            <<< msg.which >>>;
            // which
            if( msg.which > 256 ) continue;
            //flag setting - number keys
            if (msg.which >29 && msg.which <40) {
                <<< msg.which-29 >>>;
                1 +=> flags[msg.which-29];
                4 %=> flags[msg.which-29];
                msg.which-29 => flags[0];
                
            }
            if( key[msg.which] == 0 && msg.which != 29 )
            {
                // register
                if( msg.which == 80 && msg.isButtonDown() )
                    registerDown();
                else if( msg.which == 79 && msg.isButtonDown() )
                    registerUp();
            }
            // set
            else if( msg.isButtonDown() )
            {
                // freq
                base + register * 12 + key[msg.which] => Std.mtof => bar.freq;
                // fire!
                1 => bar.noteOn;
            }
        }
    }
}
spork ~kbFunc();
//----------------------------------------------------------------------------- 
//mouse stuff
fun void mouseFunc()
{
    // the device number to open
    1 => int deviceNum;
    
    // instantiate a HidIn object
    Hid hi;
    // structure to hold HID messages
    HidMsg mouse_msg;
    
    // open mouse 0, exit on fail
    if( !hi.openMouse( deviceNum ) ) me.exit();
    // successful! print name of device
    <<< "mouse '", hi.name(), "' ready" >>>;
    
    // infinite event loop
    while( true )
    {
        // wait on HidIn as event
        hi => now;
        
        // messages received
        while( hi.recv( mouse_msg ) )
        {
            // mouse motion
            if( mouse_msg.isMouseMotion() )
            {
                // axis of motion
                if( mouse_msg.deltaX )
                {
                    if (flags[6]==2)
                    {
                        mouse_msg.deltaX +=> leslie_freq;
                    }
//                    <<< "mouse motion:", mouse_msg.deltaX, "on x-axis" >>>;
                }
                else if( mouse_msg.deltaY )
                {
                    <<< "mouse motion:", mouse_msg.deltaY, "on y-axis" >>>;
                }
            }
            
            // mouse button down
            else if( mouse_msg.isButtonDown() )
            {
                <<< "mouse button", mouse_msg.which, "down" >>>;
            }
            
            // mouse button up
            else if( mouse_msg.isButtonUp() )
            {
                <<< "mouse button", mouse_msg.which, "up" >>>;
            }
            
            // mouse wheel motion (requires chuck 1.2.0.8 or higher)
            else if( mouse_msg.isWheelMotion() )
            {
                // axis of motion
                if( mouse_msg.deltaX )
                {
                    <<< "mouse wheel:", mouse_msg.deltaX, "on x-axis" >>>;
                }            
                else if( mouse_msg.deltaY )
                {
                    <<< "mouse wheel:", mouse_msg.deltaY, "on y-axis" >>>;
                    mouse_msg.deltaY => del;
                    
                }
            }
        }
    }
}

spork ~mouseFunc();
//----------------------------------------------
1::day=>now;