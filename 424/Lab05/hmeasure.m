function response = hmeasure(signal)
% HMEASURE - system response function for Problem Set 1, Music 424.
%
% RESPONSE = hmeasure(SIGNAL) returns the response of the unknown system
% h(t) to the input SIGNAL in the presence of additive white Gaussian
% noise.  Note that the input is clipped to have a maximum level of one.
% Note also that the input SIGNAL is converted to a column before
% processing, and that the return variable RESPONSE is a column as well.

%% initialization
signal = signal(:); %% convert signal to column
nsamp = length(signal); %% signal length, samples

load hmeasure.mat;  %% load impulse response, h
ntaps = length(h);  %% impulse response length, taps

sigma = 0.01;   %% noise standard deviation, amplitude

%% clip input signal
signal = min(1, max(-1, signal(:)));

%% filter input signal according to h
temp = fftfilt(h, [signal; zeros(ntaps,1)]);

%% add noise, return response
response = temp(1:nsamp) + sigma*randn(nsamp,1);
