// main.cpp

//
// For this project, we use OpenGL, GLUT
// and GLEW (to load OpenGL extensions)
//
#include "stglew.h"

#include <stdio.h>
#include <string.h>

//
// Globals used by this application.
// As a rule, globals are Evil, but this is a small application
// and the design of GLUT makes it hard to avoid them.
//

// Window size, kept for screenshots
static int gWindowSizeX = 0;
static int gWindowSizeY = 0;

static int XTesselationDepth = 400;
static int ZTesselationDepth = 400;

// File locations
std::string vertexShader;
std::string fragmentShader;
std::string normalMap;
std::string lightProbe;

// Light source attributes
static float specularLight[] = {1.00, 1.00, 1.00, 1.0};
static float ambientLight[]  = {0.10, 0.10, 0.10, 1.0};
static float diffuseLight[]  = {1.00, 1.00, 1.00, 1.0};

// Material color properties
static float materialAmbient[]  = { 0.2, 0.2, 0.6, 1.0 };
static float materialDiffuse[]  = { 0.2, 0.2, 0.6, 1.0 };
static float materialSpecular[] = { 0.8, 0.8, 0.8, 1.0 };
static float shininess          = 8.0;  // # between 1 and 128.

STImage   *surfaceNormImg;
STTexture *surfaceNormTex;

STImage   *lightProbeImg;
STTexture *lightProbeTex;

STShaderProgram *shader;

// Stored mouse position for camera rotation, panning, and zoom.
int gPreviousMouseX = -1;
int gPreviousMouseY = -1;
int gMouseButton = -1;
STVector3 mCameraTranslation;
float mCameraAzimuth;
float mCameraElevation;
bool teapot = false;

float tiempo = 0;

void resetCamera()
{
    mCameraTranslation = STVector3(0.f, 1.f, 1.5f);
    mCameraAzimuth = 0.f;
    mCameraElevation = 65.0f;
}


//
// Initialize the application, loading all of the settings that
// we will be accessing later in our fragment shaders.
//
void Setup()
{
    // Set up lighting variables in OpenGL
    // Once we do this, we will be able to access them as built-in
    // attributes in the shader (see examples of this in normalmap.frag)
    glEnable(GL_LIGHTING);
    glEnable(GL_LIGHT0);
    glLightfv(GL_LIGHT0, GL_SPECULAR,  specularLight);
    glLightfv(GL_LIGHT0, GL_AMBIENT,   ambientLight);
    glLightfv(GL_LIGHT0, GL_DIFFUSE,   diffuseLight);

    // Ditto with accessing material properties in the fragment
    // and vertex shaders.
    glMaterialfv(GL_FRONT, GL_AMBIENT,   materialAmbient);
    glMaterialfv(GL_FRONT, GL_DIFFUSE,   materialDiffuse);
    glMaterialfv(GL_FRONT, GL_SPECULAR,  materialSpecular);
    glMaterialfv(GL_FRONT, GL_SHININESS, &shininess);

    surfaceNormImg = new STImage(normalMap);
    surfaceNormTex = new STTexture(surfaceNormImg);

    lightProbeImg = new STImage(lightProbe);
    lightProbeTex = new STTexture(lightProbeImg);

    shader = new STShaderProgram();
    shader->LoadVertexShader(vertexShader);
    shader->LoadFragmentShader(fragmentShader);

    resetCamera();
    
    glClearColor(0.1f, 0.1f, 0.1f, 1.0f);
    glEnable(GL_DEPTH_TEST);
}

/**
 * Camera adjustment methods
 */
void AdjustCameraAzimuthBy(float delta)
{
    mCameraAzimuth += delta;
}

void AdjustCameraElevationBy(float delta)
{
    mCameraElevation += delta;
}

void AdjustCameraTranslationBy(STVector3 delta)
{
    mCameraTranslation += delta;
}

//
// Display the output image from our vertex and fragment shaders
//
void DisplayCallback()
{
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();

    STVector3 trans = -mCameraTranslation;
    
    glTranslatef(trans.x, trans.y, trans.z);
    
    glRotatef(-mCameraElevation, 1, 0, 0);
    glRotatef(-mCameraAzimuth, 0, 1, 0);
    
    glRotatef(-90.0f, 1, 0, 0);
    glScalef(1.0, -1.0, 1.0);


	float leftX   = -2;
	float rightX  = -leftX;

	float planeY  = 0;

	float nearZ   = 0;
	float farZ    = 4;

    float lightPosition[] = {4.0, 10.0, farZ, 1.0};
    glLightfv(GL_LIGHT0, GL_POSITION, lightPosition);

    // Texture 2: light probe environment map
    glActiveTexture(GL_TEXTURE1);
    lightProbeTex->Bind();

    // Texture 1: surface normal map
    glActiveTexture(GL_TEXTURE0);
    surfaceNormTex->Bind();
    
    // Bind the textures we've loaded into openGl to
    // the variable names we specify in the fragment
    // shader.
    shader->SetTexture("normalTex", 0);
    shader->SetTexture("envMapTex", 1);

    // Invoke the shader.  Now OpenGL will call our
    // shader programs on anything we draw.
    shader->Bind();
    tiempo-=0.02;
    shader->SetUniform("time", tiempo);
    if (teapot)
    {
        // Draw a Utah Teapot
        shader->SetUniform("teapot", 1.);
        glutSolidTeapot(1); 
    }
    else
    {
        shader->SetUniform("teapot", 0.);
        // Draw a coplanar quadrilateral on the y=0 plane.
        // This is the surface we will distort for the
        // assignment.
        glBegin(GL_QUADS);
        glColor4f(.1, .1, .7, 1.0f);

        // All vertices on the plane have the same normal
        glNormal3f(0.0f, 1.0f, 0.0f);

        for (int i = 0; i < XTesselationDepth; i++)
            for (int j = 0; j < ZTesselationDepth; j++) {
                float s0 = (float)  i      / (float) XTesselationDepth;
                float s1 = (float) (i + 1) / (float) XTesselationDepth;
                float x0 =  s0 * (rightX - leftX) + leftX;
                float x1 =  s1 * (rightX - leftX) + leftX;

                float t0 = (float) j       / (float) ZTesselationDepth;
                float t1 = (float) (j + 1) / (float) ZTesselationDepth;
                float z0 = t0 * (farZ - nearZ) + nearZ;
                float z1 = t1 * (farZ - nearZ) + nearZ;

                glTexCoord2f(s0, t0);
                glVertex3f(x0, planeY, z0);

                glTexCoord2f(s1, t0);
                glVertex3f(x1, planeY, z0);

                glTexCoord2f(s1, t1);
                glVertex3f(x1, planeY,  z1);

                glTexCoord2f(s0, t1);
                glVertex3f(x0,  planeY,  z1);
            }

        glEnd();
    }
    
    shader->UnBind();

    glActiveTexture(GL_TEXTURE1);
    lightProbeTex->UnBind();
    glActiveTexture(GL_TEXTURE0);
    surfaceNormTex->UnBind();

    glutSwapBuffers();
}

//
// Reshape the window and record the size so
// that we can use it for screenshots.
//
void ReshapeCallback(int w, int h)
{
	gWindowSizeX = w;
    gWindowSizeY = h;

    glViewport(0, 0, gWindowSizeX, gWindowSizeY);

    glMatrixMode( GL_PROJECTION );
    glLoadIdentity();
	// Set up a perspective projection
    float aspectRatio = (float) gWindowSizeX / (float) gWindowSizeY;
	gluPerspective(30.0f, aspectRatio, .1f, 100.0f);

    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
}

void SpecialKeyCallback(int key, int x, int y)
{
    switch(key) {
        case GLUT_KEY_LEFT:
            AdjustCameraTranslationBy(STVector3(-0.2,0,0));
            break;
        case GLUT_KEY_RIGHT:
            AdjustCameraTranslationBy(STVector3(0.2,0,0));
            break;
        case GLUT_KEY_DOWN:
            AdjustCameraTranslationBy(STVector3(0,-0.2,0));
            break;
        case GLUT_KEY_UP:
            AdjustCameraTranslationBy(STVector3(0,0.2,0));
            break;
        default:
            break;
    }
    glutPostRedisplay();
}

void KeyCallback(unsigned char key, int x, int y)
{
    switch(key) {
    case 's': {
            //
            // Take a screenshot, and save as screenshot.jpg
            //
            STImage* screenshot = new STImage(gWindowSizeX, gWindowSizeY);
            screenshot->Read(0,0);
            screenshot->Save("screenshot.jpg");
            delete screenshot;
        }
        break;
    case 'r':
        resetCamera();
        break;
    case 't':
        teapot = !teapot;
        break;
	case 'q':
		exit(0);
    default:
        break;
    }

    // glutPostRedisplay();
}


/**
 * Mouse event handler
 */
void MouseCallback(int button, int state, int x, int y)
{
    if (button == GLUT_LEFT_BUTTON || button == GLUT_RIGHT_BUTTON)
    {
        gMouseButton = button;
    } else
    {
        gMouseButton = -1;
    }
    
    if (state == GLUT_UP)
    {
        gPreviousMouseX = -1;
        gPreviousMouseY = -1;
    }
}

/**
 * Mouse active motion callback (when button is pressed)
 /*/
void MouseMotionCallback(int x, int y)
{
    if (gPreviousMouseX >= 0 && gPreviousMouseY >= 0)
    {
        //compute delta
        float deltaX = x-gPreviousMouseX;
        float deltaY = y-gPreviousMouseY;
        gPreviousMouseX = x;
        gPreviousMouseY = y;
        
        float zoomSensitivity = 0.2f;
        float rotateSensitivity = 0.5f;
        
        //orbit or zoom
        if (gMouseButton == GLUT_LEFT_BUTTON)
        {
            AdjustCameraAzimuthBy(-deltaX*rotateSensitivity);
            AdjustCameraElevationBy(-deltaY*rotateSensitivity);
            
        } else if (gMouseButton == GLUT_RIGHT_BUTTON)
        {
            STVector3 zoom(0,0,deltaX);
            AdjustCameraTranslationBy(zoom * zoomSensitivity);
        }
        
    } else
    {
        gPreviousMouseX = x;
        gPreviousMouseY = y;
    }
    
}


void usage()
{
	printf("usage: ProgrammableShading vertShader fragShader lightProbeImg normalMapImg\n");
	exit(0);
}

int main(int argc, char** argv)
{
	if (argc != 5)
		usage();

	vertexShader   = std::string(argv[1]);
	fragmentShader = std::string(argv[2]);
	lightProbe     = std::string(argv[3]);
	normalMap      = std::string(argv[4]);

    //
    // Initialize GLUT.
    //
    glutInit(&argc, argv);
    glutInitDisplayMode( GLUT_DOUBLE | GLUT_RGBA | GLUT_DEPTH);
    glutInitWindowPosition(20, 20);
    glutInitWindowSize(640, 480);
    glutCreateWindow("CS148 Assignment 7");
    
    //
    // Initialize GLEW.
    //
#ifndef __APPLE__
    glewInit();
    if(!GLEW_VERSION_2_0) {
        printf("Your graphics card or graphics driver does\n"
			   "\tnot support OpenGL 2.0, trying ARB extensions\n");

        if(!GLEW_ARB_vertex_shader || !GLEW_ARB_fragment_shader) {
            printf("ARB extensions don't work either.\n");
            printf("\tYou can try updating your graphics drivers.\n"
				   "\tIf that does not work, you will have to find\n");
            printf("\ta machine with a newer graphics card.\n");
            exit(1);
        }
    }
#endif

    // Be sure to initialize GLUT (and GLEW for this assignment) before
    // initializing your application.

    Setup();

    glutDisplayFunc(DisplayCallback);
    glutReshapeFunc(ReshapeCallback);
    glutSpecialFunc(SpecialKeyCallback);
    glutKeyboardFunc(KeyCallback);
    glutMouseFunc(MouseCallback);
    glutMotionFunc(MouseMotionCallback);
    glutIdleFunc(DisplayCallback);

    glutMainLoop();


    // Cleanup code should be called here.


    return 0;
}
