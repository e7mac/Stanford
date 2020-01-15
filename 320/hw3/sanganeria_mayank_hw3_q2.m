% Mayank Sanganeria / Lab 3-2

%this file does not play any sounds. It writes the sound files so that you can track what you are playing


%fc=100
%f2 just after roughness zone
y=beat_sweep(1, 1, 100, [0 40], 44100, 8, '100f2.wav');
%f2 = 40 about where it starts sounding like a different tone
y=beat_sweep(1, 1, 100, [10 10], 44100, 8, '100fdel.wav');
%f1=10   for transition from beats to roughness
subplot(2,2,1);
plot(y(1:10000));
title('fc=100 Hz');
xlabel('samples');ylabel('amplitude');

%fc=300
%f2 just after roughness zone
y=beat_sweep(1, 1, 300, [0 90], 44100, 8, '300f2.wav');
%f2 = 90 about where it starts sounding like a different tone
y=beat_sweep(1, 1, 300, [30 30], 44100, 8, '300fdel.wav');
%f1=30   for transition from beats to roughness
subplot(2,2,2);
plot(y(1:5000));
title('fc=300 Hz');
xlabel('samples');ylabel('amplitude');

%fc=1000
%f2 just after roughness zone
y=beat_sweep(1, 1, 1000, [0 100], 44100, 8, '1000f2.wav');
%f2 = 100 about where it starts sounding like a different tone
y=beat_sweep(1, 1, 1000, [30 30], 44100, 8, '1000fdel.wav');
%f1=30   for transition from beats to roughness
subplot(2,2,3);
plot(y(1:5000));
title('fc=1000 Hz');
xlabel('samples');ylabel('amplitude');

%fc=3000
%f2 just after roughness zone
y=beat_sweep(1, 1, 3000, [0 110], 44100, 8, '3000f2.wav');
%f2 = 110 about where it starts sounding like a different tone
y=beat_sweep(1, 1, 3000, [25 25], 44100, 8, '3000fdel.wav');
%f1=25   for transition from beats to roughness
subplot(2,2,4);
plot(y(1:5000));
title('fc=3000 Hz');
xlabel('samples');ylabel('amplitude');


%the plot of the signal that transitions from beats to roughness looks like
%a sine wave enveloped by another sine wave of a much lower frequency
