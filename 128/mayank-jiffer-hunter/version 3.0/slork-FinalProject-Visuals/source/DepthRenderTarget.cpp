////////////////////////////////////////////////////////////
// Final Project
// DepthRenderTarget.cpp
////////////////////////////////////////////////////////////
// Slork 2012
// Mayank Sanganeria, Jiffer Harriman, Hunter McCurry
////////////////////////////////////////////////////////////


#include "DepthRenderTarget.h"
#include <stdexcept>

DepthRenderTarget::DepthRenderTarget(unsigned int width, unsigned int height) {
    width_ = width;
    height_ = height;

    // Initialize the texture, including filtering options
    glGenTextures(1, &textureID_);
    glBindTexture(GL_TEXTURE_2D, textureID_);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    glTexImage2D(
        GL_TEXTURE_2D, 
        0, 
        GL_DEPTH_COMPONENT, 
        width_, 
        height_, 
        0, 
        GL_DEPTH_COMPONENT, 
        GL_UNSIGNED_BYTE, 
        0);

    // Generate a framebuffer
    glGenFramebuffersEXT(1, &frameBufferID_);
    glBindFramebufferEXT(GL_FRAMEBUFFER_EXT, frameBufferID_);

    // Attach the texture to the frame buffer
    glFramebufferTexture2DEXT(
        GL_FRAMEBUFFER_EXT,
        GL_DEPTH_ATTACHMENT_EXT,
        GL_TEXTURE_2D,
        textureID_,
        0);

    // Check the status of the FBO
    glDrawBuffer(GL_NONE);
    glReadBuffer(GL_NONE);
    if (GL_FRAMEBUFFER_COMPLETE != glCheckFramebufferStatusEXT(GL_FRAMEBUFFER_EXT)) {
        throw std::runtime_error("Invalid framebuffer configuration");
    }
//    glDrawBuffer(GL_BACK);
    glBindFramebufferEXT(GL_FRAMEBUFFER_EXT, 0);
    glBindTexture(GL_TEXTURE_2D, 0);
}

DepthRenderTarget::~DepthRenderTarget() {
    glDeleteFramebuffersEXT(1, &frameBufferID_);
    glDeleteRenderbuffersEXT(1, &depthBufferID_);
    glDeleteTextures(1, &textureID_);
}

GLuint DepthRenderTarget::textureID() const {
    return textureID_;
}

void DepthRenderTarget::bind() {
    glPushAttrib(GL_VIEWPORT_BIT);
    glBindFramebufferEXT(GL_FRAMEBUFFER_EXT, frameBufferID_);
    glDrawBuffer(GL_NONE);
//    glReadBuffer(GL_NONE);
    glViewport(0, 0, width_, height_);
}

void DepthRenderTarget::unbind() {
    glBindFramebufferEXT(GL_FRAMEBUFFER_EXT, 0);
    glDrawBuffer(GL_BACK);
    glPopAttrib();
}
