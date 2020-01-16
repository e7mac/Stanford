// STTexture.cpp
#include "STTexture.h"

#include "st.h"
#include "stgl.h"

//

// Create an "empty" STTexture with no image data. You will need
// to load an image before you can use this texture for
// rendering.
STTexture::STTexture()
    : mWidth(-1)
    , mHeight(-1)
{
    Initialize();
}

// Create a new STTexture using the pixel data from the given
// image (which will be copied in). Use the options to specify
// whether mip maps should be generated.
STTexture::STTexture(
    const STImage* image,
    ImageOptions options)
    : mWidth(-1)
    , mHeight(-1)
{
    Initialize();
    LoadImageData(image, options);
}

// Common initialization code, used by all constructors.
void STTexture::Initialize()
{
    mTexId = 0;
    glGenTextures(1, &mTexId);

    // Default filtering and addressing options:
    SetFilter(GL_LINEAR, GL_LINEAR);
    SetWrap(GL_CLAMP, GL_CLAMP);
}


// Delete an existing STTexture.
STTexture::~STTexture()
{
    glDeleteTextures(1, &mTexId);
}

// Load image data into the STTexture. The texture will be
// resized to match the image as needed. Use the options
// to specify whether mip maps should be generated.
void STTexture::LoadImageData(const STImage* image,
                              ImageOptions options)
{
    Bind();

    int width = image->GetWidth();
    int height = image->GetHeight();
    mWidth = width;
    mHeight = height;
    const STColor4ub* pixels = image->GetPixels();

    if (options & kGenerateMipmaps) {
        gluBuild2DMipmaps(GL_TEXTURE_2D, GL_RGBA,
                          width, height,
                          GL_RGBA, GL_UNSIGNED_BYTE, pixels);
    }
    else {
        glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA,
                     width, height, 0,
                     GL_RGBA, GL_UNSIGNED_BYTE, pixels);
    }
    UnBind();
}

// Bind this texture for use in subsequent OpenGL drawing.
void STTexture::Bind()
{
    glEnable(GL_TEXTURE_2D);
    glBindTexture(GL_TEXTURE_2D, mTexId);
}

// Un-bind this texture and return to untextured drawing.
void STTexture::UnBind()
{
    glBindTexture(GL_TEXTURE_2D, 0);
    glDisable(GL_TEXTURE_2D);
}

// Set the OpenGL texture-filtering mode to use for texture
// magnification and minification respectively.
void STTexture::SetFilter(GLint magFilter, GLint minFilter)
{
    Bind();
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, magFilter);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, minFilter);
    UnBind();
}

// Set the OpenGL mode to use for texture addressing in
// the S and T dimensions respectively.
void STTexture::SetWrap(GLint wrapS, GLint wrapT)
{
    Bind();
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, wrapS);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, wrapT);
    UnBind();
}
