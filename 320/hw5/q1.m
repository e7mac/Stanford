% Mayank Sanganeria / Lab 5-1

fs = 128;                                       % sampling frequency
t = 0 : 1/fs : 1;                               % time
x = sin(2*pi*16.0625*t);                        % signal
zpf = 250;                                      % zero pad factor
N=length(x);                                    % length of signal
plotspec([x,zeros(1,(N-1)*zpf)],fs);            % plot


%value of zpf used = 250