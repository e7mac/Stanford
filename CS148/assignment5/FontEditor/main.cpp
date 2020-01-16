/*
 *  main.cpp
 *  FontEditor
 *
 *  GLUT application to act as basis for a glyph editor.
 *
 */

#include "TemplateLayer.h"
#include "TTFontWriter.h"

#include "st.h"
#include "stglut.h"
#include <fstream>
#include <sstream>
//
// Globals used by this application.
// As a rule, globals are Evil, but this is a small application
// and the design of GLUT makes it hard to avoid them.
//

using namespace std;

int gWidth = 900;
int gHeight = 640;

MyFont          gMyFont;        // font object
TemplateLayer  *gTemplate = 0;  // used for drawing the template and guides

TTGlyph *glyph;
TTContour *currentContour;
TTPoint *movingPoint = 0;
TTContour *movingCurve = 0;
TTPoint *tanPoint = 0;
TTContour *tanCurve = 0;
int tanIndex;

bool gDeletePoint = false;
bool gDeleteCurve = false;
bool gMoveCurve = false;
bool tangentMode = false;

// variables to keep track of rendering a preview of the font
bool            gPreviewMode = false;
STFont         *gPreviewFont = 0;


//new globals
bool gOnCurve = true;

// variables to keep track of mouse position and buttons
int gMousePreviousX;
int gMousePreviousY;
int gMouseActiveButton = -1;


// just a few function prototypes
void CreateTestFont();
void PreparePreview();

//
// Display event handler
//
void DisplayCallback()
{
    glClearColor(0.9f, 0.9f, 0.9f, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT );
    
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
    
    // draw the background image and guides first
    gTemplate->Draw();
    
    /*** CS148 TODO
     *   Here is where you will need to draw the control points and curves of
     *   the glyph you are editing, or call a function to perform the drawing.
     */
    
    glyph->DrawContours();
    glyph->DrawPoints();
    
    currentContour->DrawContour();
    currentContour->DrawPoints();
    // draw the preview mode last, on top of everything else, if it's active
    if (gPreviewMode)
        gTemplate->DrawPreview(gPreviewFont);
    
    glFlush();
    
}

//
// Keyboard event handler
//
void KeyboardCallback(unsigned char key, int x, int y)
{
    int viewport[4];
    glGetIntegerv(GL_VIEWPORT, viewport);
    int vw = viewport[2], vh = viewport[3];
    
    int modifiers = glutGetModifiers();
    
    /*** CS148 TODO
     *   You will probably want to capture various keystrokes to perform
     *   commands for your font editor.  Either add more keys for the switch
     *   statement to recognize, or intercept the events before it goes to
     *   the switch statement below.  If you cast the "key" value to an int
     *   and print it out here, you can see what key codes are generated for
     *   different keys.
     */
    
    //
    // Interpret different keys to perform various commands
    //
    switch(key)
    {
        case char(27):
            exit(0);
            break;
            
            // template image zoom controls
        case '+':
        case '=':
            gTemplate->ScaleImage(1.0f);
            glutPostRedisplay();
            break;
        case '-':
            gTemplate->ScaleImage(-1.0f);
            glutPostRedisplay();
            break;
            // template image fine zoom controls
        case ']':
            gTemplate->ScaleImage(0.2f);
            glutPostRedisplay();
            break;
        case '[':
            gTemplate->ScaleImage(-0.2f);
            glutPostRedisplay();
            break;
            
            // save, load, and preview
        case 's':
            gMyFont.SaveData();
            break;
        case 'l':
            gMyFont.LoadData();
            glutPostRedisplay();
            break;
        case 'p':
            gPreviewMode = !gPreviewMode;
            if (gPreviewMode) PreparePreview();
            glutPostRedisplay();
            break;
            // new key captures
        case 'c':
            gOnCurve = true;
            glutPostRedisplay();
            break;
        case 'v':
            gOnCurve = false;
            glutPostRedisplay();
            break;
        case 'b':
        {
            TTPoint *startPoint = new TTPoint;
            startPoint->mCoordinates.x = currentContour->GetPoint(0)->mCoordinates.x;
            startPoint->mCoordinates.y = currentContour->GetPoint(0)->mCoordinates.y;
            startPoint->mOnCurve = currentContour->GetPoint(0)->mOnCurve;
            currentContour->AddPoint(startPoint);
            glyph->AddContour(currentContour);
            currentContour = new TTContour;
            glutPostRedisplay();
            break;
        }
        case 'd':
            gDeletePoint = true;
            glutPostRedisplay();
            break;
        case 'f':
            gDeletePoint = false;
            glutPostRedisplay();
            break;
        case 'g':
            gDeleteCurve = true;
            glutPostRedisplay();
            break;
        case 'h':
            gDeleteCurve = false;
            glutPostRedisplay();
            break;
        case 'j':
            gMoveCurve = true;
            glutPostRedisplay();
            break;
        case 'k':
            gMoveCurve = false;
            glutPostRedisplay();
            break;
        case 'n':
        {
            glyph->SaveToFile();
            glutPostRedisplay();
        }
            break;
        case 'm':
            glyph->LoadFromFile();
            glutPostRedisplay();
            break;
        case 't':
            tangentMode = !tangentMode;
            glutPostRedisplay();
            break;
            
            
    }
}

//
// Mouse event handler (two functions - click and move)
//
void MouseCallback(int button, int state, int x, int y)
{
    gMousePreviousX = x;
    gMousePreviousY = y;
    
    //
    // note that this "gMouseActiveButton" state machine is a little flawed...
    // feel free to fix it if you so desire
    //
    if (state == GLUT_DOWN) gMouseActiveButton = button;
    else                    gMouseActiveButton = -1;
    
    /*** CS148 TODO
     *   Here, you can capture and use the left mouse button click and release
     *   events to perform various actions for editing glyphs.
     */
    if (button == GLUT_LEFT_BUTTON) {
        if (state == GLUT_UP)
        {
            if (gDeletePoint)
            {
                glyph->DeletePoint(x, gHeight-y);
            }
            else if (gDeleteCurve)
            {
                glyph->DeleteCurve(x, gHeight-y);
            }
            else
            {
                if  (!movingPoint && !movingCurve && !tangentMode)
                {
                    STPoint2 currentPoint(x, gHeight - y);
                    TTPoint *point = new TTPoint(currentPoint,gOnCurve);
                    currentContour->AddPoint(point);
                }
                else if (movingPoint)
                {
                    movingPoint = NULL;
                }
                else if (movingCurve)
                {
                    movingCurve = NULL;
                }
                else if (tanPoint)
                {
                    tanPoint = NULL;
                    tanCurve = NULL;
                    tanIndex = -1;
                }

            }
        }
        else if (state==GLUT_DOWN)
        {
            if (gMoveCurve)
                movingCurve = glyph->HitTestContour(x, gHeight-y);
            else if (tangentMode)
            {
                tanPoint = glyph->HitTest(x, gHeight-y);
                if (!tanPoint)
                    return;
                if (tanPoint->mOnCurve)
                {
                    tanPoint = NULL;
                }
                else
                {
                    tanCurve = glyph->HitTestContour(x, gHeight-y);
                    tanIndex = glyph->HitTestIndex(x, gHeight-y);
                }
            }
            else
                movingPoint = glyph->HitTest(x, gHeight-y);
        }
        
    }
    glutPostRedisplay();
}

void MotionCallback(int x, int y)
{
    if (gDeletePoint || gDeleteCurve)
        return;                 //no movement during delete mode
    
    int dx = x - gMousePreviousX;
    int dy = y - gMousePreviousY;
    
    //
    // use the right mouse button to control pan
    //
    if (gMouseActiveButton == GLUT_RIGHT_BUTTON) {
        gTemplate->MoveImage(dx, -dy);
        glutPostRedisplay();
    }
    //
    // use the middle mouse button to control zoom
    // (too bad GLUT is too old to support the mouse wheel!)
    //
    else if (gMouseActiveButton == GLUT_MIDDLE_BUTTON) {
        gTemplate->ScaleImage(0.1f * -dy);
        glutPostRedisplay();
    }
    /*** CS148 TODO
     *   Here, you can capture and use the left mouse button move events to
     *   move control points around.
     */
    else if (gMouseActiveButton == GLUT_LEFT_BUTTON) {
        if (movingPoint)
        {
                movingPoint->mCoordinates.x += dx;
                movingPoint->mCoordinates.y -= dy;
                glutPostRedisplay();
        }
        else if (movingCurve)
        {
            movingCurve->MovePoints(dx,-dy);
            glutPostRedisplay();
        }
        else if (tanPoint)
        {
            tanPoint->mCoordinates.x += dx;
            tanPoint->mCoordinates.y -= dy;
            
            TTPoint *tanPrevPoint = tanCurve->PrevTanPoint(tanIndex);
            TTPoint *tanNextPoint = tanCurve->NextTanPoint(tanIndex);
            
//            cout<<tanPrevPoint<<","<<tanNextPoint<<endl;
            
            glutPostRedisplay();
        }
        
    }
    
    gMousePreviousX = x;
    gMousePreviousY = y;
}

//
// Reshape is called when the window changes size, and is used
// to compute a projection for the new size/shape.
//
void ReshapeCallback(int w, int h)
{
    glViewport(0, 0, w, h);
    
    glMatrixMode( GL_PROJECTION );
    glLoadIdentity();
    
    gluOrtho2D(0.0,w,0.0,h);
    
    STVector2 origin(120, h/2 - 40);
    gTemplate->SetOrigin(origin);
}

//
// Call this function to fill each basic character with a simple test glyph.
// For testing purposes only -- currently not used!
//
void CreateTestFont()
{
    char basicset[] =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "abcdefghijklmnopqrstuvwxyz"
    "0123456789!\"#$%&'()*+,-./:;<=>?";
    
    for (int i = 0; basicset[i]; ++i) {
        TTContour *contour = new TTContour;
        contour->AddPoint(new TTPoint(50, 32, false));
        contour->AddPoint(new TTPoint(50, 224, false));
        contour->AddPoint(new TTPoint(150, 224, false));
        contour->AddPoint(new TTPoint(150, 32, false));
        
        TTGlyph *glyph = new TTGlyph(0, 200);
        glyph->AddContour(contour);
        
        gMyFont.SetGlyphForCharacter(basicset[i], glyph);
    }
}

//
// Writes the font as is to a TTF file, then reads it back using STFont
// to render for a preview
//
void PreparePreview()
{
    // first export the font to a TTF file
    TTFontWriter writer(gMyFont);
    writer.WriteToFile("MyFont.ttf");
    
    // then load the font to render using STFont
    if (gPreviewFont) delete gPreviewFont;
    gPreviewFont = new STFont("MyFont.ttf", 48);
}

//
// Program entry point
//
int main(int argc, char** argv)
{
    //init other variables
    glyph = new TTGlyph;
    currentContour = new TTContour;
    
    //
    // Initialize GLUT.
    //
    glutInit(&argc, argv);
    glutInitDisplayMode( GLUT_SINGLE | GLUT_RGBA );
    glutInitWindowPosition(20, 20);
    glutInitWindowSize(gWidth, gHeight);
    glutCreateWindow("My Glyph Editor");
    
    //
    // Create the template layer that controls the background image (with
    // your handwriting on it) and font metric guide lines
    //
    gTemplate = new TemplateLayer(&gMyFont);
    gTemplate->ScaleImage(6.f);
    gTemplate->MoveImage(1045.f, -750.f);
	
    //
    // Register application callbacks with GLUT.
    //
    glutDisplayFunc(DisplayCallback);
    glutReshapeFunc(ReshapeCallback);
    glutKeyboardFunc(KeyboardCallback);
    glutMouseFunc(MouseCallback);
    glutMotionFunc(MotionCallback);
    glutPassiveMotionFunc(MotionCallback);

    //
    // Run the application
    //
    glutMainLoop();
    
    //
    // Clean up
    //
    if (gPreviewFont) delete gPreviewFont;
    delete gTemplate;
    
    return 0;
}
