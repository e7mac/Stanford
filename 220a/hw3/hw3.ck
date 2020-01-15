// demo of how to script a change after a duration has elapsed
// see below for a sectionI followed by a sectionII

////////////////////////////////////////////////////////////////
// play a cycle of pitches
4 => int nPitches;
// array to hold midi pitches (key numbers)
int keyn[nPitches]; 
[ 60, 62, 64, 66 ] @=> keyn;

////////////////////////////////////////////////////////////////
// against a cycle of a different length varying instrument parameters
3 => int nInsts;
// arrays to hold loudnesses, pitch register transposition, channel, instrument type
float           loud[nInsts]; 
float           tran[nInsts]; 
int             chan[nInsts]; 
StkInstrument   inst[nInsts];
Saxofony   sinst[nInsts];

// StkInstrument physical models to choose from
//     BandedWG BlowBotl BlowHole Bowed Brass Clarinet 
//     Flute StifKarp ModalBar Saxofony

// instantiate 3 instruments and set their output channels
BandedWG x @=> inst[0] => dac.chan(chan[0]);
BandedWG y @=> inst[1] => dac.chan(chan[1]);
BandedWG z @=> inst[2] => dac.chan(chan[2]);

//for (0=>int i; i<nInsts; i++) inst[i].controlChange( 16, 0); // select wood block

////////////////////////////////////////////////////////////////
// global parameters
100::ms => dur duration;            // set a common note duration
10.0 => dac.gain;                   // bump up the output level
1000::ms => dur ioi;                // starting inter-onset interval (inverse of tempo)
50::ms => dur minIoi;               // accelerate to this smallest ioi
0 => int p;                         // which pitch is next
0 => int i;                         // which instrument is next


////////////////////////////////////////////////////////////////
// sectionI
//Loudness Contour
[ 0.2, 0.2, 0.2 ] @=> loud; 
// pitch register contour
[ 1.0, 1.0, 1.0 ] @=> tran; // e.g., 2.0 for octave higher, 4.0 for two octaves, etc.
// channel contour 
[ 0, 0, 0 ] @=> chan;
5::second + now => time endOfSectionI;
while( now < endOfSectionI )
{   
    <<< p, i >>>;                   // print pitch index, instrument index
    Std.mtof( keyn[p] ) * tran[i] => inst[i].freq; // assign pitch as freq
    loud[i] => inst[i].noteOn;      // start note
//   inst[i].vent( vent[i] );        // tonehole
    duration => now;                // wait
    0.1 => inst[i].noteOff;         // stop note
    p++; i++;                       // increment note and instrument
    (p % nPitches) => p;            // cycle pitch through full array
    (i % nInsts) => i;              // cycle instrument through full array

    // advance time by interval and calculate the next time interval
    ioi => now;
    ioi * 0.8 => ioi;               // accelerate 
    if (ioi < minIoi) minIoi => ioi;// can't go faster than minIoi 
}

////////////////////////////////////////////////////////////////
// sectionII
[ 0.2, 0.2, 0.8 ] @=> loud; 
// pitch register contour
[ 1.0, 1.0, 1.0 ] @=> tran; // e.g., 2.0 for octave higher, 4.0 for two octaves, etc.
// channel contour 
[ 0, 0, 0 ] @=> chan;
BandedWG x2 @=> inst[0] => dac.chan(chan[0]);
BandedWG y2 @=> inst[1] => dac.chan(chan[1]);
BandedWG z2 @=> inst[2] => dac.chan(chan[2]);
10::second + now => time endOfSectionII;


while( now < endOfSectionII )
{   
    <<< p, i >>>;                   // print pitch index, instrument index
    Std.mtof( keyn[p] ) * tran[i] => inst[i].freq; // assign pitch as freq
    loud[i] => inst[i].noteOn;      // start note
//    inst[i].vent( vent[i] );        // tonehole
    duration => now;                // wait
    0.1 => inst[i].noteOff;         // stop note
    p++; i++;                       // increment note and instrument
    (p % nPitches) => p;            // cycle pitch through full array
    (i % nInsts) => i;              // cycle instrument through full array

    // advance time by interval and calculate the next time interval
    ioi => now;
    ioi * 0.8 => ioi;               // accelerate 
    if (ioi < minIoi) minIoi => ioi;// can't go faster than minIoi 
}

////////////////////////////////////////////////////////////////
// sectionIII
[ 0.2, 0.5, 0.5 ] @=> loud; 
// pitch register contour
[ 1.0, 1.0, 1.0 ] @=> tran; // e.g., 2.0 for octave higher, 4.0 for two octaves, etc.
// channel contour 
[ 0, 1, 0 ] @=> chan;

BandedWG x3 @=> inst[0] => dac.chan(chan[0]);
BandedWG y3 @=> inst[1] => dac.chan(chan[1]);
BandedWG z3 @=> inst[2] => dac.chan(chan[2]);
10::second + now => time endOfSectionIII;


while( now < endOfSectionIII )
{   
    <<< p, i >>>;                   // print pitch index, instrument index
    Std.mtof( keyn[p] ) * tran[i] => inst[i].freq; // assign pitch as freq
    loud[i] => inst[i].noteOn;      // start note
//    inst[i].vent( vent[i] );        // tonehole
    duration => now;                // wait
    0.1 => inst[i].noteOff;         // stop note
    p++; i++;                       // increment note and instrument
    (p % nPitches) => p;            // cycle pitch through full array
    (i % nInsts) => i;              // cycle instrument through full array

    // advance time by interval and calculate the next time interval
    ioi => now;
    ioi * 0.8 => ioi;               // accelerate 
    if (ioi < minIoi) minIoi => ioi;// can't go faster than minIoi 
}

////////////////////////////////////////////////////////////////
// sectionIV
[ 0.05, 0.2, 0.2 ] @=> loud; 
// pitch register contour
[ 1.0, 2.0, 1.0 ] @=> tran; // e.g., 2.0 for octave higher, 4.0 for two octaves, etc.
// channel contour 
[ 0, 0, 0 ] @=> chan;

Saxofony x4 @=> inst[0] => dac.chan(chan[0]);
BandedWG y4 @=> inst[1] => dac.chan(chan[1]);
BandedWG z4 @=> inst[2] => dac.chan(chan[2]);
10::second + now => time endOfSectionIV;


while( now < endOfSectionIV )
{   
    <<< p, i >>>;                   // print pitch index, instrument index
    Std.mtof( keyn[p] ) * tran[i] => inst[i].freq; // assign pitch as freq
    loud[i] => inst[i].noteOn;      // start note
//    inst[i].vent( vent[i] );        // tonehole
    duration => now;                // wait
    0.1 => inst[i].noteOff;         // stop note
    p++; i++;                       // increment note and instrument
    (p % nPitches) => p;            // cycle pitch through full array
    (i % nInsts) => i;              // cycle instrument through full array

    // advance time by interval and calculate the next time interval
    ioi => now;
    ioi * 0.8 => ioi;               // accelerate 
    if (ioi < minIoi) minIoi => ioi;// can't go faster than minIoi 
}

////////////////////////////////////////////////////////////////
// sectionV
[ 0.2, 0.2, 0.2 ] @=> loud; 
// pitch register contour
[ 1.0, 1.0, 1.0 ] @=> tran; // e.g., 2.0 for octave higher, 4.0 for two octaves, etc.
// channel contour 
[ 0, 1, 0 ] @=> chan;
10::second + now => time endOfSectionV;
[ 66, 73, 68, 75 ] @=> keyn;



while( now < endOfSectionV )
{   
    <<< p, i >>>;                   // print pitch index, instrument index
    Std.mtof( keyn[p] ) * tran[i] => inst[i].freq; // assign pitch as freq
    loud[i] => inst[i].noteOn;      // start note
//    inst[i].vent( vent[i] );        // tonehole
    duration => now;                // wait
    0.1 => inst[i].noteOff;         // stop note
    p++; i++;                       // increment note and instrument
    (p % nPitches) => p;            // cycle pitch through full array
    (i % nInsts) => i;              // cycle instrument through full array

    // advance time by interval and calculate the next time interval
    ioi => now;
    ioi * 0.8 => ioi;               // accelerate 
    if (ioi < minIoi) minIoi => ioi;// can't go faster than minIoi 
}

////////////////////////////////////////////////////////////////
// sectionVI
10::second + now => time endOfSectionVI;
[ 66, 67, 68, 69 ] @=> keyn;

while( now < endOfSectionVI )
{   
    <<< p, i >>>;                   // print pitch index, instrument index
    Std.mtof( keyn[p] ) * tran[i] => inst[i].freq; // assign pitch as freq
    loud[i] => inst[i].noteOn;      // start note
//    inst[i].vent( vent[i] );        // tonehole
    duration => now;                // wait
    0.1 => inst[i].noteOff;         // stop note
    p++; i++;                       // increment note and instrument
    (p % nPitches) => p;            // cycle pitch through full array
    (i % nInsts) => i;              // cycle instrument through full array

    // advance time by interval and calculate the next time interval
    ioi => now;
    ioi * 0.8 => ioi;               // accelerate 
    if (ioi < minIoi) minIoi => ioi;// can't go faster than minIoi 
}