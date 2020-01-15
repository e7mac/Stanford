////////////////////////////////////////////////////////////
// Final Project
// Server Module
////////////////////////////////////////////////////////////
// Slork 2012
// Mayank Sanganeria, Jiffer Harriman, Hunter McCurry
////////////////////////////////////////////////////////////


// set number of num_nodes
Config.NUMNODES => int num_nodes;
// value of 8th
.25::second => dur T;
// port
//6449 => int pulse_port;

// send objects
OscSend xmit_to_nodes[num_nodes];

// TODO_2: aim the transmitter at the desired hosts
//xmit[0].setHost ( "jiffer8.local", port );
//xmit[1].setHost ( "boom.local", port );
//xmit[2].setHost ( "snarl.local", port );
//xmit[3].setHost ( "squeak.local", port );
//xmit[4].setHost ( "mumble.local", port );
//xmit[5].setHost ( "hush.local", port );
//xmit[6].setHost ( "clang.local", port );
//xmit[7].setHost ( "whirr.local", port );
//xmit[8].setHost ( "buzz.local", port );
//xmit[9].setHost ( "moan.local", port );
//xmit[10].setHost ( "gush.local", port );
//xmit[11].setHost ( "splash.local", port );
//xmit[12].setHost ( "hiss.local", port );
//xmit[13].setHost ( "beep.local", port );
//xmit[14].setHost ( "screech.local", port );


// Initialize targets:
for (0 => int index; index < num_nodes; index++)
{
    xmit_to_nodes[index].setHost ( Config.host_name(index), Config.server_to_node_port );
}

4 => int beat;
8 => int sub_beat;
int x, y, z;

// infinite time loop
while( true )
{
    for( 0 => y; y < beat; y++ ){
        for( 0 => x; x < sub_beat; x++ )
        {
            for( 0 => z; z < num_nodes; z++ )
            {
                // start the message...
                //xmit[z].startMsg( "/rad/bros/tick", "i i" );
                xmit_to_nodes[z].startMsg( Config.osc_message_pulse(), Config.osc_message_pulse_data() );
                
                // a message is kicked as soon as it is complete 
                x => xmit_to_nodes[z].addInt;
                y => xmit_to_nodes[z].addInt;
            }
            
            // advance time
            T => now;
        }
    }
}