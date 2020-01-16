/**
 * sgl.h
 * CS148 Assignment 2, Fall 2011
 * -------------------------------
 * This file defines the API to be implemented for SGL in assignment 2.
 */

#include "st.h"

#ifndef __SGL_H__
#define __SGL _H__

#ifndef M_PI
#define M_PI 3.14159265358979323846f
#endif

typedef int SGLint;
typedef float SGLfloat;

void setBuffer(STImage*);
void setBufferSize(int w, int h);

//\\//\\//\\ SGL API //\\//\\//\\

/**
 * Start specifying the vertices for a triangle strip.
 */
void sglBeginTriangles();

/**
 * Stop specifying the vertices for a triangle strip and begin rasterization.
 */
void sglEnd();

/**
 * Specify the location of a vertex in 2-dimensional space. Will appear between
 * sglBeginTriangles() and sglEnd()
 */
void sglVertex(SGLfloat x, SGLfloat y);

/**
 * Set the color for new vertices
 */
void sglColor(SGLfloat r, SGLfloat g, SGLfloat b);

/**
 * Replace the current matrix with the identity.
 */
void sglLoadIdentity();

/**
 * Multiply the current matrix by a transform matrix
 * with the given scale factors
 */
void sglScale(SGLfloat xscale, SGLfloat yscale);

/**
 * Multiply the current matrix by a transform matrix
 * that will translate objects by the given quantities
 */
void sglTranslate(SGLfloat xtrans, SGLfloat ytrans);

/**
 * Multiply the current matrix by a transform matrix
 * that will rotate the objects counter clock-wise
 * about the z-axis. Parameter 'angle' is specified
 * in degrees.
 */
void sglRotate(SGLfloat angle);

/**
 * Push the current matrix into the matrix stack
 */
void sglPushMatrix();

/**
 * Pop the top matrix from the matrix stack
 */
void sglPopMatrix();

#endif