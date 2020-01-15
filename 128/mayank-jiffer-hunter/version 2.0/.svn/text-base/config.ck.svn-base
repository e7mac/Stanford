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
    
    // Number of nodes:
    4 => static int NUMNODES;
    
    // Name of nodes, update before each run
    fun static string host_name(int index)
    {
        if (mode == 1)
        {
            return "localhost";
        }
        else if (mode == 2)
        {
            if (index == 0)
                return "localhost";
            if (index == 1)
                return "Mac.local";

        }

        else // mode 0
        {
            if (index == 0)
            {
                return "albacore.local";
            }
            else if (index == 1)
            {
                return "bahnmi.local";
            }
            else if (index == 2)
            {
                return "chowder.local";
            }
            else if (index == 3)
            {
                return "donut.local";
            }
            else if (index == 4)
            {
                return "empanada.local";
            }
            else if (index == 5)
            {
                return "foiegras.local";
            }
            else if (index == 6)
            {
                return "gelato.local";
            }
            else if (index == 7)
            {
                return "hamburger.local";
            }
            else if (index == 8)
            {
                return "icetea.local";
            }
            else if (index == 9)
            {
                return "jambalaya.local";
            }
            else if (index == 10)
            {
                return "kimchi.local";
            }
            else if (index == 11)
            {
                return "lasagna.local";
            }
            else if (index == 12)
            {
                return "meatloaf.local";
            }
            else if (index == 13)
            {
                return "nachos.local";
            }
            else if (index == 14)
            {
                return "omelet.local";
            }
            else if (index == 15)
            {
                return "pho.local";
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
        else if (mode == 2)
        {
            return "Mac.local";
        }
        else
        {
            return "quinoa.local";
        }
    }
    
    // Different modes we can be in:
    0 => static int MODE_IDLE;
    1 => static int MODE_ACTIVE;
    
    // OSC ports:
    6470 => static int server_to_node_port;   // send status pulse
    6471 => static int node_to_server_port;   // send state request
    6473 => static int node_to_synth_port;    // make sound
    
    // Delay between OSC server burst messages, in ms
    // 1 => static int osc_burst_delay;
    
    // OSC message definitions:
    fun static string osc_message_state()
    {
        return "/state";
    }
    fun static string osc_message_state_data()
    {
        // mahine_num, next_node, sequence_length, sequence_index, pulses_since_banged
        return "i i i i i";
    }
        
    fun static string osc_message_node_to_synth()
    {
        return "/synth";
    }
    fun static string osc_message_node_to_synth_data()
    {
        // Indicates sequence index and sequence length
        return "i i";
        
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
    else if (me.arg(0) == "two_test")
    {
        <<< "Setting up 2 computer test version" >>>;
        2 => Config.mode;
        2 => Config.NUMNODES;


    }
}
