#include "response.h"
#include "stdio.h"
#include "math.h"

#include "tnt/tnt.h"
#include "tnt/jama_qr.h"

/* Load an HDR stack (list of photos + shutter times) 
 * Each line of the file indicates a single photo and
 * has the format:
 * shutter_numerator shutter_denominator filename
 * The shutter terms are combined to find the actual
 * shutter time = shutter_numerator/shutter_denominator.
 * This format makes it easier to deal with subsecond
 * exposures. 
 */
int 
LoadHDRStack(const char* fname, vector<Photo>& stack) {
	stack.clear();
	FILE* fin = fopen(fname, "r");
	if (fin == NULL) {
		printf("Error reading hdr stack.\n");
		return ST_ERROR;
	}

	int shutter_num, shutter_den;
	char namebuf[1024];
	Photo p;

	while(true) {
		if (fscanf(fin, "%i %i %s", &shutter_num, &shutter_den, namebuf) != 3) {
			break;
		}
		p.shutter = float(shutter_num) / float(shutter_den);
		p.filename = namebuf;
		stack.push_back(p);
	}

	fclose(fin);
	return ST_OK;
}

/* Constructors */
CameraResponse::CameraResponse() {
	memset(response_r, 0, NUM_RESPONSES*sizeof(float));
	memset(response_g, 0, NUM_RESPONSES*sizeof(float));
	memset(response_b, 0, NUM_RESPONSES*sizeof(float));
}
CameraResponse::CameraResponse(float* _r, float* _g, float* _b) {
	memcpy(response_r, _r, NUM_RESPONSES*sizeof(float));
	memcpy(response_g, _g, NUM_RESPONSES*sizeof(float));
	memcpy(response_b, _b, NUM_RESPONSES*sizeof(float));
}

/* Load response curves from file. */
int 
CameraResponse::Load(char* fname) {
	FILE* fin = fopen(fname, "r");
	if (fin == NULL)
    throw new std::runtime_error("Response file not found.");

	for(int i = 0; i < NUM_RESPONSES; i++) {
		if (fscanf(fin, "%f %f %f", &response_r[i], &response_g[i], &response_b[i]) != 3){
			fclose(fin);
			return ST_ERROR;
		}
	}

	fclose(fin);

	return ST_OK;
}

/* Save response curves to a file. */
int 
CameraResponse::Save(char* fname) {
	FILE* fout = fopen(fname, "w");
	if (fout == NULL)
		return ST_ERROR;

	for(int i = 0; i < NUM_RESPONSES; i++) {
		fprintf(fout, "%f %f %f\n", response_r[i], response_g[i], response_b[i]);
	}

	fclose(fout);

	return ST_OK;
}

/* Get the camera response (i.e. resulting pixel value) given
 * and irradiance value and exposure time. We store the inverse
 * function, but its monotonic, so we can just use binary search
 * and linear interpolation. 
 */
STColor4ub 
CameraResponse::GetResponse(STColor3f& irr, float dt) {
	STColor3f exposure = (irr * dt).Log();
	STColor4ub result;

	result.r = binary_search(response_r, exposure.r);
	result.g = binary_search(response_g, exposure.g);
	result.b = binary_search(response_b, exposure.b);
	result.a = 255;

	return result;
}
/* Get the exposure value (i.e. irradiance * dt) given the camera
 * response.  This is just a lookup since this is the function
 * we store directly.  Note that the curve stored is log (exposure)
 * so we're returning that value, not the exposure itself.
*/
STColor3f
CameraResponse::GetExposure(STColor4ub& pix) {
	STColor3f result;
	result.r = response_r[(int)pix.r];
	result.g = response_g[(int)pix.g];
	result.b = response_b[(int)pix.b];
	return result;
}

/* Get the weight for a given response value. Note that in
 * our implementation all values have weight, so saturated
 * values are considered as well.  This still works well
 * and avoids some rank deficiency problems when solving
 * for the response curve. 
 */
float 
CameraResponse::Weight(unsigned char pval) {
	return (pval > 127) ? 256 - (float)pval : (float)pval+1;
}

/* Get the weight for a given response color. */
STColor3f
CameraResponse::Weight(STColor4ub& pval) {
	STColor3f result;
	result.r = Weight(pval.r);
	result.g = Weight(pval.g);
	result.b = Weight(pval.b);
	return result;
}

/* Binary search to find the index of the value in the array.
 * We use linear interpolation and round since some values
 * will fall between indices.
 */
unsigned char 
CameraResponse::binary_search(float *rsp, float val) {
	int min_idx, mid_idx, max_idx;
	float mid_val;
	// special cases
	if (val < rsp[0]) return 0; 
	else if (val > rsp[255]) return 255;
	// binary search
	min_idx = 0; max_idx = 255;
	while(max_idx - min_idx > 1) {
		mid_idx = (min_idx + max_idx) / 2;
		mid_val = rsp[mid_idx];
		if (mid_val < val)
			min_idx = mid_idx;
		else
			max_idx = mid_idx;
	}
	// linear interpolation
	float rsp_alpha = (rsp[max_idx] - val) / (rsp[max_idx] - rsp[min_idx]);
	float result_idx = rsp_alpha * min_idx + (1.f - rsp_alpha) * max_idx;
	// round and return
	return (unsigned char) floorf(result_idx + .5f);
}

/* Solve for the camera response curve.  This follows the code in Debevec's paper
 * very closely.  It uses a random set of pixels, which is not optimal, but works.
 * An large, overconstrained system of equations is setup, including smoothing
 * constraints (controlled by lambda).  The solution is optimized in the least 
 * squares sense.  We use a slightly different weighting scheme in order to ensure
 * the matrix for the system of equations is full rank to avoid additional
 * work.  This should be fixed, but in practice doesn't really matter.
 */
int
CameraResponse::SolveForResponse(vector<Photo>& photos, float lambda, int nsamples) {
	int i, j, k;

	// Get number of images
	int nimages = (int)photos.size();
	if (nimages < 2) return ST_ERROR;

	// The number of pixel values
	int n = NUM_RESPONSES;

	// Get the image size from the first file
	STImage* tmpimage = new STImage(photos[0].filename.c_str());
	int width = tmpimage->GetWidth();
	int height = tmpimage->GetHeight();
  delete tmpimage;

	// Choose sample points
	vector<int> samples_x;
	vector<int> samples_y;
	for(i = 0; i < nsamples; i++) {
		samples_x.push_back( rand() % width );
		samples_y.push_back( rand() % height );
	}

	// Create and zero out equation matrices
	TNT::Array2D<float> Ar(nsamples*nimages+n-1, n+nsamples, 0.f);
	TNT::Array2D<float> Ag(nsamples*nimages+n-1, n+nsamples, 0.f);
	TNT::Array2D<float> Ab(nsamples*nimages+n-1, n+nsamples, 0.f);
	TNT::Array1D<float> br(nsamples*nimages+n-1, 0.f);
	TNT::Array1D<float> bg(nsamples*nimages+n-1, 0.f);
	TNT::Array1D<float> bb(nsamples*nimages+n-1, 0.f);

	k = 0; // k will hold the index of the current equation (constraint)
	// first we setup constraints from the image pixels, weighted appropriately
	// these equations include the shutter times
	for(j = 0; j < nimages; j++) {
		STImage curimage(photos[j].filename.c_str());
		printf("Image %i...\n", j+1);
		float ln_shutter = log(photos[j].shutter);
		for(i = 0; i < nsamples; i++) {
			STColor4ub pixval = curimage.GetPixel(samples_x[i], samples_y[i]);

			float wij_r = Weight(pixval.r);
			Ar[k][pixval.r] = wij_r;
			Ar[k][n+i] = -wij_r;
			br[k] = wij_r * ln_shutter;

			float wij_g = Weight(pixval.g);
			Ag[k][pixval.g] = wij_g;
			Ag[k][n+i] = -wij_g;
			bg[k] = wij_g * ln_shutter;

			float wij_b = Weight(pixval.b);
			Ab[k][pixval.b] = wij_b;
			Ab[k][n+i] = -wij_b;
			bb[k] = wij_b * ln_shutter;

			k++;
		}
	}

	// next we include the smoothness equations, these are the same for all colors
	for(i = 0; i < n-2; i++) {
		float w = Weight(i);

		Ar[k][i] = lambda * w;
		Ar[k][i+1] = -2 * lambda * w;
		Ar[k][i+2] = lambda * w;

		Ag[k][i] = lambda * w;
		Ag[k][i+1] = -2 * lambda * w;
		Ag[k][i+2] = lambda * w;

		Ab[k][i] = lambda * w;
		Ab[k][i+1] = -2 * lambda * w;
		Ab[k][i+2] = lambda * w;

		k++;
	}

	// finally, fix the curve such that g(0) = 128, same for all curves
	Ar[k][128] = 1;
	Ag[k][128] = 1;
	Ab[k][128] = 1;
	k++;

	// now solve the system of equations in the least squares sense
	printf("Solving equations...\n");
	JAMA::QR<float> solver_r(Ar);
	JAMA::QR<float> solver_g(Ag);
	JAMA::QR<float> solver_b(Ab);
	if (!solver_r.isFullRank() || !solver_g.isFullRank() || !solver_b.isFullRank()) {
		printf("An A matrix is not full rank...\n");
		exit(-1);
	}

	TNT::Array1D<float> g_curve_r = solver_r.solve(br);
	TNT::Array1D<float> g_curve_g = solver_g.solve(bg);
	TNT::Array1D<float> g_curve_b = solver_b.solve(bb);

	// g_curve now holds the curve + the log(E) values for the samples,
	// record the first piece into this response's arrays
	for(i = 0; i < n; i++) {
		response_r[i] = g_curve_r[i];
		response_g[i] = g_curve_g[i];
		response_b[i] = g_curve_b[i];
	}

	return ST_OK;
}
