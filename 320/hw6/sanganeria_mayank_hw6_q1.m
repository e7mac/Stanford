% Mayank Sanganeria / Lab 6-1

size = 128;
zpf=8;
x = boxcar(size);
x = x(:)';
subplot(3,2,1);
plot(x);
xlabel('Samples');
ylabel('Amplitude');
x_zp = [x zeros(1,128*7)];
subplot(3,2,2);
plotspec(x_zp);
xlabel('Normalized Frequency');

x = bartlett(size);
x = x(:)';
subplot(3,2,3);
plot(x);
xlabel('Samples');
ylabel('Amplitude');
x_zp = [x zeros(1,128*7)];
subplot(3,2,4);
plotspec(x_zp);
xlabel('Normalized Frequency');


x = hann(size);
subplot(3,2,5);
plot(x);
x = x(:)';
xlabel('Samples');
ylabel('Amplitude');
x_zp = [x zeros(1,128*7)];
subplot(3,2,6);
plotspec(x_zp);
xlabel('Normalized Frequency');


% Boxcar
% Main Lobe width is narrow
% Sidelobes are very low ampiltude compared to the main lobe
% When analyzing a sinusoid, it adds frequencies around the sinusoid but
% with a rapidly decreasing frequency

% Bartlett
% Main Lobe width is wide
% Sidelobes are much higher in amplitude than boxcar
% When analyzing a sinusoid, it adds frequncies around the original but
% these sinusoids have a lower amplitude but with strong harmonics

% Hann
% Main Lobe width is wide
% Sidelobes are very low ampiltude and they become lower as they move away
% form the main lobe
% When analyzing a sinusoid, it adds frequncies around the original but
% these sinusoids have a lower amplitude with certain frequencies being
% almost absent