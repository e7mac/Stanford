function [  ] = matrify( coeff )
%MATRIFY Summary of this function goes here
%   Detailed explanation goes here

for i=1:length(coeff)
fprintf('{');
fprintf('%.16f,',coeff(i,1));
fprintf('%.16f,',coeff(i,2));
fprintf('%.16f,',coeff(i,3));
fprintf('%.16f,',coeff(i,5));
fprintf('%.16f,',coeff(i,6));
fprintf('},\n');
end

