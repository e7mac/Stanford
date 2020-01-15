%% Clear all the data
clear all; close all; clc;

% Load the data
load data
 
% Plot
plot(violinist(1,:), violinist(2,:), 'x', 'MarkerSize', 14)
grid on; hold on;; axis([-.5 1.5 -.5 1.5])
text(violinist(1,1), violinist(2,1), '  v  1'); 
text(violinist(1,2), violinist(2,2), '  v  2');
text(violinist(1,3), violinist(2,3), '  v  3');

plot(mic(1,:), mic(2,:), 'ro', 'MarkerSize', 14)
legend('violinist', 'Mic')
text(mic(1,1), mic(2,1), '  mic  1'); 
text(mic(1,2), mic(2,2), '  mic  2');
text(mic(1,3), mic(2,3), '  mic  3');
title('Recording Configuration')
xlabel('X dimension ')
ylabel('Y dimension ')

%% Your Code here

matrix=zeros(3,3);

for i=1:3                                               
    for j=1:3
    tmp=xcorr2(mixedSignals(:,i),cleanSignals(:,j));    %get correlation data
    [y, matrix(i,j)]=max(tmp);                          %time for maximum correlation
    end
    
end

final=(matrix./min(min(matrix))-1)*10000                 %arbitrary normailzation

% from the final matrix,we get
% mixedSignals(1) = mic 2
% mixedSignals(2) = mic 1
% mixedSignals(3) = mic 3

% We infer this by the fact that the final matrix
% has a not-to-scale measure of how long it took for the
% sound to reach the individual mics. Since Player 2 is
% equidistant from mics 1 and 3, the odd one is mic 2. Mic 1
% is closer to Player 1 than mics 2 and 3 so is the quickest
% to receive sound from Player 1. The remaining one is mic 3,
% as can be verified by the mirrored data for mic 1.