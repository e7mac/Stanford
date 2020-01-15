% Mayank Sanganeria / Lab 3-1

fs    = 44100;
t     = 2;
f     = 441;
f_max = fs/2;

%square wave - odd harmonics, scales harmonic

harmonics = f : f*2 : f_max;
scale = 1 : 2 : 2*length(harmonics);
scale = 1./scale;

y=additive(harmonics,scale,fs,t,'square.wav');


subplot(3,1,1),plot(y);
axis([0 500 -1.2 +1.2]);
title('square wave');
xlabel('samples');ylabel('amplitude');

%triangle wave - odd harmonics, sclaes harmonic num^2

harmonics = f : f*2 : f_max;
scale = f*f./harmonics./harmonics;
scale = -scale.*cos(pi*(1:length(harmonics)));
y=additive(harmonics,scale,fs,t,'triangle.wav');
subplot(3,1,2),plot(y);
axis([0 500 -1.2 +1.2]);
title('triangle wave');
xlabel('samples');ylabel('amplitude');

%sawtooth wave - all harmonics, harmonic number

harmonics = f : f : f_max;
scale = 1 : length(harmonics);
scale = -1./scale;
scale = 5*scale;

y=additive(harmonics,scale,fs,t,'sawtooth.wav');
subplot(3,1,3),plot(y);
axis([0 500 -1.2 +1.2]);
title('sawtooth wave');
xlabel('samples');ylabel('amplitude');


%ANSWERS TO QUESTIONS
%square wave needed 7 harmonics
%square wave sounds a little harsh but has a bright feeling
%triangle wavw needed just 3
%triangle wave wave sounds a little subdued
%sawtooth wave needed about 17
%sawtooth wave sounds harsh but not that bright

