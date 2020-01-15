
% Mayank Sanganeria / Lab 8-1


%part a
N=10;
b=fir1(N,0.5);                     %generate filter 0.5 to correspond to 1/4 of sampling rate
h=filter(b,1,[1; zeros(20,1)]);    % impulse response
figure(1);
stem(h);


%part b
figure(2);                          %plot amplitude and phase response
freqz(b);


%part c
figure(3);
wn=randn(4096,1);                   %generate random signal
filt=filter(b,1,wn);                %filter white noise

subplot(2,1,1);

plot(abs(fft([wn zeros(4096,1)])));       %plot white noise
title('input');
subplot(2,1,2);

plot(abs(fft([filt zeros(4096,1)])));     %plot filtered signal
title('output');