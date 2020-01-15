//
//  Header.h
//  slork-FinalProject-Visuals
//
//  Created by Hunter McCurry on 5/23/12.
//  Copyright (c) 2012 Oberlin College. All rights reserved.
//

#ifndef NODE_H
#define NODE_H

#include "Framework.h"

class Node {
    
public:
    Node();
        
    aiVector3D center_position;
    
    int my_node_number;
    int next_node_number;
    int pulses_since_banged;
    bool active;
    
private:
    //none, for convenience
};


#endif
