% Problem 1a

% Area of ceiling = 25 x 40 = 1000 m2
% Area of walls = 4 x 25 x 10 = 1000 m2
% Area of floor = 25 x 40 = 1000 m2
% T_60 = -2*ln(0.0001)*V/(gc* sum(a_i*S_i))
% T_60 = -0.161*V/sum(a_i*S_i)

freq = [250 1000 4000];
s_plywood = [0.22 0.22 0.11];
s_glass = [0.25 0.12 0.04];
s_marble = [0.01 0.01 0.02];
s_carpet = [0.06 0.37 0.65];
alpha_air = [1/130 1/30 1/5];

width = 25;
length = 40;
height = 10;

area_ceiling = width*length;
area_floor = area_ceiling;
area_wall = 2*height*(length+width);

area_plywood = area_ceiling + area_floor/2 + area_wall/10;
area_glass = area_wall/10;
area_marble = 8/10*area_wall + area_floor/2;

volume = 25*10*40;
disp('');
for i=1:3
    T_60(i) = 0.161*volume/( (area_plywood*s_plywood(i) + area_glass*s_glass(i) + area_marble*s_marble(i)) + volume*alpha_air(i)) ;
    out = sprintf('Frequency: %i Hz T_60 = %.2f s',freq(i),T_60(i));
    disp(out);
end
disp(' ');
disp('if the church is half its size, assume half the length');
disp(' ');
width = 25;
length = 40/2;
height = 10;


area_ceiling = width*length;
area_floor = area_ceiling;
area_wall = 2*height*(length+width);


area_plywood = area_ceiling + area_floor/2 + area_wall/10;
area_glass = area_wall/10;
area_marble = 8/10*area_wall + area_floor/2;

volume = 25*10*40;

for i=1:3
    T_60(i) = 0.161*volume/( (area_plywood*s_plywood(i) + area_glass*s_glass(i) + area_marble*s_marble(i)) + volume*alpha_air(i)) ;
    out = sprintf('Frequency: %i Hz T_60 = %.2f s',freq(i),T_60(i));
    disp(out);
end

disp(' ');
disp('if church were carpeted');
disp(' ');

width = 25;
length = 40;
height = 10;

area_ceiling = width*length;
area_floor = area_ceiling;
area_wall = 2*height*(length+width);

area_plywood = area_ceiling + area_wall/10;
area_glass = area_wall/10;
area_marble = 8/10*area_wall;
area_carpet = area_floor;

volume = 25*10*40;

for i=1:3
    T_60(i) = 0.161*volume/( (area_plywood*s_plywood(i) + area_glass*s_glass(i) + area_marble*s_marble(i)) + volume*alpha_air(i)) ;
    out = sprintf('Frequency: %i Hz T_60 = %.2f s',freq(i),T_60(i));
    disp(out);
end
