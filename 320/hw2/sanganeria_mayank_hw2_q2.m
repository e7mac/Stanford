% Mayank Sanganeria / Lab 2-2

n = [0:100];
X = 2*exp(j*pi/4);
z0=0.9*exp(j*pi/8);
x = X*z0.^n;
tau_x = 9.4912;
tau_y = X*z0.^tau_x;
T_60_x = 65.563;
T_60_y = X*z0.^T_60_x;

% subplot left
subplot(2,2,1), hold on;
plot(n,real(x),tau_x,real(tau_y),'x',T_60_x,real(T_60_y),'*');
ylabel('Real {X(z_0)^n}');xlabel('n');
plot(5,5,'r');

subplot(2,2,2), plot(n,imag(x),tau_x,imag(tau_y),'x',T_60_x,imag(T_60_y),'*');
ylabel('Imaginary {X(z_0)^n}');xlabel('n');

subplot(2,2,3), plot(imag(x),real(x),imag(tau_y),real(tau_y),'x',imag(T_60_y),real(T_60_y),'*');
ylabel('Real {X(z_0)^n}');xlabel('Imaginary {X(z_0)^n}');