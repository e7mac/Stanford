% sinc-windowed-starter-code.m

n = 1 : 101; % time axis
fs = 44100;
h = 40000*sin(40000*n / fs) ./ (40000*n / fs);% length 101 impulse response
N = length(n);

figure(1);
stem(n,h);
xlabel('Time (samples)');
ylabel('Amplitude');
title('Impulse Response');
grid('on');

figure(2);
Nfft = 2048;
Ns = 1+Nfft/2;
H = fft(h,Nfft);
Hs = H(1:Ns);
Hsdb = 20*log10(abs(Hs));
f = [0:Ns-1]/Nfft;
plot(f,Hsdb);
xlabel('Normalized Frequency');
ylabel('Magnitude (dB)');
title('Amplitude Response, Rectangular Window');
grid('on');

figure(4);
beta = 8;% Kaiser window beta
hw = fftshift(kaiser(length(h),beta)') .* h;% Kaiser-windowed impulse response
Hw = fft(hw,Nfft);
Hws = Hw(1:Ns);
Hwsdb = 20*log10(abs(Hws));
plot(f,Hwsdb);
xlabel('Normalized Frequency');
ylabel('Magnitude (dB)');
title(sprintf('Amplitude Response, Kaiser window with beta = %2.0f',beta));
grid('on');

figure(5);
hold on;
plot(f,Hsdb);
plot(f,Hwsdb,'r');
xlabel('Normalized Frequency');
ylabel('Magnitude (dB)');
title(sprintf(['Amplitude Response Overlay, ',...
               'Rectangular and Kaiser window with beta = %2.0f'],beta));
grid('on');

% Zoom in on the transition
figure(6);
nm = (Ns-1)/2;
n1 = round(nm*0.92);
n2 = round(nm*1.15);
H1 = Hsdb(n1:n2);
H2 = Hwsdb(n1:n2);
hold on;
plot(f(n1:n2),H1);
plot(f(n1:n2),H2,'r');
xlabel('Normalized Frequency');
ylabel('Magnitude (dB)');
title(sprintf(['Amplitude Response Transition Overlay, ',...
               'Rectangular and Kaiser window with beta = %2.0f'],beta));
grid('on');
