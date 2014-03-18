{ 
  @reduce = (left, right)->  
    sum = left
    for t in right
      op = t[0]
      num = t[1]
      switch op 
        when '*' then sum *= num
        when '/' then sum /= num
        when '+' then sum += num
        when '-' then sum -= num
        else _________________________
    sum
  
}
sum   = left:product right:([+-] product)*   { @reduce(left, right); }
product = left:value right:([*/] value)*   { @reduce(left, right); }
value   = number:[0-9]+                    { parseInt(number.join(''),10) }
        / '(' sum:sum ')'                  { sum }

