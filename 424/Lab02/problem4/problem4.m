% 4a) Threshold of compression = 0.12 (-42 dB)
%     Compression Ratio = 1.65


% 4b) pseudo code:

% feedforward
% compRatio = 1.65
% threshold = 0.12
% if (input > threshold)
% dBpsi_f = dB(input/threshold)/(compRatio)*(1-compRatio)
% psi_f = db2lin(dBpsi_f)

% feedback
% compRatio = 1.65
% threshold = 0.12
% if (output > threshold)
% dBpsi_b = dB(output/threshold)*(1-compRatio)
% psi_b = db2lin(dBpsi_b)

% 4c) Peak detection - compressor does not change behavior when dealing
% with low-frequency sine wave of amplitude 1 OR DC at amplitude 1

% 4d) Attack time = 17 ms 
%     Release time = 400 ms

% 4e) pseudo code



% b0_r = 1 - exp( -1.0 / ( 5 * fs ) )
% b0_a = 1 - exp( -1.0 / ( 0.1 * fs ) )

% feedforward
% if ( input > levelEstimate )
%     levelEstimate += b0_a * ( input - levelEstimate );
% else
%     levelEstimate += b0_r * ( input - levelEstimate);

% feedback
% if ( output > levelEstimate )
%     levelEstimate += b0_a * ( output - levelEstimate );
% else
%     levelEstimate += b0_r * ( output - levelEstimate);
