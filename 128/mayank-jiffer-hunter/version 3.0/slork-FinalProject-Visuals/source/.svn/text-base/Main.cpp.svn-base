////////////////////////////////////////////////////////////
// Final Project
// Main.cpp
////////////////////////////////////////////////////////////
// Slork 2012
// Mayank Sanganeria, Jiffer Harriman, Hunter McCurry
////////////////////////////////////////////////////////////


#include "Framework.h"
#include "Shader.h"
#include "MultiSampleRenderTarget.h"
#include "DepthRenderTarget.h"

#include "osc/OscOutboundPacketStream.h"
#include "ip/UdpSocket.h"
#include "ip/IpEndpointName.h"
#include "osc/OscReceivedElements.h"
#include "osc/OscPacketListener.h"

#include "Node.h"
#include "CustomMaterial.h"

#define WIN_WIDTH 820
#define WIN_HEIGHT 820
//#define FS_WIN_WIDTH 1280
//#define FS_WIN_HEIGHT 800
#define FS_WIN_WIDTH 1024
#define FS_WIN_HEIGHT 768

// Note: See the SMFL documentation for info on setting up fullscreen mode
// and using rendering settings
// http://www.sfml-dev.org/tutorials/1.6/window-window.php
sf::WindowSettings settings(24, 8, 2);

// fullscreen or no?
//sf::Window window(sf::VideoMode(WIN_WIDTH, WIN_HEIGHT), "SlorkBros", sf::Style::Close, settings);
sf::Window window(sf::VideoMode(FS_WIN_WIDTH, FS_WIN_HEIGHT, 32), "SlorkBros", sf::Style::Fullscreen, settings);

// This is a clock you can use to control animation.  For more info, see:
// http://www.sfml-dev.org/tutorials/1.6/window-time.php
sf::Clock graphics_clock, audio_clock;

// Set up OSC addresses, ports
//char *hostName = (char*)"192.168.1.5";
char *hostName = (char*)"localhost";
int inPortNum = 6474;

#define IP_MTU_SIZE 1536

// window dimensions
int window_width;
int window_height;

float aspect;

//aiColor4D clear_color = (102, 102, 108f, 255);

bool fixedPipeline = true;
//bool fixedPipeline = false;

bool test_quad = false;
bool toFile = false;

// MultiSample stuff
aiVector2D randomVar = aiVector2D(.00001, .51234);
int multiSampleAmount = 2;
MultiSampleRenderTarget *multiSampleRenderTarget;
// end MultiSample stuff

GLuint scene_list = 0;

// shader things
std::vector<Shader*> shaders;

// clock stuff
float lastGraphicsTime = 0.0;
float lastAudioTime = 0.0;

// global node array
const int num_nodes = 16;
Node g_nodes[num_nodes];

struct testVertex
{
	aiVector3D pos;
	aiVector3D norm;
    aiVector2D texcoord;
};

// function prototypes
void initOpenGL();
void loadAssets();
void handleInput();

void callLookAt(float aspect);

void Display_FixedPipeline();

void renderFrame();

void updateState();

void setupLights();


////////////////////////////////////////////////////////////////
namespace osc{
	
	class PacketListener : public OscPacketListener{
	protected:
		
		virtual void ProcessMessage( const osc::ReceivedMessage& m,
                                    const IpEndpointName& remoteEndpoint )
        {
            try{
                // example of parsing single messages. osc::OscPacketListener
                // handles the bundle traversal.
                
                if( strcmp( m.AddressPattern(), "/test" ) == 0 ){
                    // example #1 -- argument stream interface
                    osc::ReceivedMessageArgumentStream args = m.ArgumentStream();
                    float a3;
                    args >> a3 >> osc::EndMessage;
                    
                    std::cout << "received '/test' message with arguments: "
                    << a3 << "\n";
                }
                
				else if( strcmp( m.AddressPattern(), "/display_connections" ) == 0 ){
                    
                    std::cout << "received '/display_connections' message\n";
                    
                    osc::ReceivedMessage::const_iterator arg = m.ArgumentsBegin();
                    
                    //int a1 = (arg++)->AsInt32();
                    //int a2 = (arg++)->AsInt32();
                    
                    for (int i = 0; i < num_nodes; i++) {
                        g_nodes[i].next_node_number = (arg++)->AsInt32();
                    }
                    
                    if( arg != m.ArgumentsEnd() )
                        throw osc::ExcessArgumentException();
                    
                }
                else if( strcmp( m.AddressPattern(), "/display_playing" ) == 0 ){
                    
                    std::cout << "received '/display_playing' message\n";
                    
                    osc::ReceivedMessage::const_iterator arg = m.ArgumentsBegin();
                    
                    for (int i = 0; i < num_nodes; i++) {
                        int active = (arg++)->AsInt32();
                        if (active == 1) {
                            g_nodes[i].active = true;
                        }
                        else {
                            g_nodes[i].active = false;
                        }
                    }
                    
                    if( arg != m.ArgumentsEnd() )
                        throw osc::ExcessArgumentException();
                }
                else if( strcmp( m.AddressPattern(), "/disp_pulses_since_banged" ) == 0 ){

                    std::cout << "received '/disp_pulses_since_banged' message\n";
                    
                    osc::ReceivedMessage::const_iterator arg = m.ArgumentsBegin();
                    
                    //int a1 = (arg++)->AsInt32();
                    //int a2 = (arg++)->AsInt32();
                    
                    for (int i = 0; i < num_nodes; i++) {
                        g_nodes[i].pulses_since_banged = (arg++)->AsInt32();
                    }
                    
                    if( arg != m.ArgumentsEnd() )
                        throw osc::ExcessArgumentException();
                }
                else if( strcmp( m.AddressPattern(), "/display_transition" ) == 0 ){
                    std::cout << "received '/display_transitoin' message\n";
                    
                    osc::ReceivedMessage::const_iterator arg = m.ArgumentsBegin();
                    
                    int from_node = (arg++)->AsInt32();
                    int to_node = (arg++)->AsInt32();
                    
                    if( arg != m.ArgumentsEnd() )
                        throw osc::ExcessArgumentException();
                    
                    std::cout << "Transition from "
                    << from_node << " to " << to_node << "\n";
                }
				else if( strcmp( m.AddressPattern(), "/new" ) == 0 ){
                    // do something here
                }
            }catch( osc::Exception& e ){
                // any parsing errors such as unexpected argument types, or 
                // missing arguments get thrown as exceptions.
                printf("error while parsing message: %s\n", e.what());
            }
        }
	};	
} // namespace osc
////////////////////////////////////////////////////////////////

void *OscThread(void *ptr)
{
    // Set up OSC Reciever
    osc::PacketListener listener;
    UdpListeningReceiveSocket s(IpEndpointName( IpEndpointName::ANY_ADDRESS, inPortNum ),
								&listener );
    
    char *message;
    message = (char *) ptr;
    //printf("%s \n", message);
    
    s.Run();
    
    pthread_exit(NULL);
}

void initOpenGL() {
    // Initialize GLEW on Windows, to make sure that OpenGL 2.0 is loaded
#ifdef FRAMEWORK_USE_GLEW
    GLint error = glewInit();
    if (GLEW_OK != error) {
        std::cerr << glewGetErrorString(error) << std::endl;
        exit(-1);
    }
    if (!GLEW_VERSION_2_0 || !GL_EXT_framebuffer_object) {
        std::cerr << "This program requires OpenGL 2.0 and FBOs" << std::endl;
        exit(-1);
    }
#endif

	window_width = window.GetWidth();
	window_height = window.GetHeight();
    int dim_diff = window_width - window_height;
    
    aspect = ((float)window_width) / ((float)window_height);
	
    // This initializes OpenGL with some common defaults.  More info here:
    // http://www.sfml-dev.org/tutorials/1.6/window-opengl.php
    glClearDepth(1.0f);
    glClearColor(.1f, .1f, .124f, 1.0f);
    
    
    printf("%d lolz!\n", window_width);
    
    glViewport(dim_diff/2, 0, window_width - dim_diff, window_height);
    
    // fixed pipeline
    if (fixedPipeline) {
        
        glEnable( GL_BLEND );
        glBlendFunc( GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA );
        
        glHint(GL_POINT_SMOOTH, GL_NICEST);
        glHint(GL_LINE_SMOOTH, GL_NICEST);
        glHint(GL_POLYGON_SMOOTH, GL_NICEST);
        
        glEnable(GL_POINT_SMOOTH);
        glEnable(GL_LINE_SMOOTH);
        glEnable(GL_POLYGON_SMOOTH);
    }
        
    setupLights();
    
    multiSampleRenderTarget = new MultiSampleRenderTarget(window_width*multiSampleAmount, window_height*multiSampleAmount);
}

void loadAssets() {
    // Read in an asset file, and do some post-processing.  There is much 
    // more you can do with this asset loader, including load textures.
    // More info is here:
    // http://assimp.sourceforge.net/lib_html/usage.html
 
    Shader * shader1 = new Shader("shaders/outlineToon");
    shaders.push_back(shader1); // 0
    
    Shader * shader2 = new Shader("shaders/specToon");
    shaders.push_back(shader2); // 1
    
    Shader * shader3 = new Shader("shaders/downsample");
    shaders.push_back(shader3); // 2
	
	Shader * shader4 = new Shader("shaders/phongTexture");
    shaders.push_back(shader4); // 3
	
	Shader * shader5 = new Shader("shaders/backgroundFuzz");
    shaders.push_back(shader5); // 4
}

void setupLights()
{
    // some sexy values for light source 0
    GLfloat light0_position[] = { 0.0, 5.0, 0.0, 1.0 };
    GLfloat light0_ambient[] = { 1.0, 1.0, 1.0, 1.0 };
    GLfloat light0_diffuse[] = { 1.0, 1.0, 1.0, 1.0 };
    GLfloat light0_specular[] = { 1.0, 1.0, 1.0, 1.0 };
    GLfloat shininess = 40;
    glLightfv( GL_LIGHT0, GL_AMBIENT, light0_ambient );
    glLightfv( GL_LIGHT0, GL_POSITION, light0_position );
    glLightfv( GL_LIGHT0, GL_DIFFUSE, light0_diffuse );
    glLightfv( GL_LIGHT0, GL_SPECULAR, light0_specular );
    glLightfv( GL_LIGHT0, GL_SHININESS, &shininess );
}


void handleInput() {
    // Event loop, for processing user input, etc.  For more info, see:
    // http://www.sfml-dev.org/tutorials/1.6/window-events.php
    sf::Event evt;
    while (window.GetEvent(evt)) {
        switch (evt.Type) {
            case sf::Event::Closed: 
                // Close the window.  This will cause the game loop to exit,
                // because the IsOpened() function will no longer return true.
                window.Close();
                break;
            case sf::Event::Resized: 
                // If the window is resized, then we need to change the perspective
                // transformation and viewport
                glViewport(0, 0, evt.Size.Width, evt.Size.Height);
                break;
            case sf::Event::KeyPressed:
                switch (evt.Key.Code) {
                    case sf::Key::Escape:
                        window.Close();
                        break;
                    case sf::Key::T:
                        test_quad = !test_quad;
                        break;
                    case sf::Key::F:
                        toFile = true;
                        break;
                    default:
                        break;
                }                
                
            default: 
                break;
        }
    }
}

void callLookAt(float aspectRatio) {
    
	GLfloat nearClip = .1f;
	GLfloat farClip = 50.f;
	GLfloat fieldOfView = 45.0f;
	
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	gluPerspective(fieldOfView, aspectRatio, nearClip, farClip);
	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();
	
    //    glMatrixMode (GL_PROJECTION);
    //    glLoadIdentity ();
    //    glFrustum (-.5*aspectRatio, .5*aspectRatio, -.5, .5, 1.0, 30.0);
    //    glMatrixMode (GL_MODELVIEW);
    //    glLoadIdentity();
    
//gluLookAt (cam_position.x, cam_position.y, cam_position.z, look_position.x, look_position.y, look_position.z, up_dir.x, up_dir.y, up_dir.z);
    gluLookAt (0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0);

}

void setMaterial(int shaderNum) {
    
    GLfloat diff_color[] = { .0, .6, .6, 1.0 };
    GLfloat spec_color[] = { .25, .25, .25, 1.0 };
    GLfloat amb_color[] = { .1, .1, .1, 1.0 };
    GLfloat shiny = 40.0;
    
    
    // Get a handle to the diffuse, specular, and ambient variables
    // inside the shader.  Then set them with the diffuse, specular, and
    // ambient color.
    
    GLint diffuse = glGetUniformLocation(shaders[shaderNum]->programID(), "Kd");
    glUniform3f(diffuse, diff_color[0], diff_color[1], diff_color[2]);
    
    // Specular material
    GLint specular = glGetUniformLocation(shaders[shaderNum]->programID(), "Ks");
    glUniform3f(specular, spec_color[0], spec_color[1], spec_color[2]);
    
    // Ambient material
    GLint ambient = glGetUniformLocation(shaders[shaderNum]->programID(), "Ka");
    glUniform3f(ambient, amb_color[0], amb_color[1], amb_color[2]);
    
    // Specular power
    GLint shininess = glGetUniformLocation(shaders[shaderNum]->programID(), "alpha");
    glUniform1f(shininess, shiny);
}

void DrawRects() {
    
    glLoadIdentity();
    glScalef(.1, .1, 1.0);
    
    glBegin(GL_QUADS);
    
    glColor4f(0.3,0.6,0.3,0.6);
    glVertex3f(-3.0, -3.0, 0.0);
    glVertex3f(-3.0, 3.0, 0.0);
    glVertex3f(3.0, 3.0, 0.0);
    glVertex3f(3.0, -3.0, 0.0);

    glColor4f(0.6,0.3,0.3,0.6);
    glVertex3f(-3.0, 3.0, 0.0);
    glVertex3f(-3.0, 6.0, 0.0);
    glVertex3f(3.0, 6.0, 0.0);
    glVertex3f(3.0, 3.0, 0.0);
    
    glColor4f(0.3,0.6,0.6,0.6);
    glVertex3f(6.0, -3.0, 0.0);
    glVertex3f(6.0, 3.0, 0.0);
    glVertex3f(3.0, 3.0, 0.0);
    glVertex3f(3.0, -3.0, 0.0);
    
    glColor4f(0.3,0.3,0.6,0.6);
    glVertex3f(-3.0, -3.0, 0.0);
    glVertex3f(-3.0, -6.0, 0.0);
    glVertex3f(3.0, -6.0, 0.0);
    glVertex3f(3.0, -3.0, 0.0);
    
    glColor4f(0.6,0.3,0.6,0.6);
    glVertex3f(-3.0, -3.0, 0.0);
    glVertex3f(-6.0, -3.0, 0.0);
    glVertex3f(-6.0, 3.0, 0.0);
    glVertex3f(-3.0, 3.0, 0.0);

    glEnd();
}

void Rect(aiVector3D p1, aiVector3D p2) {
        
    glBegin(GL_QUADS);
    
    glVertex3f(p1.x, p1.y, 0.0);
    glVertex3f(p1.x, p2.y, 0.0);
    glVertex3f(p2.x, p2.y, 0.0);
    glVertex3f(p2.x, p1.y, 0.0);
        
    glEnd();
}

void DrawCircle(aiVector3D cent, float rad, int numVerts, bool filled) { 
    float angle, angle2;

    if (filled) {
        glColor4f(1.f, .6f, .2f, 1.0f);
    }
    else {
        glColor4f(.1f, .1f, .124f, 1.0f);
    }
    
    glBegin(GL_TRIANGLE_FAN);
    
    glVertex3f(cent.x, cent.y, cent.z);
    for(int i = 0; i <= numVerts; i+=2) { 
        angle = i*2*M_PI/numVerts; 
        glVertex3f(cent.x + (cos(angle) * rad), cent.y + (sin(angle) * rad), cent.z);
    } 
    glEnd();
    
    glColor4f(1, .6, .2, 1.0);
    for(int i = 0; i <= numVerts; i++) { 
        glLineWidth(3.0);
        glBegin(GL_LINES);
        //glNormal3f(	0.0, 0.0, 1.0);
        angle = (i-1)*2*M_PI/numVerts; 
        glVertex3f(cent.x + (cos(angle) * rad), cent.y + (sin(angle) * rad), cent.z);
        angle2 = (i+1)*2*M_PI/numVerts;
        glVertex3f(cent.x + (cos(angle2) * rad), cent.y + (sin(angle2) * rad), cent.z);
        glEnd();
    }
}
    

void DrawTriangle(aiVector3D start, aiVector3D end, float width, bool filled) { 
    
    glPushMatrix();
    glLoadIdentity();
    glTranslatef(start.x, start.y, start.z);
    glRotatef(180.0 / M_PI * (atan2f(start.y - end.y, start.x - end.x) + M_PI/2), 0.0, 0.0, 1.0);
    glColor4f(1, 1, 1, 0.3);
    glBegin(GL_TRIANGLES);
    glVertex3f(-width/2, 0.0, 0.0);
    glVertex3f(width/2, 0.0, 0.0);
    glVertex3f(0.0, (end-start).Length(), 0.0);
    glEnd();
    glPopMatrix();
    
}

void TestRects() {

    glPushMatrix();
    glLoadIdentity();
    glScalef(.009, .009, 0.01);
    
    int num_vertices = 6;
    testVertex * my_vertices;
    my_vertices = new testVertex[num_vertices];

    // specify vertex locations
    my_vertices[0].pos = aiVector3D(-100.0, -100.0, 0.0);
    my_vertices[1].pos = aiVector3D(-100.0, 100.0, 0.0);
    my_vertices[2].pos = aiVector3D(100.0, 100.0, 0.0);
	
    my_vertices[3].pos = aiVector3D(100.0, 100.0, 0.0);
    my_vertices[4].pos = aiVector3D(100.0, -100.0, 0.0);
    my_vertices[5].pos = aiVector3D(-100.0, -100.0, 0.0);
	
    // specify normal directions
    my_vertices[0].norm = aiVector3D(-1.0, -1.0, 0.1);
    my_vertices[1].norm = aiVector3D(-1.0, 1.0, 0.1);
    my_vertices[2].norm = aiVector3D(1.0, 1.0, 0.1);
    
    my_vertices[3].norm = aiVector3D(1.0, 1.0, 0.1);
    my_vertices[4].norm = aiVector3D(1.0, -1.0, 0.1);
    my_vertices[5].norm = aiVector3D(-1.0, -1.0, 0.1);

    // specify texcoord locations
    my_vertices[0].texcoord = aiVector2D(0.0, 0.0);
    my_vertices[1].texcoord = aiVector2D(0.0, 70.0);
    my_vertices[2].texcoord = aiVector2D(70.0, 70.0);
    
    my_vertices[3].texcoord = aiVector2D(70.0, 70.0);
    my_vertices[4].texcoord = aiVector2D(70.0, 0.0);
    my_vertices[5].texcoord = aiVector2D(0.0, 0.0);

    int shaderNum = 1;
	glUseProgram(shaders[shaderNum]->programID());
	    
    CustomMaterial *mat = new CustomMaterial;
    
    mat->amb_color[0] = .4;
    mat->amb_color[1] = .4;
    mat->amb_color[2] = .35;
    mat->diff_color[0] = .4;
    mat->diff_color[1] = .3;
    mat->diff_color[2] = .3;
    mat->spec_color[0] = mat->spec_color[1] = mat->spec_color[2] = .1;
    mat->shiny = 1;
    
    GLint diffuse = glGetUniformLocation(shaders[shaderNum]->programID(), "Kd");
    glUniform3f(diffuse, mat->diff_color[0], mat->diff_color[1], mat->diff_color[2]);
    
    // Specular material
    GLint specular = glGetUniformLocation(shaders[shaderNum]->programID(), "Ks");
    glUniform3f(specular, mat->spec_color[0], mat->spec_color[1], mat->spec_color[2]);
    
    // Ambient material
    GLint ambient = glGetUniformLocation(shaders[shaderNum]->programID(), "Ka");
    glUniform3f(ambient, mat->amb_color[0], mat->amb_color[1], mat->amb_color[2]);
    
    // Specular power
    GLint shininess = glGetUniformLocation(shaders[shaderNum]->programID(), "alpha");
    glUniform1f(shininess, mat->shiny);

    //setMaterial(shaderNum);
    
	GLint texcoord = glGetAttribLocation(shaders[shaderNum]->programID(), "texcoordIn");
    glEnableVertexAttribArray(texcoord);
    glVertexAttribPointer(texcoord, 2, GL_FLOAT, 0, sizeof(testVertex), &my_vertices->texcoord); // use norm holder as hack for now
	
    GLint position = glGetAttribLocation(shaders[shaderNum]->programID(), "positionIn");
    glEnableVertexAttribArray(position);
    glVertexAttribPointer(position, 3, GL_FLOAT, 0, sizeof(testVertex), &my_vertices->pos);
    
    GLint normal = glGetAttribLocation(shaders[shaderNum]->programID(), "normalIn");
    glEnableVertexAttribArray(normal);
    glVertexAttribPointer(normal, 3, GL_FLOAT, 0, sizeof(testVertex), &my_vertices->norm);
	
	GLint texture = glGetUniformLocation(shaders[shaderNum]->programID(), "diffuseMap");
    glUniform1i(texture, 3); // The normal map will be GL_TEXTURE2
    glActiveTexture(GL_TEXTURE3);
	
//	paperTexture->Bind();
//    glTexParameterf( GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT );
//    glTexParameterf( GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT );
//    glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR );
//    glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR );
	  
    glDrawArrays(GL_TRIANGLES,0,num_vertices); 
    glPopMatrix();
}

void SaveImgToFile() {
    // Copy the back buffer into the current face of the cube map
    glBindTexture(GL_TEXTURE_2D, multiSampleRenderTarget->textureID());
    glBindFramebufferEXT(GL_FRAMEBUFFER_EXT, multiSampleRenderTarget->fboID());
    
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, window_width*multiSampleAmount, window_height*multiSampleAmount, 0, GL_RGBA, GL_FLOAT, NULL);
    glCopyTexSubImage2D(GL_TEXTURE_2D, 0, 0, 0, 0, 0, window_width*multiSampleAmount, window_height*multiSampleAmount);
    
    // for rendering to image (debugging)
    sf::Uint8 *pixelArray = new sf::Uint8[window_width*multiSampleAmount*window_height*multiSampleAmount*4];
    
    // use ONE of the two following lines:
    // This line will copy images from the framebuffer
    //glReadPixels(0, 0, window_width, window_height, GL_RGBA, GL_UNSIGNED_BYTE, pixelArray);
    
    // This line will copy images stored in the currently bound texture
    glGetTexImage(GL_TEXTURE_2D, 0, GL_RGBA, GL_UNSIGNED_BYTE, pixelArray);
    
//    // FOR SAVING TO FILE
//    std::ostringstream out;
//    out << "/Users/phunter8/test_img2.jpg";
//    sf::Image img(window_width*multiSampleAmount, window_height*multiSampleAmount, sf::Color::White);
//    img.LoadFromPixels(window_width*multiSampleAmount, window_height*multiSampleAmount, pixelArray);
//    img.SaveToFile(out.str());
    
//    toFile = false;
    
    //glBindTexture(GL_TEXTURE_2D, 0);
    //glBindFramebufferEXT(GL_FRAMEBUFFER_EXT, 0);
}



void Display_FixedPipeline() {
    glClear (GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT );

//    float aspect = ((float)window_width) / ((float)window_height);
//    printf("hay my aspect is %f\n", aspect);
//	callLookAt(aspect);
    
    //aiVector3D * cam_pos = cam->getPosition();
    
    //DrawRects();
    
//    aiVector3D a1 = aiVector3D(-.1, .1, 0.0);
//    aiVector3D a2 = aiVector3D(.4, .8, 0.0);
    //Rect(a1, a2);
    
//    DrawCircle(a1, .1, 40, true);
//    DrawTriangle(a1, a2, .2, true);
    
    //graph->Display(cam_pos->z);
    
    
    //position codes - move to setup code later
    //Node nodes[16];
    
//    float gap = 0.6;
//    for (int i=0;i<16;i++)
//    {
////        //set position of the different nodes
////        //nodes[i] = g_nodes[i];        
////        g_nodes[i].center_position = aiVector3D(-0.9+(i%4)*gap,0.9-i/4*gap,0.0);
////        
////        
////        //remove this when actual g_nodes are used
//        g_nodes[i].next_node_number = i;
//                //nodes[i].active = i%2;
//        g_nodes[0].next_node_number = 12;
//        g_nodes[4].next_node_number = 7;
//        g_nodes[15].next_node_number = 3;
//        g_nodes[11].next_node_number = 8;
//        
//    }
    
    // Connections
    for (int i=0;i<16;i++)
    {
        //special cases brute force
        if ((i==0 && g_nodes[i].next_node_number==3) || (i==12 && g_nodes[i].next_node_number==15))
        {
            DrawTriangle(g_nodes[i].center_position, aiVector3D(-1,g_nodes[g_nodes[i].next_node_number].center_position.y,0), 0.06, false);
            DrawTriangle(aiVector3D(1,g_nodes[i].center_position.y,0), g_nodes[g_nodes[i].next_node_number].center_position, 0.06, false);
        }            
        else if ((i==3 && g_nodes[i].next_node_number==0)||(i==15 && g_nodes[i].next_node_number==12))
        {
            DrawTriangle(g_nodes[i].center_position, aiVector3D(1,g_nodes[g_nodes[i].next_node_number].center_position.y,0), 0.06, false);
            DrawTriangle(aiVector3D(-1,g_nodes[i].center_position.y,0), g_nodes[g_nodes[i].next_node_number].center_position, 0.06, false);
        }
        //not edge of row or column
        else if (!(i/4 ==0 || i/4==3 || i%4==0 || i%4==3))
            DrawTriangle(g_nodes[i].center_position, g_nodes[g_nodes[i].next_node_number].center_position, 0.06, false);
        else if (i/4 == 0) //first row
        {
            if (g_nodes[i].next_node_number / 4 == 3) //pointing to last row
            {
                DrawTriangle(g_nodes[i].center_position, aiVector3D(g_nodes[g_nodes[i].next_node_number].center_position.x,1,0), 0.06, false);
                DrawTriangle(aiVector3D(g_nodes[i].center_position.x,-1,0), g_nodes[g_nodes[i].next_node_number].center_position, 0.06, false);
            }
             else 
                 DrawTriangle(g_nodes[i].center_position, g_nodes[g_nodes[i].next_node_number].center_position, 0.06, false);            
        }
        else if (i/4 == 3) //last row
        {
            if (g_nodes[i].next_node_number / 4 == 0) //pointing to first row
            {
                DrawTriangle(g_nodes[i].center_position, aiVector3D(g_nodes[g_nodes[i].next_node_number].center_position.x,-1,0), 0.06, false);
                DrawTriangle(aiVector3D(g_nodes[i].center_position.x,1,0), g_nodes[g_nodes[i].next_node_number].center_position, 0.06, false);
            }
            else
                DrawTriangle(g_nodes[i].center_position, g_nodes[g_nodes[i].next_node_number].center_position, 0.06, false);            
        }
        else if (i%4 == 0) //first col
        {
            if (g_nodes[i].next_node_number % 4 == 3) //pointing to last col
            {
                DrawTriangle(g_nodes[i].center_position, aiVector3D(-1,g_nodes[g_nodes[i].next_node_number].center_position.y,0), 0.06, false);
                DrawTriangle(aiVector3D(1,g_nodes[i].center_position.y,0), g_nodes[g_nodes[i].next_node_number].center_position, 0.06, false);
            }
            else
                DrawTriangle(g_nodes[i].center_position, g_nodes[g_nodes[i].next_node_number].center_position, 0.06, false);            
        }
        else if (i%4 == 3) //last col
        {
            if (g_nodes[i].next_node_number % 4 == 0) //pointing to first col
            {
                DrawTriangle(g_nodes[i].center_position, aiVector3D(1,g_nodes[g_nodes[i].next_node_number].center_position.y,0), 0.06, false);
                DrawTriangle(aiVector3D(-1,g_nodes[i].center_position.y,0), g_nodes[g_nodes[i].next_node_number].center_position, 0.06, false);
            }
            else
                DrawTriangle(g_nodes[i].center_position, g_nodes[g_nodes[i].next_node_number].center_position, 0.06, false);            
        }

    }
    
    // Circles   
    for (int i=0;i<16;i++)    
        DrawCircle(g_nodes[i].center_position, 0.05, 100, g_nodes[i].active);    

    
}

void renderFrame() {
   
	float aspect = (float)window_width / (float)window_height;
	
    ////////////////////////////// first pass //////////////////
    // set rendering destination to FBO
    glViewport(0, 0, window.GetWidth()*multiSampleAmount, window.GetHeight()*multiSampleAmount);
    glBindFramebufferEXT(GL_FRAMEBUFFER_EXT, multiSampleRenderTarget->fboID());
    multiSampleRenderTarget->bind();
    
    // clear buffers
	glClearColor(.4f, .4f, .424f, 1.0f);
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    
    // draw a scene to a texture directly
    //graph->Render();
    
	//FuzzRects();
	TestRects();
    
    if (toFile) {
        SaveImgToFile();
    }
    
    /////////////////////////////////////////second pass
    glViewport(0, 0, window_width, window_height);
    glBindFramebufferEXT(GL_FRAMEBUFFER_EXT, 0); // default framebuffer (window)
    
    // clear buffers
    glClearColor(.1f, .2f, .2f, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    
    // set up shader
    int shaderNum = 2; // downsample shader
    glUseProgram(shaders[shaderNum]->programID());

    //attach texture 
    GLint bigTex = glGetUniformLocation(shaders[shaderNum]->programID(), "bigTexture");
    glUniform1i(bigTex, 0); // The environment map will be GL_TEXTURE3
    glActiveTexture(GL_TEXTURE0);
    glBindTexture(GL_TEXTURE_2D, multiSampleRenderTarget->textureID());
    glTexParameterf( GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT );
    glTexParameterf( GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT );
    glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR );
    glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR );
    
    // send downsample amount 
    GLint downAmnt = glGetUniformLocation(shaders[shaderNum]->programID(), "downAmount");
    glUniform1f(downAmnt, multiSampleAmount);
    
    // randomizer
    //help += .0123456789;
    randomVar.x += sin(randomVar.y);
    randomVar.y += sin(randomVar.x);
    
    GLint randInc = glGetUniformLocation(shaders[shaderNum]->programID(), "randomInc");
    glUniform2f(randInc, randomVar.x, randomVar.y);
    
    // send window size 
    GLint winSize = glGetUniformLocation(shaders[shaderNum]->programID(), "targetRes");
    glUniform2f(winSize, window_width, window_height);
    
    int num_vertices = 6;
    testVertex * my_vertices;
    my_vertices = new testVertex[num_vertices];
    
//    glMatrixMode(GL_PROJECTION);
//    glLoadIdentity();
    //glOrtho(-window_width,window_width,-window_height,window_height,1,20);
	
	
	//GLfloat nearClip = .1f;
	//GLfloat farClip = 50.f;
	//GLfloat fieldOfView = 90.0f;
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	glOrtho( -1, 1, -1, 1, -5, 5);
	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();
	
    glLoadIdentity();
    gluLookAt(0., 0., 2., 0., 0., 0., 0., 1., 0.);
	
//    glMatrixMode(GL_MODELVIEW);
//    glLoadIdentity();
    
    // specify vertex locations
    my_vertices[0].pos = aiVector3D(-1.0, -1.0, 0.0);
    my_vertices[1].pos = aiVector3D(-1.0, 1.0, 0.0);
    my_vertices[2].pos = aiVector3D(1.0, 1.0, 0.0);
    
    // specify texcoord locations
    my_vertices[0].texcoord = aiVector2D(0.0, 0.0);
    my_vertices[1].texcoord = aiVector2D(0.0, 1.0);
    my_vertices[2].texcoord = aiVector2D(1.0, 1.0);
    
    // specify vertex locations
    my_vertices[3].pos = aiVector3D(1.0, 1.0, 0.0);
    my_vertices[4].pos = aiVector3D(1.0, -1.0, 0.0);
    my_vertices[5].pos = aiVector3D(-1.0, -1.0, 0.0);
    
    // specify texcoord locations
    my_vertices[3].texcoord = aiVector2D(1.0, 1.0);
    my_vertices[4].texcoord = aiVector2D(1.0, 0.0);
    my_vertices[5].texcoord = aiVector2D(0.0, 0.0);
    
    GLint position = glGetAttribLocation(shaders[shaderNum]->programID(), "positionIn");
    glEnableVertexAttribArray(position);
    glVertexAttribPointer(position, 3, GL_FLOAT, 0, sizeof(testVertex), &my_vertices->pos);
    
    GLint texcoord = glGetAttribLocation(shaders[shaderNum]->programID(), "texcoordIn");
    glEnableVertexAttribArray(texcoord);
    glVertexAttribPointer(texcoord, 2, GL_FLOAT, 0, sizeof(testVertex), &my_vertices->texcoord); // use norm holder as hack for now
    
    glDrawArrays(GL_TRIANGLES,0,num_vertices); 
    
    
    ////////////////////////////////////////////// end second pass
    
    // Display a test quad on screen (press t key to toggle)
    if (test_quad)
    {
        // Render test quad
        glDisable(GL_LIGHTING);
        glUseProgramObjectARB(0);
        glMatrixMode(GL_PROJECTION);
        glLoadIdentity();
        glOrtho(-window_width/2,window_width/2,-window_height/2,window_height/2,1,20);
        glMatrixMode(GL_MODELVIEW);
        glLoadIdentity();
        glColor4f(1,1,1,1);
        glActiveTexture(GL_TEXTURE2);
        glBindTexture(GL_TEXTURE_2D, multiSampleRenderTarget->textureID());
        glEnable(GL_TEXTURE_2D);
        glTranslated(0,-window_height/2,-1);
        glBegin(GL_QUADS);
        glTexCoord2d(0,0);glVertex3f(0,0,0);
        glTexCoord2d(1,0);glVertex3f(window_width/2,0,0);
        glTexCoord2d(1,1);glVertex3f(window_width/2,window_height/2,0);
        glTexCoord2d(0,1);glVertex3f(0,window_height/2,0);
        glEnd();
        glEnable(GL_LIGHTING);
        glDisable(GL_TEXTURE_2D);
        multiSampleRenderTarget->unbind();
    }
}

void initNodeGeometry() {    
    
    // For now, brute force hard-coding everything
    float gap = 0.5;

    
    for (int i=0;i<16;i++)
    {
        g_nodes[i].center_position = aiVector3D(-0.75+(i%4)*gap,0.75-i/4*gap,0.0);
        g_nodes[i].next_node_number = (i+1) % 16;
    }
    
    //STAGGERED 8x2 SETUP
    //    // positions
    //    g_nodes[0].center_position = aiVector3D(-9 * gap, 2 * gap, 0.0);
    //    g_nodes[3].center_position = aiVector3D(9 * gap, 2 * gap, 0.0);
    //    g_nodes[12].center_position = aiVector3D(-9 * gap, -2 * gap, 0.0);
    //    g_nodes[15].center_position = aiVector3D(9 * gap, -2 * gap, 0.0);
    //    
    //    g_nodes[1].center_position = aiVector3D(-3 * gap, 2 * gap, 0.0);
    //    g_nodes[2].center_position = aiVector3D(3 * gap, 2 * gap, 0.0);
    //    g_nodes[13].center_position = aiVector3D(-3 * gap, -2 * gap, 0.0);
    //    g_nodes[14].center_position = aiVector3D(3 * gap, -2 * gap, 0.0);
    //    
    //    g_nodes[4].center_position = aiVector3D(-5 * gap, 1 * gap, 0.0);
    //    g_nodes[7].center_position = aiVector3D(5 * gap, 1 * gap, 0.0);
    //    g_nodes[8].center_position = aiVector3D(-5 * gap, -1 * gap, 0.0);
    //    g_nodes[11].center_position = aiVector3D(5 * gap, -1 * gap, 0.0);
    //    
    //    g_nodes[5].center_position = aiVector3D(-1 * gap, 1 * gap, 0.0);
    //    g_nodes[6].center_position = aiVector3D(1 * gap, 1 * gap, 0.0);
    //    g_nodes[9].center_position = aiVector3D(-1 * gap, -1 * gap, 0.0);
    //    g_nodes[10].center_position = aiVector3D(1 * gap, -1 * gap, 0.0);
    // 
    //    
    //    // next nodes
    //    // right
    //    g_nodes[0].next_node_number = 1;
    //    g_nodes[2].next_node_number = 3;
    //    g_nodes[8].next_node_number = 9;
    //    g_nodes[10].next_node_number = 11;
    //    
    //    // down
    //    g_nodes[1].next_node_number = 5;
    //    g_nodes[3].next_node_number = 7;
    //    g_nodes[9].next_node_number = 13;
    //    g_nodes[11].next_node_number = 15;
    //    
    //    // left
    //    g_nodes[5].next_node_number = 4;
    //    g_nodes[7].next_node_number = 6;
    //    g_nodes[13].next_node_number = 12;
    //    g_nodes[15].next_node_number = 14;
    //    
    //    // left
    //    g_nodes[4].next_node_number = 0;
    //    g_nodes[6].next_node_number = 2;
    //    g_nodes[12].next_node_number = 8;
    //    g_nodes[14].next_node_number = 10;
    //    
    
    
}

void init3DGeometry() {
    
    
    // For now, brute force hard-coding everything
    float gap = .2;
    
    // positions
    g_nodes[0 ].center_position = aiVector3D(-3 * gap,  gap,  gap);
    g_nodes[1 ].center_position = aiVector3D(-1 * gap,  gap,  gap);
    g_nodes[2 ].center_position = aiVector3D( 1 * gap,  gap,  gap);
    g_nodes[3 ].center_position = aiVector3D( 3 * gap,  gap,  gap);
    
    g_nodes[4 ].center_position = aiVector3D(-3 * gap,  gap, -gap);
    g_nodes[5 ].center_position = aiVector3D(-1 * gap,  gap, -gap);
    g_nodes[6 ].center_position = aiVector3D( 1 * gap,  gap, -gap);
    g_nodes[7 ].center_position = aiVector3D( 3 * gap,  gap, -gap);
    
    g_nodes[8 ].center_position = aiVector3D(-3 * gap, -gap, -gap);
    g_nodes[9 ].center_position = aiVector3D(-1 * gap, -gap, -gap);
    g_nodes[10].center_position = aiVector3D( 1 * gap, -gap, -gap);
    g_nodes[11].center_position = aiVector3D( 3 * gap, -gap, -gap);
    
    g_nodes[12].center_position = aiVector3D(-3 * gap, -gap,  gap);
    g_nodes[13].center_position = aiVector3D(-1 * gap, -gap,  gap);
    g_nodes[14].center_position = aiVector3D( 1 * gap, -gap,  gap);
    g_nodes[15].center_position = aiVector3D(-3 * gap, -gap,  gap);
    
    
    // next nodes
    // right
    g_nodes[0].next_node_number = 1;
    g_nodes[2].next_node_number = 3;
    g_nodes[8].next_node_number = 9;
    g_nodes[10].next_node_number = 11;
    
    // down
    g_nodes[1].next_node_number = 5;
    g_nodes[3].next_node_number = 7;
    g_nodes[9].next_node_number = 13;
    g_nodes[11].next_node_number = 15;
    
    // left
    g_nodes[5].next_node_number = 4;
    g_nodes[7].next_node_number = 6;
    g_nodes[13].next_node_number = 12;
    g_nodes[15].next_node_number = 14;
    
    // left
    g_nodes[4].next_node_number = 0;
    g_nodes[6].next_node_number = 2;
    g_nodes[12].next_node_number = 8;
    g_nodes[14].next_node_number = 10;
}

void updateState() {
    
    static float elapsed = 0.0f;
    elapsed += graphics_clock.GetElapsedTime();
    graphics_clock.Reset();
    
    float delta = elapsed - lastGraphicsTime;
    lastGraphicsTime = elapsed;
    
    //printf("delta is %f\n", delta);
    
    //delta = .002;
    
    //graph->UpdateGraph(delta);
    //graph->FadeColors();
    
    //cam->updateCam(delta);
    
}

int main(int argc, char** argv) {

    initOpenGL();
    loadAssets();
    
    initNodeGeometry();
    //init3DGeometry();
    
    pthread_t osc_thread;
    std::string osc_message = "Starting OSC Listen Thread";
    int osc_ret;
    osc_ret = pthread_create( &osc_thread, NULL, OscThread, (void*) &osc_message);
    
    srand( (unsigned)time( NULL ) );
    
    // Main Loop
    while (window.IsOpened()) {
        
        handleInput();
        updateState();
        
        if (fixedPipeline) {
            // Fixed Pipeline
            Display_FixedPipeline();
        }
        else {
            // Custom Pipeline
            renderFrame();
        }
        
        window.Display();
    }
    return 0;
}
