
% Mayank Sanganeria / Lab 7-1

n=1:60;                     %samples
x0=0.5*cos(0.2*pi*n);       %signal
x1=[x0(:)' zeros(1,40)];    %zeropad
b=[1 1];                    %filter coeffs
a=1;                        %filter coeffs
y1=filter(b,a,x1);          %filter!

figure(1);                  %first figure - signal and filtered signal
subplot(2,1,1)
plot(x1);
subplot(2,1,2)
plot(y1);

%acyclic convolution is performed using the difference function
%if we did not zero pad, we would have lost some of the output samples


figure(2);                  %second figure - y3 and 0.5y1+2y2
x2=2*cos(0.1*pi*n);
x2=[x2(:)' zeros(1,40)];
y2=filter(b,a,x2);
x3=0.5*x1+2*x2;
x3=[x3(:)' zeros(1,40)];
y3=filter(b,a,x3);
hold on;
plot(y3,'r');
plot(0.5*y1+2*y2);

%both the figures look the same - confirming the linearity of the function