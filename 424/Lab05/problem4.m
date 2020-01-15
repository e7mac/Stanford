% problem 4a

% read golay signals
[g_a,fs] = wavread('gcC4A02105a.wav');
g_b = wavread('gcC4A02105b.wav');

% read room responses
g_a_response = wavread('gcAresponse.wav');
g_b_response = wavread('gcBresponse.wav');

% only need first channel
g_a_response = g_a_response(:,1)';

g_a_response = [g_a_response zeros(1,length(g_b_response) - length(g_a_response))];

g_a_response = [g_a_response zeros(1,2048)];
g_b_response = [g_b_response' zeros(1,2048)];


% MAKE BOTH THE SAME SIZE
g_a_corr = fftfilt(g_a(end:-1:1),g_a_response);
g_b_corr = fftfilt(g_b(end:-1:1),g_b_response);

irhatg = (g_a_corr + g_b_corr ) ./ (2*(length(g_a)));

wavwrite(irhatg,fs,16,'out.wav');

ftgram(irhatg, fs, 'music', 'waveform', true, 'dbrange', 80);

% problem 4b

[chirp,fs] = wavread('ssl_48_18.wav');
[chirp_response,fs] = wavread('ssl_response.wav');
figure_8 = [chirp_response(:,1)' zeros(1,1024)];
omni = [chirp_response(:,2)' zeros(1,1024)];

figure()
spectrogram(figure_8,1024,'yaxis');
title('figure8 chirp');

figure()
spectrogram(omni,1024,'yaxis');
title('omni chirp');


% the few lines that we see are unexpected 

impulse_response_omni = fftfilt(chirp,omni(end:-1:1));
impulse_response_figure_8 = fftfilt(chirp,figure_8(end:-1:1));

impulse_response_omni = [zeros(1,2048) impulse_response_omni(end:-1:1)];
impulse_response_figure_8 = [zeros(1,2048) impulse_response_figure_8(end:-1:1)];

figure()
irhat1 = [impulse_response_omni' impulse_response_figure_8'];


ftgram(irhat1, fs, 'music', 'waveform', true, 'dbrange', 80);