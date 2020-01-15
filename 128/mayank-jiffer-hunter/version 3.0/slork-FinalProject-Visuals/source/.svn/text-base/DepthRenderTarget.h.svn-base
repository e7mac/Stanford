////////////////////////////////////////////////////////////
// Final Project
// DepthRenderTarget.h
////////////////////////////////////////////////////////////
// Slork 2012
// Mayank Sanganeria, Jiffer Harriman, Hunter McCurry
////////////////////////////////////////////////////////////


#ifndef DEPTH_RENDER_TARGET_H
#define DEPTH_RENDER_TARGET_H

#include "Framework.h"

class DepthRenderTarget {
public:
    /**
     * Creates a new depth render target, for render to texture.  When this
     * target is bound using the bind() method, all OpenGL rendering is
     * directed into the texture.  The texture can be obtained by calling
     * the textureID() function.
     */
    DepthRenderTarget(unsigned int width, unsigned int height);

    /**
     * Releases the texture and the underlying framebuffer object.
     */
    ~DepthRenderTarget();

    /**
     * Binds this target to the OpenGL pipeline, so that all colors are
     * output to the texture.
     */
    void bind();

    /**
     * Restores the original OpenGL framebuffer.
     */
    void unbind();

    /**
     * Returns the texture that was used for render-depth-to-texture.  This
     * texture will contain the contents of the depth buffer.
     */
    GLuint textureID() const;

private:
    GLuint textureID_;
    GLuint frameBufferID_;
    GLuint depthBufferID_;
    GLuint width_;
    GLuint height_;

};

#endif

