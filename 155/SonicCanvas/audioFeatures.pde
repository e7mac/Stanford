int highestBand(FFT fft)
{
  float maximum=0;
  int max_band=-1;
  for(int i = 0; i < fft.specSize(); i++)
  {
    if (fft.getBand(i) > 0)
    {
      maximum = fft.getBand(i);
      max_band = i;
    }
  }
  return max_band;
}

int highestBand(AudioBuffer samp)
{
  FFT fft;
  fft = new FFT(samp.size(), MY_SRATE);
  fft.forward(samp);
  float maximum=0;
  int max_band=-1;
  for(int i = 0; i < fft.specSize(); i++)
  {
    if (fft.getBand(i) > maximum)
    {
      maximum = fft.getBand(i);
      max_band = i;
    }
  }
  return max_band;
}

float mean(AudioBuffer samp)
{
  float avg=0;
   for(int i = 0; i < samp.size(); i++)
   {
     avg += samp.get(i);
   }
  avg /= samp.size();
  return avg;
}

float variance(AudioBuffer samp)
{
  float variance=0;
  float avg = mean(samp);
   for(int i = 0; i < samp.size(); i++)
   {
     variance = variance + pow(samp.get(i) - avg,2)  ;
   }
  variance /= samp.size();
  return variance;
}


float sd(AudioBuffer samp)
{
  return pow(variance(samp),0.5);
}


//draw audio waveform at point x,y
void drawSpectrogram(float x, float y, float xsize, float ysize, float theta)
{
  float multiplier = xsize/in.bufferSize();
  float x_init = x - xsize/2;
  float y_init = y;
  int i_mid = in.bufferSize()/2;
  float[] x_abs = new float[in.bufferSize()];
  float[] y_abs = new float[in.bufferSize()];


  for(int i = 0; i < in.bufferSize() - 1; i++)
  {
    float x_diff = multiplier*(i-i_mid);
    float y_diff = 0.5*in.left.get(i)*ysize/2*sin(i*pi/in.bufferSize());
    x_abs[i] = x + x_diff*cos(theta) - y_diff*sin(theta);
    y_abs[i] = y + x_diff*sin(theta) + y_diff*cos(theta);
    if (i>0)
      line(x_abs[i-1],y_abs[i-1],x_abs[i],y_abs[i]);
  }
}





float pitch(float[] samp)
{
  float[] crossings = new float[samp.length];
  float current_direction = 0;
  float previous_direction = 0;
  for(int i = 0; i < samp.length; i++)
  {
     previous_direction = current_direction;
     current_direction = samp[i] / abs(samp[i]);
     if (current_direction != previous_direction)
     {
        crossings[i] = 1; 
     }else {
        crossings[i] = 0; 
     }
  }
  // now we have a list of crossings
  float[] half_periods = new float[samp.length];
  float period_counter = 0;
  
  for(int i = 0; i < samp.length; i++)
  {
    period_counter++;
    if (crossings[i] == 1 )
    {
       half_periods[i] = period_counter;
       period_counter = 0; 
    }
  }
  
  float num_periods = 0;
  float foo = 0.;  
  for(int i = 0; i < samp.length; i++)
  {
    if (half_periods[i] != 0)
    {
       num_periods ++;
       foo = foo +  half_periods[i];
    }
  }
  
  float period = foo / num_periods ;
  float frequency = 0.5 / period * MY_SRATE;
  return frequency;
}


float centroid(float[] samp)
{
  FFT fft;
  fft = new FFT(samp.length, MY_SRATE);
  fft.forward(samp);
  float cent=0;
  float den=0;
  //optimize denominator
  for(int i = 0; i < fft.specSize(); i++)
  {
    cent += i*fft.getBand(i);
    den += i;
  }
  cent /= den;
  return cent;
}


float energy(float sample[])
{
  float energy=0;
  
  for(int i = 0; i < sample.length; i++)
  {
     energy += sample[i]*sample[i];
  }
  return pow(energy,0.5);
}

