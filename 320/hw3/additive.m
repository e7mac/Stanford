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

t = 1:1/fs:dur;
Z=Z(:);
Zt = conj(Z');
f=f(:);

waves = sin(2*pi*f*t);
y = Zt*waves;
y=real(y);
y=0.9*y/max(y);

%sound(y, fs);
wavwrite(y,fs,name);

end
