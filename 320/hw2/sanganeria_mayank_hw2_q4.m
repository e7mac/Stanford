% Mayank Sanganeria / Lab 2-4

n = [1:10000];
N1 = 512;
x1 = exp(j*pi/4)*(0.999*exp(j*pi/N1)).^n;

N2 = 2048;
x2 = exp(j*pi/2)*(0.999*exp(-j*pi/N2)).^n;

N3 = 1024;
x3 = exp(j*pi/N3).^n + (0.9995*exp(-j*4*pi/N3)).^n;


subplot(2,2,1), plot(x1);
ylabel('e^(j*pi/4)*(0.999*e^(j*pi/512))^n');xlabel('n');
subplot(2,2,2), plot(x2);
ylabel('e^(j*pi/2)*(0.999*e^(-j*pi/2048))^n');xlabel('n');
subplot(2,2,3), plot(x3);
ylabel('e^(j*pi/1024)^n+(0.9995*e^(-j*4pi/1024))^n');xlabel('n');