% problem 3a

h = gCascade(0.5,64);

% Matlab-compatible plot:
plot(h);
xlim([0 300]);

% problem 3b
min_rho=-1;
min = 10000;
for rho = 0.25:0.0001:0.3
   h = gCascade(rho,64); 
   m = max(h);
   if (min>m)
       min=m;
       min_rho = rho;
   end
end

% problem 3c

h64 = gCascade(min_rho,64);
rhoGain = 1/max(abs(h64));
h_chirp = hmeasure(rhoGain*[h64' zeros(1,1024)]);
h_impulse = xcorr(h_chirp,h64)/rhoGain;
figure()
plot(h_impulse);

ylabel('amplitude');
xlabel('samples');

% problem 3d

% SNR for chirp measurement = 50 dB as compared to 70 dB for 1024 length
% Go