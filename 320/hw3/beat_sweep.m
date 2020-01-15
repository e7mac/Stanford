function y_beat = beat_sweep(A, B, fc, f_delt, fs, dur, name)
% function y_beat = beat_sweep(A, B, fc, f_delt, fs, dur, name)
%
% A: amplitude of the center frequency cosine
% B: amplitude of the sweeping frequency cosine
% fc: center frequency in Hz
% f_delt: [f1 f2] vector for frequency sweeping
% fs: sampling rate in Hz
% dur: total duration of the signal in seconds
% name: name of the output audio file
% Your Name / Lab#-Q#

t = 1 : 1/fs : dur;
y_beat = A*cos(2*pi*fc*t)+B*chirp(t,fc+f_delt(1),dur,fc+f_delt(2));
y_beat=0.9*y_beat/max(y_beat);
wavwrite(y_beat,fs,name);
