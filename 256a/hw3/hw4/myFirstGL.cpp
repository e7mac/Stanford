#ifdef __MACOSX_CORE__
  #include <GLUT/glut.h>
#else
  #include <GL/gl.h>
  #include <GL/glu.h>
  #include <GL/glut.h>
#endif

#include <iostream>
#include <math.h>

using namespace std;

// initial window size (in pixels)
GLsizei g_width = 800; 
GLsizei g_height = 600;

//-----------------------------------------------------------------------------
// Defines a point in a 3D space (coords x, y and z)
//-----------------------------------------------------------------------------
struct pt3d
{
    pt3d( GLfloat _x, GLfloat _y, GLfloat _z ) : x(_x), y(_y), z(_z) {};
    
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


// Camera global variables
pt3d g_look_from( 0, 0, 1 );
pt3d g_look_to( 0, 0, 0 );
pt3d g_head_up( 0, 1, 0 );


// Entry point
int main ( int argc, char ** argv )
{
    // initialize GLUT
    glutInit( &argc, argv );
    // double buffer, use rgb color, enable depth buffer
    glutInitDisplayMode( GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH );
    // initialize the window size
    glutInitWindowSize( g_width, g_height );
    // set the window postion
    glutInitWindowPosition( 50, 50 );
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
	
	
	return 0;
}

// ============
// = GL Stuff =
// ============

//-----------------------------------------------------------------------------
// Name: initialize( )
// Desc: sets initial OpenGL states
//       also initializes any application data
//-----------------------------------------------------------------------------
void initialize()
{
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
    gluPerspective( 45, (GLfloat)g_width / (GLfloat)g_height, 0.1, 300.0 );
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
        exit(1);
        break;
    case 'L':
    case 'l':
        g_look_from = pt3d(-1, 0, 0);
        cerr << "Looking from the left" << endl;
        break;
    case 'R':
    case 'r':
        g_look_from = pt3d(1, 0, 0);
        cerr << "Looking from the right" << endl;
        break;
    case 'F':
    case 'f':
        g_look_from = pt3d(0, 0, 1);
        cerr << "Looking from the front" << endl;
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
        std::cerr << "Left arrow" << std::endl;
    }
    if( key == GLUT_KEY_RIGHT)
    {
        std::cerr << "Right arrow" << std::endl;
    }
    if( key == GLUT_KEY_DOWN)
    {
        std::cerr << "Down arrow" << std::endl;
    }
    if( key == GLUT_KEY_UP)
    {
        std::cerr << "Up arrow" << std::endl;
    }
    if( key == GLUT_KEY_PAGE_UP)
    {
        std::cerr << "PageUp arrow" << std::endl;
    }
    if( key == GLUT_KEY_PAGE_DOWN)
    {
        std::cerr << "PageDown arrow" << std::endl;
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

    // set line width
    glLineWidth( 1.0f );
    
    // animation parameters
    static float angle = 0;
    angle += 0.1;
    if ( angle > 360) angle -= 360;
    
    // save the current transformation
    glPushMatrix();
    
        // set the view point
        changeLookAt( g_look_from, g_look_to, g_head_up );    

        // Draw axis centered at the origin
        drawAxis();
        
        // draw a second set of axis, but translated and make them spin around the Y-axis
        
        // save the current transformation
        glPushMatrix();
            
            // first apply transforms
            glRotatef( angle, 1, 0, 0 );
            glTranslatef( 0.5, 0.5, 0 );
            
            // now draw the axis
            drawAxis();


            // ... and now lets draw a spinning yellow cube (why not?)
            // (it should spin around the spinning Y axis)
            
            // save the current transformation
            glPushMatrix();
                
                // yellow, semi-transparent
                glColor4f( 1, 1, 0, 0.3);
                
                // apply transforms
                glTranslatef( 0, 0.2, 0 );
                glRotatef( 2*angle, 0, 1, 0 );
                
                // draw the cube
                glutWireCube( 0.1 );
                
            // restore state
            glPopMatrix();

        // restore state
        glPopMatrix();
        
        // It's now tea time
        // Carefull cause it might spill, or even hit you in the face!
        glTranslatef( 0, 0, ::sin( 2 * M_PI * angle / 360.0f ) );
        glRotatef( 90, 1, 0, 0 );
        glRotatef( -angle, 0, 1, 0 );
        // make it solid pink 
        glColor4f( 1, .6, .6, 1);
        glutWireTeapot( 0.3 );

    // restore state
    glPopMatrix();

    
    // flush!
    glFlush( );
    // swap the double buffer
    glutSwapBuffers( );
}

//-----------------------------------------------------------------------------
// name: changeLookAt()
// desc: changes the "camera"
//-----------------------------------------------------------------------------
void changeLookAt( pt3d look_from, pt3d look_to, pt3d head_up )
{
    gluLookAt(  look_from.x, look_from.y, look_from.z, 
                look_to.x, look_to.y, look_to.z, 
                head_up.x, head_up.y, head_up.z );
}



//-----------------------------------------------------------------------------
// name: drawAxis()
// desc: draw a set of unit axis
//-----------------------------------------------------------------------------
void drawAxis()
{
    // save the current transformation
    glPushMatrix();

        glBegin( GL_LINES );

            // x axis - red
            glColor4f( 1, 0, 0, 1 );
            glVertex3f( 0, 0, 0 );
            glVertex3f( 1, 0, 0 );

            // y axis - green
            glColor4f( 0, 1, 0, 1 );
            glVertex3f( 0, 0, 0 );
            glVertex3f( 0, 1, 0 );

            // z axis - blue
            glColor4f( 0, 0, 1, 1 );
            glVertex3f( 0, 0, 0 );
            glVertex3f( 0, 0, 1 );

        glEnd();

    // restore state
    glPopMatrix();   
}
