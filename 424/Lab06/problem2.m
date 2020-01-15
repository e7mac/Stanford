clear all;
% Problem 2


% Read in file
[x,fs] = wavread('filtered_noise_response.wav');
n = length(x);

% Split into different bursts
for i=1:8
    y(i,:) = x(1+(i-1)/8*n:i/8*n);
    y2(i,:) = y(i,:).*y(i,:);
    e(i,:) = conv(y2(i,:),boxcar(8000));
%      figure();
%      semilogy(e(i,:));
end

% for first burst
start =  [227300 224200 227000 220300 233000 216600 206600 198000 ];
finish = [233700 239500 271400 297000 340200 330900 276800 259800 ];

for i=1:length(start)
    X = start(i):finish(i);
    X_new = start(i):start(i)+2*(finish(i)-start(i));
    p = polyfit(X,e(i,X),50);
    Y = polyval(p,X_new);
    figure();
    time = (1:length(e(i,:)) )/fs;
    semilogy(time,e(i,:));
    hold on;
    plot(X_new/fs,Y,'r');
end


% T60 by inspection of graphs
freq = [16000 8000 4000 2000 1000 500 250 125];
T60 = [0.3 0.7 1.15 1.25 1.65 1.67 2.0 1.8];

for i=1:8
    out = sprintf('Frequency: %i Hz T60 = %.2f s',freq(i),T60(i));
    disp(out)
end