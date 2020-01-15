function [ t60 ] = lateDecayT60( signal,fs )
%FINDT60 Find T60 of an input signal's smoothed energy envelope
%   For input, give signal and fs. It outputs the time taken to decay to
%   -60dB of the maximum.


% find maximum
[signal_max, t_max] = max(signal);


% find 60 dB decay
cropped_signal = signal(t_max:length(signal));

[signal_5,t_5] = min(abs(cropped_signal-signal_max*0.5623));

[signal_65, t_65] = min(abs(cropped_signal-signal_max*5.6234e-04));


% scale to seconds
t60 = (t_65 - t_5) / fs;

end