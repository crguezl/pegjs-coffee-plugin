/* From the Wikipedia
Value   ← [0-9]+ / '(' Expr ')'
Product ← Value (('*' / '/') Value)*
Sum     ← Product (('+' / '-') Product)*
Expr    ← Sum
*/

sum   = left:product right:([+-] product)* { console.log "additive" }
product = left:value right:([*/] value)*   { console.log "product" }
value   = number:[0-9]+                    
            { console.log parseInt(number.join(''),10) }
        / '(' sum:sum ')'                   { console.log "parenthesis" }


