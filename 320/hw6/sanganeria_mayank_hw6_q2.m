% Mayank Sanganeria / Lab 6-2

zpf = 8;
fs = 128;
t = 0:1/fs:1;
x = sin(2*pi*16.0625*t);
w = boxcar(length(x));
x = x(:);
x_w = w.* x;
subplot(2,1,1);
plot(t,x_w);
xlabel('time (s)');
ylabel('amplitude');
title('sinusoid at 16.0625 Hz');

subplot(2,1,2);

spec = [x_w' zeros(1,129)];

plotspec(spec,fs);
title('Spectrum with Boxcar window');