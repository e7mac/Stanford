// STShape.cpp
#include "STShape.h"

#include "st.h"
#include "stgl.h"

#include <assert.h>
#include <stdio.h>
#include <map>
#include <math.h>

//

// Construct a triangular face from three vertex indices.
STShape::Face::Face(Index i0, Index i1, Index i2)
{
    mIndices[0] = i0;
    mIndices[1] = i1;
    mIndices[2] = i2;
}

// Reverse the order of indices in this face. This changes
// right-handed winding to left-handed and vice versa.
void STShape::Face::ReverseWinding()
{
    std::swap(mIndices[1], mIndices[2]);
}

// Create an empty STShape with no vertices or faces.
// Geometry can then be added to this with AddVertex()
// and AddFace().
STShape::STShape()
{
}

// Create an STShape from vertices and faces. The entries
// in the face array point into the vertex array.
STShape::STShape(const VertexArray& vertices, const FaceArray& faces)
    : mVertices(vertices)
    , mFaces(faces)
{
}

// Create an STShape from a geometric model file.
// Currently only supports the OBJ file format.
STShape::STShape(const std::string& filename)
{
    if (LoadOBJ(filename) != ST_OK) {
        throw new std::runtime_error("Error creating STShape");
    }
}

// Delete an existing shape and free the memory for its vertices
// and faces.
STShape::~STShape()
{
    // Nothing to do, because the C++ STL
    // containers clean up after themselves.
}

// Add a new vertex to the end of the vertex array.
// Returns the index of the new vertex, which will
// always be equal to the previous number of vertices.
size_t STShape::AddVertex(const Vertex& vertex)
{
    size_t result = GetNumVertices();
    mVertices.push_back(vertex);
    return result;
}

// Add a new face to this shape.
void STShape::AddFace(const Face& face)
{
    mFaces.push_back(face);
}

// Draw shape using OpenGL.
void STShape::Draw()
{
    glBegin(GL_TRIANGLES);

    size_t numFaces = GetNumFaces();
    for (size_t ii = 0; ii < numFaces; ++ii) {
        const Face& face = GetFace(ii);

        for (size_t jj = 0; jj < 3; ++jj) {
            Index index = face.GetIndex(jj);

            const Vertex& vertex = mVertices[index];
            glTexCoord2f(vertex.texCoord.x,
                         vertex.texCoord.y);
            glNormal3f(vertex.normal.x,
                       vertex.normal.y,
                       vertex.normal.z);
            glVertex3f(vertex.position.x,
                       vertex.position.y,
                       vertex.position.z);
        }
    }
    glEnd();
}

// Compute or re-compute the per-vertex normals for this shape
// using the normals of adjoining faces.
void STShape::GenerateNormals()
{
    //
    // We compute the normals for hte mesh as the area-weighted average of
    // the normals of incident faces. This is a simple technique to implement,
    // but other techniques are possible.
    //

    //
    // Initialize all the normals to zero.
    //
    size_t numVertices = GetNumVertices();
    for (size_t ii = 0; ii < numVertices; ++ii) {
        mVertices[ii].normal = STVector3::Zero;
    }

    //
    // Loop over faces, adding the normal of each face
    // to the vertices that use it.
    //
    size_t numFaces = GetNumFaces();
    for (size_t ii = 0; ii < numFaces; ++ii) {
        const Face& face = mFaces[ii];

        Vertex& v0 = mVertices[face.GetIndex(0)];
        Vertex& v1 = mVertices[face.GetIndex(1)];
        Vertex& v2 = mVertices[face.GetIndex(2)];

        //
        // We compute a cross-product of two triangle edges.
        // This direction of this vector will be the normal
        // direction, while the magnitude will be twice
        // the triangle area. We can thus use this directly
        // as a weighted normal.
        //
        STVector3 edge1 = v1.position - v0.position;
        STVector3 edge2 = v2.position - v0.position;
        STVector3 weightedNormal = STVector3::Cross(edge1, edge2);

        //
        // We now add the face normal to the normal stored
        // in each of the vertices using the face.
        //
        v0.normal += weightedNormal;
        v1.normal += weightedNormal;
        v2.normal += weightedNormal;
    }

    //
    // Each vertex now has an area-weighted normal. We need to
    // normalize them to turn them into correct unit-lenght
    // normal vectors for rendering.
    //
    for (size_t ii = 0; ii < numVertices; ++ii) {
        //
        // Check that the weighted normal is non-zero so that
        // we don't divide by zero when normalizing.
        //
        Vertex& vertex = mVertices[ii];
        if (vertex.normal.LengthSq() > 0.0f) {
            vertex.normal.Normalize();
        }
    }
}

// Helper function to deal with the particular way
// that indices must be interpreted in an .obj file
static int OBJIndexing(int input, size_t numValues)
{
    if (input > 0) return input - 1;
    return numValues + input;
}

// Load the shape with vertices and faces from the OBJ file.
// Returns ST_ERROR on failure, ST_OK on success.
STStatus STShape::LoadOBJ(const std::string& filename)
{
    static const int kMaxLine = 256;

    // The subset of the OBJ format that we handle has
    // the following commands:
    //
    // v    <x> <y> <z>         Define a vertex position.
    // vn   <x> <y> <z>         Define a vertex normal.
    // vt   <s> <t>             Define a vertex texture coordiante.
    // f    <p0>/<t0>/<n0> ...  Define a face from previous data.
    //
    // Every face in an OBJ file refers to previously-defines
    // positions, normals and texture coordinates by index.
    // Vertices in an STShape must define all three of these,
    // so we must generate one STShape vertex for each combination
    // of indices we see in the OBJ file.
    //

    //
    // Open the file.
    //
    FILE* file = fopen(filename.c_str(), "r");
    if (!file) {
        fprintf(stderr,
                "STShape::LoadOBJ() - Could not open shape file '%s'.\n", filename.c_str());
        return ST_ERROR;
    }

    char lineBuffer[kMaxLine];
    int lineIndex = 0; // for printing error messages

    // Arrays to collect the positions, normals and texture
    // coordinates that we encounter.
    std::vector<STPoint3> positions;
    std::vector<STPoint2> texCoords;
    std::vector<STVector3> normals;

    // Map to point us to previously-created vertices. This maps
    // triples of indices (a position, texcoord and normal index)
    // to a single index in the new shape.
    typedef std::pair<int,int> IntPair;
    typedef std::pair<int, IntPair> IntTriple;
    typedef std::map<IntTriple, size_t> IndexMap;
    IndexMap indexMap;

    // Keep track of whether the file contained normals...
    bool needsNormals = false;

    //
    // Read the file line-by-line
    //
    while (fgets(lineBuffer, kMaxLine, file)) {
        ++lineIndex;
        char* str = strtok(lineBuffer, " \t\n\r");

        //
        // Skip empty or comment lines.
        //
        if (!str || str[0] == '\0' || str[0] == '#')
            continue;
        if (str[0] == 'g' || str[0] == 's' || strcmp(str, "usemtl") == 0 || strcmp(str, "mtllib") == 0)
          continue;
        //
        // Process other lines based on their commands.
        //
        if (strcmp(str, "v") == 0) {
            // Vertex position line. Read the position data (x, y, z).
            str = strtok(NULL, "");
            STPoint3 position;
            sscanf(str, "%f %f %f\n", &position.x, &position.y, &position.z);
            positions.push_back(position);
        }
        else if (strcmp(str, "vt") == 0) {
            // Vertex texture coordinate line. Read the texture coord data.
            str = strtok(NULL, "");
            STPoint2 texCoord;
            sscanf(str, "%f %f\n", &texCoord.x, &texCoord.y);
            texCoords.push_back(texCoord);
        }
        else if (strcmp(str, "vn") == 0) {
            // Vertex normal line. Read the normal data.
            str = strtok(NULL, "");
            STVector3 normal;
            sscanf(str, "%f %f %f\n", &normal.x, &normal.y, &normal.z);
            normals.push_back(normal);
        }
        else if (strcmp(str, "f") == 0) {
            // Face command. Each vertex in the face will be defined by
            // the indices of its position, texture coordinate and
            // normal.
            std::vector<Index> faceIndices;

            // Read each vertex entry.
            int curIndex = 0;
            Index indices[3];
            enum FaceFormat {
              PosTexNorm, // %d/%d/%d
              PosTex,     // %d/%d
              PosNorm,    // %d//%d
              Pos,         // %d
              LAST_FACE_FORMAT
            };

            const char* FaceFormatToString[LAST_FACE_FORMAT] = {
              "Position/Texture/Normal",
              "Position/Texture",
              "Position//Normal",
              "Position",
            };

            bool set_format = false;
            FaceFormat format;

            const int kNoTextureIndex = -1;
            const int kNoNormalIndex = -1;

            int positionIdx;
            int texCoordIdx;
            int normalIdx;

            while ((str = strtok(NULL, " \t\n\r")) != NULL) {

                if (sscanf(str, "%d/%d/%d", &positionIdx, &texCoordIdx, &normalIdx) == 3) {
                  if (!set_format) {
                    format = PosTexNorm;
                    set_format = true;
                  } else {
                    if (format != PosTexNorm) {
                      fprintf(stderr, "STShape::LoadOBJ() - "
                              "Line %d: Current face format is %s, but received another vertex in format %s\n",
                              lineIndex, FaceFormatToString[format], FaceFormatToString[PosTexNorm]);
                    }
                  }
                } else if (sscanf(str, "%d/%d", &positionIdx, &texCoordIdx) == 2) {
                  if (!set_format) {
                    format = PosTex;
                    set_format = true;
                  } else {
                    if (format != PosTex) {
                      fprintf(stderr, "STShape::LoadOBJ() - "
                              "Line %d: Current face format is %s, but received another vertex in format %s\n",
                              lineIndex, FaceFormatToString[format], FaceFormatToString[PosTex]);
                    }
                  }
                } else if (sscanf(str, "%d//%d", &positionIdx, &normalIdx) == 2) {
                  if (!set_format) {
                    format = PosNorm;
                    set_format = true;
                  } else {
                    if (format != PosNorm) {
                      fprintf(stderr, "STShape::LoadOBJ() - "
                              "Line %d: Current face format is %s, but received another vertex in format %s\n",
                              lineIndex, FaceFormatToString[format], FaceFormatToString[PosNorm]);
                    }
                  }
                  // Pass
                } else if (sscanf(str, "%d", &positionIdx) == 1) {
                  if (!set_format) {
                    format = Pos;
                    set_format = true;
                  } else {
                    if (format != Pos) {
                      fprintf(stderr, "STShape::LoadOBJ() - "
                              "Line %d: Current face format is %s, but received another vertex in format %s\n",
                              lineIndex, FaceFormatToString[format], FaceFormatToString[Pos]);
                    }
                  }
                } else {
                  // TODO(boulos): Print out line #?
                  fprintf(stderr, "STShape::LoadOBJ() - "
                          "Line %d: Bad face format given %s\n", lineIndex, str);
                  continue;
                }

                //
                // We look to see if we have already created a vertex
                // based on this position/texCoord/normal, and reuse it
                // if possible. Otherwise we add a new vertex.
                //
                positionIdx = OBJIndexing(positionIdx, positions.size());
                texCoordIdx = (format == PosTexNorm ||
                               format == PosTex)
                                    ? OBJIndexing(texCoordIdx,
                                                  texCoords.size())
                                    : kNoTextureIndex;
                normalIdx   = (format == PosTexNorm ||
                               format == PosNorm)
                                    ? OBJIndexing(normalIdx,
                                                  texCoords.size())
                                    : kNoNormalIndex;
                size_t newIndex;

                IntTriple key(positionIdx, IntPair(texCoordIdx, normalIdx));
                IndexMap::const_iterator ii = indexMap.find(key);
                if (ii != indexMap.end()) {
                    newIndex = ii->second;
                }
                else {
                  // Construct a new vertex from the indices given.
                  STPoint3 position = positions[positionIdx];
                  STVector3 normal = (normalIdx != kNoNormalIndex) ? normals[normalIdx] : STVector3::Zero;
                  STPoint2 texCoord = (texCoordIdx != kNoTextureIndex) ? texCoords[texCoordIdx] : STPoint2::Origin;

                  // If the vertex has no normal, then remember
                  // to create normals later...
                  if (normalIdx == kNoNormalIndex) {
                    needsNormals = true;
                  }

                  Vertex newVertex(position, normal, texCoord);
                  newIndex = AddVertex(newVertex);
                  indexMap[key] = newIndex;
                }

                indices[curIndex++] = newIndex;
                // Keep triangle fanning
                if (curIndex == 3) {
                  AddFace(Face(indices[0], indices[1], indices[2]));
                  indices[1] = indices[2];
                  curIndex = 2;
                }
            }
        }
        else {
            //
            // Unknown line - ignore and print a warning.
            //
            fprintf(stderr, "STShape::LoadOBJ() - "
                    "Unable to parse line %d: %s (continuing)\n",
                    lineIndex, lineBuffer);
        }
    }
    fclose(file);

    //
    // If the file didn't already have normals, then generate them.
    //
    GenerateNormals();

    return ST_OK;
}

namespace STShapes
{
    //
    // Creates a cylinder at the origin oriented along the Z-axis. 'radius'
    // represents the distance from the center to the inner ring. 'height'
    // represents the amount to extrude along the Z-axis.  'numStacks' is the
    // number of layers along the Z-axis, 'numSlices' is the number of radial
    // divisions.
    //
    STShape* CreateCylinder(
        float radius, float height,
        unsigned int numSlices, unsigned int numStacks)
    {
        STShape* result = new STShape();

        for(unsigned int ii = 0; ii <= numStacks; ++ii) {
            for(unsigned int jj = 0; jj < numSlices; ++jj) {
                const float theta =
                    float(jj) * 2.0f * float(M_PI) / float(numSlices);
                STPoint3 position(radius * cosf(theta),
                                  radius * sinf(theta),
                                  height * (float(ii) / numStacks));
                STPoint2 texCoord(ii / float(numStacks),
                                  jj / float(numSlices - 1));

                result->AddVertex(
                    STShape::Vertex(position, STVector3::Zero, texCoord));
            }
        }

        for(unsigned int ii = 0; ii < numStacks; ii++) {
            for(unsigned int jj = 0; jj < numSlices; jj++) {
                int jjPlus1 = (jj + 1) % numSlices;
                result->AddFace(STShape::Face(
                    (ii + 1)*numSlices + jj,
                    (ii + 0)*numSlices + jj,
                    (ii + 0)*numSlices + jjPlus1));
                result->AddFace(STShape::Face(
                    (ii + 1)*numSlices + jj,
                    (ii + 0)*numSlices + jjPlus1,
                    (ii + 1)*numSlices + jjPlus1));
            }
        }

        result->GenerateNormals();
        return result;
    }

    //
    // Creates a cylinder at the origin oriented along the Z-axis.
    // 'innerRadius' represents the distance from the center to the inner ring.
    // innerRadius + thickness represents the distance from the center to the
    // outer rng.  'height' represents the amount to extrude along the Z-axis.
    // 'numStacks' is the number of layers along the Z-axis, 'numSlices' is
    // the number of radial divisions.
    //
    STShape* CreateThickCylinder(
        float innerRadius, float thickness, float height,
        unsigned int numSlices, unsigned int numStacks)
    {
        STShape* result = new STShape();

        //
        // Vertex packing
        //
        // 0 -> Slices * (Stacks + 1) - 1 = Inner ring
        // Slices * (Stacks + 1) -> Slices * (Stacks + 1) * 2 - 1 = Outer ring
        //
        // Face packing
        //
        // 0 -> Stacks * Slices * 2 - 1 = Inner ring
        // Stacks * Slices * 2 -> Stacks * Slices * 4 - 1 = Outer ring
        // Stacks * Slices * 4 -> Stacks * Slices * 4 - 1 = Connection between rings
        //

        const float ringRadii[2] = { innerRadius, innerRadius + thickness };
        const int ringVertexOffsets[2] = { 0, numSlices * (numStacks + 1) };

        const float PI2_Slices = 2.0f * float(M_PI) / float(numSlices);

        for (unsigned int ring = 0; ring < 2; ring++) {
            float ringRadius = ringRadii[ring];
            int ringVertexOffset = ringVertexOffsets[ring];

            for (unsigned int ii = 0; ii <= numStacks; ++ii) {
                for (unsigned int jj = 0; jj < numSlices; ++jj) {
                    const float theta = float(jj) * PI2_Slices;
                    STPoint3 position(ringRadius * cosf(theta),
                                      ringRadius * sinf(theta),
                                      height * (float(ii) / numStacks));
                    STPoint2 texCoord(ii / float(numStacks),
                                      jj / float(numSlices - 1));
                    result->AddVertex(
                        STShape::Vertex(position, STVector3::Zero, texCoord));
                }
            }

            for (unsigned int ii = 0; ii < numStacks; ++ii) {
                for(unsigned int jj = 0; jj < numSlices; jj++) {
                    int jjPlus1 = (jj + 1) % numSlices;

                    STShape::Face firstFace(
                        ringVertexOffset + (ii + 1)*numSlices + jj,
                        ringVertexOffset + (ii + 0)*numSlices + jj,
                        ringVertexOffset + (ii + 0)*numSlices + jjPlus1);
                    STShape::Face secondFace(
                        ringVertexOffset + (ii + 1)*numSlices + jj,
                        ringVertexOffset + (ii + 0)*numSlices + jjPlus1,
                        ringVertexOffset + (ii + 1)*numSlices + jjPlus1);

                    //
                    // The inner face points the opposite direciton
                    //
                    if (ring == 0) {
                        firstFace.ReverseWinding();
                        secondFace.ReverseWinding();
                    }

                    result->AddFace(firstFace);
                    result->AddFace(secondFace);
                }
            }
        }

        for (unsigned int ii = 0; ii <= numStacks; ii += numStacks) {
            for (unsigned int jj = 0; jj < numSlices; jj++) {
                int jjPlus1 = (jj + 1) % numSlices;

                STShape::Face firstFace(
                    ringVertexOffsets[0] + ii * numSlices + jj,
                    ringVertexOffsets[1] + ii * numSlices + jjPlus1,
                    ringVertexOffsets[1] + ii * numSlices + jj);
                STShape::Face secondFace(
                    ringVertexOffsets[0] + ii * numSlices + jj,
                    ringVertexOffsets[0] + ii * numSlices + jjPlus1,
                    ringVertexOffsets[1] + ii * numSlices + jjPlus1);

                //
                // The bottom face points the opposite direciton
                //
                if (ii == numStacks) {
                    firstFace.ReverseWinding();
                    secondFace.ReverseWinding();
                }

                result->AddFace(firstFace);
                result->AddFace(secondFace);
            }
        }

        result->GenerateNormals();
        return result;
    }

    //
    // Create a sphere with the given radius and center point. 'numStacks' is
    // the number of layers along the Z axis and 'numSlices' is the number
    // of radial divisions.
    //
    STShape* CreateSphere(
        float radius, const STPoint3& center,
        unsigned int numSlices, unsigned int numStacks)
    {
        STShape* result = new STShape();

        float PI_Stacks = float(M_PI) / float(numStacks);
        float PI2_Slices = 2.0f * float(M_PI) / float(numSlices);

        //
        // Add the interior vertices
        //
        for (unsigned int ii = 1; ii < numStacks; ++ii) {
            float phi = float(ii) * PI_Stacks;
            float cosPhi = cosf(phi);
            float sinPhi = sinf(phi);

            for(unsigned int jj = 0; jj < numSlices; ++jj) {
                float theta = float(jj) * PI2_Slices;
                STPoint3 position = center +
                    STVector3(radius * cosf(theta) * sinPhi,
                              radius * sinf(theta) * sinPhi,
                              radius * cosPhi);
                result->AddVertex(STShape::Vertex(
                    position,
                    STVector3::Zero,
                    STPoint2::Origin));
            }
        }

        //
        // Add the pole vertices
        //
        STShape::Vertex topVertex(
            center + STVector3(0,0,radius),
            STVector3::Zero,
            STPoint2::Origin);
        STShape::Index topVertexIndex = result->AddVertex(topVertex);

        STShape::Vertex bottomVertex(
            center + STVector3(0,0,-radius),
            STVector3::Zero, STPoint2::Origin);
        STShape::Index bottomVertexIndex = result->AddVertex(bottomVertex);

        //
        // Add the top and bottom triangles (all triangles involving the pole vertices)
        //
        for( unsigned int ii = 0; ii < numSlices; ii++) {
            unsigned int iiPlus1 = (ii + 1) % numSlices;

            result->AddFace(
                STShape::Face(ii, iiPlus1, topVertexIndex));
            result->AddFace(STShape::Face(
                iiPlus1 + (numStacks - 2) * numSlices,
                ii + (numStacks - 2) * numSlices,
                bottomVertexIndex));
        }

        //
        // Add all the interior triangles
        //
        for(unsigned int ii = 0; ii < numStacks - 2; ++ii) {
            for(unsigned int jj = 0; jj < numSlices; ++jj) {
                unsigned int jjPlus1 = (jj + 1) % numSlices;

                result->AddFace(STShape::Face(
                    (ii + 1)*numSlices + jj,
                    (ii + 0)*numSlices + jjPlus1,
                    (ii + 0)*numSlices + jj));
                result->AddFace(STShape::Face(
                    (ii + 1)*numSlices + jj,
                    (ii + 1)*numSlices + jjPlus1,
                    (ii + 0)*numSlices + jjPlus1));
            }
        }

        result->GenerateNormals();
        return result;
    }

    //
    // Generate a rectangle shape with the given width and height.  The center
    // of the rectangle is at the origin.  Width is in the x dimension and
    // height is in the y dimension.  Normals are on the -z axis.
    //
    STShape* CreateRect(float width, float height)
    {
        STShape* result = new STShape();

        STVector3 normal(0, 0, -1);

        float halfw = width/2.0f;
        float halfh = height/2.0f;

        result->AddVertex(STShape::Vertex(
            STPoint3(-halfw, -halfh, 0), normal, STPoint2(0, 0)));
        result->AddVertex(STShape::Vertex(
            STPoint3(halfw, -halfh, 0), normal, STPoint2(1, 0)));
        result->AddVertex(STShape::Vertex(
            STPoint3(halfw, halfh, 0), normal, STPoint2(1, 1)));
        result->AddVertex(STShape::Vertex(
            STPoint3(-halfw, halfh, 0), normal, STPoint2(0, 1)));

        result->AddFace(STShape::Face(0, 1, 2));
        result->AddFace(STShape::Face(0, 2, 3));

        return result;
    }
}
