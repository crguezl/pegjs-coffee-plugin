PEG = require("./remove_left_recursive.js")
inputs = [
           "yxx"
           "y"
           "yxxx"
         ]

for input in inputs 
  console.log("input = #{input}")
  r = PEG.parse input
  console.log("result = #{r}\n")


