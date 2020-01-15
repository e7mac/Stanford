class mondrian {
  float x_pos,y_pos,sizesq;
  float r,g,b;
  color col;
  mondrian(){
  }
  mondrian(float x_pos1,float y_pos1,float sizesq1,float r1,float g1,float b1) {
    x_pos = x_pos1;
    y_pos = y_pos1;    
    sizesq = sizesq1;
    r = r1;
    g = g1;
    b = b1;    
  }
  
    mondrian(float x_pos1,float y_pos1,float sizesq1,color c) {
    x_pos = x_pos1;
    y_pos = y_pos1;    
    sizesq = sizesq1;
    col = c;
  }
  
   void setter(float x_pos1,float y_pos1,float sizesq1,float r1,float g1,float b1) {
    x_pos = x_pos1;
    y_pos = y_pos1;    
    sizesq = sizesq1;
    r = r1;
    g = g1;
    b = b1;
  }
  
  void setter(float x_pos1,float y_pos1,float sizesq1,color c) {
    x_pos = x_pos1;
    y_pos = y_pos1;    
    sizesq = sizesq1;
    col = c;
  }
  
  
  void draw(){
    strokeWeight(5);
    fill(col);
    rect(x_pos,y_pos,sizesq,sizesq); 
    
  }
  
  void draw(float[] buff)
  {
    if (random(0,1) > 0.5)
     {   
        strokeWeight(5);
        fill(col);
        rect(x_pos,y_pos,sizesq,sizesq); 
        for(int i = 0; i < buff.length; i++)
          {
          // draw the line for frequency band i, scaling it by 4 so we can see it a bit better
          stroke(0);
          line(x_pos+(float)i/buff.length*sizesq, y_pos+sizesq/2, x_pos+(float)i/buff.length*sizesq, y_pos+sizesq/2 - buff[i]*sizesq/10);
          }
     }
    }

  
  
  
  boolean isInside(float x, float y)  
  {  
    if (x-x_pos < sizesq && y-y_pos < sizesq
    && x-x_pos > 0 && y-y_pos >0)
      return true;
    else 
      return false;
  }
}
