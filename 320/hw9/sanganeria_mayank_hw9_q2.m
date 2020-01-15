% Mayank Sanganeria / Lab 9-2


N=1:1/(2048-1):pi;                  %getting the Ns
rho=-0.5:0.5:0.5;                   %having a rho matrix
for i=1:3
    b=[rho(i) 1];                   
    a=[1 rho(i)];    
    figure(2*i-1);
    subplot(2,1,1);
    [H,W]=freqz( b, a, N);          %not plotting - getting filter
    H_angle = angle(H);             %getting the angular component
    
    H_diff = -diff(H_angle);        %differentiating the angular component
    x_axis=(1:length(H_diff))/length(H_diff);  %x-axis normalizing
    plot(x_axis,2048*H_diff);        %plotting
    title('Group delay');
    xlabel('Normalized frequency');ylabel('Group delay(samples)');
    subplot(2,1,2);
    grpdelay(b,a,N);                 %using grpdelay
    figure(2*i);
    zplane(b,a);                   %plotting poles and zeros
end