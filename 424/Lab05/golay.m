function [ a, b ] = golay( n )
%GOLAY Summary of this function goes here
%   Detailed explanation goes here


A = 1;
B = 1;

for i=1:n
    A_new = [A B];
    B_new = [A -B];
    A = A_new;
    B = B_new;
end

a=A;
b=B;

end

