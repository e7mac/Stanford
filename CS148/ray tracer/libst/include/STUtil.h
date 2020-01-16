// STUtil.h
#ifndef __STUTIL_H__
#define __STUTIL_H__

/* Short, inline functions and other utilities
 * which might be useful in many places.
 */

#include <string>

//
// not defined in math.h on windows
//
#ifndef M_PI
#define M_PI   3.14159265
#endif

//
// Status code for routines that can return an error.
//
enum STStatus
{
    ST_OK=0,
    ST_ERROR,
}; 

//
// Helper functions
//
inline float RadiansToDegrees(float Radians)
{
    return Radians * (180.0f / float(M_PI));
}

inline float DegreesToRadians(float Degrees)
{
    return Degrees * (float(M_PI) / 180.0f);
}

/**
* Converts a character to upper case
*/
inline char
STToUpper(char ch)
{
    if ( ch >= 'a' && ch <= 'z')
        return (char)((int)ch - 32);
    else
        return ch;
}


/**
* Parse filename to obtain the file extension.  We'll use this
* to determine which file format the image is in
*/
inline std::string
STGetExtension(const std::string& filename)
{
    size_t pos = filename.find_last_of(".");

    std::string extension = filename.substr(pos+1, filename.size()-pos);

    for (size_t i=0; i<extension.size(); i++)
        extension[i] = STToUpper(extension[i]);

    return extension;
}

/**
* Return the minimum of two values. This is more or less the same function
* as the C++ std::min(), but avoids the name clash with the min() macro
* defined by Windows.h.
*/
template<typename T>
inline T STMin(const T& left, const T& right)
{
    return left < right ? left : right;
}

/**
* Return the minimum of two values. This is more or less the same function
* as the C++ std::max(), but avoids the name clash with the max() macro
* defined by Windows.h.
*/
template<typename T>
inline T STMax(const T& left, const T& right)
{
    return left > right ? left : right;
}

#endif //__STUTIL_H__
