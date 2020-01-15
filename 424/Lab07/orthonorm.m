%orthonorm.m
% Produces a 12-by-12 orthonormal matrix
% by exponentiating a random skew-Hermitian
% matrix.
% The skew-Hermitian matrix has energy distributed
% as a function of the distance from the diagonal
% according to the parameter 'dcy', where the average
% magnitude of an element will be scaled by
% distance^(-dcy), if 'distance' is the distance between
% the element and the diagonal.

kNumDelays=12;
A=zeros(kNumDelays,kNumDelays);
dcy=0;
for ind1=1:kNumDelays
   for ind2=ind1+1:kNumDelays
      A(ind1,ind2)=(-1+2*rand(1))*(ind2-ind1)^(-dcy);
      A(ind2,ind1)=-A(ind1,ind2);
   end
end
U=expm(A);


mat=[];
for ind=1:kNumDelays
   row='{';
   for ind2=1:kNumDelays
      if U(ind,ind2)>=0
         row=[row,'+'];
      end
      row=[row, sprintf('%1.5f',U(ind,ind2)),', '];
   end
   row=[row '},'];
   mat=[mat;row];
end


mat
