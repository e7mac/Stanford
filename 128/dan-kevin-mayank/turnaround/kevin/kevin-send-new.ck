// Create OSC Sender
6 => int numStations;   // # of SLOrk stations (up to 6)
8888 => int port;   // same listening port # for all stations
OscSend xmit[numStations];
string stationIPadd[numStations];
float delay[numStations];
// type in IP Address for each station
// localhost is computer that runs this program
0 => int local;
//"localhost" => stationIPadd[(6)%numStations];
"albacore.local" => stationIPadd[(0+local)%numStations];
"empanada.local" => stationIPadd[(1+local)%numStations];
"foiegras.local" => stationIPadd[(2+local)%numStations];
"donut.local" => stationIPadd[(3+local)%numStations];
"chowder.local" => stationIPadd[(4+local)%numStations];
"banhmi.local" => stationIPadd[(5+local)%numStations];

for ( 0 => int i; i<numStations; i++ )
    xmit[i].setHost( stationIPadd[i], port );

SndBuf snd => Gain g => Envelope env => dac.chan(5);
0.5 => float vel;
0.5 => g.gain;
1 => env.keyOn;

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
            <<< "down:", msg.which >>>;
                
                // Play wave files
                  
                  if (msg.key == 20) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/1.wav" );
                } if (msg.key == 26) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/2.wav" );
                } if (msg.key == 8) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/3.wav" );
                } if (msg.key == 21) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/4.wav" );
                } if (msg.key == 23) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/5.wav" );
                } if (msg.key == 28) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/6.wav" ); 
                } if (msg.key == 24) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/7.wav" );
                } if (msg.key == 12) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/8.wav" );
                } if (msg.key == 18) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/9.wav" );
                } if (msg.key == 19) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/10.wav" );
                }if (msg.key == 4) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/11.wav" );
                } if (msg.key == 22) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/12.wav" );
                } if (msg.key == 7) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/13.wav" );
                } if (msg.key == 9) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/14.wav" );
                } if (msg.key == 10) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/15.wav" );
                } if (msg.key == 11) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/16.wav" );
                } if (msg.key == 13) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/17.wav" );
                } if (msg.key == 14) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/18.wav" );
                } if (msg.key == 15) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/19.wav" );
                } if (msg.key == 51) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/20.wav" );
                } if (msg.key == 29) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/21.wav" );
                } if (msg.key == 27) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/22.wav" );
                } if (msg.key == 6) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/23.wav" );
                } if (msg.key == 25) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/24.wav" );
                } if (msg.key == 5) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/25.wav" );
                } if (msg.key == 17) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/26.wav" );
                } if (msg.key == 16) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/27.wav" );
                } if (msg.key == 54) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/28.wav" );
                } if (msg.key == 55) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/29.wav" );
                } if (msg.key == 56) {
                    spork ~ play_wave( "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/30.wav" );
                }
   
                for ( 1 => int i; i<numStations; i++ )
                {
                    // start the message...
                    xmit[i].startMsg( "key/delay, i, f" );
                    msg.key => xmit[i].addInt;
              
                    0.2*i => delay[i] => xmit[i].addFloat;

                    <<< "sent (via OSC):", msg.key, delay[i] >>>;
                }
        }
    }
}
