////////////////////////////////////////////////////////////
// Final Project
// Node Module
////////////////////////////////////////////////////////////
// Slork 2012
// Mayank Sanganeria, Jiffer Harriman, Hunter McCurry
////////////////////////////////////////////////////////////

NodeState my_state;


OscRecv receive_from_server;
Config.server_to_node_port => receive_from_server.port;
receive_from_server.listen();

OscSend xmit_to_server;
xmit_to_server.setHost( Config.server_name(), Config.node_to_server_port );

OscSend xmit_to_server_trigger;
xmit_to_server_trigger.setHost( Config.server_name(), Config.node_to_server_trigger_port );

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
        
        xmit_to_synth.startMsg( Config.osc_message_node_to_synth(), Config.osc_message_node_to_synth_data() );
        my_state.sequence_index => xmit_to_synth.addInt;
        my_state.sequence_length => xmit_to_synth.addInt;
        my_state.pulses_since_banged => xmit_to_synth.addInt;
        my_state.next_node => xmit_to_synth.addInt;
        if (my_state.wail_mode == 1 && my_state.next_node == my_state.machine_num) // do_wail YES if wail_mode and pointing to self
            1 => xmit_to_synth.addInt;
        else
            0 => xmit_to_synth.addInt;         //otherwise regular beat sequencer mode
        
        my_state.section => xmit_to_synth.addInt; 
        my_state.machine_num => xmit_to_synth.addInt;
    }
}


// Node requests server to change its state to requested state
fun void send_node_request()
{
    xmit_to_server.startMsg( Config.osc_message_state(), Config.osc_message_state_data() );
    
    my_state.send_message(xmit_to_server);
    <<<"Send state to server">>>;
}

// Node requests server to change its state to trigger
fun void send_node_request_trigger()
{
    xmit_to_server_trigger.startMsg( Config.osc_message_state(), Config.osc_message_state_data() );
    
    my_state.send_message(xmit_to_server_trigger);
    <<<"Send trigger to server">>>;
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
                
                <<<kb_msg>>>;
                Math.pow(Config.NUMNODES,0.5) => float root;
                root $ int => int n;
                //if NUMNODES is not square just mod using NUMNODES
                if (root!=n)
                {
                    <<<"Not Square">>>;
                    Config.NUMNODES => n;
                }
                my_state.machine_num/n => int row;
                my_state.machine_num%n => int col;
                //                <<<row+" "+ col>>>;
                <<< kb_msg.key >>>;
                if (kb_msg.key > 29 && kb_msg.key <40){ // Number 1=30 and Number 9=38
                    (kb_msg.key-29) => int numKey;
                    <<< "number "+numKey+" pressed" >>>;
                    numKey => my_state.sequence_length;
                }
                else if (kb_msg.key == 79) //right key
                {
                    <<<"right key pressed">>>;
                    col++;
                    col%n => col;
                    (row*n+col) => my_state.next_node;
                    <<<"next node: "+my_state.next_node>>>;
                }
                else if (kb_msg.key == 81) //down key
                {
                    <<<"down key pressed">>>;
                    row++;
                    row%n => row;
                    (row*n+col) => my_state.next_node;
                    <<<"next node: "+my_state.next_node>>>;                    
                    
                }
                else if (kb_msg.key == 80) //left key
                {
                    <<<"left key pressed">>>;
                    col--;
                    if (col<0)
                        n +=> col;
                    (row*n+col) => my_state.next_node;
                    <<<"next node: "+my_state.next_node>>>;                    
                    
                }
                else if (kb_msg.key == 82) //up key
                {
                    <<<"up key pressed">>>;
                    row--;
                    if (row<0)
                        n +=> row;
                    (row*n+col) => my_state.next_node;
                    <<<"next node: "+my_state.next_node>>>;                    
                    
                }
                else if (kb_msg.key == 229) //right shift
                {
                    <<<"right shift pressed">>>;
                    my_state.machine_num => my_state.next_node;
                    <<<"next node: "+my_state.next_node>>>;                    
                    
                }

                else if (kb_msg.key == 44) //space bar
                {
                    <<<"space bar pressed">>>;
                    0 => my_state.sequence_index;
                    send_node_request_trigger();
                }
                
                // decrement
                else if (kb_msg.key == 45) // -_
                {
                    if (my_state.sequence_length > 1)
                        my_state.sequence_length--;
                    
                    <<<"length", my_state.sequence_length>>>;
                    
                }
                // increment
                else if (kb_msg.key == 46) // +=
                {
                    if (my_state.sequence_length < 10)
                        my_state.sequence_length++;
                    <<<"length", my_state.sequence_length>>>;
                    
                }                
                send_node_request();
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
