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
if (me.args() > 0)
{
    Std.atoi(me.arg(0)) => my_machine_number;
}
<<< "Machine number is set to " + my_machine_number >>>;

NodeState my_state;

OscRecv receive_from_server;
Config.server_to_node_port => receive_from_server.port;
receive_from_server.listen();

OscSend xmit_to_server;
xmit_to_server.setHost( Config.server_name(), Config.node_to_server_port );

OscSend xmit_to_synth;
xmit_to_synth.setHost( "localhost", Config.node_to_synth_port );

// Listen for pulse messages:
fun void listen_status_pulse()
{
    // create an address in the receiver, store in new variable
    receive_from_server.event( Config.osc_message_state(), Config.osc_message_state_data() ) @=> OscEvent oe_pulse;
    
    // infinite event loop
    while ( true )
    {
        // wait for event to arrive
        oe_pulse => now;
        my_state.receive_message(oe_pulse);
        //my_state.print();
        if (my_state.sequence_index != -1)
        {
            xmit_to_synth.startMsg( Config.osc_message_node_to_synth(), Config.osc_message_node_to_synth_data() );
            my_state.sequence_index => xmit_to_synth.addInt;
            my_state.sequence_length => xmit_to_synth.addInt;
        }
    }
}


// Node requests server to change its state to requested state
fun void send_node_request()
{
    xmit_to_server.startMsg( Config.osc_message_state(), Config.osc_message_state_data() );
    
    my_state.send_message(xmit_to_server);
    //<<<"send msg">>>;
}


// Keyboard loop 
// monitors keyboard input and sets bang_next_beat to equal number pressed
fun void keyboard_loop()
{
    // Keyboard Setup
    Hid kb;
    HidMsg kb_msg;
    
    // open keyboard (get device number from command line)
    if( !kb.openKeyboard( 0 ) ) 
    {
        
        me.exit();
    }
    <<< "keyboard '" + kb.name() + "' ready", "" >>>;
    while(true) 
    {
        kb => now;
        while (kb.recv(kb_msg)){
            if (kb_msg.isButtonDown() )
            {
                <<< kb_msg.key >>>;
                if (kb_msg.key == 46 ){ // Number 1
                    my_state.sequence_length++;
                    if (my_state.sequence_length > 20)
                        20 => my_state.sequence_length;
                    <<< "length = ", my_state.sequence_length >>>;
                    
                }
                
                if (kb_msg.key == 45 ){ // Number 2
                    my_state.sequence_length--;
                    if (my_state.sequence_length < 1)
                        1 => my_state.sequence_length;
                    <<< "length = ", my_state.sequence_length >>>;
                    
                }
                
                if (kb_msg.key == 79 ){
                    <<< "sending right">>>;
                    0 => my_state.next_node;
                }
                if (kb_msg.key == 80 ){
                    <<< "sending left">>>;
                    1 => my_state.next_node;
                }
                if (kb_msg.key == 81 ){
                    <<< "sending down">>>;
                    2 => my_state.next_node;
                }
                if (kb_msg.key == 82 ){
                    <<< "sending up">>>;
                    3 => my_state.next_node;
                }
                
                send_node_request();
            }
            else 
            {
            }
        }
    }
} 

spork ~listen_status_pulse();
spork ~keyboard_loop();

while (true)
{
    100::day => now;   
}
