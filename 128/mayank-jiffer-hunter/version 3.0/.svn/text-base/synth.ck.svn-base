////////////////////////////////////////////////////////////
// Final Project
// Synth Module
////////////////////////////////////////////////////////////
// Slork 2012
// Mayank Sanganeria, Jiffer Harriman, Hunter McCurry
////////////////////////////////////////////////////////////


// synth patch:
//Impulse i => LPF f => JCRev r => dac;
SndBuf buf => LPF f => JCRev r => dac;

//"/Users/slork/slork/groups/2012/mayank-jiffer-hunter/sounds/" => string path;
"sounds/" => string path;

buf.pos(buf.samples());

.05 => r.mix;
10 => f.Q;

OscRecv listener;
Config.node_to_synth_port => listener.port;
listener.listen();

// sprok me to make sound
fun void make_sound(int file_num, float play_rate, float filter_freq){
    <<<"playing sound">>>;
    path + file_num + ".wav" => buf.read;
    1 => buf.rate;
    10000 => f.freq;
    if (buf.rate() < 0)
        buf.pos(buf.samples());
    else
        buf.pos(0);
}




// receive play sound cues
fun void listen_for_cue()
{

    // create an address in the receiver, store in new variable
    listener.event( Config.osc_message_node_to_synth(), Config.osc_message_node_to_synth_data() ) @=> OscEvent play;
    
    <<<"cue">>>;
    // infinite event loop
    while ( true )
    {
        // wait for event to arrive
        play => now;
        <<<"cue to play">>>;
        int file_num;
        float play_rate;
        float filter_freq;
        while( play.nextMsg() != 0 )
        {
            // get values
            play.getInt() => file_num;
            play.getFloat() => play_rate;
            play.getFloat() => filter_freq;
        }
        
        spork ~ make_sound(file_num, play_rate, filter_freq);
    }
}

spork ~ listen_for_cue();


// loop forever
while(1)
{
    1000::week => now;
}