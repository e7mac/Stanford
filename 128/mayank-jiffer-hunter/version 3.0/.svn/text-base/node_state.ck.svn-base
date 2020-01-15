////////////////////////////////////////////////////////////
// Final Project
// Node State Module
////////////////////////////////////////////////////////////
// Slork 2012
// Mayank Sanganeria, Jiffer Harriman, Hunter McCurry
////////////////////////////////////////////////////////////

public class NodeState
{
    5 => int machine_num;
    0 => int next_node;
    4 => int sequence_length;
    -1 => int sequence_index;
    0 => int pulses_since_banged;
    0 => int wail_mode;
    0 => int section;


    fun void send_message(OscSend message) {
        machine_num => message.addInt;
        next_node => message.addInt;
        sequence_length => message.addInt;
        sequence_index => message.addInt;
        pulses_since_banged => message.addInt;
        wail_mode => message.addInt;
        section => message.addInt;
    }
    
    fun void receive_message(OscEvent message) {
        while( message.nextMsg() != 0 )
        {
            message.getInt() => machine_num;
            message.getInt() => next_node;
            message.getInt() => sequence_length;
            message.getInt() => sequence_index; 
            message.getInt() => pulses_since_banged;   
            message.getInt() => wail_mode;    
            message.getInt() => section;                          
        }
    }
    
    fun void receive_request_message(OscEvent message) {
        while( message.nextMsg() != 0 )
        {
            message.getInt() => machine_num;
            message.getInt() => next_node;
            message.getInt() => sequence_length;
            int dummy;
            message.getInt() => dummy;
            message.getInt() => dummy;
            message.getInt() => dummy;
            message.getInt() => dummy;                        
        }
    }
    
    fun void print()
    {
        <<<"Machine : " + machine_num +" NextNode: " + next_node+" Length: "+ sequence_length + " Index: "+ sequence_index + " Pulses: "+ pulses_since_banged + " Wail: "+ wail_mode + " Section: "+ section>>>;
    }
    fun void copy(NodeState b)
    {
        b.machine_num => machine_num;
        b.next_node => next_node;
        b.sequence_length => sequence_length;
        b.sequence_index => sequence_index;
        b.pulses_since_banged => pulses_since_banged;
        b.wail_mode => wail_mode;
        b.section => section;
    }
    
    
    fun void copy_request_to_server(NodeState b)
    {
        b.next_node => next_node;
        b.sequence_length => sequence_length;
        b.pulses_since_banged => pulses_since_banged;
    }    
    
}
