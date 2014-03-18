/*
Exercise: Find a PEG equivalent to the following left-recursive
grammar:
*/
%lex
%%

\s+               { /* skip whitespace */ }
y                 { return 'y';}
.                 { return 'x';}

/lex

%{
  do_y = function(y)   { console.log("A -> 'y'   do_y("+y+")"); return y; }
  do_x = function(a, x){ console.log("A -> A 'x' do_x("+a+", "+x+")"); return a+x; }
%}

%%
A : A 'x' { $$ = do_x($1, $2); } 
  | 'y'   { $$ = do_y($1); }
;
