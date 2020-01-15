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
    16 => static int NUMNODES;
    
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
                return "jiffer8.local";
            if (index == 1)
                return "Mayank.local";
            
        }
        
        else // mode 0
        {
            if (index == 0)
            {
                return "albacore.local";
            }
            else if (index == 12)
            {
                return "banhmi.local";
            }
            else if (index == 4)
            {
                return "chowder.local";
            }
            else if (index == 8)
            {
                return "donut.local";
            }
            else if (index == 1)
            {
                return "empanada.local";
            }
            else if (index == 13)
            {
                return "foiegras.local";
            }
            else if (index == 5)
            {
                return "gelato.local";
            }
            else if (index == 9)
            {
                return "hamburger.local";
            }
            else if (index == 6)
            {
                return "icetea.local";
            }
            else if (index == 10)
            {
                return "jambalaya.local";
            }
            else if (index == 2)
            {
                return "kimchi.local";
            }
            else if (index == 14)
            {
                return "lasagna.local";
            }
            else if (index == 7)
            {
                return "meatloaf.local";
            }
            else if (index == 11)
            {
                return "nachos.local";
            }
            else if (index == 3)
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
            return "Mayank.local";
        }
        else
        {
            return "vindaloo.local";
        }
    }
    
    // Different modes we can be in:
    0 => static int MODE_IDLE;
    1 => static int MODE_ACTIVE;
    
    // OSC ports:
    6470 => static int server_to_node_port;   // send status pulse
    6471 => static int node_to_server_port;   // send state request
    6473 => static int node_to_synth_port;    // make sound
    6474 => static int server_to_display_port;     // send data to visualizer
    
    // Delay between OSC server burst messages, in ms
    // 1 => static int osc_burst_delay;
    
    // OSC message definitions:
    fun static string osc_message_state()
    {
        return "/state";
    }
    fun static string osc_message_state_data()
    {
        // mahine_num, next_node, sequence_length, sequence_index, pulses_since_banged, wail_mode, section
        return "i i i i i i i ";
    }
    
    fun static string osc_message_node_to_synth()
    {
        return "/synth";
    }
    fun static string osc_message_node_to_synth_data()
    {
        // Indicates sequence index, sequence length, pulses_since_banged, next_node, do_wail, section, machine_num
        return "i i i i i i i";
    }
    
    fun static string osc_message_server_to_display_connections()
    {
        return "/display_connections";
    }
    fun static string osc_message_server_to_display_connections_data()
    {
        // state of all computers - node connected to
        "" => string data;
        for( 0 => int i; i < NUMNODES; i++ )
            "i " +=>data;
        return data;
        
    }
    fun static string osc_message_server_to_display_playing()
    {
        return "/display_playing";
    }
    fun static string osc_message_server_to_display_playing_data()
    {
        // state of all computers - playing or not
        "" => string data;
        for( 0 => int i; i < NUMNODES; i++ )
            "i " +=>data;
        return data;
    }
    fun static string osc_message_server_to_display_transition()
    {
        return "/disp_transition";
    }
    fun static string osc_message_server_to_display_transition_data()
    {
        // node from - node to
        return "i i";
    }
    fun static string osc_message_server_to_display_pulses_since_banged()
    {
        return "/disp_pulses_since_banged";
    }
    fun static string osc_message_server_to_display_pulses_since_banged_data()
    {
        // state of all computers - pulses since banged
        "" => string data;
        for( 0 => int i; i < NUMNODES; i++ )
            "i " +=>data;
        return data;
        
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
