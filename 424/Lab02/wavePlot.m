function [] = wavePlot( filename )
%WAVEPLOT Summary of this function goes here
%   Detailed explanation goes here

[x,fs] = wavread(filename);
t = (0:length(x/fs)-1)/fs;
plot(t,x);
xlabel('time (s)');
ylabel('amplitude');

end
