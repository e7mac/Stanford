function [ slope ] = findRolloff( signal,fs )
%FINDT60 Find T60 of an input signal's smoothed energy envelope
%   For input, give signal and fs. It outputs the time taken to decay to
%   -60dB of the maximum.


% find maximum
[signal_max, t_max] = max(signal);


% find 60 dB decay
cropped_signal = signal(t_max:length(signal));

[signal_60, t_60] = min(abs(cropped_signal-signal_max*0.001));

% scale to seconds
slope = 20*log(signal_max/signal_60) / (t_max-t_60) * fs;

end