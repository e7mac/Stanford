% question 1b

% try out the 3 kinds of filters

% [B_butter, A_butter] = butter(12,0.12);
[B_cheby, A_cheby] = cheby2(12,96,0.16);
% [B_ellip, A_ellip] = ellip(12,1/8);


% obtain SOS
% [co,g] = tf2sos(B_butter, A_butter);
[co,g] = tf2sos(B_cheby, A_cheby);

% better display function to copy paste directly to code
matrify(co)
disp(g)

% plot output
[x,fs] = wavread('sweep1bsoft.wav');
[y,fs] = wavread('sweep1bhard.wav');

subplot(2,1,1), spectrogram(x(:,1),1024);
subplot(2,1,2), spectrogram(y(:,1),1024);

%the aliasing is a lot more when a hard clip is used as compared to a soft
%clip because the presence of a hard corner adds infinite bandwidth to the
%signal and hence a lot more of the frequencies above nyquist gain
%amplitude and flip around to alias

% aside from the aliasing the hard clip produces a 'brighter' tone as the
% higher frequencies have more energy than the comparable soft clipped
% signal