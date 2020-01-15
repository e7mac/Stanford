// important: shred me only once or an error will be thrown
// to re-shred: stop and restart Virtual Machine

/*  use this file to declare a public class for reading in a data file
  and play the data with a separate "player" file
  or type in a data file's full pathname as argument to this file and 
  it'll play the data file itself
  in miniAudicle the argument goes into the text field just above this 
  document or in command line chuck it goes after this file e.g.,
  chuck hw5-reader.ck:/user/c/cc/220a/hwInstructions/hw5/hw5-drywhite.dat

  this file can only be shredded once since it declares a public class
*/


// define the DataReader public class
// reads time series file and serves up values
// expects single column of float or int data
public class DataReader { 
  string inFilename;
  999999999999.9 => float bigNum;
  bigNum => float minVal;
  -bigNum => float maxVal;
  float range;
  float scale;
  0 => int cnt;
  0 => int numPoints;
  fun float min() { return minVal; }
  fun float max() { return maxVal; }
  fun float rng() { return range; }
  fun float scl() { return scale; }
  fun int count() { return cnt; }
  float val;

  // set data file
  fun void setDataSource( string f )
  {
      f => inFilename; // full path
  }

  // file pointer
  FileIO @ in;
  new FileIO @=> in;
  
  // flag end of file
  true => int finished;
  fun int isFinished() { return finished || (numPoints && (cnt >= numPoints)); }
  
  // flag if calibrated
  false => int calibrated;
  fun int isCalibrated() { return calibrated; }
  
  // open file, close first if already opened
  fun void openData( )
  {
    if( in.good() ) in.close();
    false => finished;
    in.open( inFilename, FileIO.READ );
    <<<inFilename>>>;
    if( !in.good() ) <<< "can't open file: ", inFilename, " for reading">>>;
  }

  // run through all data points to find statistics
  fun void calibrate( )
  {
    bigNum => minVal;
    -bigNum => maxVal;
    openData();
    while(next()) 
    { 
      if (val > maxVal) val => maxVal;
      if (val < minVal) val => minVal;
    }
    <<<cnt, "data points">>>;
    max()-min() => range;
    1.0 / rng() => scale;
    true => calibrated;
    cnt => numPoints;
  }

  // hack that will check if input string is actually a number, maybe not foolproof
  fun int isNumber (string s)
  { // handle all cases where string is equal to zero
    if (s=="0") return true;
    if (s=="0.0") return true;
    if (s=="0.00") return true;
    if (s=="0.000") return true;
    if (s=="0.0000") return true;
    if (s=="0.00000") return true;
    // all other cases
    return !(Std.atof(s)==0.0000); // atof returns zero if non-number string
  }

  // read a line if we can and input a number after checking for validity
  fun int next()
  {
    if (!in.good()) {<<<"file not open">>>; return false;}
    if (isFinished()) {return false;}
    -1.0 => val; // default value of -1.0 intentionally out of range    
    string s;
    in => s; // first read a string up to first space or newline
    if (in.eof()) 
    {
      //<<<"encountered EOF">>>; 
      true => finished; 
      return false;
    }
    in.readLine() => string rest; // read rest of line
    cnt++; // number of lines read
    if (isNumber(s))
      Std.atof(s) => val; // should be good to go
    else <<< "non-number string found in data, line ", cnt, " = ", s+rest>>>;
    return true;
  }

  // calibrate and cue up at start 
  fun void start( )
  {
    if (!calibrated) calibrate();
    0 => cnt;
    openData();
  }

  // return one datum 
  fun float nextVal( )
  {
    next(); 
    return val;
  }

  // scaled version 
  fun float scaledVal( ) { return scl() * (nextVal() - min()); }

} // end of class definition

// optional very simple player 
// invoked only if argument is supplied
if (me.args()) 
{ 
  DataReader data;
  data.setDataSource(me.arg(0)); // file name is assumed to be first argument
  data.start();
  data.scaledVal();
  SinOsc s => dac;
  while (!data.isFinished())
  {
    data.scaledVal() => float val; // next data point, scaled in 0.0 - 1.0 range
    s.gain(val);
    s.freq(Std.mtof(80.0 + val*20.0));
    100::ms => now;
  }
}
