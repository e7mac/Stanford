% problem 2b

n=[0, 5, 10];
titletext = ['a','b','c'];
for i=1:length(n)
    [a,b] = golay(n(i));
    a = [a zeros(1,1024)];
    b = [b zeros(1,1024)];
    response_a = xcorr(hmeasure(a),a);
    response_b = xcorr(hmeasure(b),b);
    resp = (response_a+response_b)/2^n(i);
    subplot(3,1,i), plot(20*log10(abs(resp)));
    ylim([-100 10]);
    ylabel('Magnitude');
    xlabel('Samples');

end


% problem 2c

%  SNR for golay code length 1 = 40 db
%  SNR for golay code length 32 = 55 db
%  SNR for golay code length 1024 = 70 db