// This is a texture sampler.  It lets you sample textures!  The keyword
// "uniform" means constant - sort of.  The uniform variables are the same
// for all fragments in an object, but they can change in between objects.
uniform sampler2D bigTexture;

uniform vec2 targetRes;
uniform float downAmount;
uniform vec2 randomInc;

// These are values that OpenGL interpoates for us.  Note that some of these
// are repeated from the fragment shader.  That's because they're passed
// across.
varying vec2 texcoord;
varying vec3 eyePosition;

// should be from -1.0 to 1.0
float rand(vec2 co){
    return (1.0 - fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453));
}

float raisedCos(in float val){
    return 1.0 - pow( ((cos(val * 2.0 * 3.14159) + 1.0)/2.0), 1.0);
}

void main() {
    
    vec3 total = vec3(0., 0., 0.);
        
    int down = int(downAmount);
    
    int width = int(targetRes.x);
    int height = int(targetRes.y);
    
    vec2 pixelSize = 1.0 / targetRes;
    
    float x_subpix_inc = 1.0 / (targetRes.x * downAmount);
    float y_subpix_inc = 1.0 / (targetRes.y * downAmount);
    
    for (int i=0; i < down; i++) {
        for (int j=0; j < down; j++) {
        
            vec2 pure_sample_loc = vec2(texcoord.x + float(i)*x_subpix_inc, texcoord.y + float(j)*y_subpix_inc);
			
            float rand1 = rand(vec2(pure_sample_loc.x, texcoord.y + randomInc.y ));
            float rand2 = rand(vec2(texcoord.x + randomInc.x , pure_sample_loc.y));
            
            float randScale = 3.0;
            float x_fuzz = randScale; // * raisedCos(texcoord.x);
            float y_fuzz = randScale; // * raisedCos(texcoord.y);
            
            vec2 pseudo_sample_loc = pure_sample_loc + vec2(x_fuzz*pixelSize.x*rand1, y_fuzz*pixelSize.y*rand2);
            
            //vec2 pseudo_sample_loc = vec2(texcoord.x + x_fuzz*pixelSize.x*rand1, texcoord.y + y_fuzz*pixelSize.y*rand2);
            
            total += texture2D(bigTexture, pseudo_sample_loc).rgb;
            //total += texture2D(bigTexture, pure_sample_loc).rgb;
            
        }
    }
    
    total = total / (floor(downAmount) * floor(downAmount));
    
    //float red = (rand(texcoord) + 1.0) / 2.0;
    
    //gl_FragColor = vec4(red, 0, 0, 1);
    gl_FragColor = vec4(total.r, total.g, total.b, 1);
}
