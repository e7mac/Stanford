// Rhythmation
// Mayank's Instrument for Chamber Music
//----------------------------------------------------
// Description:
// The Rhythmation in a drum machine that plays back samples
// in the form of a sequencer + free form with control over
// the playback rate. In the sequencer mode, the samples are
// put on the sequencer for looped playback. In free form mode,
// the samples are played back instantly. This allows the
// performance to have multiple layers while allowing for
// drum solos. In Breakbeat mode, the sequencer becomes
// controllable to 16th beat. There is a GUI showing the 
// state of the machine

// Usage:
// Put the sample files appropriately
// Space bar switches sequencer mode
// Mouse-click controls breakbeat mode
// Mouse direction controls the playback rate
// Delete removes the sample from sequencer

//Control variables
//----------------------------------------------------------
1 => float rate;

//LED View
//----------------------------------------------------------
MAUI_LED beatPos[16];
MAUI_LED beatNum[16];
MAUI_View v;
v.size(1000,250);

for (0 => int i;i<16;i++)
{
    if (i%4==0)
        beatNum[i].color(beatNum[i].red);
    else
        beatNum[i].color(beatNum[i].blue);
    beatNum[i].size(50,50);
    beatNum[i].position(50*i,0);
    beatPos[i].size(50,50);
    beatPos[i].position(50*i,50);
    beatPos[i].color(beatPos[i].green);
    v.addElement(beatPos[i]);
    v.addElement(beatNum[i]);
}

v.display();


//Loading the files
//----------------------------------------------------------

["k00.wav", "k01.wav", "k02.wav", "k03.wav", "k04.wav", "k05.wav", 
 "k06.wav", "k07.wav", "k08.wav", "k09.wav", "k10.wav"] @=> string kick[];
["s00.wav", "s01.wav", "s02.wav", "s03.wav", "s04.wav", "s05.wav", 
 "s06.wav", "s07.wav", "s08.wav", "s09.wav", "s10.wav"] @=> string snare[];
["c00.wav", "c01.wav", "c02.wav", "c03.wav", "c04.wav", "c05.wav", 
 "c06.wav", "c07.wav", "c08.wav", "c09.wav", "c10.wav"] @=> string c_hat[];
["o00.wav", "o01.wav", "o02.wav", "o03.wav", "o04.wav", "o05.wav",
 "o06.wav", "o07.wav", "o08.wav", "o09.wav", "o10.wav"] @=> string o_hat[]; 
 
4 => int numSounds;
SndBuf sound[numSounds];

0.5::second => dur bar_dur;
16 => int numBeats;
int sam[numBeats];
-1 => int beat_mode;
1 => int solo_mode;

0 => int cur_index;
Gain gain;
LPF lpf;
lpf.freq(10000);
for (0 => int i;i<numSounds;i++)
    sound[i] => gain => lpf=> dac;
//----------------------------------------------------------
//Drum play function
fun int drumForKey(int keyn)
{
//    <<<keyn>>>;
    //kick drums mapped to number row
    if (keyn==49)
        playDrum(0,0);
    else if (keyn==50)
        playDrum(0,1);
    else if (keyn==51)
        playDrum(0,2);
    else if (keyn==52)
        playDrum(0,3);
    else if (keyn==53)
        playDrum(0,4);
    else if (keyn==54)
        playDrum(0,5);
    else if (keyn==55)
        playDrum(0,6);
    else if (keyn==56)
        playDrum(0,7);
    else if (keyn==57)
        playDrum(0,8);
    else if (keyn==48)
        playDrum(0,9);
    else if (keyn==45)
        playDrum(0,10);    
    //snares mapped to Q row
    else if (keyn==81)
        playDrum(1,0);
    else if (keyn==87)
        playDrum(1,1);
    else if (keyn==69)
        playDrum(1,2);
    else if (keyn==82)
        playDrum(1,3);
    else if (keyn==84)
        playDrum(1,4);
    else if (keyn==89)
        playDrum(1,5);
    else if (keyn==85)
        playDrum(1,6);
    else if (keyn==73)
        playDrum(1,7);
    else if (keyn==79)
        playDrum(1,8);
    else if (keyn==80)
        playDrum(1,9);
    else if (keyn==91)
        playDrum(1,10);
    //closed hihat mapped to A row
    else if (keyn==65)
        playDrum(2,1);
    else if (keyn==83)
        playDrum(2,2);
    else if (keyn==68)
        playDrum(2,3);
    else if (keyn==70)
        playDrum(2,4);
    else if (keyn==71)
        playDrum(2,5);
    else if (keyn==72)
        playDrum(2,6);
    else if (keyn==74)
        playDrum(2,7);
    else if (keyn==75)
        playDrum(2,8);
    else if (keyn==76)
        playDrum(2,9);
    else if (keyn==59)
        playDrum(2,10);
    //open hihat mapped to Z row
    else if (keyn==90)
        playDrum(3,1);
    else if (keyn==88)
        playDrum(3,2);
    else if (keyn==67)
        playDrum(3,3);
    else if (keyn==86)
        playDrum(3,4);
    else if (keyn==66)
        playDrum(3,5);
    else if (keyn==78)
        playDrum(3,6);
    else if (keyn==77)
        playDrum(3,7);
    else if (keyn==44)
        playDrum(3,8);
    else if (keyn==46)
        playDrum(3,9);
    else if (keyn==47)
        playDrum(3,10);
    else
        return 0;
    return 1;
}

//actual playing of drum
fun void playDrum(int kind, int num)
{
    
    //kick
    if (kind==0)
    {
        kick[num] => sound[0].read;
        //<<<rate>>>;
        if (rate>0)
            sound[0].pos(0);
        else
        {
            sound[0].pos(sound[0].samples());
        }
    }
    //snare
    if (kind==1)
    {
        snare[num] => sound[1].read;
        if (rate>0)
            sound[1].pos(0);
        else
            sound[1].pos(sound[1].samples());

    }
    //close hihat
    if (kind==2)
    {
        c_hat[num] => sound[2].read;
        if (rate>0)
            sound[2].pos(0);
        else
            sound[2].pos(sound[2].samples());
    }
    //open hihat
    if (kind==3)
    {
        o_hat[num] => sound[3].read;
        if (rate>0)
            sound[3].pos(0);
        else
            sound[3].pos(sound[3].samples());
    }

    
}
//Keyboard
//----------------------------------------------------------

fun void keyboardFunction()
{
    Hid hi;
    HidMsg msg;
    
    // which keyboard
    0 => int device;
    // get from command line
    if( me.args() ) me.arg(0) => Std.atoi => device;
    
    // open keyboard (get device number from command line)
    if( !hi.openKeyboard( device ) ) me.exit();
    <<< "keyboard '" + hi.name() + "' ready", "" >>>;
    
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
                //<<< "down:", msg.which, "(code)", msg.key, "(usb key)", msg.ascii, "(ascii)" >>>;
                //drumForKey(msg.ascii);
                
                //space bar pressed
                if (msg.ascii==32)
                {
                    -1 *=> solo_mode;
                    
                }
                else if (msg.key == 224)
                {
                    1 => rate;
                    for (0=>int i;i<numSounds;i++)
                        sound[i].rate(rate);                    
                }
                else if (msg.key == 227)
                {
                    0.5 => gain.gain;
                    lpf.freq(10000);
                    
                }

                
                else
                {
                    if (solo_mode==1)
                    {
                        drumForKey(msg.ascii);
                    }
                    else
                    {
                        
                        if (beat_mode == 1)
                        {       
                            msg.ascii => sam[cur_index];
                        }
                        else
                        {
                            msg.ascii => sam[cur_index];
                        }
                    }
                }
                <<< msg.key >>>;
                
                
                
                
            }
            
            else
            {
                //<<< "up:", msg.which, "(code)", msg.key, "(usb key)", msg.ascii, "(ascii)" >>>;
            }
        }
    }
}

//Mouse
//----------------------------------------------------------
fun void mouseFunction()
{
    // the device number to open
    1 => int deviceNum;
    
    // instantiate a HidIn object
    Hid hi_mouse;
    // structure to hold HID messages
    HidMsg msg_mouse;
    
    // open mouse 0, exit on fail
    if( !hi_mouse.openMouse( deviceNum ) ) me.exit();
    // successful! print name of device
    <<< "mouse '", hi_mouse.name(), "' ready" >>>;
    
    // infinite event loop
    while( true )
    {
        // wait on HidIn as event
        hi_mouse => now;
        
        // messages received
        while( hi_mouse.recv( msg_mouse ) )
        {
            // mouse motion
            if( msg_mouse.isMouseMotion() )
            {
                // axis of motion
                if( msg_mouse.deltaX )
                {
                    <<< "mouse motion:", msg_mouse.deltaX, "on x-axis" >>>;
                    float freq;
                    lpf.freq()+10*msg_mouse.deltaX => freq;
                    Math.max(50,freq) => freq;
                    Math.min(5000,freq) => freq;
                    lpf.freq(freq);
                    <<<freq>>>;
                }
                else if( msg_mouse.deltaY )
                {
                    <<< "mouse motion:", msg_mouse.deltaY, "on y-axis" >>>;
                    float change;
                    -msg_mouse.deltaY => change;
                    change/500 => change;
                    gain.gain() +=> change;
                    Math.min(1,change) => change;
                    Math.max(0,change) => change;
                    <<<change>>>;                    
                    gain.gain(change);
                }
            }
            
            // mouse button down
            else if( msg_mouse.isButtonDown() )
            {
                <<< "mouse button", msg_mouse.which, "down" >>>;
                -1 *=> beat_mode; 
                <<< beat_mode >>>;            
            }
            
            // mouse button up
            else if( msg_mouse.isButtonUp() )
            {
                <<< "mouse button", msg_mouse.which, "up" >>>;
            }
            
            // mouse wheel motion (requires chuck 1.2.0.8 or higher)
            else if( msg_mouse.isWheelMotion() )
            {
                // axis of motion
                if( msg_mouse.deltaX )
                {
                    <<< "mouse wheel:", msg_mouse.deltaX, "on x-axis" >>>;
                }            
                else if( msg_mouse.deltaY )
                {
                                        <<< "mouse motion:", msg_mouse.deltaY, "on y-axis" >>>;
                    float change;
                    -msg_mouse.deltaY => change;
                    change/100 => change;
                    change +=> rate;
                    <<<rate>>>;
                    for (0=>int i;i<numSounds;i++)
                        sound[i].rate(rate);
                    Math.max(rate,-10) => rate;
                    Math.min(rate,10) => rate;                    
                }
            }
        }
    }
}

//for (0=>int i;i<numBeats;i++)
//{
//    1 => sam[i];
//}

spork ~keyboardFunction();
spork ~mouseFunction();


while(1)
{
    for (0=>int i;i<numBeats;i++)
    {

        if (beat_mode == 1)
        {
            if (i%4 == 0)
            {
                beatNum[i].light();
                i => cur_index;
                drumForKey(sam[i]) => int played;
                if (played==1)
                    beatPos[i].light();
                else
                    beatPos[i].unlight();
            }
        }
        else
        {
            beatNum[i].light();
            i => cur_index;
            drumForKey(sam[i]) => int played;
            if (played==1)
                beatPos[i].light();
            else
                beatPos[i].unlight();
        }
        0.1::second => now;
        beatNum[i].unlight();
    }

}

1::day => now;