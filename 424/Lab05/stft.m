function X = stft(x, nbins, nskip)
% STFT - short-time Fourier rransform
%
% X = stft(x, nbins, nskip) returns X, the short-time Fourier transform of the
% input column x, computed using nbins-long signal segments, and a 2*nbins DFT
% with a hop size of nskip samples.  A Hanning window is used by default;
% however if nbins has more than one element, it is used as with window, and the
% DFT size is the length of nbins(:).  The hop size nskip is half the DFT size
% by default.  Note that the DFT size is quantized to a power of 2 using
% nextpow2().
%
% If x has multiple columns, then the STFT is computed for each of the columns,
% and the result is the concatenation of the column spectrograms, nbins+1 tall,
%
% See Also: FTGRAM, IRGRAM, STCC, STCC.

% Created: 22-Jan-2011.
% Revised: 22-Jan-2011, MJW w/JSA, v1.
% Revised: 11-Mar-2012, JSA, v2 - interface, windowing reworked.
% Version: v2.


%% initialization

% input signal size
[nsamp, nc] = size(x);  %% signal length, samples; channel count, channels
if (nsamp == 1),
    % make x a column
    x = x(:);
    [nsamp, nc] = size(x);
end;

% dft length
nbins = nbins(:);
if (length(nbins) == 1),
    % nbins specifies dft size
    nbins = 2^nextpow2(nbins);
    window = [hanning(nbins); zeros(nbins,1)];

else,
    % nbins contains the window
    tempw = nbins;
    nbins = 2^(nextpow2(length(nbins))-1);
    window = [tempw; zeros(2*nbins-length(tempw),1)];

end;

% fix hop size
if (nargin < 3)
   nskip = floor(nbins / 2);
end;


%% form stft

% loop through columns
noverlap = 2*nbins - nskip;
X = [];
for c = [1:nc],
    % buffer signal
    xb = buffer(x(:,c), 2*nbins, noverlap, 'nodelay');

    % window signal
    nframes = size(xb,2);
    xb = xb .* (window * ones(1, nframes));

    % transform signal
    temp = fft(xb);
    X = [X, temp(1:nbins+1,:)];
end;


end
