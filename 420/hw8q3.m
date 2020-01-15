clear all;
fs = 44100;
A0 = 27.5;
C7 = 2093;
B = [1e-4 1e-3];

for k = 1:800
    P(k) = fs/(A0*k*sqrt(1+B(1)*k*k)) * (sqrt(1+B(1)*k*k) - 1);
end
subplot(211);
plot(P);
title('Phase delay for A0');
ylabel('Phase delay in samples');
xlabel('Partial index');
clear P
for k = 1:10
    P(k) = fs/(C7*k*sqrt(1+B(2)*k*k)) * (sqrt(1+B(2)*k*k) - 1);
end
subplot(212);
plot(P);
title('Phase delay for C7');
ylabel('Phase delay in samples');
xlabel('Partial index');