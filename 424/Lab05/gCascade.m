function [ h_prime ] = gCascade( rho, n )
%GCASCADE Summary of this function goes here
%   Detailed explanation goes here



G1_B = [ rho 1 ];
G1_A = [ 1 rho ];

[h,t] = impz(G1_B,G1_A);

h_prime = 1;

for i=1:n
  h_prime  = conv(h_prime,h);
end

end

