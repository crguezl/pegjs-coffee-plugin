###
Expressions:
  type_spec(i)++;······
  type_spec(i,3)<<d;··
  type_spec(i)->l=24;

Declarations:
  type_spec(*i)(int);·
  type_spec(j)[5];···
  type_spec(m) = { 1, 2 };·
  type_spec(a);··············
  type_spec(*b)();··········
  type_spec(c)=23;·········
  type_spec(d),e,f,g=0;···
  type_spec(h)(e,3);·
###

PEG = require("./cplusplus.js")
input = "int (a); int c = int (b);"
r = PEG.parse(input)
console.log("input = '#{input}'\noutput="+JSON.stringify r)
input = "int b = 4+2  ;  "
r = PEG.parse(input)
console.log("input = '#{input}'\noutput="+JSON.stringify r)
input = "bum = caf = 4-1;\n"
r = PEG.parse(input)
console.log("input = '#{input}'\noutput="+JSON.stringify r)

input = "b2 = int(4);"
r = PEG.parse(input)
console.log("input = '#{input}'\noutput="+JSON.stringify r)

input = "int(4);"
r = PEG.parse(input)
console.log("input = '#{input}'\noutput="+JSON.stringify r)
