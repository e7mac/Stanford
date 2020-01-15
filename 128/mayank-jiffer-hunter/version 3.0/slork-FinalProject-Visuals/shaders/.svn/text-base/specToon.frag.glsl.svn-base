
// Diffuse, ambient, and specular materials.  These are also uniform.
uniform vec3 Kd;
uniform vec3 Ks;
uniform vec3 Ka;
uniform float alpha;

// These are values that OpenGL interpoates for us.  Note that some of these
// are repeated from the fragment shader.  That's because they're passed
// across.
varying vec3 normal;
varying vec3 eyePosition;

float ToonDiffuse(in float val) {
    float stretch = floor(val * 5.9);
    float squash = stretch / 5.0;
    return squash;
}

float ToonSpecular(in float val) {
    float stretch = floor(val * 1.09);
    float squash = stretch / 1.0;
    return squash;
}

void main() {

	// Normalize the normal, and calculate light vector and view vector
	// Note: this is doing a directional light, which is a little different
	// from what you did in Assignment 2.
	vec3 N = normalize(normal);
	vec3 L = normalize(gl_LightSource[0].position.xyz);
	vec3 V = normalize(-eyePosition);
		
	// Calculate the diffuse color coefficient
    //float Rd = ToonDiffuse(max(0.0, dot(L, N)));
    float Rd = max(0.0, dot(L, N));
    vec3 diffuse = Rd * Kd * gl_LightSource[0].diffuse.rgb;
	
	// Calculate the specular coefficient
	vec3 R = reflect(-L, N);
    float Rs = pow(ToonSpecular(max(0.0, dot(V, R))), alpha);
    //float Rs = pow(max(0.0, dot(V, R)), alpha);
    vec3 specular = Rs * Ks * gl_LightSource[0].specular.rgb;
		
	// Ambient is easy
	vec3 ambient = Ka * gl_LightSource[0].ambient.rgb;

	// This actually writes to the frame buffer
	gl_FragColor = vec4(diffuse + specular + ambient, 1);
    //gl_FragColor = vec4(ambient, 1);
    //gl_FragColor = vec4(normal.x, normal.y, normal.z, 1);
}
