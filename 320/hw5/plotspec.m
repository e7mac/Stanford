function plotspec (x, fs)

% function plotspec (x, fs)
% A function to quickly plot the spectrum of a time domain signal
%
% plotspec(x)
%when no sampling rate is specified, normalize frequency
if nargin == 1    
    fs=1;
end

% plotspec(x, fs)
%when a sampling rate is given, set the frequency axis in [Hz]
% Mayank Sanganeria / Lab 4-1

N    = length(x);                            % size of N-point DFT
f    = (-N/2:N/2-1)*(fs/N);                  % frequency vector
X    = fft(x);                               % FFT
Xs   = fftshift(X);                          % shift it for plotting
Xdb  = 20*log10(abs(Xs)/abs(max(Xs)));
plot(f,Xdb)                              % plot the waveform
title('Magnitude Spectrum');
xlabel('frequency (Hz)'); ylabel('magnitude (dB)');    % label the axes