clear all;
% problem 3a

[y,fs] = wavread('balloon_Kevin.wav'); 
n = 0:length(y)-1;
n = n./fs;

impulse_start = 0.3849*fs;

y_25s = y(impulse_start:impulse_start+2.5*fs);
y_300ms = y(impulse_start:impulse_start+0.3*fs);

figure();
ftgram(y_25s, fs, 'rir', 'nskip', 32, 'waveform', false, 'dbrange', 80);

figure();
ftgram(y_300ms, fs, 'rir', 'nskip', 32, 'waveform', false, 'dbrange', 80);

% problem 3b

w_c = 125*2.^[0:7];
w_c = w_c/fs*2;

[b,a] = butter(3,(w_c(1)*w_c(2))^0.5,'low');
figure();
freqz(b,a);
title(w_c(1)*fs/2);

for i=2:length(w_c)-1
    [b, a] = butter(3,[(w_c(i-1)*w_c(i))^0.5 (w_c(i)*w_c(i+1))^0.5]);
    figure();
    freqz(b,a);
    title(w_c(i)*fs/2);
end

[b,a] = butter(3,(w_c(7)*w_c(8))^0.5,'high');
figure();
freqz(b,a);
title(w_c(8)*fs/2);

% problem 3c

freq =       [125     250     500     1000    2000    4000    8000    16000];

% filter 125Hz
[b,a] = butter(3,(w_c(1)*w_c(2))^0.5,'low');
f = filtfilt(b, a, y);
f2 = abs(f(:,1).*f(:,2));
e = conv(f2,boxcar(5000));
figure();
plot([1:length(e)]/fs,20*log10(e));
ylim([-150 50]);
xlim([0 5]);
hold all;
T60_Kevin(1) = lateDecayT60(e,fs);
decayRate_Kevin(1) = lateDecayRolloff(e,fs);



% filter 250-8k
for i=2:length(w_c)-1
    [b, a] = butter(3,[(w_c(i-1)*w_c(i))^0.5 (w_c(i)*w_c(i+1))^0.5]);
    f = filtfilt(b, a, y);
    f2 = abs(f(:,1).*f(:,2));
    e = conv(f2,boxcar(5000));
    plot([1:length(e)]/fs,20*log10(e));
    T60_Kevin(i) = lateDecayT60(e,fs);
    decayRate_Kevin(i) = lateDecayRolloff(e,fs);
end

% filter 16k
[b,a] = butter(3,(w_c(7)*w_c(8))^0.5,'high');
f = filtfilt(b, a, y);
f2 = abs(f(:,1).*f(:,2));
e = conv(f2,boxcar(5000));
plot([1:length(e)]/fs,20*log10(e));
legend('125Hz','250Hz','500Hz','1000Hz','2000Hz','4000Hz','8000Hz','16000Hz');
title('Kevins Baloon');
T60_Kevin(8) = lateDecayT60(e,fs);
decayRate_Kevin(8) = lateDecayRolloff(e,fs);

figure();
semilogx(freq,T60_Kevin);
xlabel('Frequency (Hz)');
ylabel('T60(s)');
title('Kevins Baloon');
figure();
semilogx(freq,decayRate_Kevin,'r');
xlabel('Frequency (Hz)');
ylabel('Decay Rate');
title('Kevins Baloon');


% repeat for different balloon pop



[y,fs] = wavread('balloon_Haying.wav');

% filter 125Hz
[b,a] = butter(3,(w_c(1)*w_c(2))^0.5,'low');
f = filtfilt(b, a, y);
f2 = abs(f(:,1).*f(:,2));
e = conv(f2,boxcar(5000));
figure();
plot([1:length(e)]/fs,20*log10(e));
ylim([-150 50]);
xlim([0 5]);
hold all;
T60_Haying(1) = lateDecayT60(e,fs);
decayRate_Haying(1) = lateDecayRolloff(e,fs);


% filter 250-8k
for i=2:length(w_c)-1
    [b, a] = butter(3,[(w_c(i-1)*w_c(i))^0.5 (w_c(i)*w_c(i+1))^0.5]);
    f = filtfilt(b, a, y);
    f2 = abs(f(:,1).*f(:,2));
    e = conv(f2,boxcar(5000));
    plot([1:length(e)]/fs,20*log10(e));
    T60_Haying(i) = lateDecayT60(e,fs);
    decayRate_Haying(i) = lateDecayRolloff(e,fs);
end

% filter 16k
[b,a] = butter(3,(w_c(7)*w_c(8))^0.5,'high');
f = filtfilt(b, a, y);
f2 = abs(f(:,1).*f(:,2));
e = conv(f2,boxcar(5000));
plot([1:length(e)]/fs,20*log10(e));
legend('125Hz','250Hz','500Hz','1000Hz','2000Hz','4000Hz','8000Hz','16000Hz');
title('Hayings Baloon');
T60_Haying(8) = lateDecayT60(e,fs);
decayRate_Haying(8) = lateDecayRolloff(e,fs);


figure();
semilogx(freq,T60_Haying);
xlabel('Frequency (Hz)');
ylabel('T60(s)');
title('Hayings Baloon');
figure();
semilogx(freq,decayRate_Haying,'r');
xlabel('Frequency (Hz)');
ylabel('Decay Rate');
title('Hayings Baloon');

% Comparing the T-60 of the 2 balloons, we find that both values are
% following the same pattern, confirming that they were both in very
% similar spaces



% Problem 3d

% by inspection
freq = [125    250    500    1000    2000    4000    8000    16000 ];
SNR  = [1.39e4 1.58e5 9.24e5 4.43e5  4.77e5  1.07e6  2.43e5  5.13e4  ]


