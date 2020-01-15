////////////////////////////////////////////////////////////
// Final Project
// Server Module
////////////////////////////////////////////////////////////
// Slork 2012
// Mayank Sanganeria, Jiffer Harriman, Hunter McCurry
////////////////////////////////////////////////////////////


// set number of num_nodes
Config.NUMNODES => int num_nodes;
// value of pulse
.125::second => dur T;

// send objects
OscSend xmit_to_nodes[num_nodes];

//receive object
OscRecv receive_from_node;
Config.node_to_server_port => receive_from_node.port;
receive_from_node.listen();


// Initialize targets:
for (0 => int index; index < num_nodes; index++)
{
    xmit_to_nodes[index].setHost( Config.host_name(index), Config.server_to_node_port );
}


// node states
NodeState node_states[num_nodes];

// initialize next nodes
for (0 => int i; i < num_nodes; i++) {
    i => node_states[i].machine_num;
    (i+1) % num_nodes => node_states[i].next_node;
}


//listen for requests
fun void listen_status_request()
{
    // create an address in the receiver, store in new variable
    receive_from_node.event( Config.osc_message_state(), Config.osc_message_state_data() ) @=> OscEvent oe_pulse;
    
    // infinite event loop
    while ( true )
    {

        // wait for event to arrive
        oe_pulse => now;
        //<<<"recv msg">>>;
        //need to know who requested
        NodeState received_state;
        received_state.receive_message(oe_pulse);
        
        node_states[received_state.machine_num].copy(received_state);
        
        // do the needful
    }
}

spork ~listen_status_request();

//TODO: better way to spawn loops
0 => node_states[0].sequence_index;

fun void update_pulses()
{
    int changed_this_update[num_nodes];
    for( 0 => int i; i < num_nodes; i++ )
        0 => changed_this_update[i];
    
    for( 0 => int i; i < num_nodes; i++ )
    {
        node_states[i].print();
        if (!changed_this_update[i])
        {
            //look for active sequences
            if (node_states[i].sequence_index != -1)
            {
                node_states[i].sequence_index++; //advance sequence
                1 => changed_this_update[i];
            }
            if (node_states[i].sequence_index >= node_states[i].sequence_length) //if sequence over
            {
                -1 => node_states[i].sequence_index;              //deactivate seqence
                0 => node_states[node_states[i].next_node].sequence_index;  //activate next sequence
                1 => changed_this_update[node_states[i].next_node];
            }
        }
    }
}

// infinite time loop
while( true )
{
    update_pulses();
    for( 0 => int i; i < num_nodes; i++ )
    {
        // start the message...
        xmit_to_nodes[i].startMsg( Config.osc_message_state(), Config.osc_message_state_data() );
        
        // a message is kicked as soon as it is complete 
        node_states[i].send_message(xmit_to_nodes[i]);
    }
    // advance time
    T => now;
}
