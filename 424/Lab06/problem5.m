% Problem 5a

% exponential sweep IR estimate

[rs, fs] = wavread('ssx_20_response.wav');
[ss, fs] = wavread('ssx_48_20.wav');
cs = real(ifft(1./fft(ss)));
cs = cs(2^20-2^16+1:end);
irhatx = real(ifft((fft(cs, 2^21)*[1 1]).*fft(rs, 2^21)));
% ftgram(irhatx(2^20+[1:5*fs],1), fs, 'rir');

t = [1:length(irhatx)]/fs;

irhatx = irhatx(23.236*fs:length(irhatx),1);
t = [1:length(irhatx)]/fs;

% plot(t,irhatx);
[maxm,tr] = max(irhatx);
tr = 0.01;
e1 = sum(irhatx([1:fs*tr]).^2);
new_ir = [e1^0.5 zeros(1,fs*tr-1) irhatx(fs*tr:length(irhatx))'];

tr2 = 2374/fs;
e2 = sum(irhatx([fs*tr:fs*tr2]).^2);

new_ir = [new_ir(1:tr2*fs) e2^0.5 zeros(1,fs*tr2-fs*tr-1) irhatx(fs*tr2:length(irhatx))'];

tL = tr2+tr;

rest = [1+zeros(1,fs*tr2) zeros(1,fs*tL-fs*tr2) 0.5*(1+cos(2*pi*[fs*tL:fs*tL+0.002*fs]/0.004))];

w = [rest 1+zeros(1,length(new_ir)-length(rest))];

new_ir = new_ir.*w;


t = [1:length(new_ir)]/fs;
plot(t,new_ir);
title('Modified IR');
xlabel('Time(s)');
ylabel('Amplitude');

figure();
ftgram(new_ir(1,:), fs, 'rir');

% Problem 5b
[y,fs] = wavread('vocal recordings/TomsDiner_full.wav');

irhatx = irhatx(1.2e05:length(irhatx));
new_ir = new_ir(1.2e05:length(irhatx));


% y_oldIR = fftfilt(irhatx,y(:,1));
% y_newIR = fftfilt(y(:,1),new_ir);


% wavwrite(y_oldIR,'vocal recordings/TomsDiner_full_old.wav',fs);
% wavwrite(y_newIR,'vocal recordings/TomsDiner_full_new.wav',fs);