clear all;
% problem 4a

[y,fs] = wavread('balloon_Kevin.wav'); 

freq =       [125     250     500     1000    2000    4000    8000    16000];

w_c = 125*2.^[0:7];
w_c = w_c/fs*2;

% filter 125 Hz
[b,a] = butter(3,(w_c(1)*w_c(2))^0.5,'low');
f = filtfilt(b, a, y);
f2 = abs(f(:,1).*f(:,2));
powerEstimate(1) = findT5_level(f2);

% filter 250-8k
for i=2:length(w_c)-1
    [b, a] = butter(3,[(w_c(i-1)*w_c(i))^0.5 (w_c(i)*w_c(i+1))^0.5]);
    f = filtfilt(b, a, y);
    f2 = abs(f(:,1).*f(:,2));
    powerEstimate(i) = findT5_level(f2);
end

% filter 16k
[b,a] = butter(3,(w_c(7)*w_c(8))^0.5,'high');
f = filtfilt(b, a, y);
f2 = abs(f(:,1).*f(:,2));
powerEstimate(8) = findT5_level(f2);

figure();
plot(freq,powerEstimate);
xlabel('Frequency (Hz)');
ylabel('Power Estimate');
title('Equalization');

% problem 4b
% to synthesize the IR, we will take white noise, filter it through the
% different octave wide filters, multiply by the power of each band and
% decay exponentially with the decay rate


decayRate =[-86.1249 -100.6026  -73.9751  -52.3742  -93.4506  -93.8774 -427.3904 -600.7238];


% filter 125 Hz
[b,a] = butter(3,(w_c(1)*w_c(2))^0.5,'low');
noise = rand(fs,1);
ir(1,:) = powerEstimate(1)*filtfilt(b, a, noise);
window(1,:) = exp(decayRate(1)*[1/fs:1/fs:1]);


% filter 250-8k
for i=2:length(w_c)-1
    [b, a] = butter(3,[(w_c(i-1)*w_c(i))^0.5 (w_c(i)*w_c(i+1))^0.5]);
    noise = rand(fs,1);
    ir(i,:) = powerEstimate(i)*filtfilt(b, a, noise);
    window(i,:) = exp(decayRate(i)*[1/fs:1/fs:1]);

end

% filter 16k
[b,a] = butter(3,(w_c(7)*w_c(8))^0.5,'high');
noise = rand(fs,1);
ir(8,:) = powerEstimate(8)*filtfilt(b, a, noise);
window(8,:) = exp(decayRate(8)*[1/fs:1/fs:1]);

final_ir=0;
for i=1:8
    final_ir = final_ir + ( ir(i,:).*window(i,:) );
end

figure();
ftgram(final_ir, fs, 'rir', 'nskip', 32, 'waveform', false, 'dbrange', 80);
