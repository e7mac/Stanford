// displacement.vert

/*
 This GLSL vertex shader performs displacement mapping
 using an analytical displacement function.
 */

// This 'varying' vertex output can be read as an input
// by a fragment shader that makes the same declaration.
varying vec2 texPos;
varying vec3 modelPos;
varying vec3 lightSource;
varying vec3 normal;

varying float displacement;
uniform float time;


float h(float x, float y)
{
    float r = 1.5*(pow(x,2.0) + pow(y,2.0));
    float phase = time + 185.0 * r;
    float radialWave = 0.01*cos(2.0*phase)*exp(-25.0*r);
    float crossWave = 0.0;//0.002*sin(x*y*150.0-time);
    float transverseWave = 0.005*sin(0.5*time+10.0*x);
    float bump = 0.02*cos(time+y)*x;
    return radialWave + crossWave + transverseWave + bump;
}


void main()
{
    // Tell the fragment shader we have done vertex displacement
    displacement = 1.0;
    
	normal = gl_Normal.xyz;
	modelPos = gl_Vertex.xyz;

    // Copy the standard OpenGL texture coordinate to the output.
    texPos = gl_MultiTexCoord0.xy;
    
	/* CS 148 TODO: Modify 'modelPos' and 'normal' using your displacment function */
    float delta = 0.001;
    
    float pi = 3.14159;
    float s = 0.2;
    float a = 5.0;
    vec2 origin = (texPos - 0.5)*0.8;
    float h = h(origin.x,origin.y);
    modelPos.y = h;
    
    //recompute normals

    float dhdu = (h(origin.x+delta,origin.y)  - h )/delta ;
    float dhdv = (h(origin.x,origin.y+delta) - h )/delta ;

    vec3 t1 = normalize(vec3(1.0,dhdu,0.0));
    vec3 t2 = normalize(vec3(0.0,-dhdv,-1.0));
    normal = cross(t1,t2);
    
    // Render the shape using modified position.
    gl_Position = gl_ProjectionMatrix * gl_ModelViewMatrix *  vec4(modelPos,1);
    
    // we may need this in the fragment shader...
    modelPos = (gl_ModelViewMatrix * vec4(modelPos,1)).xyz;
    
	// send the normal to the fragment shader
	normal = (gl_NormalMatrix * normal);
    
    // pass the light source position to the fragment shader
    lightSource = gl_LightSource[0].position.xyz;
}
