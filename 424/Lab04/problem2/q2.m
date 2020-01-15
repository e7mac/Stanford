% question 2a

% if an offset is added to the output of the non-linearity, theoretically
% the sound remains the same since the vibrations created would be the same
%, just about a different 'mean'.

% question 2b


[y,fs] = wavread('sineDist00.wav');

[z,fs] = wavread('sineDist10.wav');

figure()
subplot(2,1,1), spectrogram(y(:,1),blackman(16384));
title('DC offset = 0 without DC blocker')
subplot(2,1,2), spectrogram(z(:,1),blackman(16384));
title('DC offset = 1 without DC blocker')

% the 2 plots are for DC Offset of 0.5 and 0.9
% DC Offset 0.5 has more energy and is spread out near the fundamental and
% its harmonics. For DC Offset 0.9, the energy gets narrowly concentrated
% near the fundamental and their harmonics. Both of them have even an odd
% harmonics

%  question 2c
% 
b = [1 0 0];
a = [1 2*2*pi*5 2*pi*5*2*pi*5];


[bz,az] = bilinear(b,a,48000);
figure()
impz(bz,az);
 
% the impulse response settles in 1 sample according to the above
% calculations.

[y,fs] = wavread('sineDist00dc.wav');
[z,fs] = wavread('sineDist10dc.wav');

figure()
subplot(2,1,1), spectrogram(y(:,1),blackman(16384));
title('DC offset = 0 with DC blocker')
subplot(2,1,2), spectrogram(z(:,1),blackman(16384));
title('DC offset = 1 with DC blocker')
