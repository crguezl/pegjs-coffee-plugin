// Generated by CoffeeScript 1.3.3
(function() {
  var CoffeeScript, PEG, PEGjsCoffeePlugin, expect, tryParse;

  if (typeof require !== "undefined" && require !== null) {
    CoffeeScript = require('coffee-script');
    expect = require('expect.js');
    PEG = require('pegjs');
    PEGjsCoffeePlugin = require('../lib/pegjs-coffee-plugin');
  } else {
    CoffeeScript = global.CoffeeScript;
    expect = global.expect;
    PEG = global.PEG;
    PEGjsCoffeePlugin = global.PEGjsCoffeePlugin;
  }

  tryParse = function(parser, text) {
    var result;
    try {
      result = parser.parse(text);
    } catch (e) {
      result = e;
    }
    return result;
  };

  suite('peg-coffee', function() {
    setup(function() {
      return PEGjsCoffeePlugin.addTo(PEG);
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
      test('pass should only be added once', function() {
        PEGjsCoffeePlugin.addTo(PEG);
        PEGjsCoffeePlugin.addTo(PEG);
        return expect(PEG.compiler.appliedPassNames.length).to.equal(6);
      });
      return test('removes itself when remove() is called', function() {
        var appliedPassNames, expectedPassNames;
        PEGjsCoffeePlugin.removeFrom(PEG);
        appliedPassNames = PEG.compiler.appliedPassNames;
        expectedPassNames = ['reportMissingRules', 'reportLeftRecursion', 'removeProxyRules', 'computeVarNames', 'computeParams'];
        expect(appliedPassNames).to.eql(expectedPassNames);
        return expect(PEG.compiler.passes).to.not.have.property('compileFromCoffeeScript');
      });
    });
    test('has a version number', function() {
      return expect(PEGjsCoffeePlugin.VERSION).to.eql('0.1.0');
    });
    return suite('compile grammar', function() {
      return suite('simple CoffeeScript', function() {
        test('action', function() {
          var parser;
          parser = PEG.buildParser('start = "a" { "#{1+1}" }');
          return expect(tryParse(parser, "a")).to.equal("2");
        });
        test('initializer', function() {
          var parser;
          parser = PEG.buildParser('{\n  @val = "#{1+1}"\n}\nstart\n  = "a" { @val }');
          return expect(tryParse(parser, "a")).to.equal("2");
        });
        test('empty initializer scope', function() {
          var parser;
          parser = PEG.buildParser('start = a { @ }\na     = "a" { @value = "a" }');
          return expect(tryParse(parser, "a")).to.eql({
            value: "a"
          });
        });
        return suite('predicates', function() {
          suite('semantic not code', function() {
            test('success on |false| return', function() {
              var parser;
              parser = PEG.buildParser('start\n  = !{typeof Array is "undefined"}');
              return expect(tryParse(parser, "")).to.equal("");
            });
            test('failure on |true| return', function() {
              var parser;
              parser = PEG.buildParser('start\n  = !{typeof Array isnt "undefined"}');
              return expect(tryParse(parser, "")).to.be.a(Error);
            });
            return suite('variable use', function() {
              test('can use label variables', function() {
                var parser;
                parser = PEG.buildParser('start\n  = a:"a" &{a is "a"}');
                return expect(tryParse(parser, "a")).to.eql(["a", ""]);
              });
              test('can use the |offset| variable to get the current parse position', function() {
                var parser;
                parser = PEG.buildParser('start\n  = "a" &{offset is 1}');
                return expect(tryParse(parser, "a")).to.eql(["a", ""]);
              });
              return test('can use the |line| and |column| variables to get the current line and column', function() {
                var parser;
                parser = PEG.buildParser('{\n  @result = "test"\n}\nstart = line (nl+ line)* {@result }\nline  = thing (" "+ thing)*\nthing = digit / mark\ndigit = [0-9]\nmark  = &{ @result = [line, column]; true } "x"\nnl    = ("\\r" / "\\n" / "\\u2028" / "\\u2029")', {
                  trackLineAndColumn: true
                });
                return expect(tryParse(parser, "1\n2\n\n3\n\n\n4 5 x")).to.eql([7, 5]);
              });
            });
          });
          return suite('semantic and code', function() {
            test('success on |true| return', function() {
              var parser;
              parser = PEG.buildParser('start\n  = &{typeof Array isnt "undefined"}');
              return expect(tryParse(parser, "")).to.equal("");
            });
            test('failure on |false| return', function() {
              var parser;
              parser = PEG.buildParser('start\n  = &{typeof Array is "undefined"}');
              return expect(tryParse(parser, "")).to.be.a(Error);
            });
            return suite('variable use', function() {
              test('can use label variables', function() {
                var parser;
                parser = PEG.buildParser('start\n  = a:"a" !{a isnt "a"}');
                return expect(tryParse(parser, "a")).to.eql(["a", ""]);
              });
              test('can use the |offset| variable to get the current parse position', function() {
                var parser;
                parser = PEG.buildParser('start\n  = "a" !{offset isnt 1}');
                return expect(tryParse(parser, "a")).to.eql(["a", ""]);
              });
              return test('can use the |line| and |column| variables to get the current line and column', function() {
                var parser;
                parser = PEG.buildParser('{\n  @result = "test"\n}\nstart = line (nl+ line)* {@result }\nline  = thing (" "+ thing)*\nthing = digit / mark\ndigit = [0-9]\nmark  = !{ @result = [line, column]; false } "x"\nnl    = ("\\r" / "\\n" / "\\u2028" / "\\u2029")', {
                  trackLineAndColumn: true
                });
                return expect(tryParse(parser, "1\n2\n\n3\n\n\n4 5 x")).to.eql([7, 5]);
              });
            });
          });
        });
      });
    });
  });

}).call(this);
