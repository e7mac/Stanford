////////////////////////////////////////////////////////////
// Final Project
// Node Module
////////////////////////////////////////////////////////////
// Slork 2012
// Mayank Sanganeria, Jiffer Harriman, Hunter McCurry
////////////////////////////////////////////////////////////

// Default machine number; override if we pass in a command-line
// argument:
0 => int my_machine_number;

// Mode we are currently in:
Config.MODE_IDLE => int current_mode;

if (me.args() > 0)
{
    Std.atoi(me.arg(0)) => int arg_zero;
    <<< "Set machine number to " + arg_zero >>>;
    
    if ( arg_zero == 0 ) {
        Config.MODE_ACTIVE => current_mode;
    }
    else {
        Std.atoi(me.arg(0)) => my_machine_number;
    }
}

if (me.args() > 1)
{
    Std.atoi(me.arg(1)) => current_mode;
    <<< "Set mode to " + current_mode >>>;
}

// Keyboard Setup
Hid kb;
HidMsg kb_msg;

// open keyboard (get device number from command line)
if( !kb.openKeyboard( 0 ) ) {
    
     me.exit();
 }
<<< "keyboard '" + kb.name() + "' ready", "" >>>;


// set number of num_nodes
Config.NUMNODES => int num_nodes;

OscRecv receive_from_server;
Config.server_to_node_port => receive_from_server.port;
receive_from_server.listen();

OscRecv receive_from_node;
Config.node_to_node_port => receive_from_node.port;
receive_from_node.listen();

OscSend xmit_to_nodes[num_nodes];
// Initialize targets:

for (0 => int index; index < num_nodes; index++)
{
    if (index == my_machine_number) {
        xmit_to_nodes[index].setHost ( "localhost", Config.node_to_node_port );
    }
    else {
        //xmit_to_nodes[index].setHost ( "localhost", Config.server_to_node_port );
        //TODO: THE FOLLOWING IS THE ACTUAL LINE WE WANT
        xmit_to_nodes[index].setHost ( Config.host_name(index), Config.node_to_node_port );
    }
}

OscSend xmit_to_synth;
xmit_to_synth.setHost( "localhost", Config.node_to_synth_port );


-1 => int bang_next_beat; // -1 represents don't play/bang, 0 through 3 represents target nodes to bang

// Listen for pulse messages:
fun void listen_pulse()
{
    // create an address in the receiver, store in new variable
    receive_from_server.event( Config.osc_message_pulse(), Config.osc_message_pulse_data() ) @=> OscEvent oe_pulse;
    
    // infinite event loop
    while ( true )
    {
        // wait for event to arrive
        oe_pulse => now;
        
        while( oe_pulse.nextMsg() != 0 )
        {
            // get x and y
            oe_pulse.getInt() => int x;
            oe_pulse.getInt() => int y;
        }
        
        <<< "I am in mode: " + current_mode >>>;
        
        if (bang_next_beat >= 0) {
            //<<< "YAAAAAAAAAAAAAYAYAYAYAYAYAYAYAYAY" >>>;
            
            // Forward message to synth:
            xmit_to_synth.startMsg( Config.osc_message_node_to_synth(), Config.osc_message_node_to_synth_data() );
            
            Std.rand2(1,9) => xmit_to_synth.addInt;
            Std.rand2f(.5, 10) => xmit_to_synth.addFloat;
            Std.rand2(800, 2000) => xmit_to_synth.addFloat;
            
            // Bang target node
            send_bang(bang_next_beat);
            
            // clear bang variable
            -1 => bang_next_beat; 
        }
    }
}

// Listen for bangs. This changes mode to be "ACTIVE"
fun void listen_bang()
{
    receive_from_node.event( Config.osc_message_bang_node(), Config.osc_message_bang_node_data() ) @=> OscEvent oe_bang;
    while ( true )
    {
        oe_bang => now;
        <<< "got bang" >>>;
        
        Config.MODE_ACTIVE => current_mode;
        
        while( oe_bang.nextMsg() != 0 )
        {
            oe_bang.getInt() => int sending_node;

            <<< "Got bang from node: ", sending_node >>>;
        }
    }
}

// Send bang to target node. Changes mode back to "IDLE"
fun void send_bang(int target_node)
{
    <<< "target_node is " + target_node >>>;
    Config.MODE_IDLE => current_mode;
    
    xmit_to_nodes[target_node].startMsg( Config.osc_message_bang_node(), Config.osc_message_bang_node_data() );
    
    my_machine_number => xmit_to_nodes[target_node].addInt; // My machine ID
}


// Keyboard loop 
// monitors keyboard input and sets bang_next_beat to equal number pressed
fun void keyboard_loop()
{
    while(true) {
        kb => now;
        while (kb.recv(kb_msg)){
            if (kb_msg.isButtonDown() ){
                //<<< kb_msg.key >>>;
                if (current_mode == Config.MODE_ACTIVE) {
                    if (kb_msg.key == 30 ){ // Number 1
                        0 => bang_next_beat;
                        <<< "banging node 1" >>>;
                    }
                    else if (kb_msg.key == 31 ){ // Number 2
                        1 => bang_next_beat;
                        <<< "banging node 2" >>>;
                    }
                    else if (kb_msg.key == 32 ){ // Number 3
                        2 => bang_next_beat;
                        <<< "banging node 3" >>>;
                    }
                    else if (kb_msg.key == 33 ){ // Number 4
                        3 => bang_next_beat;
                        <<< "banging node 4" >>>;
                    }
                    else {
                        <<< "For now, the number of nodes doesn't go that high!" >>>;
                    }
                }
            }
        }
    } 
}

spork ~listen_pulse();
spork ~listen_bang();
spork ~keyboard_loop();

while (true)
{
    100::day => now;   
}
