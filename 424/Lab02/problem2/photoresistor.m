% problem 2

r0 = 100000;
lambda_t=1;


% feedforward
input_level = (1:0.01:100);
rp = r0 .* (input_level/lambda_t).^(-0.75);
gain = 2*rp./(r0+rp);
ff_output = input_level.*gain;
plot(input_level,ff_output);
xlabel('\lambda (multipe of \lambda_T)');
ylabel('\lambda_\infty (multipe of \lambda_T)');
title('Static compression of feedforward architecture');
% semilogx(20*log(lambda)/log(10),ff_output);

%feedback
hold on;
out = (1: 0.01 : 100);
input_estimate = ((out + lambda_t^(-0.75)*out.^(1.75))./2);
plot(input_estimate, out, 'r');
axis([1 100 0 20]);