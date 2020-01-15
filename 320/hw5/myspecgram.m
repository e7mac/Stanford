
function myspecgram (x, fs, Nf)
  % function myspecgram (x, fs, Nf)
  % A function to plot the spectrogram of input signal
  % using hann window and zpf = 8
  %
  % x: input signal (assume a row vector)
  % fs: sampling rate of x
  % Nf: frame size (in samples)
  %
  % Mayank Sanganeria / Lab 5-2
  
zpf=8;                                      %zero pad factor
x = x(:);
window = hann(Nf);                          %hann window
w = window(:);
N = length(x);                              %total length
nframes = floor(N/Nf);                      %no of frames
X=zeros(Nf*zpf,nframes);                    %fft pre allocation
zp = zeros((zpf-1)*Nf,1);                   %zero pad

for i=1:nframes                             %iterate through frames
 t=(i-1)*Nf+1:i*Nf;                         %get time
 x_slice=x(t);                              %get slice of signal
 x_slice = x_slice.*w;                      %multiply with window
 x_sig = [x_slice' zp'];                    %pad with zeros
 X(:,i) = fft(x_sig);                       %get fft and add to matrix
end
 
t = (0:N/Nf)*Nf/fs;                         %time vector
f = (0:Nf*zpf-1)*fs/Nf/zpf;                 %frequency vector
Xdb = 20*log10(abs(X));                     %fft in db
Xmax = max(max(Xdb));                       %max
scale = [Xmax-500,Xmax];                    %scale factor
imagesc(t,f,Xdb,scale);                     %plot
% grid;
colormap(winter);
title('Spectrogram');
xlabel('Time (s)');
ylabel('Freq (Hz)');