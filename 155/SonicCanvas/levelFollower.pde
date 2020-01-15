class LevelFollower {
  float z1, b0;
  
  void mondrian()
  {
    b0=1;
    z1=0;
    
  }
  
 void setTau(float tau, int fs) {
	b0 = 1 - exp( -1.0 / ( tau * fs ) );
	}

 void reset() {
		z1=0;
	}
	float process (float input) {
        z1 += b0 * (input - z1 );
	return z1;
	} 
}
