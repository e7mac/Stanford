// STShape.h
#ifndef __STSHAPE_H__
#define __STSHAPE_H__

#include "STColor3f.h"
#include "STPoint2.h"
#include "STPoint3.h"
#include "STTexture.h"
#include "STVector3.h"

#include <string>
#include <vector>

/**
* The STShape class represents a geometric shape uses an array of vertices
* and an array of faces which connect them. This is an appropriate
* representation for rendering with OpenGL, but there is not additional
* connectivity information for operations like subdivision.
*
* An STShape can be constructed from an OBJ model file:
*   STShape* shape = new STShape("elephant.obj");
*
* or with one of the functions in the STShapes:: namespace.
* These helper functions define simple primitive shapes:
*   shape = STShapes::CreateCylinder(1.0, 2.0);
*   shape = STShapes::CreateSphere(5.0);
*
* Finally, you can construct your own STShape "from scratch" by adding
* vertices and faces directly:
*   shape = new STShape();
*   shape->AddVertex( STShape::Vertex(...) );
*   shape->AddVertex( STShape::Vertex(...) );
*   shape->AddVertex( STShape::Vertex(...) );
*   shape->AddFace( STShape::Face(0, 1, 2) );
*
* To draw a shape with OpenGL, use the Draw() method. If you wish to
* draw the shape with a specific color, texture or shader, you must
* bind those before drawing the shape.
*
*/
class STShape
{
public:
    //
    // Type for vertices of the shape.
    //
    class Vertex
    {
    public:
        //
        // Construct a default (uninitialized) vertex.
        //
        Vertex() {}

        //
        // Construct a vertex from a specified position,
        // normal and texture coordinate.
        //
        Vertex(const STPoint3& inPosition,
               const STVector3& inNormal,
               const STPoint2& inTexCoord)
           : position(inPosition)
           , normal(inNormal)
           , texCoord(inTexCoord)
        {}

        // The geometric position of the vertex in space.
        STPoint3 position;

        // The normal vector of the shape at this vertex.
        STVector3 normal;

        // The coordinates of this vertex in the two-dimensional
        // image space of the texture map.
        STPoint2 texCoord;
    };

    //
    // Type of vertex array.
    //
    typedef std::vector<Vertex> VertexArray;

    //
    // Type for indices into the vertex array.
    //
    typedef unsigned int Index;

    //
    // Type for faces of the shape. Each face is a triangle
    // and thus holds three vertex indices.
    //
    class Face
    {
    public:
        //
        // Construct a face from three vertex indices.
        //
        Face(Index i0, Index i1, Index i2);

        //
        // Get an index from this face.
        //
        inline Index GetIndex(int which) const
        {
            return mIndices[which];
        }

        //
        // Reverse the order of indices in this face. This changes
        // right-handed winding to left-handed and vice versa.
        //
        void ReverseWinding();

    private:
        // Index array storage.
        Index mIndices[3];
    };

    //
    // Type of face array.
    //
    typedef std::vector<Face> FaceArray;

    //
    // Create an empty STShape with no vertices or faces.
    // Geometry can then be added to this with AddVertex()
    // and AddFace().
    //
    STShape();

    //
    // Create an STShape from vertices and faces. The entries
    // in the face array point into the vertex array.
    //
    STShape(const VertexArray& vertices, const FaceArray& faces);

    //
    // Create an STShape from a geometric model file.
    // Currently only supports the OBJ file format.
    //
    STShape(const std::string& filname);

    //
    // Delete an existing shape and free the memory for its vertices
    // and faces.
    //
    ~STShape();

    //
    // Get the number of vertices in this shape.
    //
    inline size_t GetNumVertices() const { return mVertices.size(); }

    //
    // Read a vertex of this shape by index.
    //
    inline Vertex GetVertex(size_t idx) const { return mVertices[idx]; }

    //
    // Write a vertex to this shape by index.
    //
    inline void SetVertex(size_t idx, const Vertex& vertex)
    {
        mVertices[idx] = vertex;
    }

    //
    // Add a new vertex to the end of the vertex array.
    // Returns the index of the new vertex, which will
    // always be equal to the previous number of vertices.
    //
    size_t AddVertex(const Vertex& vertex);

    //
    // Get the number of faces in this shape.
    //
    inline size_t GetNumFaces() const { return mFaces.size(); }

    //
    // Read a face of this shape by index.
    //
    inline Face GetFace(size_t idx) const { return mFaces[idx]; }

    //
    // Write a face of this shape by index.
    //
    inline void SetFace(size_t idx, const Face& face)
    {
        mFaces[idx] = face;
    }

    //
    // Add a new face to this shape.
    //
    void AddFace(const Face& face);

    //
    // Draw shape using OpenGL.
    //
    void Draw();

    //
    // Compute or re-compute the per-vertex normals for this shape
    // using the normals of adjoining faces.
    //
    void GenerateNormals();

private:
    //
    // Load the shape with vertices and faces from the OBJ file.
    // Returns ST_ERROR on failure, ST_OK on success.
    //
    STStatus LoadOBJ(const std::string& filename);

    // The vertices of this shape.
    VertexArray mVertices;

    // The faces of this shape.
    FaceArray mFaces;
};

//
// Helpful functions for creating primitive shapes.
//
namespace STShapes
{
    // Default values for number of "slices"
    // and "stacks" in curved shapes.
    static const unsigned int kDefaultSlices = 40;
    static const unsigned int kDefaultStacks = 40;

    STShape* CreateCylinder(
        float radius, float height,
        unsigned int numSlices = kDefaultSlices,
        unsigned int numStacks = kDefaultStacks);
    STShape* CreateThickCylinder(
        float innerRadius, float thickness, float height,
        unsigned int numSlices = kDefaultSlices,
        unsigned int numStacks = kDefaultStacks);
    STShape* CreateSphere(
        float radius, const STPoint3& center = STPoint3::Origin,
        unsigned int numSlices = kDefaultSlices,
        unsigned int numStacks = kDefaultStacks);
    STShape* CreateRect(float width, float height);
}

#endif  // __STSHAPE_H__
