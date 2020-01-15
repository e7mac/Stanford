////////////////////////////////////////////////////////////
// Final Project
// MultiSampleRenderTarget.cpp
////////////////////////////////////////////////////////////
// Slork 2012
// Mayank Sanganeria, Jiffer Harriman, Hunter McCurry
////////////////////////////////////////////////////////////


#include "MultiSampleRenderTarget.h"
#include <stdexcept>

MultiSampleRenderTarget::MultiSampleRenderTarget(unsigned int width, unsigned int height) {
    width_ = width;
    height_ = height;    
    
    // create a texture object
    glGenTextures(1, &textureID_);
    glBindTexture(GL_TEXTURE_2D, textureID_);
    glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    //glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR_MIPMAP_LINEAR);
    //glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP);
    //glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP);
    glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_2D, GL_GENERATE_MIPMAP, GL_TRUE); // automatic mipmap generation included in OpenGL v1.4
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA8, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, 0);
    glBindTexture(GL_TEXTURE_2D, 0); // rebind default texture?
    
    
    // create a framebuffer object, you need to delete them when program exits.
    glGenFramebuffersEXT(1, &frameBufferID_);
    glBindFramebufferEXT(GL_FRAMEBUFFER_EXT, frameBufferID_);
    
    // create a renderbuffer object to store depth info
    // NOTE: A depth renderable image should be attached the FBO for depth test.
    // If we don't attach a depth renderable image to the FBO, then
    // the rendering output will be corrupted because of missing depth test.
    // If you also need stencil test for your rendering, then you must
    // attach additional image to the stencil attachement point, too.
    glGenRenderbuffersEXT(1, &depthBufferID_);
    glBindRenderbufferEXT(GL_RENDERBUFFER_EXT, depthBufferID_);
    glRenderbufferStorageEXT(GL_RENDERBUFFER_EXT, GL_DEPTH_COMPONENT, width, height);
    glBindRenderbufferEXT(GL_RENDERBUFFER_EXT, 0);
    
    // attach a texture to FBO color attachement point
    glFramebufferTexture2DEXT(GL_FRAMEBUFFER_EXT, GL_COLOR_ATTACHMENT0_EXT, GL_TEXTURE_2D, textureID_, 0);
    
    // attach a renderbuffer to depth attachment point
    glFramebufferRenderbufferEXT(GL_FRAMEBUFFER_EXT, GL_DEPTH_ATTACHMENT_EXT, GL_RENDERBUFFER_EXT, depthBufferID_);
    
    //@ disable color buffer if you don't attach any color buffer image,
    //@ for example, rendering depth buffer only to a texture.
    //@ Otherwise, glCheckFramebufferStatusEXT will not be complete.
    //glDrawBuffer(GL_NONE);
    //glReadBuffer(GL_NONE);
    
    // check FBO status
    bool status = checkFramebufferStatus();
    if(!status) {
        throw std::runtime_error("Invalid framebuffer configuration");
        exit(-1);
    }
    
    glBindFramebufferEXT(GL_FRAMEBUFFER_EXT, 0);
}


MultiSampleRenderTarget::~MultiSampleRenderTarget() {
    glDeleteFramebuffersEXT(1, &frameBufferID_);
    //glDeleteRenderbuffersEXT(1, &depthBufferID_);
    glDeleteTextures(1, &textureID_);
}


bool MultiSampleRenderTarget::checkFramebufferStatus() {
    // check FBO status
    GLenum status = glCheckFramebufferStatusEXT(GL_FRAMEBUFFER_EXT);
    switch(status)
    {
        case GL_FRAMEBUFFER_COMPLETE_EXT:
            std::cout << "Framebuffer complete." << std::endl;
            return true;
            
        case GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT_EXT:
            std::cout << "[ERROR] Framebuffer incomplete: Attachment is NOT complete." << std::endl;
            return false;
            
        case GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT_EXT:
            std::cout << "[ERROR] Framebuffer incomplete: No image is attached to FBO." << std::endl;
            return false;
            
        case GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS_EXT:
            std::cout << "[ERROR] Framebuffer incomplete: Attached images have different dimensions." << std::endl;
            return false;
            
        case GL_FRAMEBUFFER_INCOMPLETE_FORMATS_EXT:
            std::cout << "[ERROR] Framebuffer incomplete: Color attached images have different internal formats." << std::endl;
            return false;
            
        case GL_FRAMEBUFFER_INCOMPLETE_DRAW_BUFFER_EXT:
            std::cout << "[ERROR] Framebuffer incomplete: Draw buffer." << std::endl;
            return false;
            
        case GL_FRAMEBUFFER_INCOMPLETE_READ_BUFFER_EXT:
            std::cout << "[ERROR] Framebuffer incomplete: Read buffer." << std::endl;
            return false;
            
        case GL_FRAMEBUFFER_UNSUPPORTED_EXT:
            std::cout << "[ERROR] Unsupported by FBO implementation." << std::endl;
            return false;
            
        default:
            std::cout << "[ERROR] Unknow error." << std::endl;
            return false;
    }
}

GLuint MultiSampleRenderTarget::textureID() const {
    return textureID_;
}

void MultiSampleRenderTarget::bind() {
    glPushAttrib(GL_VIEWPORT_BIT);
    glBindFramebufferEXT(GL_FRAMEBUFFER_EXT, frameBufferID_);
    glViewport(0, 0, width_, height_);
    //glDrawBuffer(GL_NONE);
}

void MultiSampleRenderTarget::unbind() {
    glBindFramebufferEXT(GL_FRAMEBUFFER_EXT, 0);
    glPopAttrib();
}

GLuint MultiSampleRenderTarget::fboID() const {
    return frameBufferID_;
}

