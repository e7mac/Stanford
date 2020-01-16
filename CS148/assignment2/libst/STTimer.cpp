// STTimer.cpp
#include "STTimer.h"

//

#ifdef _WIN32

STTimer::STTimer()
{
    // needs to determine the frequency of the window performance counter
    LARGE_INTEGER freq;
    QueryPerformanceFrequency(&freq);
    mFrequency = (float)freq.QuadPart;
}


/**
* Resets the count of elasped time
*/
void
STTimer::Reset()
{
    QueryPerformanceCounter(&mStartTime);
}


/**
* Returns the number of milliseconds elapsed since the last Reset()
*/
float
STTimer::GetElapsedMillis()
{
    LARGE_INTEGER currentTime;
    QueryPerformanceCounter(&currentTime);

    float sec = ((float)(currentTime.QuadPart - mStartTime.QuadPart)) / mFrequency;

    return (sec * 1000.0f);
}


#else
 
#include <stdlib.h>

STTimer::STTimer()
{
}

/**
* Resets the count of elasped time
*/
void
STTimer::Reset()
{
    gettimeofday(&mStartTime, NULL);
}


/**
* Returns the number of milliseconds elapsed since the last Reset()
*/
float
STTimer::GetElapsedMillis()
{
  struct timeval currentTime;
  gettimeofday(&currentTime, NULL);

  return (float)(currentTime.tv_sec - mStartTime.tv_sec)*1000.0f +
    (float)(currentTime.tv_usec - mStartTime.tv_usec)/1000.0f;
}

#endif
