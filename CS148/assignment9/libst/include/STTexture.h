// STTexture.h
#ifndef __STTEXTURE_H__
#define __STTEXTURE_H__

#include "stgl.h"
#include "STImage.h"

/**
* The STTexture class allows use of an STImage as an OpenGL texture.
* In the simplest case, just construct a new STTexture with an image:
*
*   STTexture* texture = new STTexture(image);
*
* You can also change the image used by an STTexture at any time by
* using the LoadImageData() method:
*
*   texture->LoadImageData(someOtherImage);
*
* To use an STTexture for OpenGL rendering, you should call Bind()
* before rendering with the texture, and UnBind() after you are done.
*
*   texture->Bind();
*   // do OpenGL rendering
*   texture->UnBind();
*
* You must remember not to create any STTextures until you have
* initialized OpenGL.
*/
class STTexture
{
public:
    //
    // Options when loading an image to an STTexture. Use the
    // kGenerateMipmaps option to use OpenGL to generate mipmaps -
    // downsampled images used to improve the quality of texture
    // filtering.
    //
    enum ImageOptions {
        kNone = 0,
        kGenerateMipmaps = 0x1,
    };

    //
    // Create a new STTexture using the pixel data from the given
    // image (which will be copied in). Use the options to specify
    // whether mipmaps should be generated.
    //
    STTexture(const STImage* image,
              ImageOptions options = kGenerateMipmaps);

    //
    // Create an "empty" STTexture with no image data. You will need
    // to load an image before you can use this texture for
    // rendering.
    //
    STTexture();

    //
    // Delete an existing STTexture.
    //
    ~STTexture();

    //
    // Load image data into the STTexture. The texture will be
    // resized to match the image as needed. Use the options
    // to specify whether mipmaps should be generated.
    //
    void LoadImageData(const STImage* image,
                       ImageOptions options = kGenerateMipmaps);

    //
    // Bind this texture for use in subsequent OpenGL drawing.
    //
    void Bind();

    //
    // Un-bind this texture and return to untextured drawing.
    //
    void UnBind();

    //
    // Set the OpenGL texture-filtering mode to use for texture
    // magnification and minification respectively.
    // For example:
    //      SetFilter(GL_LINEAR,
    //                GL_LINEAR_MIPMAP_LINEAR);
    //
    void SetFilter(GLint magFilter, GLint minFilter);

    //
    // Set the OpenGL mode to use for texture addressing in
    // the S and T dimensions respectively.
    // For example:
    //      SetWrap(GL_REPEAT, GL_REPEAT);
    //
    void SetWrap(GLint wrapS, GLint wrapT);

    //
    // Get the width (in pixels) of the image.
    //
    int GetWidth() const { return mWidth; }

    //
    // Get the height (in pixels) of the image.
    //
    int GetHeight() const { return mHeight; }

private:
    // Common initialization code, used by all constructors.
    void Initialize();

    // The OpenGL texture id.
    GLuint mTexId;

    // The width and height of the image data.
    int mWidth;
    int mHeight;
};

#endif // __STTEXTURE_H__
