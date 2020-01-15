w = pi*[1/120 1/12 5/12];
% w = pi*[0 0.5 1];
h = [0.999 0.99 0.9];
nb = 1;
na = 1;

[b,a] = invfreqz(h,w,nb,na);
% freqz(b,a);
% impz(b,a);

B_h = a;
A_h = [a zeros(1,100-(length(a))) b];


% edc plotting begins here
fs = 44100;
[signal, T] = impz(B_h, A_h, [] , fs);


minPlotDB = -60; % minimum value in DB to be plotted
frameSizeMS = 30; % minimum frame length, in ms
overlap = 0.5; % fraction of frame overlapping
windowType = 'hann'; % type of windowing used for each frame

% calculate STFT frames
minFrameLen = fs*frameSizeMS/1000; 
frameLenPow = nextpow2(minFrameLen);
frameLen = 2^frameLenPow; % frame length = fft size
eval(['frameWindow = ' windowType '(frameLen);']);
     %%% WRITE CODE HERE %%%
     % Complete the rest of the code in order to compute the signal
     % spectrogram. Use the Matlab function "specgram", and
     % save the result into vectors [B,F,T] (this will be used
     % later for plotting the time and frequency axes).
     
     [B,F,T] = specgram( (signal),frameLen,fs,frameWindow);

% calculate the EDR
     %%% WRITE CODE HERE %%%
     % The variable "B_EDRdb" is the EDR in units of decibels.
     % Keep the matrix orientation of the EDR the same as the spectrogram. 
     % Implementation hint: It is faster to calculate the EDR going
     % backward in time rather than forward.
     B_EDRdb = 0 * B;
     for i = length(B(:,1)) - 1: -1: 1
         for j = 1 : length(B(1,:))
             B_EDRdb(i,j) = B_EDRdb(i + 1,j) + abs(B(i,j))^2;
         end 
     end
     B_EDRdb = 10*log10(B_EDRdb);
% normalize EDR to 0 dB and truncate the plot below a given dB threshold
offset = max(max(B_EDRdb));
B_EDRdbN = B_EDRdb - offset;
[nBins,nFrames] = size(B_EDRdbN);
for i=1:nFrames
  I = find(B_EDRdbN(:,i) < minPlotDB);
  if (I)
    B_EDRdbN(I,i) = minPlotDB;
  end
end

% plot the energy decay relief
figure(gcf);clf;
mesh(T,F/1000,B_EDRdbN);
view(130,30);
title('Normalized Energy Decay Relief (EDR)');
xlabel('Time (s)');ylabel('Frequency (kHz)');zlabel('Magnitude (dB)');
axis tight;zoom on;
figure();
specgram( 0.5*(signal(:,1)+signal(:,1) ),frameLen,fs,frameWindow);