// STTimer.h
#ifndef __STTIMER_H__
#define __STTIMER_H__


#ifdef _WIN32
#include <windows.h>
#else
#include <sys/time.h>
#endif

/**
* Platform independent timer class.
* Keeps track of elapsed wall clock time and returns values in milliseconds.
*/
class STTimer
{
public:
    //
    // Construct a new timer.
    //
    STTimer();

    //
    // Reset the counter for elapsed time to zero.
    //
    void Reset();

    //
    // Get the elapsed time in milliseconds since
    // construction or the last Reset().
    //
    float GetElapsedMillis();

private:
    //
    // The implementation of timers is platform-dependent.
    //
#ifdef _WIN32
    LARGE_INTEGER mStartTime;
    float          mFrequency;
#else
    struct timeval mStartTime;
#endif
};

#endif // __STTIMER_H__
