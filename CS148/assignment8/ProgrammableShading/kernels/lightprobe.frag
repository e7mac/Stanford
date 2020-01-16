// lightprobe.frag

/*
  This fragment simulates a mirrorlike surface and uses
  spherical reflection mapping to color the surface.
 */

// Get the image-space position generated in the vertex program.

// The input image we will be filtering in this kernel.
uniform sampler2D normalTex;
uniform sampler2D envMapTex;

varying vec3 modelPos;
varying vec2 texPos;
varying vec3 normal;

varying float displacement;

void main()
{
	// Sample from the normal map, if we're not doing displacement mapping
    vec3 N;
	if (displacement < 0.0)
		N = 2.*texture2D(normalTex, texPos).xyz - 1.;
	else
		N = normal;

	vec3 C = vec3(0.0, 0.0, 0.0); // camera position

	/* CS 148 TODO: Implement environment mapping here */
    
    vec2 newTex = 0.5 + normalize(N).xy/2.0;
    gl_FragColor = texture2D(envMapTex, newTex);
}
