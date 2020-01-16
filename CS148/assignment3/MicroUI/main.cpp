// main.cpp
//
// Starter code for CS 148 Assignment 3.
//

//
// Include libst headers for using OpenGL and GLUT.
//
#include "st.h"
#include "stgl.h"
#include "stglut.h"

//
// Include headers for UI clases.
//
#include "UIBox.h"
#include "UIDraggableBox.h"
#include "UIButton.h"
#include "UILabel.h"
#include "UIWidget.h"
#include "UILine.h"

//
// Include header for parsing config and line editor files
//
#include "parseConfig.h"

#define WIN_WIDTH 512
#define WIN_HEIGHT 512

//
// Globals used by this application.
// As a rule, globals are Evil, but this is a small application
// and the design of GLUT makes it hard to avoid them.
//

// Font to use for text in the UI.
static STFont* gFont = NULL;

// List of widgets being displayed.
static std::vector<UIWidget*> gWidgets;
static std::vector<UILine*> gLines;
static UILine *currentLine = 0;
static bool isDrawingLine = 0;

// Window size so we can properly update the UI.
static int gWindowSizeX = 0;
static int gWindowSizeY = 0;

// Background images
static STImage* gBgIm1;
static STImage* gBgIm2;
static bool gBgImChoice;

#ifndef BUFSIZ
#define BUFSIZ  512
#endif
// Background image filenames parsed from config file
static char gImage1Fname[BUFSIZ];
static char gImage2Fname[BUFSIZ];

// Line editor load/save filenames parsed from config file
static char gSaveFname[BUFSIZ];
static char gLoadFname[BUFSIZ];

static UIWidget *dragWidget = 0;
static UIWidget *chosenWidget = 0;
static UIWidget *enteredWidget = 0;


#include <iostream>
void testCall(UIButton *button)
{
    
}

void CaptureMouse(UIWidget *widget)
{
    chosenWidget = widget;
    
}

void ReleaseMouse(UIWidget *widget)
{
    chosenWidget = NULL;
}

void BeginDrag(UIWidget *widget)
{
    dragWidget = widget;
}

void EndDrag(UIWidget *widget)
{
    dragWidget = NULL;
}
void quitFunction(UIButton *button)
{
    exit(0);
}

void deleteLastLine(UIButton *button)
{
    int pos = gLines.size()-1;
    if (pos<0)
        return;
    UILine *line = gLines[pos];
    gLines.pop_back();
    for (int i=0;i<gWidgets.size();i++)
    {
        if (gWidgets[i]==line->startBox || gWidgets[i]==line->endBox)
        {
            delete gWidgets[i];
            gWidgets.erase(gWidgets.begin()+i);
            i--;
        }
    }
    delete line;
}


//
// Add a widget to the list of widgets in the window.
// Also sets the rectangle of the widget to the one specified.
//
void AddWidget(UIWidget* widget, const UIRectangle& rectangle)
{
    widget->SetRectangle(rectangle);
    gWidgets.push_back(widget);
}

// Creates any widgets or other objects used for displaying lines.
// lineEndpt1 and lineEndpt2 should both be coordindates RELATIVE TO THE IMAGE
// THEY ARE DRAWN TO. This means that if the lower left of one image is at
// (15,15), if lineEndpt1 is (10,10), it would actually be drawn at window
// coordinates (25,25).
//
// The imageChoice parameter tells you whether a line is being drawn to both images,
// or to a single images. When the user is manually adding lines, this parameter
// should be BOTH_IMAGES. When this function is called by loadLineEditorFile
// (already implemented), imageChoice will take on the value of either IMAGE_1
// or IMAGE_2.
void AddNewLine(STPoint2 lineEndpt1, STPoint2 lineEndpt2, ImageChoice imageChoice)
{
    UILine *line = new UILine(lineEndpt1,lineEndpt2);
    gWidgets.push_back(line->startBox);
    gWidgets.push_back(line->endBox);
    line->startBox->setDragCallbacks(&BeginDrag,&EndDrag);
    line->endBox->setDragCallbacks(&BeginDrag,&EndDrag);
    gLines.push_back(line);

}

void toggleImage(UIButton *button)
{
    gBgImChoice=!gBgImChoice;
}


//
// Setup routnine.
//
// As you progress with implementing the assignment,
// you will want to modify this routine to create and
// test your new widget types.
//


void CreateWidgets()
{    
    AddWidget(new UILabel(gFont,std::string("MicroUI Line Editor") ),
              UIRectangle(STPoint2(200,480), STPoint2(300, 512)));
    
    UIButton *button = new UIButton(gFont,std::string("Quit"),&quitFunction);
    AddWidget(button,
              UIRectangle(STPoint2(450,15), STPoint2(500, 55)));
    button->setCaptureCallbacks(CaptureMouse,ReleaseMouse);

    UIButton *buttonToggle = new UIButton(gFont,std::string("Toggle"),&toggleImage);
    AddWidget(buttonToggle,
              UIRectangle(STPoint2(350,15), STPoint2(425, 55)));
    buttonToggle->setCaptureCallbacks(CaptureMouse,ReleaseMouse);

    UIButton *buttonDelete = new UIButton(gFont,std::string("Delete"),&deleteLastLine);
    AddWidget(buttonDelete,
              UIRectangle(STPoint2(250,15), STPoint2(325, 55)));
    buttonDelete->setCaptureCallbacks(&CaptureMouse,&ReleaseMouse);
}

void DisplayCallback()
{
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();

    // Clear the window.
    glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT);

    // Draw background
    glEnable(GL_TEXTURE_2D);

    if (gBgImChoice)
        gBgIm2->Draw();
    else
        gBgIm1->Draw();

    // Loop through all the widgets in the user
    // interface and tell each to display itself.
    int numWidgets = (int) gWidgets.size();
    for (int ii = 0; ii < numWidgets; ++ii) {
        UIWidget* widget = gWidgets[ii];
        widget->Display();
    }
    
    if (currentLine)
        currentLine->Display(-1);
    for (int ii=0;ii<gLines.size();ii++)
    {
        UILine *line = gLines[ii];
        line->Display(ii);
    }

    glutSwapBuffers();
}

//
// Reshape the window and record the size so
// that we can use it in the mouse callbacks.
//
void ReshapeCallback(int w, int h)
{
    gWindowSizeX = w;
    gWindowSizeY = h;

    glViewport(0, 0, gWindowSizeX, gWindowSizeY);

    glMatrixMode( GL_PROJECTION );
    glLoadIdentity();
    glOrtho(0, gWindowSizeX, 0, gWindowSizeY, -1., 1.);

    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    glEnable(GL_BLEND);
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
}
#include<iostream>


UIWidget* topWidget(STPoint2 position)
{
    for (int i=gWidgets.size()-1;i>=0;i--)
    {
        if (gWidgets[i]->HitTest(position))
        {
            return gWidgets[i];
        }
    }
    return NULL;
}


void MouseCallback(int button, int state, int x, int y)
{
    STPoint2 mousePos(x,gWindowSizeY - y);
    UIWidget *top = topWidget(mousePos);
    if (chosenWidget)
        top = chosenWidget;
    if (dragWidget)
        top = dragWidget;

    if (button == GLUT_LEFT_BUTTON)
    {
        if (top!=NULL && !isDrawingLine)
        {
            if (state==GLUT_DOWN)
            {
                top->HandleMouseDown(mousePos);
            }
            else if (state==GLUT_UP)
            {            
                top->HandleMouseUp(mousePos);
            }
        }
        else
        {
            if (state==GLUT_DOWN)
            {
                isDrawingLine = 1;
                currentLine = new UILine(mousePos, mousePos);
            }
            else if (state==GLUT_UP && currentLine)
            {
                AddNewLine(currentLine->getStartPoint(), currentLine->getEndPoint(), BOTH_IMAGES);
                delete currentLine;
                currentLine = NULL;
                isDrawingLine = 0;
            }
        }
    }
    glutPostRedisplay();
}

void PassiveMotionCallback(int x, int y)
{
    STPoint2 mousePos(x,gWindowSizeY - y);
    UIWidget *top = topWidget(mousePos);
    if (!enteredWidget && top)
    {
        enteredWidget = top;
        enteredWidget->HandleMouseEnter();
        glutPostRedisplay();
    }
    else if (top!=enteredWidget)
    {
        enteredWidget->HandleMouseLeave();
        enteredWidget = 0;
        glutPostRedisplay();
    }
    
}

void MotionCallback(int x, int y)
{
    STPoint2 mousePos(x,gWindowSizeY - y);
    if (isDrawingLine)
    {
        currentLine->setEndPoint(mousePos);
    }
    else
    {
        if (dragWidget)
        {
            dragWidget->HandleMouseMove(mousePos);
        }
        else
        {
            UIWidget *top = topWidget(mousePos);
            if (top && chosenWidget && top!=chosenWidget)
                return;
            PassiveMotionCallback(x,y);
            if (top)
                top->HandleMouseMove(mousePos);
        }
    }
    glutPostRedisplay();
    
}



//
// Initialize the application, loading resources,
// setting state, and creating widgets.
//
void Initialize()
{
    glDisable(GL_DEPTH_TEST);
    glDepthMask(GL_FALSE);

    gFont = new STFont("resources/arial.ttf", 24);

    CreateWidgets();
}

int main(int argc, char** argv)
{
    //
    // Initialize GLUT.
    //
    glutInit(&argc, argv);
    glutInitDisplayMode( GLUT_DOUBLE | GLUT_RGBA | GLUT_DEPTH);
    glutInitWindowPosition(20, 20);
    glutInitWindowSize(
        WIN_WIDTH, WIN_HEIGHT);
    glutCreateWindow("CS148 Assignment 3");

    //
    // Initialize the UI.
    //
    Initialize();

    //
    // Parse config file
    //
    parseConfigFile(
        "config.txt",
        gImage1Fname,
        gImage2Fname,
        gSaveFname,
        gLoadFname,
        &gBgIm1,
        &gBgIm2);
    
    loadLineEditorFile("lineEditorFile.txt", AddNewLine, gImage1Fname, gImage2Fname, &gBgIm1, &gBgIm2);


    //
    // Register GLUT callbacks and enter main loop.
    //

    glutDisplayFunc(DisplayCallback);
    glutReshapeFunc(ReshapeCallback);

    glutMouseFunc(MouseCallback);
    glutPassiveMotionFunc(PassiveMotionCallback);
    glutMotionFunc(MotionCallback);
    glutMainLoop();

    //
    // Cleanup code should be called here.
    //
    for (int i=0;i<gLines.size();i++)
    {
        delete gLines[i];
    }
    gLines.clear();
    for (int i=0;i<gWidgets.size();i++)
    {
        delete gWidgets[i];
    }
    gWidgets.clear();
    delete gBgIm1;
    delete gBgIm2;

    return 0;
}
