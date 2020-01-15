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


//global fretsizes
float g_fret_spill=1;     //extra fretboard beyond first and last string
float g_fretboard_h=25+g_fret_spill*2;
float g_fretboard_w=120;
float g_fret_h=g_fretboard_h;
float g_fret_w=1;
float g_string_h=0.5;
float g_string_w=g_fretboard_w+g_fret_w;


float g_continuous_x,g_quantization_x=(g_fretboard_w+2)/16,g_timeline_x=0;
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
void draw_string( GLfloat x, GLfloat y, GLfloat z, string str, GLfloat scale);
void drawFret(int fret);
void drawAllFrets();
void drawFretline(GLfloat y,float x,float y);
void drawFretboard();
void playNote(int,float);
void drawString(float);
void drawStrings();
// ==========================)
// = Cammera placement vars =
// ==========================
// Camera control global variables
pt3d g_look_from( 0, 0, 70);
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
    gluPerspective( 45.0, (GLfloat) w / (GLfloat) h, 50.0, 300.0 );
    //glOrtho(-w/2, w/2, -h/2, h/2, 0.2, 300);
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
    }
    glutPostRedisplay( );
}



//-----------------------------------------------------------------------------
// Name: mouseFunc( )
// Desc: handles mouse stuff
//-----------------------------------------------------------------------------
void mouseFunc( int button, int state, int x, int y ) {
    
    if( button == GLUT_LEFT_BUTTON ) {
        
        if( state == GLUT_DOWN ) {
            
//            processClick(x, y);
//            motion(x, y);
            
        } else {
            
        }
        
    } else if ( button == GLUT_RIGHT_BUTTON ) {
        
        // when right mouse button down
        if( state == GLUT_DOWN ) {
            
        } else {
            
        }
        
    } else {
        
    }
    
    glutPostRedisplay( );
    
}

//-----------------------------------------------------------------------------
// Name: motion()
// Desc: handles motion control after the mouse is clicked
//-----------------------------------------------------------------------------
//void motion ( int x, int y ) {
//    
//    float xlocation = ((float)g_width/(float)windowPixelWidth)/2;
//    float ylocation = ((float)g_height/(float)windowPixelHeight)/2;
//    
//    keys[thisObject].xPosition = ((float)x / (xlocation)) - windowPixelWidth;
//    keys[thisObject].yPosition = (-(float)y / (ylocation)) + windowPixelHeight;
//    
//    checkForWindowBoundaries();
//    
//}

//-----------------------------------------------------------------------------
// Name: processClick()
// Desc: figures out which object on the screen was clicked
//-----------------------------------------------------------------------------
//void processClick(float x, float y) {
//    
//    static int clicked;
//    
//    for(int i = 0; i < maxObjects; i++) {
//        
//        float xlocation = ((float)g_width/(float)windowPixelWidth)/2;
//        float ylocation = ((float)g_height/(float)windowPixelHeight)/2;
//        
//        xlocation = ((float)x / (xlocation)) - windowPixelWidth;
//        ylocation = (-(float)y / (ylocation)) + windowPixelHeight;
//        
//        float distancex = (keys[i].xPosition - xlocation);
//        float distancey = (keys[i].yPosition - ylocation);
//        
//        float distance = sqrtf((distancex*distancex)+(distancey*distancey));
//        
//        float difference = distance - keys[i].radius;
//        
//        if(difference < 0.0) {
//            
//            clicked = i;
//            break;
//            
//        }
//    }
//    
//    thisObject = clicked;
//    keys[thisObject].selected = true;
//    
//}
//

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
// Name: playFret( )
// Desc: signify playing of a particular fret
//-----------------------------------------------------------------------------

void playFret(int x,int y,float visibility)
{
    y--;x--;
    glPushMatrix();
    glColor4f(1,0,0,visibility);
    glBegin(GL_QUADS);
    glVertex3f(5+10*x,g_fret_spill+5*y-1,1);            
    glVertex3f(5+10*x,g_fret_spill+5*y+1,1);
    glVertex3f(5+10*x+1.5,g_fret_spill+5*y+1,1);
    glVertex3f(5+10*x+1.5,g_fret_spill+5*y-1,1);        
    glEnd();
    glPopMatrix();
}



//-----------------------------------------------------------------------------
// Name: playNote( )
// Desc: signify playing of a note
//-----------------------------------------------------------------------------

void playNote(int midinote, float visibility)
{

    if ( midinote>40 && midinote<60)
        {
            midinote-=41;
            playFret(1+midinote%5,1+midinote/5,visibility);
        }
    else if (midinote>=60 && midinote<70)
        {
            midinote-=60;
            playFret(1+midinote%5,5+midinote/5,visibility);
        }
    else if (midinote>=70 && midinote<=76)
            playFret(midinote-70+6,6,visibility);
}



//-----------------------------------------------------------------------------
// Name: drawFret( )
// Desc: draw a Fret
//-----------------------------------------------------------------------------

void drawFret(int fret_number)
{
    glPushMatrix();
    glColor4f(1,1,1,1);
    glBegin(GL_QUADS);
    glVertex3f(10*fret_number,0,0);            
    glVertex3f(10*fret_number,g_fret_h,0);
    glVertex3f(10*fret_number+g_fret_w,g_fret_h,0);
    glVertex3f(10*fret_number+g_fret_w,0,0);        
    glEnd();
    glPopMatrix();
    
}


//-----------------------------------------------------------------------------
// Name: drawAllFrets( )
// Desc: draw all Frets
//-----------------------------------------------------------------------------

void drawAllFrets()
{
    for (int i=0;i<=12;i++)
        drawFret(i);
    
}



//-----------------------------------------------------------------------------
// Name: drawButton( )
// Desc: draws a button
//-----------------------------------------------------------------------------

void drawButton(int x,int y,string str,int width)
{
    int l=str.size();
    int height=14;
    glColor4f(1,0.75,0.75,1);
    glBegin(GL_QUADS);
    glVertex3f(x,y,0);            
    glVertex3f(x,y+height,0);
    glVertex3f(x+width*l,y+height,0);
    glVertex3f(x+width*l,y,0);        
    glEnd();
    glColor4f(0,0.75,0.75,1);
    draw_string(x+2,y+2,0,str,100);    

    
}



//-----------------------------------------------------------------------------
// Name: drawFretboard( )
// Desc: draw a Fretboard
//-----------------------------------------------------------------------------

void drawFretboard()
{
    glPushMatrix();
    glColor4f(0.54,0.27,0.075,1);
    glBegin(GL_QUADS);
    glVertex3f(0,0,0);            
    glVertex3f(0,g_fretboard_h,0);
    glVertex3f(g_fretboard_w,g_fretboard_h,0);
    glVertex3f(g_fretboard_w,0,0);        
    glEnd();
    glPopMatrix();
    drawAllFrets();  
    drawStrings();
}




//-----------------------------------------------------------------------------
// Name: drawString( )
// Desc: draw a string
//-----------------------------------------------------------------------------

void drawStrings()
{
    for (int i=0;i<6;i++)
        drawString(i);
}

//-----------------------------------------------------------------------------
// Name: drawString( )
// Desc: draw a string
//-----------------------------------------------------------------------------

void drawString(float string_number)
{
    glPushMatrix();
    glColor4f(0.75,0.75,0.75,1);
    glBegin(GL_QUADS);
    glVertex3f(0,g_fret_spill/2+5*string_number,0);            
    glVertex3f(0,g_fret_spill/2+5*string_number+g_string_h,0);
    glVertex3f(g_string_w,g_fret_spill/2+5*string_number+g_string_h,0);
    glVertex3f(g_string_w,g_fret_spill/2+5*string_number,0);        
    glEnd();
    glPopMatrix();

}




//-----------------------------------------------------------------------------
// Name: drawTimeline( )
// Desc: draws the timeline
//-----------------------------------------------------------------------------
void drawTimeline()
{
    glColor4f(0,1,0,0.2);
    glBegin(GL_QUADS);
    glVertex3f(0,-10,0);            
    glVertex3f(0,-10+0.2*g_fretboard_h,0);
    glVertex3f(g_fretboard_w+2,-10+0.2*g_fretboard_h,0);
    glVertex3f(g_fretboard_w+2,-10,0);        
    glEnd();



    g_continuous_x=(g_t/g_bar)*(g_fretboard_w+2);
    if (g_continuous_x-g_timeline_x > g_quantization_x)
        g_timeline_x += g_quantization_x;
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
    
    glColor4f(1, 1, 1, 1);
    
    // cast to use the complex data type defined in chuck_fft
    
    glTranslatef(-60,10,0);
    string you="Your Turn",comp="Computer's Turn";
    drawFretboard();
    
    
    //buttons
    drawButton(80,-62,"Like",7);    
    drawButton(5,-62,"Reset",7);
    drawButton(25,30,"metronome",8);
    
    drawTimeline();
    
    glColor4f(1,1,1,1);
    glBegin(GL_LINES);
    glVertex3f(g_timeline_x,-10,0);            
    glVertex3f(g_timeline_x,-10+0.2*g_fretboard_h,0);
    glEnd();
    cout<<(g_fretboard_w+2)<<endl;
    if (turn_cpu)
    {

        draw_string(10,-30,0,comp,100);
        for (int i=0;i<g_playComputer.size();i++)
        {
         
            if ( g_playComputer.at(i).startTime()<g_t && g_playComputer.at(i).endTime()>g_t)
                playNote(g_playComputer.at(i).pitch(),1);
            else
                playNote(g_playComputer.at(i).pitch(),0);

        }
    }
    else
    {
        glColor4f(1,0,0,1); 
        draw_string(30,-30,0,you,100);
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

//-----------------------------------------------------------------------------
// name: drawString()
// desc: draws a string on screen
//-----------------------------------------------------------------------------

void draw_string( GLfloat x, GLfloat y, GLfloat z, string str, GLfloat scale)
{
	GLint len = str.length(), i;
    
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
