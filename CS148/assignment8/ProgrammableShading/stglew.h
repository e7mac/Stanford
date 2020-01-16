// stglew.h
#ifndef __STGLEW_H__
#define __STGLEW_H__

/*
  This file is used to pull in all the requirements
  for running a program with the GLEW library for
  loadng OpenGL extensions.

  Depending on how GLEW gets set up for your system,
  you may need to edit this file.
*/

/* Include-order dependency!
*
* GLEW must be included before the standard GL.h header.
* Because libst also includes GL.h, we must include GLEW before libst.
*/
#ifdef __APPLE__
#define GLEW_VERSION_2_0 1
#else
#define GLEW_STATIC 1
#include "GL/glew.h"
#endif

#include "st.h"
#include "stglut.h"

#endif // __STGLEW_H__
