// default.vert

uniform float teapot;
/*
  This simple GLSL vertex shader does exactly what 
  OpenGL would do -- It transforms the vertex positions
  using the default OpenGL transformation. It also passes
  through the texture coordinate, normal coordinate, and some
  other good stuff so we can use them in the fragment shader.
*/

// This 'varying' vertex output can be read as an input
// by a fragment shader that makes the same declaration.
varying vec2 texPos;
varying vec3 modelPos;
varying vec3 lightSource;
varying vec3 normal;

varying float displacement;

void main()
{
    // Let the fragment shader know that we are not doing displacement here.
    // We also do not want to use the normal map if we draw the teapot.
    if (teapot > 0.) { displacement = 1.; } else
    { displacement = -1.0; }

    // Render the shape using standard OpenGL position transforms.
    gl_Position = ftransform();

    // Copy the standard OpenGL texture coordinate to the output.
    texPos = gl_MultiTexCoord0.xy;

    // we may need this in the fragment shader...
    modelPos = (gl_ModelViewMatrix * gl_Vertex).xyz;

	// send the normal to the fragment shader
	normal = (gl_NormalMatrix * gl_Normal).xyz;

    // pass the light source position to the fragment shader
    lightSource = gl_LightSource[0].position.xyz;
}
