PEG = require("./ambiguous.js")
r = PEG.parse("aabbcc")
console.log(r)
r = PEG.parse("abbcc")
console.log(r)
try
  r = PEG.parse("abbccc")
catch error
  console.log("Not accepted 'abbccc': "+error)


