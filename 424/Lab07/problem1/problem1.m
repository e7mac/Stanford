% question 1a

[x,fs] = wavread('p1.wav');

spectrogram(x(:,1),1024);

% question 1b



% question 1c
% Parameters used:
% T60_low = 3.5
% T60_high = 1
% Fc = 500 Hz
% Gain = 7 dB
% Q = 0.25
% Transition = 3858 Hz
% Wet/Dry = 100%