//  main.cpp
//  osc+midi
//  
//  Created by Mayank Sanganeria on 2011-11-11 at 11:11 PM.
//
//  Uses:
//      - oscpack 1.0.2 (http://www.audiomulch.com/~rossb/oscpack)
//      - Stk 4.4.3 (https://ccrma.stanford.edu/software/stk/)
//		- Jorge Herrera's example

#include "osc.cpp"

void usage( void ) {
	std::cerr << "\nuseage:	./CallAndNetsponse <ipaddress> <inputPortNum> <outputPortNum>\n";
	std::cerr << "	ipaddress: IP Address of the computer you're connecting to.\n";
	std::cerr << "	inputPortNum: Listen port number (must match other computer's output port number).\n";
	std::cerr << "	outputPortNum: Sending port number (must match other computer's input port number).\n\n";	
	exit( 1 );
}



//--------------------------------------------------------------------
// name: main
// desc: entry point
//--------------------------------------------------------------------
int main (int argc, char ** argv)
{
	ipData *ipAdds = new ipData;
	// Command Line parsing
	//---------------------
	if( argc == 2 && strcmp(argv[1], "-help") == 0)
	{
		usage();
		exit(0);
	}
	else if ( argc == 4 ) {	
		ipAdds->hostName = argv[1];
		ipAdds->inPort = atoi(argv[2]);
		ipAdds->outPort = atoi(argv[3]);
	}
	else {
		usage();
		exit(0);
	}
    Thread listenerThread;
    // start the OSC listener thread
    bool success = listenerThread.start( oscListener, (void *)ipAdds );
    if( !success )
    {
        cerr << "Error when creating listener thread!" << endl;
        exit(1);
    }
	midi_init((void *)ipAdds);
	delete ipAdds;
    return 0;
}


