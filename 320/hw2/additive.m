
function y = additive(f, Z, fs, dur, name)
% function y = additive(f, Z, fs, dur, name)
% f: vector of frequencies in Hz
% Z: vector of complex amplitudes A*exp(j*phi)
% fs: sampling rate in Hz
% dur: total duration of the signal in seconds
% name: name of the output audio file
% f and Z must be of the same length:
% Z(1) corresponds to f(1) and so on.
% Mayank Sanganeria / Lab 2-3

y=zeros(length(Z),1);
time = 1:1/fs:dur;

for i=1:length(Z)
    y(i)=y(i)+exp(j*2*pi*f(i)*time);
end

sound(real(y),fs);