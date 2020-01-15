////////////////////////////////////////////////////////////
// Final Project
// CustomMaterial.h
////////////////////////////////////////////////////////////
// Slork 2012
// Mayank Sanganeria, Jiffer Harriman, Hunter McCurry
////////////////////////////////////////////////////////////


#ifndef CUSTOM_MATERIAL_H
#define CUSTOM_MATERIAL_H

class CustomMaterial {

public:
    CustomMaterial() {
        diff_color[0] = diff_color[1] = diff_color[2] = .25;
        spec_color[0] = spec_color[1] = spec_color[2] = .15;
        amb_color[0] = amb_color[1] = amb_color[2] = .25;
        
        diff_color[3] = spec_color[3] = amb_color[3] = 1.0;
        
        shiny = 40.0;
    }
	
	void CopyFrom(const CustomMaterial& mat) {
		for (int i = 0; i < 4; i++) {
			diff_color[i] = mat.diff_color[i];
        	spec_color[i] = mat.spec_color[i];
        	amb_color[i] = mat.amb_color[i];
		}
		shiny = mat.shiny;
	}
	
    GLfloat diff_color[4];
    GLfloat spec_color[4];
    GLfloat amb_color[4];
    GLfloat shiny;
};

#endif
