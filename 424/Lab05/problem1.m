% problem 1a
A = [1 1];
B = [1 -1];
C = xcorr(A) + xcorr(B);
disp(C);
% C is a scaled impulse


% problem 1b

D = xcorr([A B]) + xcorr([A -B]);
disp(D)
% D is a scaled impulse