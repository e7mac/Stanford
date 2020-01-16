// STShaderProgram.h
#ifndef __STSHADERPROGRAM_H__
#define __STSHADERPROGRAM_H__

#include "stgl.h"
#include <string>

// Forward-declare libst types.
#include "stForward.h"

/**
* STShaderProgram - class to use GLSL programs.
* Call LoadVertexShader and UploadFragmentShader
* to add shaders to the program. Call Bind() to begin
* using the shader and UnBind() to stop using it.
*/

class STShaderProgram {
public:
    STShaderProgram();
    ~STShaderProgram();

    //
    //    You need to add at least one vertex shader and one fragment shader. You can add multiple shaders
    //    of each type as long as only one of them has a main() function.
    //
    void LoadVertexShader(const std::string& filename);
    void LoadFragmentShader(const std::string& filename);

    void Bind();
    void UnBind();

    //
    // Set a uniform global parameter of the program by name.
    //
    void SetUniform(const std::string& name, float value);
    void SetUniform(const std::string& name, float v0, float v1);
    void SetUniform(const std::string& name, float v0, float v1, float v2);
    void SetUniform(const std::string& name, float v0, float v1, float v2, float v3);

    void SetUniform(const std::string& name, const STVector2& value);
    void SetUniform(const std::string& name, const STVector3& value);
    void SetUniform(const std::string& name, const STColor3f& value);
    void SetUniform(const std::string& name, const STColor4f& value);

private:
    //
    // Helper routine - get the location for a uniform shader parameter.
    //
    GLint GetUniformLocation(const std::string& name);

    // OpenGL program object id.
    unsigned int programid;
};


#endif //__STSHADERPROGRAM_H__
