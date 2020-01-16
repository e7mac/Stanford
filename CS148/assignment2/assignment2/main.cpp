#include <stdlib.h>

#ifdef __APPLE__
#include <GLUT/glut.h>
#else
#include <GL/glut.h>
#endif

#include "sgl.h"
#include "st.h"
#include <iostream>

using namespace std;

STImage* buff;

#define NUM_SQUARES 10

STPoint3 pathPoint[NUM_SQUARES];
float angle[NUM_SQUARES] = {0};


void display( void )
{
	glClear( GL_COLOR_BUFFER_BIT );
    for (int i=0;i<buff->GetWidth();i++)
    {
        for(int j=0;j<buff->GetHeight();j++)
            buff->SetPixel(i, j, STColor4ub(0,0,0));
    }
	// --- Make drawing calls here ---+

    for (int i=0;i<NUM_SQUARES;i++)
    {
        sglPushMatrix();
        pathPoint[i].x += rand()%11-5;
        pathPoint[i].y += rand()%11-5;
        
        static float maxWindow = 400, minWindow = 150;
        
        pathPoint[i].x = min(maxWindow,pathPoint[i].x);
        pathPoint[i].y = min(maxWindow,pathPoint[i].y);
        pathPoint[i].x = max(minWindow,pathPoint[i].x);
        pathPoint[i].y = max(minWindow,pathPoint[i].y);
        
        angle[i]+= rand()%100 / 300.0f;

        sglRotate(angle[i]);
        sglTranslate(pathPoint[i].x, pathPoint[i].y);
        
        sglColor(255, 0, 0);
        sglBeginTriangles();
        sglVertex(0, 0);
        sglColor(0, 0, 255);
        sglVertex(20, 0);
        sglColor(0, 255, 0);
        sglVertex(0, 20);
        sglColor(0, 0, 255);
        sglVertex(20, 0);
        sglVertex(20, 20);
        sglEnd();
        sglPopMatrix();
    }
    
    
    
    buff->Draw();
	// --- End of drawing calls ------+

	glutSwapBuffers();
    glutPostRedisplay();
}

void reshape( int w, int h )
{
  glMatrixMode( GL_PROJECTION );
  glLoadIdentity();

  glOrtho( 0., w, 0., h, -1., 1. );
  glViewport( 0, 0, w, h );
  setBufferSize(w, h);

  glutPostRedisplay();
}

void keyboard( unsigned char key, int x, int y )
{
	switch(key)
	{
	case 27: // Escape key
		exit(0);
		break;
	case 's': // Save
		buff->Save("output.png");
		break;
	}
}

int main (int argc, char *argv[])
{
	int win_width = 512;
	int win_height = 512;
	buff = new STImage(win_width, win_height, STColor4ub(0, 0, 0, 255));
	setBuffer(buff);

	glutInit( &argc, argv );
	glutInitDisplayMode( GLUT_RGBA | GLUT_DOUBLE );
	glutInitWindowSize( win_width, win_height );

	glutCreateWindow( "Intro Graphics Assignment 2" );

	glutDisplayFunc( display );
	glutReshapeFunc( reshape );

	glutKeyboardFunc( keyboard );
	glutMainLoop();

	delete buff;
}
