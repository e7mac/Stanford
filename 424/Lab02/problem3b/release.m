% problem 3b

fs=44100;
t=0:1/fs:5;
threshold = 0.1;

% release-to-zero
level_estimate = 1*exp(-t);
gain = min(1,0.1./level_estimate);
plot(t,gain);

% release-to-threshold
hold on;
level_estimate = 0.9*exp(-t)+0.1;
gain = min(1,0.1./level_estimate);
plot(t,gain);

% release-to-threshold is more smooth since it never will have a
% discontinuity in the derivative of the gain