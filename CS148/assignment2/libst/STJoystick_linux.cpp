/* libST Joystick Implementation
 * Linux Specific Code
 * Adapted directly from libSDL, uses the Linux joystick
 * interface, assumes a relatively new kernel (2.6 series).
 * Note some weird things about this implementation:
 * 1) Logical joysticks - some joysticks show up as single
 *    joysticks even though they may actually be two.  This
 *    complicates the code a bit, but its really just
 *    an extra indirection in a couple of places.
 * 2) D-pads show up as axes that can only be fully in
 *    each direction. 
 */

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

#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/ioctl.h>
#include <limits.h>    /* For the definition of PATH_MAX */
#include <linux/joystick.h>
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

#include "STJoystick.h"

/* Special joystick configurations */
static struct {
  const char *name;
  int naxes;
  int nhats;
  int nballs;
} special_joysticks[] = {
  { "MadCatz Panther XL", 3, 2, 1 }, /* We don't handle rudder (axis 8) */
  { "SideWinder Precision Pro", 4, 1, 0 },
  { "SideWinder 3D Pro", 4, 1, 0 },
  { "Microsoft SideWinder 3D Pro", 4, 1, 0 },
  { "Microsoft SideWinder Dual Strike USB version 1.0", 2, 1, 0 },
  { "WingMan Interceptor", 3, 3, 0 },
  { "WingMan Extreme Digital 3D", 4, 1, 0 },
  { "Microsoft SideWinder Precision 2 Joystick", 4, 1, 0 },
  { "Logitech Inc. WingMan Extreme Digital 3D", 4, 1, 0 },
  { "Saitek Saitek X45", 6, 1, 0 },
  { NULL, 0, 0, 0 }
};

#ifndef NO_LOGICAL_JOYSTICKS

/*
   Some USB HIDs show up as a single joystick even though they actually
   control 2 or more joysticks.
*/
/*
   This code handles the MP-8800 (Quad) and MP-8866 (Dual), which can
   be identified by their transparent blue design. It's quite trivial
   to add other joysticks with similar quirky behavior.
   -id
*/

struct joystick_logical_mapping {
        int njoy;
        int nthing;
};

/*
   {logical joy, logical axis},
   {logical joy, logical hat},
   {logical joy, logical ball},
   {logical joy, logical button}
*/

static struct joystick_logical_mapping mp88xx_1_logical_axismap[] = {
   {0,0},{0,1},{0,2},{0,3},{0,4},{0,5}
};
static struct joystick_logical_mapping mp88xx_1_logical_buttonmap[] = {
   {0,0},{0,1},{0,2},{0,3},{0,4},{0,5},{0,6},{0,7},{0,8},{0,9},{0,10},{0,11}
};

static struct joystick_logical_mapping mp88xx_2_logical_axismap[] = {
   {0,0},{0,1},{0,2},{1,0},{1,1},{0,3},
   {1,2},{1,3},{0,4},{0,5},{1,4},{1,5}
};
static struct joystick_logical_mapping mp88xx_2_logical_buttonmap[] = {
   {0,0},{0,1},{0,2},{0,3},{0,4},{0,5},{0,6},{0,7},{0,8},{0,9},{0,10},{0,11},
   {1,0},{1,1},{1,2},{1,3},{1,4},{1,5},{1,6},{1,7},{1,8},{1,9},{1,10},{1,11}
};

static struct joystick_logical_mapping mp88xx_3_logical_axismap[] = {
   {0,0},{0,1},{0,2},{1,0},{1,1},{0,3},
   {1,2},{1,3},{2,0},{2,1},{2,2},{2,3},
   {0,4},{0,5},{1,4},{1,5},{2,4},{2,5}
};
static struct joystick_logical_mapping mp88xx_3_logical_buttonmap[] = {
   {0,0},{0,1},{0,2},{0,3},{0,4},{0,5},{0,6},{0,7},{0,8},{0,9},{0,10},{0,11},
   {1,0},{1,1},{1,2},{1,3},{1,4},{1,5},{1,6},{1,7},{1,8},{1,9},{1,10},{1,11},
   {2,0},{2,1},{2,2},{2,3},{2,4},{2,5},{2,6},{2,7},{2,8},{2,9},{2,10},{2,11}
};

static struct joystick_logical_mapping mp88xx_4_logical_axismap[] = {
   {0,0},{0,1},{0,2},{1,0},{1,1},{0,3},
   {1,2},{1,3},{2,0},{2,1},{2,2},{2,3},
   {3,0},{3,1},{3,2},{3,3},{0,4},{0,5},
   {1,4},{1,5},{2,4},{2,5},{3,4},{3,5}
};
static struct joystick_logical_mapping mp88xx_4_logical_buttonmap[] = {
   {0,0},{0,1},{0,2},{0,3},{0,4},{0,5},{0,6},{0,7},{0,8},{0,9},{0,10},{0,11},
   {1,0},{1,1},{1,2},{1,3},{1,4},{1,5},{1,6},{1,7},{1,8},{1,9},{1,10},{1,11},
   {2,0},{2,1},{2,2},{2,3},{2,4},{2,5},{2,6},{2,7},{2,8},{2,9},{2,10},{2,11},
   {3,0},{3,1},{3,2},{3,3},{3,4},{3,5},{3,6},{3,7},{3,8},{3,9},{3,10},{3,11}
};

struct joystick_logical_layout {
        int naxes;
        int nhats;
        int nballs;
        int nbuttons;
};

static struct joystick_logical_layout mp88xx_1_logical_layout[] = {
        {6, 0, 0, 12}
};
static struct joystick_logical_layout mp88xx_2_logical_layout[] = {
        {6, 0, 0, 12},
        {6, 0, 0, 12}
};
static struct joystick_logical_layout mp88xx_3_logical_layout[] = {
        {6, 0, 0, 12},
        {6, 0, 0, 12},
        {6, 0, 0, 12}
};
static struct joystick_logical_layout mp88xx_4_logical_layout[] = {
        {6, 0, 0, 12},
        {6, 0, 0, 12},
        {6, 0, 0, 12},
        {6, 0, 0, 12}
};

/*
   This array sets up a means of mapping a single physical joystick to
   multiple logical joysticks. (djm)
                                                                                
   njoys
        the number of logical joysticks
                                                                                
   layouts
        an array of layout structures, one to describe each logical joystick
                                                                                
   axes, hats, balls, buttons
        arrays that map a physical thingy to a logical thingy
 */
struct joystick_logicalmap {
        const char *name;
  int nbuttons;
        int njoys;
        struct joystick_logical_layout *layout;
        struct joystick_logical_mapping *axismap;
        struct joystick_logical_mapping *hatmap;
        struct joystick_logical_mapping *ballmap;
        struct joystick_logical_mapping *buttonmap;
};

static struct joystick_logicalmap joystick_logicalmap[] = {
        {
    "WiseGroup.,Ltd MP-8866 Dual USB Joypad",
    12,
    1,
    mp88xx_1_logical_layout,
          mp88xx_1_logical_axismap,
    NULL,
    NULL,
          mp88xx_1_logical_buttonmap
  },
        {
    "WiseGroup.,Ltd MP-8866 Dual USB Joypad",
    24,
    2,
    mp88xx_2_logical_layout,
          mp88xx_2_logical_axismap,
    NULL,
    NULL,
          mp88xx_2_logical_buttonmap
  },
        {
    "WiseGroup.,Ltd MP-8800 Quad USB Joypad",
    12,
    1,
    mp88xx_1_logical_layout,
          mp88xx_1_logical_axismap,
    NULL,
    NULL,
          mp88xx_1_logical_buttonmap
  },
        {
    "WiseGroup.,Ltd MP-8800 Quad USB Joypad",
    24,
    2,
    mp88xx_2_logical_layout,
          mp88xx_2_logical_axismap,
    NULL,
    NULL,
          mp88xx_2_logical_buttonmap
  },
        {
    "WiseGroup.,Ltd MP-8800 Quad USB Joypad",
    36,
    3,
    mp88xx_3_logical_layout,
          mp88xx_3_logical_axismap,
    NULL,
    NULL,
          mp88xx_3_logical_buttonmap
  },
        {
    "WiseGroup.,Ltd MP-8800 Quad USB Joypad",
    48,
    4,
    mp88xx_4_logical_layout,
          mp88xx_4_logical_axismap,
    NULL,
    NULL,
          mp88xx_4_logical_buttonmap
  }
};

/* find the head of a linked list, given a point in it
 */
#define SDL_joylist_head(i, start)\
        for(i = start; SDL_joylist[i].fname == NULL;) i = SDL_joylist[i].prev;

#define SDL_logical_joydecl(d) d


#else

#define SDL_logical_joydecl(d)

#endif /* USE_LOGICAL_JOYSTICKS */

/* The maximum number of joysticks we'll detect */
#define MAX_JOYSTICKS  32

/* A list of available joysticks */
static struct
{
        char* fname;
#ifndef NO_LOGICAL_JOYSTICKS
    STJoystick::STJoystickData* joy;
        struct joystick_logicalmap* map;
        int prev;
        int next;
        int logicalno;
#endif /* USE_LOGICAL_JOYSTICKS */
} SDL_joylist[MAX_JOYSTICKS];


typedef struct _hwdata_hat {
  int axis[2];
} hwdata_hat;

typedef struct _hwdata_ball {
  int axis[2];
} hwdata_ball;

/* The private structure used to keep track of a joystick */
struct joystick_hwdata {
  int fd;
  /* The current linux joystick driver maps hats to two axes */
  hwdata_hat* hats;
  /* The current linux joystick driver maps balls to two axes */
  hwdata_ball* balls;

  /* Support for the Linux 2.4 unified input interface */
#if SDL_INPUT_LINUXEV
  SDL_bool is_hid;
  Uint8 key_map[KEY_MAX-BTN_MISC];
  Uint8 abs_map[ABS_MAX];
  struct axis_correct {
    int used;
    int coef[3];
  } abs_correct[ABS_MAX];
#endif
};


#ifndef NO_LOGICAL_JOYSTICKS

static int CountLogicalJoysticks(int max)
{
   register int i, j, k, ret, prev;
   const char* name;
   int nbuttons, fd;
   unsigned char n;

   ret = 0;

   for(i = 0; i < max; i++) {
      name = STJoystick::GetName(i);
  
      fd = open(SDL_joylist[i].fname, O_RDONLY, 0);
      if ( fd >= 0 ) {
   if ( ioctl(fd, JSIOCGBUTTONS, &n) < 0 ) {
      nbuttons = -1;
   } else {
            nbuttons = n;
   }
   close(fd);
      }
      else {
   nbuttons=-1;
      }

      if (name) {
         for(j = 0; j < sizeof(joystick_logicalmap); j++) {
            if (!strcmp(name, joystick_logicalmap[j].name) && (nbuttons==-1 || nbuttons==joystick_logicalmap[j].nbuttons)) {
               prev = i;
               SDL_joylist[prev].map = &(joystick_logicalmap[j]);

               for(k = 1; k < joystick_logicalmap[j].njoys; k++) {
                  SDL_joylist[prev].next = max + ret;
                  SDL_joylist[max+ret].prev = prev;
      
                  prev = max + ret;
                  SDL_joylist[prev].logicalno = k;
                  SDL_joylist[prev].map = &(joystick_logicalmap[j]);
                  ret++;
               }

               break;
            }
         }
      }
   }

   return ret;
}

static void LogicalSuffix(int logicalno, char* namebuf, int len)
{
   register int slen;
   const static char suffixs[] =
      "01020304050607080910111213141516171819"
      "20212223242526272829303132";
   const char* suffix;
   slen = strlen(namebuf);
   suffix = NULL;

   if (logicalno*2<sizeof(suffixs))
      suffix = suffixs + (logicalno*2);

   if (slen + 4 < len && suffix) {
      namebuf[slen++] = ' ';
      namebuf[slen++] = '#';
      namebuf[slen++] = suffix[0];
      namebuf[slen++] = suffix[1];
      namebuf[slen++] = 0;
   }
}

#endif /* USE_LOGICAL_JOYSTICKS */

#if SDL_INPUT_LINUXEV
#define test_bit(nr, addr) \
  (((1UL << ((nr) & 31)) & (((const unsigned int *) addr)[(nr) >> 5])) != 0)

static int EV_IsJoystick(int fd)
{
  unsigned long evbit[40];
  unsigned long keybit[40];
  unsigned long absbit[40];

  if ( (ioctl(fd, EVIOCGBIT(0, sizeof(evbit)), evbit) < 0) ||
       (ioctl(fd, EVIOCGBIT(EV_KEY, sizeof(keybit)), keybit) < 0) ||
       (ioctl(fd, EVIOCGBIT(EV_ABS, sizeof(absbit)), absbit) < 0) ) {
    return(0);
  }
  if (!(test_bit(EV_KEY, evbit) && test_bit(EV_ABS, evbit) &&
        test_bit(ABS_X, absbit) && test_bit(ABS_Y, absbit) &&
       (test_bit(BTN_TRIGGER, keybit) || test_bit(BTN_A, keybit) || test_bit(BTN_1, keybit)))) return 0;
  return(1);
}

#endif /* SDL_INPUT_LINUXEV */

/* Function to scan the system for joysticks */
int STJoystick::Sys_Initialize()
{
  /* The base path of the joystick devices */
  const char *joydev_pattern[] = {
#if SDL_INPUT_LINUXEV
    "/dev/input/event%d",
#endif
    "/dev/input/js%d",
    "/dev/js%d",
    NULL
  };
  int numjoysticks;
  int i, j;
  int fd;
  char path[PATH_MAX];
  dev_t dev_nums[MAX_JOYSTICKS];  /* major/minor device numbers */
  struct stat sb;
  int n, duplicate;

  numjoysticks = 0;

  /* First see if the user specified a joystick to use */
  if ( getenv("SDL_JOYSTICK_DEVICE") != NULL ) {
    strncpy(path, getenv("SDL_JOYSTICK_DEVICE"), sizeof(path));
    if ( stat(path, &sb) == 0 ) {
      fd = open(path, O_RDONLY, 0);
      if ( fd >= 0 ) {
        /* Assume the user knows what they're doing. */
        SDL_joylist[numjoysticks].fname = strdup(path);
        if ( SDL_joylist[numjoysticks].fname ) {
          dev_nums[numjoysticks] = sb.st_rdev;
          ++numjoysticks;
        }
        close(fd);
      }
    }
  }

  for ( i=0; joydev_pattern[i]; ++i ) {
    for ( j=0; j < MAX_JOYSTICKS; ++j ) {
      snprintf(path, sizeof(path), joydev_pattern[i], j);

      /* rcg06302000 replaced access(F_OK) call with stat().
       * stat() will fail if the file doesn't exist, so it's
       * equivalent behaviour.
       */
      if ( stat(path, &sb) == 0 ) {
        /* Check to make sure it's not already in list.
         * This happens when we see a stick via symlink.
         */
        duplicate = 0;
        for (n=0; (n<numjoysticks) && !duplicate; ++n) {
          if ( sb.st_rdev == dev_nums[n] ) {
            duplicate = 1;
          }
        }
        if (duplicate) {
          continue;
        }

        fd = open(path, O_RDONLY, 0);
        if ( fd < 0 ) {
          continue;
        }
#if SDL_INPUT_LINUXEV
#ifdef DEBUG_INPUT_EVENTS
        printf("Checking %s\n", path);
#endif
        if ( (i == 0) && ! EV_IsJoystick(fd) ) {
          close(fd);
          continue;
        }
#endif
        close(fd);

        /* We're fine, add this joystick */
        SDL_joylist[numjoysticks].fname = strdup(path);
        if ( SDL_joylist[numjoysticks].fname ) {
          dev_nums[numjoysticks] = sb.st_rdev;
          ++numjoysticks;
        }
      } else
        break;
    }

#if SDL_INPUT_LINUXEV
    /* This is a special case...
       If the event devices are valid then the joystick devices
       will be duplicates but without extra information about their
       hats or balls. Unfortunately, the event devices can't
       currently be calibrated, so it's a win-lose situation.
       So : /dev/input/eventX = /dev/input/jsY = /dev/jsY
    */
    if ( (i == 0) && (numjoysticks > 0) )
      break;
#endif
  }
#ifndef NO_LOGICAL_JOYSTICKS
  numjoysticks += CountLogicalJoysticks(numjoysticks);
#endif

  return(numjoysticks);
}

const char* stjoystick_sys_get_name(int index)
{
  int fd;
  static char namebuf[128];
  char *name;
  SDL_logical_joydecl(int oindex = index);

#ifndef NO_LOGICAL_JOYSTICKS
  SDL_joylist_head(index, index);
#endif
  name = NULL;
  fd = open(SDL_joylist[index].fname, O_RDONLY, 0);
  if ( fd >= 0 ) {
    if ( 
#if SDL_INPUT_LINUXEV
         (ioctl(fd, EVIOCGNAME(sizeof(namebuf)), namebuf) <= 0) &&
#endif
         (ioctl(fd, JSIOCGNAME(sizeof(namebuf)), namebuf) <= 0) ) {
      name = SDL_joylist[index].fname;
    } else {
      name = namebuf;
    }
    close(fd);


#ifndef NO_LOGICAL_JOYSTICKS
    if (SDL_joylist[oindex].prev || SDL_joylist[oindex].next || index!=oindex)
    {
              LogicalSuffix(SDL_joylist[oindex].logicalno, namebuf, 128);
    }
#endif
  }
  return name;
}

/* Function to get the device-dependent name of a joystick */
const char* STJoystick::Sys_GetName(int index)
{
  stjoystick_sys_get_name(index);
}

static int allocate_hatdata(STJoystick::STJoystickData* joystick)
{
  int i;

  joystick->hwdata->hats = new hwdata_hat[joystick->nhats];
  if ( joystick->hwdata->hats == NULL ) {
    return(-1);
  }
  for ( i=0; i<joystick->nhats; ++i ) {
    joystick->hwdata->hats[i].axis[0] = 1;
    joystick->hwdata->hats[i].axis[1] = 1;
  }
  return(0);
}

static int allocate_balldata(STJoystick::STJoystickData* joystick)
{
  int i;

  joystick->hwdata->balls = new hwdata_ball[joystick->nballs];
  if ( joystick->hwdata->balls == NULL ) {
    return(-1);
  }
  for ( i=0; i<joystick->nballs; ++i ) {
    joystick->hwdata->balls[i].axis[0] = 0;
    joystick->hwdata->balls[i].axis[1] = 0;
  }
  return(0);
}

static bool JS_ConfigJoystick(STJoystick::STJoystickData* joystick, int fd)
{
  bool handled;
  unsigned char n;
  int old_axes, tmp_naxes, tmp_nhats, tmp_nballs;
  const char *name;
  char *env, env_name[128];
  int i;

  handled = false;

  /* Default joystick device settings */
  if ( ioctl(fd, JSIOCGAXES, &n) < 0 ) {
    joystick->naxes = 2;
  } else {
    joystick->naxes = n;
  }
  if ( ioctl(fd, JSIOCGBUTTONS, &n) < 0 ) {
    joystick->nbuttons = 2;
  } else {
    joystick->nbuttons = n;
  }

  name = stjoystick_sys_get_name(joystick->index);
  old_axes = joystick->naxes;

  /* Generic analog joystick support */
  if ( strstr(name, "Analog") == name && strstr(name, "-hat") ) {
    if ( sscanf(name,"Analog %d-axis %*d-button %d-hat",
      &tmp_naxes, &tmp_nhats) == 2 ) {

      joystick->naxes = tmp_naxes;
      joystick->nhats = tmp_nhats;

      handled = true;
    }
  }

  /* Special joystick support */
  for ( i=0; special_joysticks[i].name; ++i ) {
    if ( strcmp(name, special_joysticks[i].name) == 0 ) {

      joystick->naxes = special_joysticks[i].naxes;
      joystick->nhats = special_joysticks[i].nhats;
      joystick->nballs = special_joysticks[i].nballs;

      handled = true;
      break;
    }
  }

  /* User environment joystick support */
  if ( (env = getenv("SDL_LINUX_JOYSTICK")) ) {
    *env_name = '\0';
    if ( *env == '\'' && sscanf(env, "'%[^']s'", env_name) == 1 )
      env += strlen(env_name)+2;
    else if ( sscanf(env, "%s", env_name) == 1 )
      env += strlen(env_name);

    if ( strcmp(name, env_name) == 0 ) {

      if ( sscanf(env, "%d %d %d", &tmp_naxes, &tmp_nhats,
        &tmp_nballs) == 3 ) {

        joystick->naxes = tmp_naxes;
        joystick->nhats = tmp_nhats;
        joystick->nballs = tmp_nballs;

        handled = true;
      }
    }
  }

  /* Remap hats and balls */
  if (handled) {
    if ( joystick->nhats > 0 ) {
      if ( allocate_hatdata(joystick) < 0 ) {
        joystick->nhats = 0;
      }
    }
    if ( joystick->nballs > 0 ) {
      if ( allocate_balldata(joystick) < 0 ) {
        joystick->nballs = 0;
      }
    }
  }

  return(handled);
}

#if SDL_INPUT_LINUXEV

static SDL_bool EV_ConfigJoystick(STJoystick::STJoystickData* joystick, int fd)
{
  int i, t;
  unsigned long keybit[40];
  unsigned long absbit[40];
  unsigned long relbit[40];

  /* See if this device uses the new unified event API */
  if ( (ioctl(fd, EVIOCGBIT(EV_KEY, sizeof(keybit)), keybit) >= 0) &&
       (ioctl(fd, EVIOCGBIT(EV_ABS, sizeof(absbit)), absbit) >= 0) &&
       (ioctl(fd, EVIOCGBIT(EV_REL, sizeof(relbit)), relbit) >= 0) ) {
    joystick->hwdata->is_hid = SDL_TRUE;

    /* Get the number of buttons, axes, and other thingamajigs */
    for ( i=BTN_JOYSTICK; i < KEY_MAX; ++i ) {
      if ( test_bit(i, keybit) ) {
#ifdef DEBUG_INPUT_EVENTS
        printf("Joystick has button: 0x%x\n", i);
#endif
        joystick->hwdata->key_map[i-BTN_MISC] =
            joystick->nbuttons;
        ++joystick->nbuttons;
      }
    }
    for ( i=BTN_MISC; i < BTN_JOYSTICK; ++i ) {
      if ( test_bit(i, keybit) ) {
#ifdef DEBUG_INPUT_EVENTS
        printf("Joystick has button: 0x%x\n", i);
#endif
        joystick->hwdata->key_map[i-BTN_MISC] =
            joystick->nbuttons;
        ++joystick->nbuttons;
      }
    }
    for ( i=0; i<ABS_MAX; ++i ) {
      /* Skip hats */
      if ( i == ABS_HAT0X ) {
        i = ABS_HAT3Y;
        continue;
      }
      if ( test_bit(i, absbit) ) {
        int values[5];

        if ( ioctl(fd, EVIOCGABS(i), values) < 0 )
          continue;
#ifdef DEBUG_INPUT_EVENTS
        printf("Joystick has absolute axis: %x\n", i);
        printf("Values = { %d, %d, %d, %d, %d }\n",
          values[0], values[1],
          values[2], values[3], values[4]);
#endif /* DEBUG_INPUT_EVENTS */
        joystick->hwdata->abs_map[i] = joystick->naxes;
        if ( values[1] == values[2] ) {
            joystick->hwdata->abs_correct[i].used = 0;
        } else {
            joystick->hwdata->abs_correct[i].used = 1;
            joystick->hwdata->abs_correct[i].coef[0] =
          (values[2] + values[1]) / 2 - values[4];
            joystick->hwdata->abs_correct[i].coef[1] =
          (values[2] + values[1]) / 2 + values[4];
            t = ((values[2] - values[1]) / 2 - 2 * values[4]);
            if ( t != 0 ) {
          joystick->hwdata->abs_correct[i].coef[2] = (1 << 29) / t;
            } else {
          joystick->hwdata->abs_correct[i].coef[2] = 0;
            }
        }
        ++joystick->naxes;
      }
    }
    for ( i=ABS_HAT0X; i <= ABS_HAT3Y; i += 2 ) {
      if ( test_bit(i, absbit) || test_bit(i+1, absbit) ) {
#ifdef DEBUG_INPUT_EVENTS
        printf("Joystick has hat %d\n",(i-ABS_HAT0X)/2);
#endif
        ++joystick->nhats;
      }
    }
    if ( test_bit(REL_X, relbit) || test_bit(REL_Y, relbit) ) {
      ++joystick->nballs;
    }

    /* Allocate data to keep track of these thingamajigs */
    if ( joystick->nhats > 0 ) {
      if ( allocate_hatdata(joystick) < 0 ) {
        joystick->nhats = 0;
      }
    }
    if ( joystick->nballs > 0 ) {
      if ( allocate_balldata(joystick) < 0 ) {
        joystick->nballs = 0;
      }
    }
  }
  return(joystick->hwdata->is_hid);
}

#endif /* SDL_INPUT_LINUXEV */

#ifndef NO_LOGICAL_JOYSTICKS
static void ConfigLogicalJoystick(STJoystick::STJoystickData* joystick)
{
        struct joystick_logical_layout* layout;
                                                                                
        layout = SDL_joylist[joystick->index].map->layout +
                SDL_joylist[joystick->index].logicalno;
                                                                                
        joystick->nbuttons = layout->nbuttons;
        joystick->nhats = layout->nhats;
        joystick->naxes = layout->naxes;
        joystick->nballs = layout->nballs;
}
#endif


/* Function to open a joystick for use.
   The joystick to open is specified by the index field of the joystick.
   This should fill the nbuttons and naxes fields of the joystick structure.
   It returns 0, or -1 if there is an error.
 */
int STJoystick::Sys_OpenJoystick(int device_index)
{
  int fd;
  SDL_logical_joydecl(int realindex);
  SDL_logical_joydecl(STJoystick::STJoystickData* realjoy = NULL);

  /* Open the joystick and set the joystick file descriptor */
#ifndef NO_LOGICAL_JOYSTICKS
  if (SDL_joylist[device_index].fname == NULL) {
    SDL_joylist_head(realindex, device_index);
    int opened_success = Sys_OpenJoystick(realindex);

    if (opened_success == -1)
      return(-1);
                
    realjoy = joysticks[device_index];
    fd = realjoy->hwdata->fd;

  } else {
    fd = open(SDL_joylist[device_index].fname, O_RDONLY, 0);
  }
  SDL_joylist[device_index].joy = joysticks[device_index];
#else
  fd = open(SDL_joylist[device_index].fname, O_RDONLY, 0);
#endif

  if ( fd < 0 ) {
    Error("Unable to open device in Sys_OpenJoystick()\n");
    return(-1);
  }
  joysticks[device_index]->hwdata = new joystick_hwdata;
  if ( joysticks[device_index]->hwdata == NULL ) {
    MemoryError();
    close(fd);
    return(-1);
  }
  memset(joysticks[device_index]->hwdata, 0, sizeof(*joysticks[device_index]->hwdata));
  joysticks[device_index]->hwdata->fd = fd;

  /* Set the joystick to non-blocking read mode */
  fcntl(fd, F_SETFL, O_NONBLOCK);

  /* Get the number of buttons and axes on the joystick */
#ifndef NO_LOGICAL_JOYSTICKS
  if (realjoy)
    ConfigLogicalJoystick(joysticks[device_index]);
  else
#endif
#if SDL_INPUT_LINUXEV
  if ( ! EV_ConfigJoystick(joysticks[device_index], fd) )
#endif
    JS_ConfigJoystick(joysticks[device_index], fd);

  return(0);
}

#ifndef NO_LOGICAL_JOYSTICKS

static STJoystick::STJoystickData* FindLogicalJoystick(
   STJoystick::STJoystickData *joystick, struct joystick_logical_mapping* v)
{
        STJoystick::STJoystickData *logicaljoy;
        register int i;

        i = joystick->index;
        logicaljoy = NULL;

        /* get the fake joystick that will receive the event
         */
        for(;;) {

           if (SDL_joylist[i].logicalno == v->njoy) {
              logicaljoy = SDL_joylist[i].joy;
              break;
           }

           if (SDL_joylist[i].next == 0)
              break;

           i = SDL_joylist[i].next;

        }

        return logicaljoy;
}

static int LogicalJoystickButton(
   STJoystick::STJoystickData *joystick, unsigned char button, unsigned char state){
        struct joystick_logical_mapping* buttons;
        STJoystick::STJoystickData *logicaljoy = NULL;

        /* if there's no map then this is just a regular joystick
         */
        if (SDL_joylist[joystick->index].map == NULL)
           return 0;

        /* get the logical joystick that will receive the event
         */
        buttons = SDL_joylist[joystick->index].map->buttonmap+button;
        logicaljoy = FindLogicalJoystick(joystick, buttons);

        if (logicaljoy == NULL)
           return 1;

  logicaljoy->buttons[buttons->nthing] = state;

        return 1;
}

static int LogicalJoystickAxis(
  STJoystick::STJoystickData* joystick, unsigned char axis, short value)
{
        struct joystick_logical_mapping* axes;
        STJoystick::STJoystickData* logicaljoy = NULL;

        /* if there's no map then this is just a regular joystick
         */
        if (SDL_joylist[joystick->index].map == NULL)
           return 0;

        /* get the logical joystick that will receive the event
         */
        axes = SDL_joylist[joystick->index].map->axismap+axis;
        logicaljoy = FindLogicalJoystick(joystick, axes);

        if (logicaljoy == NULL)
           return 1;

  logicaljoy->axes[axes->nthing] = value;

        return 1;
}
#endif /* USE_LOGICAL_JOYSTICKS */

static __inline__
void HandleHat(STJoystick::STJoystickData* stick, unsigned char hat, int axis, int value)
{
  hwdata_hat *the_hat;
  const unsigned char position_map[3][3] = {
    { ST_JOYSTICK_HAT_LEFTUP, ST_JOYSTICK_HAT_UP, ST_JOYSTICK_HAT_RIGHTUP },
    { ST_JOYSTICK_HAT_LEFT, ST_JOYSTICK_HAT_CENTERED, ST_JOYSTICK_HAT_RIGHT },
    { ST_JOYSTICK_HAT_LEFTDOWN, ST_JOYSTICK_HAT_DOWN, ST_JOYSTICK_HAT_RIGHTDOWN }
  };
  SDL_logical_joydecl(STJoystick::STJoystickData *logicaljoy = NULL);
  SDL_logical_joydecl(struct joystick_logical_mapping* hats = NULL);

  the_hat = &stick->hwdata->hats[hat];
  if ( value < 0 ) {
    value = 0;
  } else
  if ( value == 0 ) {
    value = 1;
  } else
  if ( value > 0 ) {
    value = 2;
  }
  if ( value != the_hat->axis[axis] ) {
    the_hat->axis[axis] = value;

#ifndef NO_LOGICAL_JOYSTICKS
    /* if there's no map then this is just a regular joystick
    */
    if (SDL_joylist[stick->index].map != NULL) {

      /* get the fake joystick that will receive the event
      */
      hats = SDL_joylist[stick->index].map->hatmap+hat;
      logicaljoy = FindLogicalJoystick(stick, hats);
    }

    if (logicaljoy) {
      stick = logicaljoy;
      hat = hats->nthing;
    }
#endif /* USE_LOGICAL_JOYSTICKS */

    stick->hats[hat] = position_map[the_hat->axis[1]][the_hat->axis[0]];
  }
}

static __inline__
void HandleBall(STJoystick::STJoystickData* stick, unsigned char ball, int axis, int value)
{
  stick->hwdata->balls[ball].axis[axis] += value;
}

/* Function to update the state of a joystick - called as a device poll.
 * This function shouldn't update the joystick structure directly,
 * but instead should call SDL_PrivateJoystick*() to deliver events
 * and update joystick device state.
 */
static __inline__ void JS_HandleEvents(STJoystick::STJoystickData* joystick)
{
  struct js_event events[32];
  int i, len;
  unsigned char other_axis;

#ifndef NO_LOGICAL_JOYSTICKS
  if (SDL_joylist[joystick->index].fname == NULL) {
    SDL_joylist_head(i, joystick->index);
    JS_HandleEvents(SDL_joylist[i].joy);
    return;
  }
#endif

  while ((len=read(joystick->hwdata->fd, events, (sizeof events))) > 0) {
    len /= sizeof(events[0]);
    for ( i=0; i<len; ++i ) {
      switch (events[i].type & ~JS_EVENT_INIT) {
          case JS_EVENT_AXIS:
        if ( events[i].number < joystick->naxes ) {
#ifndef NO_LOGICAL_JOYSTICKS
          if (!LogicalJoystickAxis(joystick,
                   events[i].number, events[i].value))
#endif
            joystick->axes[events[i].number] = events[i].value;
          break;
        }
        events[i].number -= joystick->naxes;
        other_axis = (events[i].number / 2);
        if ( other_axis < joystick->nhats ) {
          HandleHat(joystick, other_axis,
            events[i].number%2,
            events[i].value);
          break;
        }
        events[i].number -= joystick->nhats*2;
        other_axis = (events[i].number / 2);
        if ( other_axis < joystick->nballs ) {
          HandleBall(joystick, other_axis,
            events[i].number%2,
            events[i].value);
          break;
        }
        break;
          case JS_EVENT_BUTTON:
            joystick->buttons[events[i].number] = events[i].value;
        break;
          default:
        /* ?? */
        break;
      }
    }
  }
}
#if SDL_INPUT_LINUXEV
static __inline__ int EV_AxisCorrect(SDL_Joystick *joystick, int which, int value)
{
  struct axis_correct *correct;

  correct = &joystick->hwdata->abs_correct[which];
  if ( correct->used ) {
    if ( value > correct->coef[0] ) {
      if ( value < correct->coef[1] ) {
        return 0;
      }
      value -= correct->coef[1];
    } else {
      value -= correct->coef[0];
    }
    value *= correct->coef[2];
    value >>= 14;
  }

  /* Clamp and return */
  if ( value < -32768 ) return -32768;
  if ( value >  32767 ) return  32767;

  return value;
}

static __inline__ void EV_HandleEvents(SDL_Joystick *joystick)
{
  struct input_event events[32];
  int i, len;
  int code;

#ifndef NO_LOGICAL_JOYSTICKS
  if (SDL_joylist[joystick->index].fname == NULL) {
    SDL_joylist_head(i, joystick->index);
    return EV_HandleEvents(SDL_joylist[i].joy);
  }
#endif

  while ((len=read(joystick->hwdata->fd, events, (sizeof events))) > 0) {
    len /= sizeof(events[0]);
    for ( i=0; i<len; ++i ) {
      code = events[i].code;
      switch (events[i].type) {
          case EV_KEY:
        if ( code >= BTN_MISC ) {
          code -= BTN_MISC;
#ifndef NO_LOGICAL_JOYSTICKS
          if (!LogicalJoystickButton(joystick,
                   joystick->hwdata->key_map[code],
             events[i].value))
#endif
          SDL_PrivateJoystickButton(joystick,
                   joystick->hwdata->key_map[code],
             events[i].value);
        }
        break;
          case EV_ABS:
        switch (code) {
            case ABS_HAT0X:
            case ABS_HAT0Y:
            case ABS_HAT1X:
            case ABS_HAT1Y:
            case ABS_HAT2X:
            case ABS_HAT2Y:
            case ABS_HAT3X:
            case ABS_HAT3Y:
          code -= ABS_HAT0X;
          HandleHat(joystick, code/2, code%2,
              events[i].value);
          break;
            default:
          events[i].value = EV_AxisCorrect(joystick, code, events[i].value);
#ifndef NO_LOGICAL_JOYSTICKS
          if (!LogicalJoystickAxis(joystick,
                   joystick->hwdata->abs_map[code],
             events[i].value))
#endif
          SDL_PrivateJoystickAxis(joystick,
                   joystick->hwdata->abs_map[code],
             events[i].value);
          break;
        }
        break;
          case EV_REL:
        switch (code) {
            case REL_X:
            case REL_Y:
          code -= REL_X;
          HandleBall(joystick, code/2, code%2,
              events[i].value);
          break;
            default:
          break;
        }
        break;
          default:
        break;
      }
    }
  }
}
#endif /* SDL_INPUT_LINUXEV */

void STJoystick::Sys_Update()
{
  int i;
  
#if SDL_INPUT_LINUXEV
  if ( joystick_data->hwdata->is_hid )
    EV_HandleEvents(this->joystick_data);
  else
#endif
    JS_HandleEvents(this->joystick_data);

  /* Deliver ball motion updates */
  for ( i=0; i<joystick_data->nballs; ++i ) {
    int xrel, yrel;

    xrel = joystick_data->hwdata->balls[i].axis[0];
    yrel = joystick_data->hwdata->balls[i].axis[1];
    if ( xrel || yrel ) {
      joystick_data->hwdata->balls[i].axis[0] = 0;
      joystick_data->hwdata->balls[i].axis[1] = 0;
      joystick_data->balls[i].dx = xrel;
      joystick_data->balls[i].dy = yrel;
    }
  }
}

/* Function to close a joystick after use */
void STJoystick::Sys_Close(int device_index)
{
#ifndef NO_LOGICAL_JOYSTICKS
  register int i;
  if (SDL_joylist[device_index].fname == NULL) {
    SDL_joylist_head(i, device_index);
    Close(i);
  }
#endif

  if ( joysticks[device_index]->hwdata ) {
#ifndef NO_LOGICAL_JOYSTICKS
    if (SDL_joylist[device_index].fname != NULL)
#endif
    close(joysticks[device_index]->hwdata->fd);
    if ( joysticks[device_index]->hwdata->hats ) {
      delete[] (joysticks[device_index]->hwdata->hats);
    }
    if ( joysticks[device_index]->hwdata->balls ) {
      delete[] (joysticks[device_index]->hwdata->balls);
    }
    delete (joysticks[device_index]->hwdata);
    joysticks[device_index]->hwdata = NULL;
  }
}

/* Function to perform any system-specific joystick related cleanup */
void STJoystick::Sys_Destroy()
{
  int i;

  for ( i=0; SDL_joylist[i].fname; ++i ) {
          delete[] SDL_joylist[i].fname;
  }
  SDL_joylist[0].fname = NULL;
}

