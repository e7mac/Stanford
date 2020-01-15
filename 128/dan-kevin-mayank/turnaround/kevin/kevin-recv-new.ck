// create our OSC receiver
OscRecv recv;
// use port
8888 => recv.port;
// start listening (launch thread)
recv.listen();

// create an address in the receiver, store in new variable
recv.event( "key/delay, i, f" ) @=> OscEvent oe;

SndBuf snd => Gain g => Envelope env => dac.chan(5);
0.5 => float vel;
0.5 => g.gain;
1 => env.keyOn;

fun void play_wave(float delay, string filename) {
    delay::second => now;
    vel - delay/4 => g.gain;
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
        <<< "got (via OSC):", msgkey, delay >>>;
            
            // Play wave files
            
              if (msgkey == 20) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/1.wav" );
            } if (msgkey == 26) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/2.wav" );
            } if (msgkey == 8) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/3.wav" );
            } if (msgkey == 21) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/4.wav" );
            } if (msgkey == 23) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/5.wav" );
            } if (msgkey == 28) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/6.wav" ); 
            } if (msgkey == 24) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/7.wav" );
            } if (msgkey == 12) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/8.wav" );
            } if (msgkey == 18) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/9.wav" );
            } if (msgkey == 19) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/10.wav" );
            }if (msgkey == 4) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/11.wav" );
            } if (msgkey == 22) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/12.wav" );
            } if (msgkey == 7) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/13.wav" );
            } if (msgkey == 9) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/14.wav" );
            } if (msgkey == 10) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/15.wav" );
            } if (msgkey == 11) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/16.wav" );
            } if (msgkey == 13) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/17.wav" );
            } if (msgkey == 14) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/18.wav" );
            } if (msgkey == 15) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/19.wav" );
            } if (msgkey == 51) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/20.wav" );
            } if (msgkey == 29) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/21.wav" );
            } if (msgkey == 27) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/22.wav" );
            } if (msgkey == 6) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/23.wav" );
            } if (msgkey == 25) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/24.wav" );
            } if (msgkey == 5) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/25.wav" );
            } if (msgkey == 17) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/26.wav" );
            } if (msgkey == 16) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/27.wav" );
            } if (msgkey == 54) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/28.wav" );
            } if (msgkey == 55) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/29.wav" );
            } if (msgkey == 56) {
                spork ~ play_wave( delay, "/Users/slork/slork/groups/2012/dan-kevin-mayank/turnaround/kevin/30.wav" );
            }
    }
}
