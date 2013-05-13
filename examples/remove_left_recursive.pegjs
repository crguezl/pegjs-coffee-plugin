/*

Exercise: Find a PEG equivalent to the following left-recursive
grammar:

A : A 'x' { $$ = do_x($1, $2); } | 'y' { $$ = do_y($1); }

*/

{
  @do_y = (y)   -> console.log("do_y(#{y})"); y
  @do_x = (a, x)-> console.log("do_x(#{a}, #{x})"); a+x
}

A = y:'y' xs:('x'*) 
     {
        a = @do_y(y)
        for x in xs
          a = @do_x(a, x)
        a
     }
