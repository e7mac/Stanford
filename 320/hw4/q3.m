% Mayank Sanganeria / Lab 4-3 

w1=100; w2=3000; %(Hz)
T=3; %(sec)
fs=8000; %(Hz)
dT=1/fs;
t=(0:dT:T);
up = chirp(t,w1,T,w2);

subplot(3,1,1);plotspec_st(up,fs,0.1,0.01);
title('Spectrum at t=0.1');

subplot(3,1,2);plotspec_st(up,fs,1.5,0.01);
title('Spectrum at t=1.5');

subplot(3,1,3);plotspec_st(up,fs,2.9,0.01);
title('Spectrum at t=2.9');

% The results of this verifies that my function works as expected.
% The accuracy is greater in the middle of the signal than near
% the ends.