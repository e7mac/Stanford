function [ signal5 ] = findT5_level( signal,fs )
%FINDT60 Find T60 of an input signal's smoothed energy envelope
%   For input, give signal and fs. It outputs the time taken to decay to
%   -60dB of the maximum.


% find maximum
signal_max = max(signal);

% find 60 dB decay
signal5 = min(abs(signal-signal_max*0.5623));

end