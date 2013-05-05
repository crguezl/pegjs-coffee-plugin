/*
A context-free language is inherently ambiguous if all context-free
grammars generating that language are ambiguous. While some
context-free languages have both ambiguous and unambiguous grammars,
there are context-free languages for which no unambiguous context-free
grammar can exist. An example of an inherently ambiguous language
is the set
{ a^n b^n c^m : n >= 0, m >= 0 } U { a^n b^m c^m : n >= 0, m >= 0 }


*/

S =   A 'c'+
    / 'a'+ B
A = 'a' A? 'b'
B = 'b' B? 'c'
