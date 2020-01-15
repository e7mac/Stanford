//import libraries
import ddf.minim.*;
import ddf.minim.signals.*;
import ddf.minim.analysis.*;
import oscP5.*;
import netP5.*;
import java.io.File;

//define size of screen
int width = 1920;
int height = 1080;
//constants
float pi=3.14159265;

int MY_SRATE = 2048;

//global variables
//audio
Minim minim;
AudioInput in;
AudioOutput out;
AudioRecorder recorder;
AudioPlayer player;
SinEffect reffect;
FFT fft;

LevelFollower x_level, y_level;

// OSC stuffs
OscP5 oscP5,listener;
NetAddress myRemoteLocation;

//-------untouchable line---------------

//position of paintbrush
float x_acc=0;
float y_acc=0;
float x_pos=0;
float y_pos=0;
float x_vel=5;
float y_vel=5;
int x_dir=1;
int y_dir=1;
float speed=5;
float e;
int time=0;
int time_record_start=0;
//mondrian globals
int mondrianNos=0;
int mondrianMax=50;
color MondrianColors[] = new color[10];

//mean value of color of paintbrush
float r=125,g=125,b=125,a=150;

//position and size of aquarium
mondrian[] shapes;

void setup()
{
  //colors
  MondrianColors[0] = #FFFFFF; //black
  MondrianColors[1] = #FFC125; //yellow
  MondrianColors[2] = #DB2929; //red
  MondrianColors[3] = #1E90FF; //blue
  MondrianColors[4] = #380474; //purple
  MondrianColors[5] = #DF2949; //red=purp
  MondrianColors[6] = #EE4000; //orange
  MondrianColors[7] = #1B3F8B; //blue
  MondrianColors[8] = #004F00; //green
  MondrianColors[9] = #000000; //white
  
  //audio
  minim = new Minim(this);
  minim.debugOn();
  
  // get a line in from Minim, default bit depth is 16
  in = minim.getLineIn(Minim.STEREO, MY_SRATE);
  out = minim.getLineOut(Minim.STEREO, MY_SRATE);
  recorder = minim.createRecorder(in, "myrecording0.wav", true);
  player = minim.loadFile("myrecording.wav", MY_SRATE);
  fft = new FFT(in.bufferSize(), in.sampleRate());
  reffect = new SinEffect();
  
  //display
  size(width, height, P3D);
  frameRate(10);
  smooth();
  background(255);
  fill(0);
  stroke(0);
  shapes = new mondrian[mondrianMax];  
  // OSC stuffs
  oscP5 = new OscP5(this, 9999);
  myRemoteLocation = new NetAddress("127.0.0.1", 9999);  
  
  x_level = new LevelFollower();
  y_level = new LevelFollower();  
  //level followers
  x_level.setTau(0.02,MY_SRATE);
  y_level.setTau(0.02,MY_SRATE);
}

void draw()
{ 
  float cent = centroid(in.mix.toArray());
  float energy = energy(in.mix.toArray());
//  cent = x_level.process(cent);
//  energy = y_level.process(energy);
  
  
  x_vel = x_dir*min(energy,500);
  y_vel = y_dir*40*cent;
  println (y_vel);
  // println(x_vel);
//  println(y_vel);
  float avg = sd(in.mix);
  
  time++;
  pos_update(1);
  time%=1073741824;
  if (time%100==0)
  {
    //clear history slowly
    strokeWeight(0);
    fill(255,255,255,50);
    rect(0,0,width,height);
  }
  
  //for each shape
  for (int i=0;i<mondrianNos;i++) 
  {
    if (shapes[i].isInside(x_pos,y_pos))
    {
      if (player.isPlaying() == false)
      {
        if (recorder.isRecording())
          recorder.endRecord();
//      println("playing :"+Integer.toString(i));
      player = minim.loadFile("myrecording"+Integer.toString(i)+".wav", MY_SRATE);
      player.addEffect(reffect);
      player.play();

      }
    }
    shapes[i].draw(in.mix.toArray());
  }
  
  e=energy;

  //color
   strokeWeight(50);
  //if above thereshold
   if (e>1)
   {
      stroke(255,255,0,0);
      drawSpectrogram(x_pos,y_pos,min(60,(20+5*e)),min(40,(15+5*e)),atan(y_vel/x_vel));
      if (player.isPlaying() == false)
        recorder.beginRecord();
   }
   else
   {
     if (random(1)<0.5)
       x_dir*=-1;
     if (random(1)<0.2)
       y_dir*=-1;
     speed = 5;
     recorder.endRecord();
   }

  //square shapes
  if (e>1 && mondrianNos < mondrianMax)
  { 
    //parametrize this
    float newsize = min(random(220,300),(time - time_record_start)/2);
    boolean far=true;
    for (int i=0;i<mondrianNos;i++)
    { 
      float x_diff = abs(width-x_pos-shapes[i].x_pos);
      float y_diff = abs(height-y_pos-shapes[i].y_pos);
      float maxsize = max(newsize,shapes[i].sizesq);
      if (x_diff < 0.9*maxsize && y_diff < 0.9*maxsize)
        far = false;
    }
        if (far) {
//          println("far"+Integer.toString(mondrianNos));
//          println("time"+Integer.toString(time));
//          if (recorder.isRecording())
//         {
           if (time - time_record_start > 100 && random(0,1)>0.5) 
           {
            recorder.endRecord();
            recorder.save();
            shapes[mondrianNos++] = new mondrian(width-x_pos,height-y_pos,newsize,MondrianColors[int(random(0,9))]);    
            time_record_start = time;
            recorder = minim.createRecorder(in, "myrecording"+Integer.toString(mondrianNos)+".wav", true);
            recorder.beginRecord(); 
//            println("beginning recording: "+Integer.toString(mondrianNos));
          }
//         }
  }
  }
}

void stop()
{
  // always close Minim audio classes when you are done with them
  in.close();
  minim.stop();
  super.stop();
}



//run physics engine
void pos_update(float t)
{    //bounds
    x_pos=x_pos+x_vel*t+x_acc*t*t;
    y_pos=y_pos+y_vel*t+y_acc*t*t;
    
    x_vel+=x_acc;
    y_vel+=y_acc;    

    if (x_pos>width && x_vel>0)
      x_pos-=width;
    if (y_pos>height && y_vel>0)
      y_pos-=height;
    if (x_pos<0 && x_vel<0)
      x_pos+=width;
    if (y_pos<0 && y_vel<0)
      y_pos+=height;


}


void changeAccel(float dx, float dy)
{
  x_acc+=dx;
  y_acc+=dy;
}

void changeVel(float dx, float dy)
{
  x_vel+=dx;
  y_vel+=dy;
}

void oscEvent(OscMessage theOscMessage) {
// print the address pattern and the typetag of the received OscMessage 
//  print("### received an osc message.");
//  print(" addrpattern: "+theOscMessage.addrPattern());
//  println(" typetag: "+theOscMessage.typetag());
//  println(" typetag: "+theOscMessage.typetag());
  
  
//get acceleration and set to velocity  
    if(theOscMessage.checkAddrPattern("/accxyz")==true) {
    /* check if the typetag is the right one. */
    if(theOscMessage.checkTypetag("fff")) {
      /* parse theOscMessage and extract the values from the osc message arguments. */
      float x = theOscMessage.get(0).floatValue();  
      float y = theOscMessage.get(1).floatValue();
      float z = theOscMessage.get(2).floatValue();
      x_vel=speed*x;
      y_vel=speed*y;

//      x_acc=e*x;
//      y_acc=e*y;
//      x_vel=x*e;
//      y_vel=y*e;
      return;
    }  
  } 
  //println("### received an osc message. with address pattern "+theOscMessage.addrPattern());
  else 
  background(255);
  
}


void clear()
{
  background(255);
  for (int i=0;i<mondrianNos;i++)
  {
    File f = new File("myrecording"+i+".wav");
    if (f.exists()) 
    {
      f.delete();
     }
    
  }
  mondrianNos=0;
  recorder.endRecord();
  recorder = minim.createRecorder(in, "myrecording0.wav", true);
  time = 0;
  player.pause();
  player = minim.loadFile("myrecording.wav", MY_SRATE);
  
}
