// STJoystick.h

/* Platform independent joystick class.  The code in
 * STJoystick.h and STJoystick.cpp is platform independent
 * and the STJoystick class abstracts away all platform
 * dependent complexity.  The platform dependent parts
 * are in STJoystick_<platform>.cpp.
 *
 * The STJoystick class is very similar to the SDL
 * interface, but wrapped to make it more convenient.
 * Also, the event processing has been stripped out
 * since we don't maintain a general event loop.
 * However, since the events were generated simply by
 * polling the open joysticks, its simple to either
 * implement this functionality in your program or
 * add the functionality to the STJoystick class itself.
 */

#ifndef _ST_JOYSTICK_H_
#define _ST_JOYSTICK_H_

#include <string>

/* Constants for STJoysticks */
#define ST_JOYSTICK_RELEASED        0x00
#define ST_JOYSTICK_PRESSED            0x01
#define ST_JOYSTICK_HAT_CENTERED    0x00
#define ST_JOYSTICK_HAT_UP            0x01
#define ST_JOYSTICK_HAT_RIGHT        0x02
#define ST_JOYSTICK_HAT_DOWN        0x04
#define ST_JOYSTICK_HAT_LEFT        0x08
#define ST_JOYSTICK_HAT_RIGHTUP        (ST_JOYSTICK_HAT_RIGHT|ST_JOYSTICK_HAT_UP)
#define ST_JOYSTICK_HAT_RIGHTDOWN    (ST_JOYSTICK_HAT_RIGHT|ST_JOYSTICK_HAT_DOWN)
#define ST_JOYSTICK_HAT_LEFTUP        (ST_JOYSTICK_HAT_LEFT|ST_JOYSTICK_HAT_UP)
#define ST_JOYSTICK_HAT_LEFTDOWN    (ST_JOYSTICK_HAT_LEFT|ST_JOYSTICK_HAT_DOWN)


/* STJoystick - Class to access joysticks and get information about
 * their state.  Also includes static functions to initialize the
 * joystick system and get information about the joysticks before
 * opening them.
 */
class STJoystick {
public:
    ~STJoystick();

    /*  You need to call these functions before and when you are
        done using the joystick library. */
    static int Initialize();
    static void Destroy();

    /* Use these functions to get basic information before opening
       any joysticks. */
    static int NumJoysticks();
    static const char* GetName(int device_index);

    /* Open and close joysticks.  The low level joystick is
       reference counted so you can safely call Close() on
       a joystick and other references will remain valid. */
    static STJoystick* OpenJoystick(int device_index);
    static void Close(int device_index);
    void Close();

    /* Get properties of the joystick. */
    const char* GetName();
    int NumAxes();
    int NumBalls();
    int NumHats();
    int NumButtons();
    int GetIndex();

    /* Update the joystick state.  Use this for polling. */
    void Update();

    /* Get information about the joystick state. */
    short GetAxis(int axis);
    unsigned char GetHat(int hat);
    void GetBall(int ball, int *dx, int *dy);
    unsigned char GetButton(int button);

    /* Some helper functions to handle errors. */
    static void FatalError(const std::string& error);
    static void Error(const std::string& error);
    static void MemoryError();


    /* Joystick ball delta */
    typedef struct _STBallDelta {
        short dx;
        short dy;
    } STBallDelta;

    /* Joystick structure used to hold information about a joystick.
    * There will only ever be as many of these structures as there
    * are joysticks, but there can be more than one STJoystick
    * using each one.  The user will never use this struct, it
    * is only for internal use by the STJoystick class.
    */
    typedef struct _STJoystickData {
        unsigned char index;        /* Device index */
        const char *name;            /* Joystick name - system dependent */

        int naxes;                    /* Number of axis controls on the joystick */
        short *axes;                /* Current axis states */

        int nhats;                    /* Number of hats on the joystick */
        unsigned char *hats;        /* Current hat states */

        int nballs;                    /* Number of trackballs on the joystick */
        STBallDelta *balls;            /* Current ball motion deltas */

        int nbuttons;                /* Number of buttons on the joystick */
        unsigned char *buttons;        /* Current button states */

        struct joystick_hwdata *hwdata;    /* Driver dependent information */
        int ref_count;                /* Reference count for multiple opens */
    } STJoystickData;



private:

    /* Static members to keep track of all joysticks. */
    static unsigned char num_joysticks;
    static STJoystickData** joysticks;
    static STJoystickData* default_joystick;

    /* The data struct for this particular joystick. */
    STJoystickData* joystick_data;

    /* Constructors, private since you should only
       get a joystick using OpenJoystick(). */
    STJoystick();
    STJoystick(STJoystickData* stdata);

    /* System specific functions. All the platform dependent
       functionality should be in these functions and these
       are implemented in the platform specific code files. */
    static int Sys_Initialize();
    static const char* Sys_GetName(int index);
    static int Sys_OpenJoystick(int device_index);
    void Sys_Update();
    static void Sys_Close(int device_index);
    static void Sys_Destroy();
};

#endif /* _ST_JOYSTICK_H_ */
