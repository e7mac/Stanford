/*
    SDL - Simple DirectMedia Layer
    Copyright (C) 1997-2006 Sam Lantinga

    This library is free software; you can redistribute it and/or
    modify it under the terms of the GNU Lesser General Public
    License as published by the Free Software Foundation; either
    version 2.1 of the License, or (at your option) any later version.

    This library is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
    Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public
    License along with this library; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

    Sam Lantinga
    slouken@libsdl.org
*/

/* This is the joystick API for Simple DirectMedia Layer */

#include "STJoystick.h"

#include <string.h>
#include <stdio.h>
#include <stdlib.h>

unsigned char STJoystick::num_joysticks = 0;
STJoystick::STJoystickData** STJoystick::joysticks = NULL;
STJoystick::STJoystickData* STJoystick::default_joystick = NULL;

STJoystick::STJoystick()
: joystick_data(NULL)
{
}

STJoystick::STJoystick(STJoystickData* stdata) 
: joystick_data(stdata)
{
}

STJoystick::~STJoystick() 
{
    Close();
}

/* Initialize the joysticks. */
int STJoystick::Initialize()
{
    int status;
    num_joysticks = 0;
    joysticks = NULL;
    default_joystick = NULL;

    // Perform platform specific initialization
    status = Sys_Initialize();
    // If we have joysticks, allocate space for their data
    if ( status >= 0 ) {
        joysticks = new STJoystickData*[status];
        if ( joysticks == NULL ) {
            num_joysticks = 0;
        } else {
            memset(joysticks, 0, sizeof(STJoystickData*)*status);
            num_joysticks = status;
        }
        status = 0;
    }
    default_joystick = NULL;
    return(status);
}

/* Get the number of joysticks attached to the system. */
int STJoystick::NumJoysticks()
{
    return num_joysticks;
}

/* Get the name of any joystick, doesn't require having opened it. */
const char* STJoystick::GetName(int device_index)
{
    if ( (device_index < 0) || (device_index >= num_joysticks) ) {
        Error("Joystick index out of range in GetName().\n");
        return(NULL);
    }
    return(Sys_GetName(device_index));
}

/* Get the name of this joystick. */
const char* STJoystick::GetName() {
    return this->joystick_data->name;
}

/* Open the device_index'th joystick attached to the system.
   Note that the device indices start at 0.
 */
STJoystick* STJoystick::OpenJoystick(int device_index)
{
    STJoystick *joystick = NULL;

    if ( (device_index < 0) || (device_index >= num_joysticks) ) {
        Error("Joystick index out of range in OpenJoystick().\n");
        return(NULL);
    }

    /* If the joystick is already open, return it */
    if ( joysticks[device_index] && 
            device_index == joysticks[device_index]->index ) {
        joysticks[device_index]->ref_count++;
        joystick = new STJoystick(joysticks[device_index]);
        return(joystick);
    }

    /* Create and initialize the joystick */
    joysticks[device_index] = new STJoystickData();
    if ( joysticks[device_index] != NULL ) {
        memset(joysticks[device_index], 0, sizeof(STJoystickData));
        joysticks[device_index]->index = device_index;
        if ( Sys_OpenJoystick(device_index) < 0 ) {
            delete joysticks[device_index];
            joysticks[device_index] = NULL;
        } else {
            if ( joysticks[device_index]->naxes > 0 ) {
                joysticks[device_index]->axes = 
                            new short[joysticks[device_index]->naxes];
            }
            if ( joysticks[device_index]->nhats > 0 ) {
                joysticks[device_index]->hats = 
                            new unsigned char[joysticks[device_index]->nhats];
            }
            if ( joysticks[device_index]->nballs > 0 ) {
                joysticks[device_index]->balls =
                            new STBallDelta[joysticks[device_index]->nballs];
            }
            if ( joysticks[device_index]->nbuttons > 0 ) {
                joysticks[device_index]->buttons = 
                            new unsigned char[joysticks[device_index]->nbuttons];
            }
            if ( ((joysticks[device_index]->naxes > 0) && !joysticks[device_index]->axes)
              || ((joysticks[device_index]->nhats > 0) && !joysticks[device_index]->hats)
              || ((joysticks[device_index]->nballs > 0) && !joysticks[device_index]->balls)
              || ((joysticks[device_index]->nbuttons > 0) && !joysticks[device_index]->buttons)) {
                MemoryError();
                Close(device_index);
                joysticks[device_index] = NULL;
            }
            if ( joysticks[device_index]->axes ) {
                memset(joysticks[device_index]->axes, 0,
                    joysticks[device_index]->naxes*sizeof(short));
            }
            if ( joysticks[device_index]->hats ) {
                memset(joysticks[device_index]->hats, 0,
                    joysticks[device_index]->nhats*sizeof(unsigned char));
            }
            if ( joysticks[device_index]->balls ) {
                memset(joysticks[device_index]->balls, 0,
                  joysticks[device_index]->nballs*sizeof(*joysticks[device_index]->balls));
            }
            if ( joysticks[device_index]->buttons ) {
                memset(joysticks[device_index]->buttons, 0,
                    joysticks[device_index]->nbuttons*sizeof(unsigned char));
            }
        }
    }
    if ( joysticks[device_index] ) {
        /* Add joystick to list */
        joysticks[device_index]->ref_count++;
        joystick = new STJoystick(joysticks[device_index]);
    }
    return(joystick);
}

/* Get the device index of this joystick. */
int STJoystick::GetIndex()
{
    if (joystick_data == NULL)
        return -1;
    return joystick_data->index;
}

/* 
   Get the number of multidimensional axis controls
   on the joystick.
 */
int STJoystick::NumAxes()
{
    if (joystick_data == NULL)
        return -1;
    return joystick_data->naxes;
}

/* 
   Get the number of hats (directional pads)
   on the joystick.
 */
int STJoystick::NumHats()
{
    if (joystick_data == NULL)
        return -1;
    return joystick_data->nhats;
}

/*
   Get the number of trackball controls
   on the joystick.
 */
int STJoystick::NumBalls()
{
    if (joystick_data == NULL)
        return -1;
    return joystick_data->nballs;
}

/* Get the number of buttons on the joystick. */
int STJoystick::NumButtons()
{
    if (joystick_data == NULL)
        return -1;
    return joystick_data->nbuttons ;
}

/* Get the current state of an axis control on the joystick. */
short STJoystick::GetAxis(int axis)
{
    if (joystick_data == NULL)
        return 0;

    if ( axis < joystick_data->naxes ) {
        return joystick_data->axes[axis];
    } else {
        Error("Invalid axis index in GetAxis().\n");
        return 0;
    }
}

/* Get the current state of a hat control on the joystick. */
unsigned char STJoystick::GetHat(int hat)
{
    if (joystick_data == NULL)
        return 0;

    if ( hat < joystick_data->nhats ) {
        return joystick_data->hats[hat];
    } else {
        Error("Invalid joystick index in GetHat().\n");
        return 0;
    }
}

/* Get the change of a trackball since the last poll. */
void STJoystick::GetBall(int ball, int *dx, int *dy)
{
    if (dx) *dx = 0;
    if (dy) *dy = 0;

    if (joystick_data == NULL)
        return;

    if ( ball < joystick_data->nballs ) {
        if ( dx ) {
            *dx = joystick_data->balls[ball].dx;
        }
        if ( dy ) {
            *dy = joystick_data->balls[ball].dy;
        }
        joystick_data->balls[ball].dx = 0;
        joystick_data->balls[ball].dy = 0;
    } else {
        Error("Invalid ball index in GetBall().\n");
    }
}

/* Get the current state of a button on the joystick. */
unsigned char STJoystick::GetButton(int button)
{
    if (joystick_data == NULL)
        return 0;

    if ( button < joystick_data->nbuttons ) {
        return joystick_data->buttons[button];
    } else {
        Error("Invalid joystick button index in GetButton().\n");
        return 0;
    }
}

/*
 * Close a joystick previously opened with SDL_JoystickOpen()
 */
void STJoystick::Close(int device_index)
{
    if (device_index < 0 || device_index >= num_joysticks) {
        Error("Invalid joystick device index in Close().\n");
        return;
    }

    if (joysticks[device_index] == NULL) {
        Error("Tried to close unopened joystick.\n");
        return;
    }

    /* First decrement ref count, return if there are
       still references to this joystick.
     */
    joysticks[device_index]->ref_count--;
    if ( joysticks[device_index]->ref_count > 0 ) {
        return;
    }

    if ( joysticks[device_index] == default_joystick ) {
        default_joystick = NULL;
    }
    Sys_Close(device_index);

    /* Free the data associated with this joystick */
    if ( joysticks[device_index]->axes ) {
        delete[] joysticks[device_index]->axes;
    }
    if ( joysticks[device_index]->hats ) {
        delete[] joysticks[device_index]->hats;
    }
    if ( joysticks[device_index]->balls ) {
        delete[] joysticks[device_index]->balls;
    }
    if ( joysticks[device_index]->buttons ) {
        delete[] joysticks[device_index]->buttons;
    }
    delete joysticks[device_index];
    joysticks[device_index] = NULL;
}
/* Same as above, but a non-static version for convenience. */
void STJoystick::Close() {
    Close(joystick_data->index);
}

void STJoystick::Destroy()
{
    Sys_Destroy();
    if ( joysticks ) {
        for(int i = 0; i < num_joysticks; i++) {
            if ( joysticks[i] )
                delete joysticks[i];
        }
        delete[] joysticks;
        joysticks = NULL;
    }

    num_joysticks = 0;
}

void STJoystick::Update()
{
    Sys_Update();
}


/* Some helper functions */
void STJoystick::FatalError(const std::string& error) {
  printf("Fatal error: %s\n", error.c_str());
  exit(-1);
}
void STJoystick::Error(const std::string& error) {
  printf("Error: %s\n", error.c_str());
}
void STJoystick::MemoryError() {
  printf("Fatal error: couldn't allocate memory\n");
  exit(-1);
}

