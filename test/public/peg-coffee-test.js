// Generated by CoffeeScript 1.3.3
(function() {
  var CoffeeScript, PEG, PEGCoffee, expect;

  if (typeof require !== 'undefined') {
    CoffeeScript = require('coffee-script');
    expect = require('expect.js');
    PEG = require('pegjs');
    PEGCoffee = require('../lib/peg-coffee');
  } else {
    CoffeeScript = global.CoffeeScript;
    expect = global.expect;
    PEG = global.PEG;
    PEGCoffee = global.PEGCoffee;
  }

  suite('peg-coffee', function() {
    setup(function() {
      return PEGCoffee.initialize(PEG);
    });
    suite('initialize plugin', function() {
      test('adds pass to passes', function() {
        var passes;
        passes = PEG.compiler.passes;
        return expect(passes).to.have.property('compileFromCoffeeScript');
      });
      test('adds pass to appliedPassNames', function() {
        var appliedPassNames, expectedPassNames;
        appliedPassNames = PEG.compiler.appliedPassNames;
        expectedPassNames = ['reportMissingRules', 'reportLeftRecursion', 'removeProxyRules', 'compileFromCoffeeScript', 'computeVarNames', 'computeParams'];
        return expect(appliedPassNames).to.eql(expectedPassNames);
      });
      return test('should only be added once', function() {
        PEGCoffee.initialize(PEG);
        PEGCoffee.initialize(PEG);
        return expect(PEG.compiler.appliedPassNames.length).to.equal(6);
      });
    });
    return suite('compile grammar', function() {
      return test('simple coffee script action', function() {
        var grammar, parser, result;
        grammar = 'start = "a" { return "#{1+1}" }';
        parser = PEG.buildParser(grammar);
        result = parser.parse("a");
        return expect(result).to.equal("2");
      });
    });
  });

}).call(this);
