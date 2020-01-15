
% Mayank Sanganeria / Lab 2-1

fs = 44100;
freq = 440;
t = [0 : 1/fs : 5];
x = 0.5*sin(2*pi*freq*t);
sound(x,fs);

wavwrite(x,fs,'mysound.wav');