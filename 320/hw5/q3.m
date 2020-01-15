% Mayank Sanganeria / Lab 5-3

w1=100; w2=3000; %(Hz)
T=3; %(sec)
fs=8000; %(Hz)
dT=1/fs;
t=(0:dT:T);
up = chirp(t,w1,T,w2);
%myspectrogram(up,300,fs,hann(300-1),1,1,100);
myspecgram(up,fs,100);

%I get a spectrum which shows a linearly increasing
%frequency which is what is expected. The negative
%frequency wraps around and comes up in the graph 
%which is fine.