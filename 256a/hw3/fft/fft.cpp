// 
//  fft.cpp
//  Example of usage for chuck_fft
//  
//  Created by Jorge Herrera on 2011-10-26.
// 
//  Third party code used:
//  - chuck_fft.h/cpp based on the FFT implementation in CARL
//  - Thread.h/cpp from STK 


#ifdef __MACOSX_CORE__
  #include <GLUT/glut.h>
#else
  #include <GL/gl.h>
  #include <GL/glu.h>
  #include <GL/glut.h>
#endif


#include <iostream>
#include <math.h>
#include "RtAudio.h"

#include "chuck_fft.h"
#include "Thread.h"


#define MY_SRATE 44100
#define SAMPLE double 
#define ZPF 1

using namespace std;

// ===========
// = Globals =
// ===========
GLsizei g_width = 800; 
GLsizei g_height = 600;

Mutex g_mutex;

float * g_fftBuff;
float * g_window;
bool g_useWindow = false;
bool g_displayBars = false;
unsigned int g_buffSize = 512;


//-----------------------------------------------------------------------------
// Defines a point in a 3D space (coords x, y and z)
//-----------------------------------------------------------------------------
struct pt3d
{
    pt3d( GLfloat x, GLfloat y, GLfloat z ) : x(x), y(y), z(z) {};
    
    float x;
    float y;
    float z;
};



// =======================
// = Function prototypes =
// =======================
void idleFunc( );
void displayFunc( );
void reshapeFunc( int width, int height );
void keyboardFunc( unsigned char, int, int );
void mouseFunc( int button, int state, int x, int y );
void specialFunc( int key, int x, int y );
void initialize( );
void changeLookAt( pt3d look_from, pt3d look_to, pt3d head_up );
void drawAxis();



// ==========================
// = Cammera placement vars =
// ==========================
// Camera control global variables
pt3d g_look_from( 0, 0, 1);
pt3d g_look_to( 0, 0, 0 );
pt3d g_head_up( 0, 1, 0 );



// ============
// = GL stuff =
// ============
//-----------------------------------------------------------------------------
// Name: initialize( )
// Desc: sets initial OpenGL states
//       also initializes any application data
//-----------------------------------------------------------------------------
void initialize()
{

    // =================
    // = OpenGL & GLUT =
    // =================

    // set the GL clear color - use when the color buffer is cleared
    glClearColor( 0.0f, 0.0f, 0.0f, 1.0f );
        
    // set the shading model to 'smooth'
    glShadeModel( GL_SMOOTH );
    // enable depth
    glEnable( GL_DEPTH_TEST );
    // set the front faces of polygons
    glFrontFace( GL_CCW );
    // set fill mode
    glPolygonMode( GL_FRONT_AND_BACK, GL_FILL );

    // Enable transparency
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
          
    // seed random number generator
    srand( time(NULL) );
}


//-----------------------------------------------------------------------------
// Name: reshapeFunc( )
// Desc: called when window size changes
//-----------------------------------------------------------------------------
void reshapeFunc( int w, int h )
{
    // save the new window size
    g_width = (GLsizei)w; 
    g_height = (GLsizei)h;
    // map the view port to the client area
    glViewport( 0, 0, (GLsizei)w, (GLsizei)h );
    // set the matrix mode to project
    glMatrixMode( GL_PROJECTION );
    // load the identity matrix
    glLoadIdentity( );
    // create the viewing frustum
    gluPerspective( 45.0, (GLfloat) w / (GLfloat) h, 0.1, 300.0 );
    // set the matrix mode to modelview
    glMatrixMode( GL_MODELVIEW );
    // load the identity matrix
    glLoadIdentity( );
    // position the view point
    changeLookAt( g_look_from,g_look_to, g_head_up );
}


//-----------------------------------------------------------------------------
// Name: keyboardFunc( )
// Desc: key event
//-----------------------------------------------------------------------------
void keyboardFunc( unsigned char key, int x, int y )
{
    switch( key )
    {
    case 'Q':
    case 'q':
        cerr << "Bye!" << endl;
        exit(1);
        break;
    case 'L':
    case 'l':
        g_look_from = pt3d( -1, 0, 0 );
        cerr << "Looking from the left" << endl;
        break;
    case 'R':
    case 'r':
        g_look_from = pt3d( 1, 0, 0 );
        cerr << "Looking from the right" << endl;
        break;
    case 'F':
    case 'f':
        g_look_from = pt3d( 0, 0, 1 );
        cerr << "Looking from the front" << endl;
        break;
    case 'P':
    case 'p':
        g_look_from = pt3d( 1, 1, 1 );
        cerr << "Looking from the somewhere else" << endl;
        break;
    case 'W':
    case 'w':
        g_useWindow = !g_useWindow;
        if ( g_useWindow )
            cerr << "Using window" << endl;
        else
            cerr << "Without window" << endl;
        break;
    case 'B':
    case 'b':
        g_displayBars = !g_displayBars;
        break;
    }
    glutPostRedisplay( );
}



//-----------------------------------------------------------------------------
// Name: mouseFunc( )
// Desc: handles mouse stuff
//-----------------------------------------------------------------------------
void mouseFunc( int button, int state, int x, int y )
{
    if( button == GLUT_LEFT_BUTTON )
    {
        // when left mouse button is down, move left
        if( state == GLUT_DOWN )
        {
        }
        else
        {
        }
    }
    else if ( button == GLUT_RIGHT_BUTTON )
    {
        // when right mouse button down, move right
        if( state == GLUT_DOWN )
        {
        }
        else
        {
        }
    }
    else
    {
    }

    glutPostRedisplay( );
}


//-----------------------------------------------------------------------------
// Name: specialFunc( )
// Desc: handles special function keys
//-----------------------------------------------------------------------------
void specialFunc( int key, int x, int y )
{
    if( key == GLUT_KEY_LEFT)
    {
        std::cerr << "Left arrow";
    }
    if( key == GLUT_KEY_RIGHT)
    {
        std::cerr << "Right arrow";
    }
    if( key == GLUT_KEY_DOWN)
    {
        std::cerr << "Down arrow";
    }
    if( key == GLUT_KEY_UP)
    {
        std::cerr << "Up arrow";
    }
    if( key == GLUT_KEY_PAGE_UP)
    {
        std::cerr << "PageUp arrow";
    }
    if( key == GLUT_KEY_PAGE_DOWN)
    {
        std::cerr << "PageDown arrow";
    }

    glutPostRedisplay( );
}


//-----------------------------------------------------------------------------
// Name: idleFunc( )
// Desc: callback from GLUT
//-----------------------------------------------------------------------------
void idleFunc( )
{
    // render the scene
    glutPostRedisplay( );
}


//-----------------------------------------------------------------------------
// Name: displayFunc( )
// Desc: callback function invoked to draw the client area
//-----------------------------------------------------------------------------
void displayFunc( )
{
    // clear the color and depth buffers
    glClear( GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT );

    // save the current transformation
    glPushMatrix();
        
        // set the view point (camera)
        changeLookAt( g_look_from, g_look_to, g_head_up );

        glLineWidth( 1.0f );    
        glTranslatef( -0.5, -0.5, 0 );
    
        // Draw axis centered at the origin
        drawAxis();
    
        glColor4f(1, 1, 1, 1);
    
        // cast to use the complex data type defined in chuck_fft
        complex * fft = (complex *)g_fftBuff;

        if( g_fftBuff )
        {
            if ( !g_displayBars )
            {
                glBegin(GL_LINE_STRIP);
                g_mutex.lock();

                for(size_t i = 0; i < ZPF*g_buffSize/2; ++i)
                {
                    glVertex3f( i*2/(ZPF*(float)g_buffSize), 2 * ZPF * cmp_abs( fft[i] ), 0 );
                }
                g_mutex.unlock();

                glEnd();
            } else {

                glLineWidth( 2.0f );    

                glBegin(GL_LINES);
                g_mutex.lock();

                for(size_t i = 0; i < ZPF*g_buffSize/2; ++i)
                {
                    glVertex3f( i*2/(ZPF*(float)g_buffSize), 0, 0 );
                    glVertex3f( i*2/(ZPF*(float)g_buffSize), 2 * ZPF * cmp_abs( fft[i] ), 0 );
                }
                g_mutex.unlock();

                glEnd();
            }            
        }

    // restore state
    glPopMatrix();


    // flush!
    glFlush( );
    // swap the double buffer
    glutSwapBuffers( );
}

//-----------------------------------------------------------------------------
// name: changeLookAt()
// desc: changes the point of view
//-----------------------------------------------------------------------------
void changeLookAt( pt3d look_from, pt3d look_to, pt3d head_up )
{
    gluLookAt(  look_from.x, look_from.y, look_from.z, 
                look_to.x, look_to.y, look_to.z, 
                head_up.x, head_up.y, head_up.z );
}



//-----------------------------------------------------------------------------
// name: drawAxis()
// desc: draw cartesian axis (x,y,z) using (r,g,b) respectively
//-----------------------------------------------------------------------------
void drawAxis()
{
    glPushMatrix();
        
    glBegin( GL_LINES );
    
        // x axis
        glColor4f( 1, 0, 0, 1 );
        glVertex3f( 0, 0, 0 );
        glVertex3f( 1, 0, 0 );

        // y axis
        glColor4f( 0, 1, 0, 1 );
        glVertex3f( 0, 0, 0 );
        glVertex3f( 0, 1, 0 );

        // z axis
        glColor4f( 0, 0, 1, 1 );
        glVertex3f( 0, 0, 0 );
        glVertex3f( 0, 0, 1 );

    glEnd();
    glPopMatrix();
}



// =========
// = Audio =
// =========
// Audio callback
int audioCallback( void * outputBuffer, void * inputBuffer, 
            unsigned int bufferSize, double streamTime,
            RtAudioStreamStatus status, void * userData )
{
    SAMPLE * out = (SAMPLE *)outputBuffer;
    SAMPLE * in = (SAMPLE *)inputBuffer;
        
    g_mutex.lock();
        
    // zero out the fft buffer (required only if ZPF > 1)
    memset( g_fftBuff, 0, ZPF * bufferSize * sizeof(float) );
    
    for(size_t i = 0; i < bufferSize; ++i)
    {
        out[i] = 0;
        // "static" sine wave for testing
        //g_fftBuff[i] = ::sin( 2 * M_PI * 2200.0f * i / MY_SRATE );
        g_fftBuff[i] = in[i];
    }
    
    // apply window to the buffer of audio
    if( g_useWindow )
        apply_window( g_fftBuff, g_window, g_buffSize );        

    // compute the fft
    rfft( g_fftBuff, ZPF * bufferSize / 2, FFT_FORWARD );
    
    g_mutex.unlock();
    
    return 0;
}


// ========
// = Main =
// ========
// Entry point
int main (int argc, char *argv[])
{
    
    // RtAudio config + init

    // pointer to RtAudio object
    RtAudio *  audio = NULL;

    // create the object
    try
    {
        audio = new RtAudio();
    }
        catch( RtError & err ) {
        err.printMessage();
        exit(1);
    }

    if( audio->getDeviceCount() < 1 )
    {
        // nopes
        cout << "no audio devices found!" << endl;
        exit( 1 );
    }
        
    // let RtAudio print messages to stderr.
    audio->showWarnings( true );

    // set input and output parameters
    RtAudio::StreamParameters iParams, oParams;
    iParams.deviceId = audio->getDefaultInputDevice();
    iParams.nChannels = 1;
    iParams.firstChannel = 0;
    oParams.deviceId = audio->getDefaultOutputDevice();
    oParams.nChannels = 1;
    oParams.firstChannel = 0;
        
    // create stream options
    RtAudio::StreamOptions options;

    // set the callback and start stream
    try
    {
        audio->openStream( &oParams, &iParams, RTAUDIO_FLOAT64, MY_SRATE, &g_buffSize, &audioCallback, NULL, &options);
        
        cerr << "Buffer size defined by RtAudio: " << g_buffSize << endl;
        
        // allocate the buffer for the fft
        g_fftBuff = new float[g_buffSize * ZPF];
        if ( g_fftBuff == NULL ) {
            cerr << "Something went wrong when creating the fft buffers" << endl;
            exit (1);
        }
        
        // allocate the buffer for the time domain window
        g_window = new float[g_buffSize];
        if ( g_window == NULL ) {
            cerr << "Something went wrong when creating the window" << endl;
            exit (1);
        }

        // create a hanning window
        make_window( g_window, g_buffSize );
        
        // start the audio stream
        audio->startStream();
        
        // test RtAudio functionality for reporting latency.
        cout << "stream latency: " << audio->getStreamLatency() << " frames" << endl;
    }
    catch( RtError & err )
    {
        err.printMessage();
        goto cleanup;
    }


    // ============
    // = GL stuff =
    // ============

    // initialize GLUT
    glutInit( &argc, argv );
    // double buffer, use rgb color, enable depth buffer
    glutInitDisplayMode( GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH );
    // initialize the window size
    glutInitWindowSize( g_width, g_height );
    // set the window postion
    glutInitWindowPosition( 100, 100 );
    // create the window
    glutCreateWindow( "Hello GL" );
    //glutEnterGameMode();

    // set the idle function - called when idle
    glutIdleFunc( idleFunc );
    // set the display function - called when redrawing
    glutDisplayFunc( displayFunc );
    // set the reshape function - called when client area changes
    glutReshapeFunc( reshapeFunc );
    // set the keyboard function - called on keyboard events
    glutKeyboardFunc( keyboardFunc );
    // set the mouse function - called on mouse stuff
    glutMouseFunc( mouseFunc );
    // set the special function - called on special keys events (fn, arrows, pgDown, etc)
    glutSpecialFunc( specialFunc );

    // do our own initialization
    initialize();

    // let GLUT handle the current thread from here
    glutMainLoop();

        
    // if we get here, stop!
    try
    {
        audio->stopStream();
    }
    catch( RtError & err )
    {
        err.printMessage();
    }

    // Clean up
    cleanup:
    if(audio)
    {
        audio->closeStream();
        delete audio;
    }

    
    return 0;
}