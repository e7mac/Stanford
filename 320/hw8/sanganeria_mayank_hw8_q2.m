
% Mayank Sanganeria / Lab 8-2
clc
x = wavread('jobs.wav');


%filter co-efficients

b=[0.3024 0 -0.3024];
a=[1 -1.749 0.9244];

%different Ns
N_all=[128 1024 8192];


%part a - direct usage - no N required
tic
x_prime=[0 0 x'];
y=zeros(length(x_prime),1);
for i=3:length(x_prime)

    y(i)=0.3024*x_prime(i)-0.3024*x_prime(i-2)+1.749*y(i-1)-0.9244*y(i-2);
    
end



t=toc;
text='using Difference Equation';
display([num2str(t) ' s ' text]);

for j=1:3
N=N_all(j);
fprintf('Using N=%d\n',N);
h = filter(b,a,[1; zeros(N-1,1)]);
%part b
tic
y=conv(x,h);
t=toc;
text='using conv';
display([num2str(t) ' s ' text]);



%part c
tic
y=filter(b,a,x);
t=toc;
text='using filter';
display([num2str(t) ' s ' text]);


%part d
tic
y=fftfilt(h,x);
t=toc;
text='using fftfilt';
display([num2str(t) ' s ' text]);

end