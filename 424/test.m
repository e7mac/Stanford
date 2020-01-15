clear all
fs = 44100;
t = 0:1/fs:1;
x = sin(2*3.14159*400*t);
env(1) = 0;

for i=2:1000
    env(i) = env(i-1)+1*(abs(x(i))-env(i-1));
end
plot(env)