PEG = require("./simple.js")
inputs = [
           "3-1-2"
           "2+3*(2+1)-10/2"
         ]

for input in inputs 
  r = PEG.parse input
  console.log("input = #{input} result = #{r}")

