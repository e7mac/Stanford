////////////////////////////////////////////////////////////
// Final Project
// Config Module
////////////////////////////////////////////////////////////
// Slork 2012
// Mayank Sanganeria, Jiffer Harriman, Hunter McCurry
////////////////////////////////////////////////////////////

// Holds common information
public class Config
{
    // Config mode
    0 => static int mode;
    
    // Name of nodes, update before each run
    fun static string host_name(int index)
    {
        if (mode == 1)
        {
            return "localhost";
        }
        else // mode 0
        {
            if (index == 0)
            {
                return "udon.local";
            }
            else if (index == 1)
            {
                return "nachos.local";
            }
            else if (index == 2)
            {
                return "meatloaf.local";
            }
            else if (index == 3)
            {
                return "spam.local";
            }
            
            else
            {
                <<< "ERROR: Requested node index too high!" >>>;
                return "";
            }
        }
    }
    
    // Name of server, update before each run
    fun static string server_name()
    {
        if (mode == 1)
        {
            return "localhost";
        }
        else
        {
            return "xanax.local";
        }
    }
    
    // Number of nodes:
    4 => static int NUMNODES;
    
    // Different modes we can be in:
    0 => static int MODE_IDLE;
    1 => static int MODE_ACTIVE;
    
    // OSC ports:
    6470 => static int server_to_node_port; // get metronome messages
    6471 => static int node_to_node_port;   // pass pulses
    6472 => static int node_to_synth_port;  // make sound
    
    // Delay between OSC server burst messages, in ms
    // 1 => static int osc_burst_delay;
    
    // OSC message definitions:
    fun static string osc_message_pulse()
    {
        return "/pulse";
    }
    fun static string osc_message_pulse_data()
    {
        // Sub_beat, Beat
        return "i i";
    }
    
    fun static string osc_message_bang_node()
    {
        return "/bang";
    }
    fun static string osc_message_bang_node_data()
    {
        // Indicates node number that bang originated from
        return "i";
    }
    
    fun static string osc_message_node_to_synth()
    {
        return "/synth";
    }
    fun static string osc_message_node_to_synth_data()
    {
        // Indicates wave file number, playback rate, filter freq
        return "i f f";
    }
    
}
// Instantiate to initialize static variables:
Config config;
if (me.args() > 0)
{
    if (me.arg(0) == "local_test")
    {
        <<< "Setting up local test version" >>>;
        1 => Config.mode;
        1 => Config.NUMNODES;
    }
    else if (me.arg(0) == "something_else")
    {
        <<< "Could do other things here" >>>;

    }
}
