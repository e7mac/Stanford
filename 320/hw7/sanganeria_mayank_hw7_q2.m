% Mayank Sanganeria / Lab 7-2

%generate sin wave
n=1:60;
x=cos(0.25*pi*n);
x=[x(:)' zeros(1,40)];    %zeropad
x3=cos(0.25*pi*(n-3));
x3=[x3(:)' zeros(1,40)];    %zeropad
%filter coeffs
b=[2 0 -1];
a=1;

%filter
y=filter(b,a,x);
y3=filter(b,a,x2);

hold on;

%plot
plot(y,'r');
plot(y2);

%to make both line up, simply delay y by 3 samples