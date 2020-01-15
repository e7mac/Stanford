% question 1a

[x,fs] = wavread('linearSweep.wav');
[y,fs] = wavread('sweep1a.wav');

subplot(2,1,1), spectrogram(x,1024)
subplot(2,1,2), spectrogram(y(:,1),1024)

% When the frequecy sweeps above the nyquist, we can hear the 
% frequencies decreasing, which never actually happens and 
% therefore would not be audible were it not for aliasing.

