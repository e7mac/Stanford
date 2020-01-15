
% Mayank Sanganeria / Lab 9-1

N=2148;


%part a
[butter_B,butter_A] = butter(2,2/3);
[cheby_B,cheby_A] = cheby1(2,3,2/3);

%part b
f = figure(1);
freqz(butter_B,butter_A,N);
title('Lowpass');
hold on;
freqz( cheby_B,cheby_A,N);
figureChildren = get(f, 'Children');
plotOne = get(figureChildren(1), 'Children');
plotOneLineOne = plotOne(1);
plotOneLineTwo = plotOne(2);
set(plotOne, 'LineWidth', 1);
set(plotOneLineOne, 'Color', 'red');
legend([plotOneLineOne, plotOneLineTwo], 'Chebyshev', 'Butterworth', 'Location', 'Best');
plotTwo = get(figureChildren(2), 'Children');
plotTwoLineOne = plotTwo(1);
plotTwoLineTwo = plotTwo(2);
set(plotOne, 'LineWidth', 1);
set(plotTwoLineOne, 'Color', 'red');
legend([plotTwoLineOne, plotTwoLineTwo], 'Chebyshev', 'Butterworth','Location', 'Best');

%the magnitude response of both is very similar but Butterworth is slightly
%sharper. Both start falling at 0.6. The phase response of butterworth is
%more smooth than Chebyshev and has a slight outward bump at 0.5 whereas
%Chebyshev has a bump at 0.4 and falls sharply till 0.8 and then is
%relatively stable


%part c
[butter_B,butter_A] = butter(2,2/6,'high');
[cheby_B,cheby_A] = cheby1(2,3,2/6,'high');
f = figure(2);
freqz(butter_B,butter_A,N);
title('Highpass');
hold on;
freqz( cheby_B,cheby_A,N);
figureChildren = get(f, 'Children');
plotOne = get(figureChildren(1), 'Children');
plotOneLineOne = plotOne(1);
plotOneLineTwo = plotOne(2);
set(plotOne, 'LineWidth', 1);
set(plotOneLineOne, 'Color', 'red');
legend([plotOneLineOne, plotOneLineTwo], 'Chebyshev', 'Butterworth', 'Location', 'Best');
plotTwo = get(figureChildren(2), 'Children');
plotTwoLineOne = plotTwo(1);
plotTwoLineTwo = plotTwo(2);
set(plotOne, 'LineWidth', 1);
set(plotTwoLineOne, 'Color', 'red');
legend([plotTwoLineOne, plotTwoLineTwo], 'Chebyshev', 'Butterworth','Location', 'Best');

%the magnitude response of both is very similar but Butterworth is slightly
%sharper. Both reach unity at 0.4. The phase response of butterworth is
%more smooth than Chebyshev and has a slight inward bump at 0.4 whereas
%Chebyshev has a bump at 0.4 and falls sharply till 0.6 and then relatively
%is stable


%part d
[butter_B,butter_A] = butter(2,[2/6 2/3]);
[cheby_B,cheby_A] = cheby1(2,3,[2/6 2/3]);
f = figure(3);
freqz(butter_B,butter_A,N);
title('Bandpass');
hold on;
freqz( cheby_B,cheby_A,N);
figureChildren = get(f, 'Children');
plotOne = get(figureChildren(1), 'Children');
plotOneLineOne = plotOne(1);
plotOneLineTwo = plotOne(2);
set(plotOne, 'LineWidth', 1);
set(plotOneLineOne, 'Color', 'red');
legend([plotOneLineOne, plotOneLineTwo], 'Chebyshev', 'Butterworth', 'Location', 'Best');
plotTwo = get(figureChildren(2), 'Children');
plotTwoLineOne = plotTwo(1);
plotTwoLineTwo = plotTwo(2);
set(plotOne, 'LineWidth', 1);
set(plotTwoLineOne, 'Color', 'red');
legend([plotTwoLineOne, plotTwoLineTwo], 'Chebyshev', 'Butterworth','Location', 'Best');

%This is a combination of the previous 2 filters. The magnitude response of both is very similar but Butterworth is slightly
%sharper. Both reach unity at 0.4 and start falling at 0.6. The phase response of butterworth is
%more smooth than Chebyshev and has a very slight bump at 0.4 and 0.6. The
%Chebyshev has outward bumps at 0.4 and 0.6 and falls sharply till 0.7 and then relatively
%is stable
