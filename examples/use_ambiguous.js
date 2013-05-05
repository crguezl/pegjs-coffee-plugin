var PEG = require("./ambiguous.js");
var r = PEG.parse("aabbcc");
console.log(r);
r = PEG.parse("abbcc");
console.log(r);
r = PEG.parse("abbccc");
console.log(r);


