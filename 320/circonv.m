%CIRCONV	N-point circular convolution
%
%	C = CIRCONV(A,B,N) performs the N-point circular convolution
%	of vectors A and B.  C is returned as a row vector.  A and B
% 	must be vectors, but may be of different lengths.  N must be
% 	a positive, non-zero integer.  The results of CIRCONV will
%	match that of CONV if N>=( length(A) + length(B) - 1).  This
%	is also the alias-free criterion for the circular convolution.
%
%	See also CONV

%
% Edward Brian Welch
% edwardbrianwelch@yahoo.com
% 16-Feb-1999
%
function[C] = circonv(A,B,N)

% TEST NUMBER OF ARGUMENTS
if nargin~=3,
  error('CIRCONV uses exactly 3 input arguments');
end

% TEST N
if N<=0,
  error('N must be great than zero.');
end

% TEST TO SEE IF EITHER A OR B ARE MATRICES
if ndims(A)>2 | ndims(B)>2 | min( size(A) )>1 | min( size(B) )>1,
  error('circonv works only on vectors');
end

% MAKE SURE VECTORS ARE COLUMN VECTORS SO 
% THAT MATRIX OPERATIONS WORK
if size(A,2)>1,
  A=A';
end

if size(B,2)>1,
  B=B';
end

% APPEND ZEROS IF NECESSARY
if N>length(A),
  A=[A ; zeros(N-length(A),1)];
end

if N>length(B),
  B=[B ; zeros(N-length(B),1)];
end

% TAKE ONLY THE FIRST N POINTS
A = A(1:N);
B = B(1:N);

% PRODUCE FOLD ADD TABLE.  IT IS AN NxN SQUARE MATRIX
% AS IS IT IS IN THE FORM NORMALLY USED, BUT THE DIAG
% COMMAND SUMS DIAGONALS TOP LEFT TO BOTTOM RIGHT
% SO WE MUST FLIP IT LEFT-RIGHT
FoldAddTable = A*B';
FoldAddTable = fliplr(FoldAddTable);

% SUM DIAGONALS OF FOLDADDTABLE TO FIND COMPONENTS OF C
C=zeros(1,N);

% MAIN DIAGONAL ELEMENT
C(N) = sum( diag(FoldAddTable,0) );

% OTHER ELEMENTS ARE THE SUM OF TWO DIAGONALS ONE ABOVE
% THE MAIN AND THE OTHER IN THE COMPLEMENTARY POSITION
% BELOW THE DIAGONAL.  HERE COMPLEMENTARY MEANS THAT 
% THE DIFFERENCE IN DIAGONAL LOCATION IS N: (N-x)-(-x)=N
% THE DIAGONALS ARE NUMBERED SUCH THAT 0 IS THE MAIN 
% DIAGONAL, +1 IS THE DIAGONAL IMMEDIATELY ABOVE THE MAIN
% DIAGONAL AND -1 IS THE DIAGONAL IMMEDIATELY BELOW
% THE MAIN DIAGONAL.  THIS IS THE CONVENTION OF THE
% DIAG() FUNCTION
for x=1:(N-1),
  C(x)= sum( diag(FoldAddTable, N-x) ) + sum( diag(FoldAddTable, -x) );
end
