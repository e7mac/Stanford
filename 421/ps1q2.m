N = 1024; % window length
w = (.42 - .5*cos(2*pi*(0:N-1)/(N-1)) + .08*cos(4*pi*(0:N-1)/(N-1)));
% Blackman window
fs = 8192;
t = 0 : 1/fs : (N-1)/fs;
signal = 0.6*cos(0.25*2*pi + 1000*2*pi*t);
windowed_signal = signal .* w;
y = windowed_signal;

subplot(3,2,1);
plot(signal)

subplot(3,2,2);
plot(w)

subplot(3,2,3);
plot(windowed_signal)

spectrum = log(abs(fft(windowed_signal,4*N)));

subplot(3,2,4);

plot(fftshift(20*log10(abs(fft(y))./max(abs(fft(y))))));