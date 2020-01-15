clear all;

% 1 a

wc=2*pi*1000;

% wp = -( ( -wc.*wc.*(4.*Q.*Q.-1) ).^(0.5) .- wc ) ./ (2.*Q);

figure();

Q = 2.^(-4:2);
for i=1:length(Q)
    [h,w] = freqs([0 0 1],[1 1/(wc*Q(i)) 1/(wc*wc)]);
    mag = abs(h);
    phase = angle(h);
    hold all;
    
    subplot(2,1,1), loglog(w,mag);
    hold all;
    if (i==length(Q))
        grid on;
        legend('2^-^4','2^-^3','2^-^2','2^-^1','2^0','2^1','2^2') ;
        xlabel('Frequency (rad/s)');
        ylabel('Magnitude');
        title('Filter varying Q');
    end
    subplot(2,1,2), semilogx(w,phase);
    if (i==length(Q))
        grid on;
        legend('2^-4','2^-3','2^-2','2^-1','2^0','2^1','2^2') ;
        xlabel('Frequency (rad/s)');
        ylabel('Phase (degrees) ');
        
    end
    wp(i) = -( ( -wc.*wc.*(4.*Q(i).*Q(i)-1) ).^(0.5) - wc ) ./ (2.*Q(i));
end

figure();
plot(wp,'o');
xlabel('wp(real)');
ylabel('wp(imaginary)');
axis([0 7000 -7000 1000]);
clear all;

wc=2*pi*1000*2.^(-2:2);
Q = 2;
figure();
for i=1:length(wc)
    [h,w] = freqs([0 0 1],[1 1/(wc(i)*Q) 1/(wc(i)*wc(i))]);
    mag = abs(h);
    phase = angle(h);
    hold all;
    
    subplot(2,1,1), loglog(w,mag);
    hold all;
    if (i==length(wc))
        grid on;
        legend('-2','-1','0','1','2') ;
        xlabel('Frequency (rad/s)');
        ylabel('Magnitude');
        title('Filter varying wc=2*pi*1000*2*pow(what)');
    end
    subplot(2,1,2), semilogx(w,phase);
    if (i==length(wc))
        grid on;
        legend('-2','-1','0','1','2') ;
        xlabel('Frequency (rad/s)');
        ylabel('Phase( degrees) ');
    end
    
    wp(i) = -( ( -wc(i).*wc(i).*(4.*Q.*Q-1) ).^(0.5) - wc(i) ) ./ (2.*Q);
    
end

figure();
plot(wp,'o');
xlabel('wp(real)');
ylabel('wp(imaginary)');
