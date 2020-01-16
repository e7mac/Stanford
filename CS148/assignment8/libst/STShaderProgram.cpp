// STShaderProgram.cpp

/* Include-order dependency!
*
* GLEW must be included before the standard GL.h header.
* In this case, it means we must violate the usual design
* principle of always including Foo.h first in Foo.cpp.
*/
#ifdef __APPLE__
#define GLEW_VERSION_2_0 1
#else
#define GLEW_STATIC
#include "GL/glew.h"
#include "GL/gl.h"
#endif



#include "STShaderProgram.h"

#include "st.h"

#include <assert.h>
#include <string>
#include <fstream>
#include <sstream>

//

STShaderProgram::STShaderProgram()
{
    if(GLEW_VERSION_2_0)
        programid = glCreateProgram();
#ifndef __APPLE__
    else
        programid = glCreateProgramObjectARB();
#endif
}

STShaderProgram::~STShaderProgram()
{
    if(GLEW_VERSION_2_0)
        glDeleteProgram(programid);
#ifndef __APPLE__
    else
        glDeleteObjectARB(programid);
#endif    
}

void STShaderProgram::LoadVertexShader(const std::string& filename)
{
    std::ifstream in(filename.c_str());
    if(!in) {
      fprintf(stderr, "Failed to open shader file '%s'\n", filename.c_str());
        assert(false);
        return;
    }
    std::stringstream ss;
    ss << in.rdbuf();
    
    std::string str = ss.str();
    const char* ptr = str.c_str();

    // Buffer for error messages
    static const int kBufferSize = 1024;
    char buffer[1024];

    if(GLEW_VERSION_2_0) 
    {
        GLuint shader = glCreateShader(GL_VERTEX_SHADER);
        glShaderSource(shader, 1, &ptr, NULL);
        glCompileShader(shader);
        GLint result = 0;
        glGetShaderiv(shader, GL_COMPILE_STATUS, &result);
        if(result != GL_TRUE) {
            GLsizei length = 0;
            glGetShaderInfoLog(shader, kBufferSize-1,
                &length, buffer);
            fprintf(stderr, "%s: GLSL error\n%s\n", filename.c_str(), buffer);
            assert(false);
        }
        glAttachShader(programid, shader);
        glLinkProgram(programid);
    }
#ifndef __APPLE__
    else
    {
        GLuint shader = glCreateShaderObjectARB(GL_VERTEX_SHADER);
        glShaderSourceARB(shader, 1, &ptr, NULL);
        glCompileShaderARB(shader);
        GLint result = 0;
        glGetObjectParameterivARB(shader, GL_OBJECT_COMPILE_STATUS_ARB, &result);
        if(result != GL_TRUE) {
            GLsizei length = 0;
            glGetInfoLogARB(shader, kBufferSize-1,
                &length, buffer);
            fprintf(stderr, "%s: GLSL error\n%s\n", filename.c_str(), buffer);
            assert(false);
        }
        glAttachObjectARB(programid, shader);
        glLinkProgramARB(programid);
    }
#endif
}

void STShaderProgram::LoadFragmentShader(const std::string& filename)
{
    std::ifstream in(filename.c_str());
    if(!in) {
      fprintf(stderr, "Failed to open shader file '%s'\n", filename.c_str());
        assert(false);
        return;
    }
    std::stringstream ss;
    ss << in.rdbuf();
    
    std::string str = ss.str();
    const char* ptr = str.c_str();

    // Buffer for error messages
    static const int kBufferSize = 1024;
    char buffer[1024];

    if(GLEW_VERSION_2_0)
    {
        GLuint shader = glCreateShader(GL_FRAGMENT_SHADER);
        glShaderSource(shader, 1, &ptr, NULL);
        glCompileShader(shader);
        GLint result = 0;
        glGetShaderiv(shader, GL_COMPILE_STATUS, &result);
        if(result != GL_TRUE) {
            GLsizei length = 0;
            glGetShaderInfoLog(shader, kBufferSize-1,
                &length, buffer);
            fprintf(stderr, "%s: GLSL error\n%s\n", filename.c_str(), buffer);
            assert(false);
        }
        glAttachShader(programid, shader);
        glLinkProgram(programid);
    }
#ifndef __APPLE__
    else
    {
        GLuint shader = glCreateShaderObjectARB(GL_FRAGMENT_SHADER);
        glShaderSourceARB(shader, 1, &ptr, NULL);
        glCompileShaderARB(shader);
        GLint result = 0;
        glGetObjectParameterivARB(shader, GL_OBJECT_COMPILE_STATUS_ARB, &result);
        if(result != GL_TRUE) {
            GLsizei length = 0;
            glGetInfoLogARB(shader, kBufferSize-1,
                &length, buffer);
            fprintf(stderr, "%s: GLSL error\n%s\n", filename.c_str(), buffer);
            assert(false);
        }
        glAttachObjectARB(programid, shader);
        glLinkProgramARB(programid);
    }
#endif
}


/* Bind the program as the current program. */
void STShaderProgram::Bind() {
    if(GLEW_VERSION_2_0)
        glUseProgram(programid);    
#ifndef __APPLE__
    else
        glUseProgramObjectARB(programid);
#endif

    for (unsigned int i = 0; i < textures.size(); i++) {
        if (GLEW_VERSION_2_0)
            glUniform1i(textures[i].location, textures[i].tex_id);
#ifndef __APPLE__
        else
            glUniform1iARB(textures[i].location, textures[i].tex_id);
#endif
    }
}

/* Un-bind the program. */
void STShaderProgram::UnBind() {
    if(GLEW_VERSION_2_0)
        glUseProgram(0);
    else
        glUseProgramObjectARB(0);
}

void STShaderProgram::SetTexture(const std::string& name, int tex_index) {
    GLint location = glGetUniformLocation(programid, name.c_str());
    UnboundTexture tex;
    tex.location = location;
    tex.tex_id   = tex_index;
    textures.push_back(tex);
}

// Set a uniform global parameter of the program by name.
void STShaderProgram::SetUniform(const std::string& name, float value)
{
    GLint location = GetUniformLocation(name);
    if(GLEW_VERSION_2_0) {
        glUniform1f(location, value);
    }
    else {
        glUniform1fARB(location, value);
    }
}

// Set a uniform global parameter of the program by name.
void STShaderProgram::SetUniform(const std::string& name, float v0, float v1)
{
    GLint location = GetUniformLocation(name);
    if(GLEW_VERSION_2_0) {
        glUniform2f(location, v0, v1);
    }
    else {
        glUniform2fARB(location, v0, v1);
    }
}

// Set a uniform global parameter of the program by name.
void STShaderProgram::SetUniform(const std::string& name,
                                 float v0, float v1, float v2)
{
    GLint location = GetUniformLocation(name);
    if(GLEW_VERSION_2_0) {
        glUniform3f(location, v0, v1, v2);
    }
    else {
        glUniform3fARB(location, v0, v1, v2);
    }
}

// Set a uniform global parameter of the program by name.
void STShaderProgram::SetUniform(const std::string& name,
                                 float v0, float v1, float v2, float v3)
{
    GLint location = GetUniformLocation(name);
    if(GLEW_VERSION_2_0) {
        glUniform4f(location, v0, v1, v2, v3);
    }
    else {
        glUniform4fARB(location, v0, v1, v2, v3);
    }
}

// Set a uniform global parameter of the program by name.
void STShaderProgram::SetUniform(const std::string& name, const STVector2& value)
{
    SetUniform(name, value.x, value.y);
}

// Set a uniform global parameter of the program by name.
void STShaderProgram::SetUniform(const std::string& name, const STVector3& value)
{
    SetUniform(name, value.x, value.y, value.z);
}

// Set a uniform global parameter of the program by name.
void STShaderProgram::SetUniform(const std::string& name, const STColor3f& value)
{
    SetUniform(name, value.r, value.g, value.b);
}

// Set a uniform global parameter of the program by name.
void STShaderProgram::SetUniform(const std::string& name, const STColor4f& value)
{
    SetUniform(name, value.r, value.g, value.b, value.a);
}

// Helper routine - get the location for a uniform shader parameter.
GLint STShaderProgram::GetUniformLocation(const std::string& name)
{
    if(GLEW_VERSION_2_0) {
        return glGetUniformLocation(programid, name.c_str());
    }
#ifndef __APPLE__
    else {
        return glGetUniformLocationARB(programid, name.c_str());
    }
#endif
}
