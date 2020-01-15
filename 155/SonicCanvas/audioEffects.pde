class ReverseEffect implements AudioEffect
{
  void process(float[] samp)
  {
    float[] reversed = new float[samp.length];
    int i = samp.length - 1;
    for (int j = 0; j < reversed.length; i--, j++)
    {
      reversed[j] = samp[i];
    }
    // we have to copy the values back into samp for this to work
    arraycopy(reversed, samp);
  }
  
  void process(float[] left, float[] right)
  {
    process(left);
    process(right);
  }
}

class SinEffect implements AudioEffect
{
  void process(float[] samp)
  {
    for (int i = 0; i < samp.length; i++)
    {
      samp[i] = samp[i]*sin( 2 * 3.142 * i * 440 / samp.length);
//      sin((float)i/samp.length*3.142*100);
    }
    // we have to copy the values back into samp for this to work
  }
  
  void process(float[] left, float[] right)
  {
    process(left);
    process(right);
  }
}

