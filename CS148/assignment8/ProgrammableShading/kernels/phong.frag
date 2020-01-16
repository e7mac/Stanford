// phong.frag

/*
  This fragment implements the Phong Reflection model.
*/

// The input image we will be filtering in this kernel.
uniform sampler2D normalTex;

varying vec3 modelPos;    // fragment position in model space
varying vec2 texPos;      // fragment position in texture space
varying vec3 lightSource; // light source position in model space
varying vec3 normal;	  // fragment normal in model space

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

    vec3 ambientColor  = gl_LightSource[0].ambient.xyz;
    vec3 diffuseColor  = gl_LightSource[0].diffuse.xyz;
    vec3 specularColor = gl_LightSource[0].specular.xyz;

    vec3 materialColor = gl_FrontMaterial.ambient.xyz;
    vec3 materialSpec  = gl_FrontMaterial.specular.xyz;
    vec3 materialDiffuse = gl_FrontMaterial.diffuse.xyz;
    float shininess    = gl_FrontMaterial.shininess;

	/* CS 148 TODO: Implement the Phong reflectance model here */
    
    vec3 L = lightSource - modelPos;
    vec3 R = reflect(L,N);
    vec3 V = C - modelPos;
    
    //normalize
    N = normalize(N);
    L = normalize(L);
    R = normalize(R);
    V = -normalize(V);
    
    float dotLN = max(0.0,dot(L,N));
    float dotRV = max(0.0,dot(R,V));
    
    vec3 ambient = materialColor * ambientColor;
    vec3 diffuse = (dotLN)*(materialDiffuse * diffuseColor);
    vec3 specular = pow((dotRV),shininess)*(materialSpec * specularColor);
    vec3 finalColor = ambient + specular + diffuse;
    
    gl_FragColor = vec4(finalColor, 1.0);
}
