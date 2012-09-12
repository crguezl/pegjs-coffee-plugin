#
# Classic example grammar, which recognizes simple arithmetic expressions like
# "2*(3+4)". The parser generated from this grammar then computes their value.
#

# Load dependencies
if require?
  # Node.js
  CoffeeScript  = require 'coffee-script'
  expect        = require 'expect.js'
  PEG           = require 'pegjs'
  PEGCoffee     = require '../lib/peg-coffee'
else
  # Browser
  CoffeeScript = global.CoffeeScript
  expect = global.expect
  PEG = global.PEG
  PEGCoffee = global.PEGCoffee

# Helper functions
tryParse = (parser, text) ->
  try
    result = parser.parse(text)
  catch e
    result = e
  return result


grammar = '''
start
  = additive

additive
  = left:multiplicative "+" right:additive { return left + right }
  / multiplicative

multiplicative
  = left:primary "*" right:multiplicative { return left * right }
  / primary

primary
  = integer
  / "(" additive:additive ")" { return additive }

integer "integer"
  = digits:[0-9]+ { return parseInt digits.join(""), 10 }
'''

suite 'arithmetic grammar', ->
  setup ->
    PEGCoffee.initialize PEG
    
  test 'parses 2*(3+4)', ->
    parser = PEG.buildParser grammar
    expect(tryParse parser, "2*(3+4)").to.equal 14