#include <stdlib.h>
#include <stdio.h>
#include <GLUT/glut.h>
#include <math.h>
#include <sstream>
#include <iostream>
#include <vector>


#define MY_SRATE 48000
#define SAMPLE float  // important: FluidSynth returns floats, so let's define SAMPLE as float to make it simple


//GL Rotation stuff
GLfloat g_angle_y = 0.0f;
GLfloat g_inc = 0.0f;
GLfloat g_inc_val_mouse = 0.5f;


using namespace std;



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

void draw_string( GLfloat x, GLfloat y, GLfloat z, string str, GLfloat scale,float thickness);
void drawFret(int fret);
void drawAllFrets();
void drawFretline(GLfloat y,float x,float y);
void drawFretboard();
void playNote(int,float);
void drawString(float);
void drawStrings();
void drawCircle(float x,float y,float radius);
void drawButton(int x,int y,string str,int width,int toggle);
void drawTimeline();
void drawParameter(float x,float y, float z,float prob,string s,GLenum mode,int name_for_picking);

void drawSquares(GLenum mode)
{
    glPushName(0);
    if (mode == GL_SELECT)
        glLoadName(1);
    drawFretboard();

    string you="Your Turn",comp="Computer's Turn";
    
    if (mode == GL_SELECT)
        glLoadName(2);
    drawTimeline();
    
    if (mode == GL_SELECT)
        glLoadName(3);
    drawButton(5,-62,"metronome",8,g_metronome_on);
    
    if (mode == GL_SELECT)
        glLoadName(4);
    drawButton(85,-62,"sync",8,1);
    
    if (turn_cpu)
    {
        
        draw_string(25,-20,0,comp,70,2.5);
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
        draw_string(38,-20,0,you,70,2.5);
    }
    
    drawParameter(95,-39,0,g_tempo,"tempo",mode,5);
    drawParameter(-10,-39,0,g_prob_rhythm,"rhythm variation",mode,7);
    drawParameter(25,-39,0,g_prob_melody,"melody variation",mode,9);
    drawParameter(65,-39,0,g_tradebars,"bars",mode,11);

    glPopName();
}



void respondToClick(int name)
{
    //metronome
    if (name==3)
        g_metronome_on = -1*g_metronome_on;
    //sync
    else if (name==4)
    {
        g_t=0;
        g_timeline_x=0;
        g_beat_played=0;
        g_playHuman.clear();
        g_playComputer.clear();
        
    }
    //rhythm
    else if (name==7)
    {
        g_prob_rhythm -= 0.1;
        if (g_prob_rhythm<0.1) g_prob_rhythm=0;
    }
    else if (name==8)
    {
        g_prob_rhythm += 0.1;
        if (g_prob_rhythm>1.01) g_prob_rhythm=1;
        
    }
    //melody
    else if (name==9)
    {
        g_prob_melody -= 0.1;
        if (g_prob_melody<0.1) g_prob_melody=0;
    }
    else if (name==10)
    {
        g_prob_melody += 0.1;
        if (g_prob_melody>1.01) g_prob_melody=1;
        
    }
    
    //bars
    else if (name==11)
    {
        g_tradebars--;
        if (g_tradebars<1) g_tradebars=1;
        g_trade=(float)g_tradebars*g_bar;
        g_quantization_x=(float)(g_fretboard_w+2)/(4*g_tradebars);
    }
    else if (name==12)
    {
        g_tradebars++;
        if (g_tradebars>16) g_tradebars=16;
        g_trade=g_tradebars*g_bar;
        g_quantization_x=(float)(g_fretboard_w+2)/(4*g_tradebars);
        
    }
    
    //tempo
    else if (name==5)
    {
        g_tempo-=5;
        if (g_tempo<40) g_tempo=40;
        
        g_beat = MY_SRATE*60/g_tempo;
        g_bar = 4*g_beat;
        g_trade=g_tradebars*g_bar;
        g_sixteenth=g_bar/16;
        g_eighth=g_bar/8;
        g_quarter=g_bar/4;
        g_half=g_bar/2;
        
    }
    else if (name==6)
    {
        g_tempo+=5;
        if (g_tempo>200) g_tempo=200;
        
        g_beat = MY_SRATE*60/g_tempo;
        g_bar = 4*g_beat;
        g_trade=g_tradebars*g_bar;
        g_sixteenth=g_bar/16;
        g_eighth=g_bar/8;
        g_quarter=g_bar/4;
        g_half=g_bar/2;
    }

}




/*  processHits prints out the contents of the 
 *  selection array.
 */
void processHits (GLint hits, GLuint buffer[])
{
    unsigned int i, j;
    GLuint ii, jj, names, *ptr;
    
    //printf ("hits = %d\n", hits);
    ptr = (GLuint *) buffer;
    for (i = 0; i < hits; i++) { /*  for each hit  */
        names = *ptr;
        //printf (" number of names for this hit = %d\n", names);
        ptr++;
        ptr++;
        ptr++;
        for (j = 0; j < names; j++) { /*  for each name */
            //printf ("%d ", *ptr);
            if (j == 0)  /*  set row and column  */
                ii = *ptr;
            else if (j == 1) {
                jj = *ptr;
                respondToClick(jj);
            }
            ptr++;

        }
    }
}

#define BUFSIZE 512

void pickSquares(int button, int state, int x, int y)
{
    GLuint selectBuf[BUFSIZE];
    GLint hits;
    GLint viewport[4];
    
    if (button != GLUT_LEFT_BUTTON || state != GLUT_DOWN)
        return;
    
    glGetIntegerv (GL_VIEWPORT, viewport);
    
    glSelectBuffer (BUFSIZE, selectBuf);
    (void) glRenderMode (GL_SELECT);
    
    glInitNames();
    glPushName(0);
    glMatrixMode (GL_PROJECTION);
    glPushMatrix ();
    glLoadIdentity ();
    /*  create 5x5 pixel picking region near cursor location      */
    gluPickMatrix ((GLdouble) x, (GLdouble) (viewport[3] - y), 
                   5.0, 5.0, viewport);
    gluOrtho2D (-40.0, 160.0, -80.0, 40.0);
    drawSquares (GL_SELECT);
    glMatrixMode (GL_PROJECTION);
    glPopMatrix ();
    glFlush ();
    hits = glRenderMode (GL_RENDER);
    processHits (hits, selectBuf);
    glutPostRedisplay();
} 

void display(void)
{
    glClear(GL_COLOR_BUFFER_BIT);
    drawSquares (GL_RENDER);
    
    
    
    glFlush();
}


void init ()
{
    
    
    // =================
    // = OpenGL & GLUT =
    // =================
    
    // set the GL clear color - use when the color buffer is cleared
    glClearColor( 0.1f, 0.1f, 0.1f, 1.0f );
    
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

void idleFunc( )
{
    // render the scene
    glutPostRedisplay( );
}

void reshape(int w, int h)
{
    glViewport(0, 0, w, h);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    //glTranslatef(0,0,50);
    //gluPerspective( 45.0, (GLfloat) w / (GLfloat) h, 0.0, 150.0 );
    //gluLookAt(0,0,50,0,0,0,0,1,0);
    //glTranslatef(0,0,50);
    gluOrtho2D (-40.0, 160.0, -80.0, 40.0);
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
}

int gfxInit(int* argc, char** argv)
{
    glutInit(argc, argv);
    glutInitDisplayMode (GLUT_SINGLE | GLUT_RGB);
    glutInitWindowSize (800, 600);
    glutInitWindowPosition (800, 600);
    glutCreateWindow ("Miles Ahead");
    init ();
    glutMouseFunc (pickSquares);
    glutReshapeFunc (reshape);
    glutDisplayFunc(display); 
    glutIdleFunc( idleFunc );
    glutMainLoop();
    return 0; 
}



//-----------------------------------------------------------------------------
// Name: drawFretmarkers( )
// Desc: draw fretmarkers
//-----------------------------------------------------------------------------

void drawFretmarkers()
{
    
    glPushMatrix();
    glColor4f(0.5,0.5,0.5,0.5);
    drawCircle(5+10*2+0.75,g_fret_spill+5*3-2.7,1);
    drawCircle(5+10*4+0.75,g_fret_spill+5*3-2.7,1);
    drawCircle(5+10*6+0.75,g_fret_spill+5*3-2.7,1);
    drawCircle(5+10*8+0.75,g_fret_spill+5*3-2.7,1);
    drawCircle(5+10*11+0.75,g_fret_spill+5*1-2.7,1);
    drawCircle(5+10*11+0.75,g_fret_spill+5*5-2.7,1);
    glPopMatrix();
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
    drawCircle(5+10*x+0.75,g_fret_spill+5*y,1);
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
    drawFretmarkers();
}



//-----------------------------------------------------------------------------
// Name: drawButton( )
// Desc: draws a button
//-----------------------------------------------------------------------------

void drawButton(int x,int y,string str,int width,int toggle)
{
    int l=str.size();
    int height=16;
    float alpha = 0.3;
    float textalpha=1;
    
    if (toggle == -1)
    {
        alpha = 0.05;
        textalpha = 0.2;
    }
    
    glColor4f(0.5,0.5,0.5,1.5*alpha);
    glBegin(GL_QUADS);
    glVertex3f(x,y-2,0);            
    glColor4f(0.5,0.5,0.5,alpha/2);
    glVertex3f(x,y-2+height,0);
    glColor4f(0.5,0.5,0.5,alpha/4);
    glVertex3f(x+width*l,y-2+height,0);
    glColor4f(0.5,0.5,0.5,alpha);
    glVertex3f(x+width*l,y-2,0);        
    glEnd();
    glColor4f(1,1,1,textalpha);
    draw_string(x+2,y+2,0,str,100,2.5);    
    
}



//-----------------------------------------------------------------------------
// Name: drawFretboard( )
// Desc: draw a Fretboard
//-----------------------------------------------------------------------------

void drawFretboard()
{
    glPushMatrix();
    glColor4f(0.54,0.27,0.075,0.3);
    glBegin(GL_QUADS);
    glVertex3f(0,0,0);            
    glColor4f(0.54,0.27,0.075,1);
    glVertex3f(0,g_fretboard_h,0);
    glColor4f(0.64,0.44,0.095,0.3);
    glVertex3f(g_fretboard_w,g_fretboard_h,0);
    glColor4f(0.54,0.27,0.075,1);
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
    glColor4f(0.75,0.75,0.75,0.5);
    glVertex3f(0,g_fret_spill/2+5*string_number+g_string_h,0);
    glVertex3f(g_string_w,g_fret_spill/2+5*string_number+g_string_h,0);
    glColor4f(0.75,0.75,0.75,1);
    glVertex3f(g_string_w,g_fret_spill/2+5*string_number,0);        
    glEnd();
    glPopMatrix();
    
}

//-----------------------------------------------------------------------------
// Name: drawParameter( )
// Desc: draw a parameter and arrows
//-----------------------------------------------------------------------------


void drawParameter(float x,float y, float z,float prob,string s,GLenum mode,int name)
{
    glColor4f(1,1,1,1); 
    stringstream tempstream;
    tempstream<<prob;
    string tmpstring;
    tempstream>>tmpstring;
    
    draw_string(x,y+10,z,s,20,1);    
    draw_string(x,y,z,tmpstring,65,2.5);
    int f=0;
    if (s=="bars") f=-10;
    
    
    if (mode == GL_SELECT)
        glLoadName(name);
    glBegin(GL_TRIANGLES);
    glVertex3f(x+17+f,y+4, z);    // lower l vertex
    glVertex3f(x+22+f, y-1, z);    // lower r vertex
    glVertex3f(x+22+f, y+9, z);    // upper vertex
    glEnd();
    
    
    if (mode == GL_SELECT)
        glLoadName(name+1);
    glBegin(GL_TRIANGLES);
    glVertex3f(x+25+f, y-1, z);    // lower left vertex
    glVertex3f(x+30+f, y+4, z);    // lower right vertex    
    glVertex3f(x+25+f, y+9, z);    // upper vertex
    glEnd();
}




//-----------------------------------------------------------------------------
// Name: drawTimeline( )
// Desc: draws the timeline
//-----------------------------------------------------------------------------
void drawTimeline()
{
    
    
    g_continuous_x=(float)g_t/g_trade*(g_fretboard_w+2);
    if (g_continuous_x-g_timeline_x > g_quantization_x)
        g_timeline_x += g_quantization_x;
    
    glColor4f(1,1,1,0.1+0.05*cos(4*3.14*g_t/g_trade));
    glBegin(GL_QUADS);
    glVertex3f(0,-10,0);            
    glVertex3f(0,-10+0.2*g_fretboard_h,0);
    //glColor4f(1,0,0,0.8+0.2*sin(3.14*g_continuous_x));
    glVertex3f(g_fretboard_w+2,-10+0.2*g_fretboard_h,0);
    glVertex3f(g_fretboard_w+2,-10,0);        
    glEnd();
    
    
    
    
    
    
    glColor4f(1,1,1,1);
    glBegin(GL_LINES);
    glVertex3f(g_timeline_x,-10,0);            
    glVertex3f(g_timeline_x,-10+0.2*g_fretboard_h,0);
    glEnd();
    
}

//-----------------------------------------------------------------------------
// name: drawString()
// desc: draws a string on screen
//-----------------------------------------------------------------------------

void draw_string( GLfloat x, GLfloat y, GLfloat z, string str, GLfloat scale,float thickness)
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
    glLineWidth(thickness);
    //  write character-by-character    
    for( i = 0; i < len; i++ )
        glutStrokeCharacter( GLUT_STROKE_ROMAN, str[i] );
    
    glPopMatrix();
}

//-----------------------------------------------------------------------------
// name: drawCircle()
// desc: draws a circle
//-----------------------------------------------------------------------------
void drawCircle(float x,float y,float r)
{
    int numlines=400;
    for (int i=0;i<numlines;i++)
    {
        float theta=(float)i/numlines*2*3.14159;
        glBegin(GL_LINES);
        glVertex3f(x-r*cos(theta),y-r*sin(theta),0);
        glVertex3f(x+r*cos(theta),y+r*sin(theta),0);
        glEnd();
    }
}

