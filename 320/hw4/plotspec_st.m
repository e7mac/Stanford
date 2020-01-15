
function plotspec_st (x, fs, time, Nf)
% A function to quickly plot the spectrum of a signal
% segment centered at a given time
% x: input signal (assume a row vector)
% fs: sampling rate of x
% time: the time at which you want to see the spectrum
% Nf: frame (or slice) size
% Mayank Sanganeria / Lab 4-2

zpf=8;                                          %define zeropad factor
N = fs*Nf;                                      %size of slice in samples
t = floor(fs*time-N/2):floor(fs*time+N/2);      %vector with indices of time slice
x_slice = x(t);                                 %time sliced signal

h=hann(length(x_slice));                        %hann window of required size
signal = x_slice.*h';                           %applying window to signal            

zeropadsignal = [signal,zeros(1,(zpf-1)*N)];    %zero pad the signal
plotspec(zeropadsignal,fs);                     %plot the spectrum