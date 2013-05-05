/* From the Wikipedia
Value   ← [0-9]+ / '(' Expr ')'
Product ← Value (('*' / '/') Value)*
Sum     ← Product (('+' / '-') Product)*
Expr    ← Sum
*/

{ 
  @reduce = (left, right)->  
    # console.log(left); 
    # console.log(right); 
    sum = left
    # console.log("sum = "+sum)
    for t in right
      op = t[0]
      num = t[1]
      #/ console.log(op)
      #/ console.log(num)
      switch op 
        when '+' then sum += num; break
        when '-' then sum -= num; break
        when '*' then sum *= num; break
        when '/' then sum /= num; break
        else console.log("Error! "+op)
      #/ console.log("sum = "+sum)
    sum
  
}
sum   = left:product right:([+-] product)* { @reduce(left, right); }
product = left:value right:([*/] value)*   { @reduce(left, right); }
value   = number:[0-9]+                    { parseInt(number.join(''),10) }
        / '(' sum:sum ')'                  { sum }


