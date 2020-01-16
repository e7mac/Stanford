#ifndef __CAMERARESPONSE_H__
#define __CAMERARESPONSE_H__

#include "st.h"
#include <vector>
#include <string>
using namespace std;

#define NUM_RESPONSES 256
#define MIN_RESPONSE  0
#define RESPONSE_MAX  255

typedef struct {
	string filename;
	float shutter;
} Photo;

int LoadHDRStack(const char* fname, vector<Photo>& stack);

/* CameraResponse - encodes the camera response.  We actually store
 * its inverse, i.e. g(PixelColor) = ln(Ei*dt) = ln Ei + ln dt.  We
 * assume that we're working with 8-bit channels.  Note that GetResponse
 * are not quite inverses of each other.  GetResponse takes the raw
 * irradiance and dt whereas GetExposure returns the value of the curve,
 * i.e. it actually returns the log exposure.
 */
class CameraResponse {
public:
	/* Constructors */
	CameraResponse();
	CameraResponse(float* _r, float* _g, float* _b);

	/* Load response curves from file. */
	int Load(char* fname);
	/* Save response curves to a file. */
	int Save(char* fname);

	/* Get the camera response (i.e. resulting pixel value) given
	 * and irradiance value and exposure time. We store the inverse
	 * function, but its monotonic, so we can just use binary search
	 * and linear interpolation. 
	 */
	STColor4ub GetResponse(STColor3f& irr, float dt);

	/* Get the exposure value (i.e. irradiance * dt) given the camera
	 * response.  This is just a lookup since this is the function
	 * we store directly. Note that the curve stored is log (exposure)
	 * so we're returning that value, not the exposure itself.
	 */
	STColor3f GetExposure(STColor4ub& pix);

	/* Get the weight for a given response value. */
	float Weight(unsigned char pval);
	/* Get the weight for a given response color. */
	STColor3f Weight(STColor4ub& pval);

	/* Given a stack of images, a smoothing factor, and a number of pixel samples
	 * to use, solve for the camera response curve.
	 */
	int SolveForResponse(vector<Photo>& photos, float lambda, int nsamples);
private:
	/* Binary search to find the index of the value in the array.
	 * We use linear interpolation and round since some values
	 * will fall between indices.
	 */
	unsigned char binary_search(float* rsp, float val);

	float response_r[NUM_RESPONSES];
	float response_g[NUM_RESPONSES];
	float response_b[NUM_RESPONSES];
};

#endif //__CAMERARESPONSE_H__
