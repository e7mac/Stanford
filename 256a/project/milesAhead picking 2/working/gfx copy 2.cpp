//globals for GL
GLsizei g_width = 800; 
GLsizei g_height = 600;
GLsizei g_last_width; 
GLsizei g_last_height;

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
bool g_clear = false;

//GL Rotation stuff
GLfloat g_angle_y = 0.0f;
GLfloat g_inc = 0.0f;
GLfloat g_inc_val_mouse = 0.5f;

using namespace std;


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
    glDisable( GL_DEPTH_TEST );
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
    //gluPerspective( 45.0, (GLfloat) w / (GLfloat) h, 0.1, 300.0 );
    glOrtho(0, w, h, 0, 0, 1);
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
    glClear( GL_COLOR_BUFFER_BIT );
    
    // save the current transformation
    glPushMatrix();
    
    // set the view point (camera)
    changeLookAt( g_look_from, g_look_to, g_head_up );
    
    glLineWidth( 1.0f );    
    glTranslatef( -0.5, -0.5, 0 );
    
    glColor4f(1, 1, 1, 1);
    
    // cast to use the complex data type defined in chuck_fft
    
        glBegin(GL_QUADS);
        glVertex3f(0,0,0);            
        glVertex3f(1,0,0);
        glVertex3f(1,1,0);
        glVertex3f(0,1,0);        
        glEnd();
     
    
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


void gfxInit(int* argc,char** argv)
{
// initialize GLUT
glutInit( argc, argv );
// double buffer, use rgb color, enable depth buffer
glutInitDisplayMode( GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH );
// initialize the window size
glutInitWindowSize( g_width, g_height );
// set the window postion
glutInitWindowPosition( 100, 100 );
// create the window
glutCreateWindow( "miles ahead" );
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
}

