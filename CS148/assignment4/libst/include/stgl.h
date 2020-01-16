// stgl.h
#ifndef __STGL_H__
#define __STGL_H__

// gl.h can be in different places depending on the build
// platform.  I try and encapsulate all this logic here in
// this header.  Also gl.h on windows may have dependencies on
// definitions in windows.h 

#ifdef __APPLE__
#include <OpenGL/gl.h>
#include <OpenGL/glu.h>
#else

#ifdef _WIN32
#include <windows.h>
#endif

#include <GL/gl.h>
#include <GL/glu.h>
#endif

#endif // __STGL_H__


