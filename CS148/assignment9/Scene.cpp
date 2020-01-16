#include "Scene.h"
#include <fstream>
#include <sstream>

#include "Camera.h"
#include "ImagePlane.h"
#include "Ray.h"
#include "Shape.h"
#include "Intersection.h"
#include "Material.h"
#include "SceneObject.h"
#include "Light.h"
#include "AmbientLight.h"
#include "PointLight.h"
#include "DirectionalLight.h"


Scene::Scene(std::string sceneFilename)
{
	Parse(sceneFilename);
    currentMatrix = STTransform4::Identity();
}

void Scene::Parse(std::string sceneFilename)
{
	BeganParsing();

	std::ifstream sceneFile(sceneFilename.c_str());

	// Die if we couldn't find the file
	if (sceneFile.fail())
	{
		printf("Scene::Parse - Could not find input scene file '%s'\n", sceneFilename.c_str());
		exit(1);
	}

	char line[1024];
	while (!sceneFile.eof())
	{
		sceneFile.getline(line, 1023);
		std::stringstream ss;
		ss.str(line);
		std::string command;
		ss >> command;

		if (command == "Camera")
		{
			float ex, ey, ez, ux, uy, uz, lx, ly, lz, f, a;
			ss >> ex >> ey >> ez >> ux >> uy >> uz >> lx >> ly >> lz >> f >> a;
			STPoint3 eye(ex, ey, ez);
			STVector3 up(ux, uy, uz);
			STPoint3 lookAt(lx, ly, lz);
			ParsedCamera(eye, up, lookAt, f, a);
		}
		else
		if (command == "Output")
		{
			int w, h;
			std::string fname;
			ss >> w >> h >> fname;
			ParsedOutput(w, h, fname);
		}
		else
		if (command == "BounceDepth")
		{
			int depth;
			ss >> depth;
			ParsedBounceDepth(depth);
		}
		else if (command == "ShadowBias")
		{
			float bias;
			ss >> bias;
			ParsedShadowBias(bias);
		}
		else
		if (command == "PushMatrix")
		{
			ParsedPushMatrix();
		}
		else
		if (command == "PopMatrix")
		{
			ParsedPopMatrix();
		}
		else
		if (command == "Rotate")
		{
			float rx, ry, rz;
			ss >> rx >> ry >> rz;
			ParsedRotate(rx, ry, rz);
		}
		else
		if (command == "Scale")
		{
			float sx, sy, sz;
			ss >> sx >> sy >> sz;
			ParsedScale(sx, sy, sz);
		}
		else
		if (command == "Translate")
		{
			float tx, ty, tz;
			ss >> tx >> ty >> tz;
			ParsedTranslate(tx, ty, tz);
		}
		else
		if (command == "Sphere")
		{
			float cx, cy, cz, r;
			ss >> cx >> cy >> cz >> r;
			STPoint3 center(cx, cy, cz);
			ParsedSphere(center, r);
		}
		else
		if (command == "Triangle")
		{
			float x1, y1, z1, x2, y2, z2, x3, y3, z3;
			ss >> x1 >> y1 >> z1 >> x2 >> y2 >> z2 >> x3 >> y3 >> z3;
			STPoint3 v[3];
			v[0] = STPoint3(x1, y1, z1);
			v[1] = STPoint3(x2, y2, z2);
			v[2] = STPoint3(x3, y3, z3);
			ParsedTriangle(v[0], v[1], v[2]);
		}
		else
		if (command == "AmbientLight")
		{
			float r, g, b;
			ss >> r >> g >> b;
			STColor3f col(r, g, b);
			ParsedAmbientLight(col);
		}
		else
		if (command == "PointLight")
		{
			float px, py, pz, r, g, b;
			ss >> px >> py >> pz >> r >> g >> b;
			STPoint3 pos(px, py, pz);
			STColor3f col(r, g, b);
			ParsedPointLight(pos, col);
		}
		else
		if (command == "DirectionalLight")
		{
			float dx, dy, dz, r, g, b;
			ss >> dx >> dy >> dz >> r >> g >> b;
			STVector3 dir(dx, dy, dz);
			STColor3f col(r, g, b);
			ParsedDirectionalLight(dir, col);
		}
		else
		if (command == "Material")
		{
			float ra, ga, ba, rd, gd, bd, rs, gs, bs, rr, gr, br, shine;
			ss >> ra >> ga >> ba >> rd >> gd >> bd >> rs >> gs >> bs >> rr >> gr >> br >> shine;
			STColor3f amb(ra, ga, ba);
			STColor3f diff(rd, gd, bd);
			STColor3f spec(rs, gs, bs);
			STColor3f mirr(rr, gr, br);
			ParsedMaterial(amb, diff, spec, mirr, shine);
		}
	}
	sceneFile.close();

	FinishedParsing();
}

void Scene::BeganParsing()
{
//	/** CS 148 TODO: Fill this in **/
}

void Scene::FinishedParsing()
{
//	/** CS 148 TODO: Fill this in **/
}


void Scene::ParsedCamera(const STPoint3& eye, const STVector3& up, const STPoint3& lookAt, float fovy, float aspect)
{
    camera = new Camera(eye, up, lookAt, fovy, aspect);
}

void Scene::ParsedOutput(int imgWidth, int imgHeight, const std::string& woutputFilename)
{
    width = imgWidth;
    height = imgHeight;
    outputFilename = woutputFilename;
}

void Scene::ParsedBounceDepth(int depth)
{
    bounceLimit = depth;
}

void Scene::ParsedShadowBias(float bias)
{
    shadowBias = bias;
}

void Scene::ParsedPushMatrix()
{
    matrixStack.push(currentMatrix);
    currentMatrix = STTransform4::Identity();
}

void Scene::ParsedPopMatrix()
{
    currentMatrix = matrixStack.top();
    matrixStack.pop();
}

void Scene::ParsedRotate(float rx, float ry, float rz)
{
    STTransform4 rot = STTransform4::Rotation(rx, ry, rz);
    currentMatrix *= rot;
}

void Scene::ParsedScale(float sx, float sy, float sz)
{
    STTransform4 scale = STTransform4::Scaling(sx, sy, sz);
    currentMatrix *= scale;
}

void Scene::ParsedTranslate(float tx, float ty, float tz)
{
    STTransform4 trans = STTransform4::Translation(tx, ty, tz);
    currentMatrix *= trans;
}

void Scene::ParsedSphere(const STPoint3& center, float radius)
{
    Sphere *shape = new Sphere(center, radius);
    shapes.push_back(shape);
}

void Scene::ParsedTriangle(const STPoint3& v1, const STPoint3& v2, const STPoint3& v3)
{
    Triangle *shape = new Triangle(v1,v2,v3);
    shapes.push_back(shape);
}

void Scene::ParsedAmbientLight(const STColor3f& col)
{
    AmbientLight *light = new AmbientLight(col);
    lights.push_back(light);
}

void Scene::ParsedPointLight(const STPoint3& loc, const STColor3f& col)
{
    PointLight *light = new PointLight(col, loc);
    lights.push_back(light);
}

void Scene::ParsedDirectionalLight(const STVector3& dir, const STColor3f& col)
{
    DirectionalLight *light = new DirectionalLight(col, dir);
    lights.push_back(light);
}

void Scene::ParsedMaterial(const STColor3f& amb, const STColor3f& diff, const STColor3f& spec, const STColor3f& mirr, float shine)
{
    Material material(amb,diff,spec,mirr,shine);
    lastMaterial = material;
}

void Scene::Render()
{
    STImage outputImage(width,height);
//
//    outputImage.Save(outputFilename);
}
