#include "sgl.h"
#include <vector>
using namespace std;
// --- Do not modify this code ---+
#define IMPLEMENT_THIS_FUNCTION printf("Warning: call to unimplimented function!\n")
STImage* img;
int buffer_width;
int buffer_height;
void setBuffer(STImage* ptr) { img = ptr; }
void setBufferSize(int w, int h) { buffer_width = w; buffer_height = h; }
// --- End of do not modify this code ---+


//variables needed for book-keeping
vector<STPoint3> points;
vector<STColor3f> colors;
STColor3f currentColor;
STTransform3 transformMatrix;
vector<STTransform3> matrixStack;
bool begunTriangles = false;

struct line
{
    float a,b,c;
};

struct bbox
{
    float xmin,xmax,ymin,ymax;
};


void makeline(STPoint3& v0, STPoint3& v1, line& l)
{
    l.a = v1.y - v0.y;
    l.b = v0.x - v1.x;
    l.c = -(l.a * v0.x + l.b * v0.y);
}

void bound3(STPoint3 v[3], bbox& b)
{
    b.xmin = ceil(min(v[2].x,min(v[0].x, v[1].x)));
    b.xmax = ceil(max(v[2].x,max(v[0].x, v[1].x)));
    b.ymin = ceil(min(v[2].y,min(v[0].y, v[1].y)));
    b.ymax = ceil(max(v[2].y,max(v[0].y, v[1].y)));
}


int shadow( line l ) {
    return (l.a>0) || (l.a == 0 && l.b > 0);
}

int inside( float e, line l ) {
    return (e == 0) ? !shadow(l) : (e > 0) ;
}

#include <iostream.h>

float areaTriangle(STPoint3 p1,STPoint3 p2,STPoint3 p3)
{
    return 0.5*fabsf(p1.x*(p2.y-p3.y)+p2.x*(p3.y-p1.y)+p3.x*(p1.y-p2.y));
    
}



void rasterize(STPoint3 v[3], STColor3f cols[3])
{
    bbox b; bound3(v, b);
    line l0, l1, l2;
    makeline(v[0],v[1],l2);
    makeline(v[1],v[2],l0);
    makeline(v[2],v[0],l1);
    for(int y=b.ymin; y<b.ymax; y++ ) {
        for(int x=b.xmin; x<b.xmax; x++ ) {
            float e0 = l0.a * x + l0.b * y + l0.c;
            float e1 = l1.a * x + l1.b * y + l1.c;
            float e2 = l2.a * x + l2.b * y + l2.c;
            if( inside(e0,l0)&&inside(e1,l1)&&inside(e2,l2) )
            {
                //calculate color
                STPoint3 currentPoint(x,y,0);
                float areaMainTriangle = areaTriangle(v[0],v[1],v[2]);
                float alpha0 = areaTriangle(currentPoint, v[1], v[2])/areaMainTriangle;
                float alpha1 = areaTriangle(v[0], currentPoint,v[2])/areaMainTriangle;
                float alpha2 = areaTriangle(v[0], v[1],currentPoint)/areaMainTriangle;
                STColor3f c0 = cols[0],c1=cols[1],c2=cols[2];
                STColor3f pixelColor;
                pixelColor.r = alpha0*cols[0].r + alpha1*cols[1].r + alpha2*cols[2].r;
                pixelColor.g = alpha0*cols[0].g + alpha1*cols[1].g + alpha2*cols[2].g;
                pixelColor.b = alpha0*cols[0].b + alpha1*cols[1].b + alpha2*cols[2].b;
                
                img->SetPixel(x, y, STColor4ub(pixelColor.r,pixelColor.g,pixelColor.b));
            }
        }
    }
}

void renderTriangles()
{
    STPoint3 verts[3];
    STColor3f cols[3];
    for (int i=0;i<points.size()-2;i++)
    {
        verts[0]=points[i];
        verts[1]=points[i+1];
        verts[2]=points[i+2];
        
        cols[0] = colors[i];
        cols[1] = colors[i+1];
        cols[2] = colors[i+2];
        rasterize(verts,cols);
    }
    
}

void sglBeginTriangles()
{
    begunTriangles = true;
    points.clear();
}

void sglEnd()
{
    renderTriangles();
    points.clear();
    begunTriangles = false;
}

void sglLoadIdentity()
{
    transformMatrix.loadIdentity();
}

void sglScale(SGLfloat xscale, SGLfloat yscale)
{
    transformMatrix.scale(xscale, yscale);
}

void sglTranslate(SGLfloat xtrans, SGLfloat ytrans)
{
    transformMatrix.translate(xtrans,ytrans);
}

void sglRotate(SGLfloat angle)
{
    transformMatrix.rotate(angle);
}

void sglPushMatrix()
{
    matrixStack.push_back(transformMatrix);
}

void sglPopMatrix()
{
    transformMatrix = matrixStack.back();
    matrixStack.pop_back();
}

void sglVertex(SGLfloat x, SGLfloat y)
{
    if (begunTriangles)
    {
        STPoint3 point(x,y,0);
        STPoint3 fixedPoint = transformMatrix.applyTransform(point);
        points.push_back(fixedPoint);
        colors.push_back(currentColor);
    }
}

void sglColor(SGLfloat r, SGLfloat g, SGLfloat b)
{
    STColor3f color(r,g,b);
    currentColor = color;
    
}
