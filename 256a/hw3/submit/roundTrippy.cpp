//  roundTrip.cpp
//  Sound Visualization for Music 256A
//  
//  Created by Mayank Sanganeria on 11-01-2011.
// 
//  Third party code used:
//  - based on example fft.cpp by Jorge Herrera
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
#include <vector>
#include "chuck_fft.h"
#include "Thread.h"
#include <cstdlib>
#include <cstring>

#define MY_SRATE 44100
#define SAMPLE double 
#define ZPF 16

using namespace std;

// ===========
// = Globals =
// ===========
GLsizei g_width = 800; 
GLsizei g_height = 600;
GLsizei g_last_width; 
GLsizei g_last_height;

Mutex g_mutex;

float * g_fftBuff;
float * g_audioBuff;
float * g_window;
bool g_useWindow = true;
bool g_spectrogram = true;
bool g_fullscreen = false;
unsigned int g_buffSize = 512;
int g_side = 1;
float g_cylinderRadius=0.3;
float g_tempCylinderRadius=0;

//GL Rotation stuff
GLfloat g_angle_y = 0.0f;
GLfloat g_inc = 0.0f;
GLfloat g_inc_val_mouse = 0.5f;


int g_fft_history=0;
int g_audio_history=0;


//-----------------------------------------------------------------------------
// name: help()
// desc: ...
//-----------------------------------------------------------------------------
void help()
{
    fprintf( stderr, "----------------------------------------------------\n" );
    fprintf( stderr, "roundTrippy\n" );
    fprintf( stderr, "Mayank Sanganeria\n" );
    fprintf( stderr, "----------------------------------------------------\n" );
    fprintf( stderr, "usage: roundTrippy [a] [b]\n" );
    fprintf( stderr, "where\n" );
    fprintf( stderr, "		a = number of buffers in fft history\n" );
    fprintf( stderr, "		b = number of buffers in audio buffer history\n" );
    fprintf( stderr, "example:\n" );
    fprintf( stderr, "roundTrippy 100 50\n" );
    fprintf( stderr, "a and b default to 100 and 30 respectively, if not specified\n" );

    fprintf( stderr, "----------------------------------------------------\n" );

    fprintf( stderr, "'a' - switch side of peaks on cylinder\n" );
    fprintf( stderr, "'p' - print current settings to console\n" );
    fprintf( stderr, "'z' - toggle fullscreen\n" );
    fprintf( stderr, "'f' - look from front\n" );
    fprintf( stderr, "'l' - look from left\n" );
    fprintf( stderr, "'r' - look from right\n" );
	fprintf( stderr, "'p' - look from up above\n" );
    fprintf( stderr, "'t' - enter(or leave) the dark side\n" );
    fprintf( stderr, "'q' - quit\n" );
    fprintf( stderr, "----------------------------------------------------\n" );
    fprintf( stderr, "\n" );
}




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
char * getPitch(float freq);
void draw_string( GLfloat x, GLfloat y, GLfloat z, const char * str, GLfloat scale);


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
	float temp;
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
            cerr << "Using window for audio" << endl;
        else
            cerr << "Without window for audio" << endl;
        break;
	case 's':
    case 'S':
		g_spectrogram=!g_spectrogram;
		cerr<<"Switching between spectrogram and peak view"<<endl;
		break;
	case 'a':
    case 'A':
		cerr<<"Switching side of peaks"<<endl;
		g_side= -1*g_side;
	break;
	case 't':
    case 'T':
		temp = g_cylinderRadius;
		g_cylinderRadius=g_tempCylinderRadius;
		g_tempCylinderRadius=temp;
		if (g_cylinderRadius==0) glClearColor( 01.0f, 01.0f, 01.0f, 1.0f );
		else glClearColor( 0.0f, 0.0f, 0.0f, 1.0f );
		cerr<<"Going in (or out of) the dark side"<<endl;
	break;
    case 'z':
    case 'Z':
       if( !g_fullscreen )
       {
           g_last_width = g_width;
           g_last_height = g_height;
           glutFullScreen();
       }
        else
        glutReshapeWindow( g_last_width, g_last_height );
        g_fullscreen = !g_fullscreen;
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
        // rotate
        if( state == GLUT_DOWN )
            g_inc -= g_inc_val_mouse;
        else
            g_inc += g_inc_val_mouse;
    }
    else if ( button == GLUT_RIGHT_BUTTON )
    {
        if( state == GLUT_DOWN )
            g_inc += g_inc_val_mouse;
        else
            g_inc -= g_inc_val_mouse;
    }
    else
        g_inc = 0.0f;

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
        glLineWidth( 3.0f );    
        glTranslatef( -1, 0, 0 );
        glRotatef( g_angle_y += g_inc, 5.0f, 01.0f, 0.0f );
        glColor4f(1, 1, 1, 1);

        // cast to use the complex data type defined in chuck_fft
        complex * fft = (complex *)g_fftBuff;

		//definitions of variables that remain static across function calls

		
		//buffer array to hold previous buffer data
		static vector< vector<float> > fftHistory(g_fft_history,vector<float>(ZPF*g_buffSize/2));
		static vector< vector<float> > audioHistory(g_audio_history,vector<float>(g_buffSize));
		//cout<<g_audio_history<<"   "<<g_fft_history<<endl;
		//cout<<g_audio_history <<"   "<<g_fft_history<<endl;
		
		//pitch detection variables
		float primary_frequency=0;
		float max_energy=0;
		
		
		//convenience variables
		float amplitude;
		float theta;
 		
		
		//g_cylinderRadius *= 0.99;
		
		//pitch detection
		g_mutex.lock();
		for(size_t i = 0; i < ZPF*g_buffSize/2; ++i)
		{
			fftHistory[0][i]=(cmp_abs( fft[i]));
			if ( cmp_abs(fft[i]) > max_energy )
					{
						max_energy = cmp_abs(fft[i]);
						primary_frequency = (float)i*20000/232/ZPF/g_buffSize*512; 
					}
		}
		//cout<<primary_frequency<<endl;
		char * pitch=getPitch(primary_frequency);
		//cout<<pitch<<endl;
		draw_string(0,0.5,0,pitch,1);
			for(size_t i = 0; i < g_buffSize; ++i)
			{
				audioHistory[0][i]=g_audioBuff[i];
			}
		g_mutex.unlock();
		
		for (int j=g_fft_history-1;j>0;j--)
			{
				fftHistory[j]= fftHistory[j-1];
			}
		for (int j=g_audio_history-1;j>0;j--)
			{
				audioHistory[j]= audioHistory[j-1];
			}
		
	
	if( g_fftBuff)
        {
				static float z=0.1;
				for(size_t j = 0; j < g_fft_history; j++)	
               	{

	                glBegin(GL_LINE_STRIP);
					for(size_t i = 0; i < ZPF*g_buffSize/2; ++i)
                	{	
						{	glColor4f(0.0,100*fftHistory[j][i]+0.2,100*fftHistory[j][i]+0.2,100*fftHistory[j][i]+0.35);
							theta = 2*((-PI/2)+j*PI/(g_fft_history));
							amplitude=g_spectrogram*g_side*(5*2 * ZPF * fftHistory[j][i])*cos(theta/2);//(1-(float)j/g_fft_history);
							glVertex3f( 2*2*i/(ZPF*(float)g_buffSize), ((float)(1-2*i/(ZPF*g_buffSize))*amplitude*sin(-theta))  + g_cylinderRadius*sin(theta), -g_cylinderRadius*cos(theta)+amplitude*cos(-theta));
							
						}
					}


                	glEnd();
            
				}
				
		}
		
		if( g_audioBuff)
		{  g_mutex.lock();
			
			for (int j=0;j < g_audio_history;j++)
			{
				glLineWidth(30.0f*(float)j/g_audio_history);
				glBegin(GL_LINE_STRIP);
				for(size_t i = 0; i < g_buffSize; ++i)
	       		{	
						
						glColor4f(1,0,cos(PI*i/g_buffSize),(1-(float)j/g_audio_history)*sin(PI*i/g_buffSize));
	              		glVertex3f( i*2/((float)g_buffSize), audioHistory[j][i]/4, 0 );
	       				//cout<<(1-(float)j/g_audio_history)<<endl
				}
				glEnd();
			}
			g_mutex.unlock();
			
		}
		
		
		
		float energy=0;	
	//energy stuff
		for (int i=i;i<ZPF*g_buffSize/2;i++)
		{
			energy = energy+ cmp_abs(fft[i])*cmp_abs(fft[i]);
		}
		energy = pow(energy,0.5);
		//cout<<energy<<"     "<<g_cylinderRadius<<endl;
		int sign=1;
		
		if (energy<0.5) sign =-1;
		
		
		if (g_cylinderRadius)
		{g_cylinderRadius = g_cylinderRadius + sign*energy*0.05;
		
		if (g_cylinderRadius<0.3 && g_tempCylinderRadius == 0) g_cylinderRadius=0.3; 
		if (g_cylinderRadius >1) g_cylinderRadius=1;
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
	memset( g_audioBuff, 0, ZPF * bufferSize * sizeof(float) );
    for(size_t i = 0; i < bufferSize; ++i)
    {
        out[i] = 0;
        // "static" sine wave for testing
        //g_fftBuff[i] = ::sin( 2 * M_PI * 20000.0f * i / MY_SRATE );
        g_fftBuff[i] = in[i];
    }
    
    // apply window to the buffer of audio
    if( g_useWindow )
        apply_window( g_fftBuff, g_window, g_buffSize );        

    // compute the fft
	memcpy(g_audioBuff,g_fftBuff,ZPF*g_buffSize*sizeof(float));
	rfft( g_fftBuff, ZPF * bufferSize / 2, FFT_FORWARD );

    
    g_mutex.unlock();
    
    return 0;
}



// ============
// = Pitch detector =
// ============
char *getPitch(float freq)
{	
	char *return_value=new char[15];
	
	if (freq==0) {return_value="z";return return_value;}
	while (freq<193) freq*=2;
	while (freq>427) freq/=2;
	
	if (freq>193 && freq<226 ) return_value="A";
	else if (freq>226 && freq<=240 ) return_value="Bb";
	else if (freq>240 && freq<=254 ) return_value="B";
	else if (freq>254 && freq<=269 ) return_value ="C";
	else if (freq>269 && freq<=285 ) return_value ="Db";
	else if (freq>285 && freq<=302 ) return_value ="D";
	else if (freq>302 && freq<=320 ) return_value ="Eb";
	else if (freq>320 && freq<=339 ) return_value ="E";
	else if (freq>339 && freq<=359 ) return_value ="F";
	else if (freq>359 && freq<=380 ) return_value ="Gb";
	else if (freq>380 && freq<=403 ) return_value ="G";
	else if (freq>403 && freq<=427 ) return_value ="Ab";
	else return_value="Error in pitch detection";
	return return_value;
}



// ========
// = Main =
// ========
// Entry point
int main (int argc, char *argv[])
{
	cout<<argc<<"  "<<argv[0];
	if (argc>3) {cerr<<"\nERROR - wrong number of arguments\n";exit(1);}
	if (argc==3) 
		g_audio_history = atoi(argv[2]); 
	else
		g_audio_history = 30;
	if (argc>1) 
		g_fft_history = atoi(argv[1]);
	else
		g_fft_history = 100;
	help();
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
		g_audioBuff = new float[g_buffSize * ZPF];
        if ( g_fftBuff == NULL ) {
            cerr << "Something went wrong when creating the fft and audio buffers" << endl;
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
// ============
// = GL string drawing function =
// ============

void draw_string( GLfloat x, GLfloat y, GLfloat z, const char * str, GLfloat scale)
{
    GLint len = strlen( str ), i;

    glPushMatrix();
    
    glRotatef( g_angle_y += g_inc, 0.0f, 1.0f, 0.0f );
    glTranslatef( x, y, z );
    glScalef( .001f * scale, .001f * scale, .001f * scale );
    
//  Antialias text    
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    glEnable(GL_BLEND);
    glEnable(GL_LINE_SMOOTH);

//  write character-by-character    
    for( i = 0; i < len; i++ )
        glutStrokeCharacter( GLUT_STROKE_ROMAN, str[i] );
   
    glPopMatrix();
}