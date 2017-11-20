(function() {
  'use strict';
  var escope, esprima, expect;

  expect = require('chai').expect;

  escope = require('..');

  esprima = require('esprima');

  describe('implicit global reference', function() {
    it('assignments global scope', function() {
      var ast, scopes;
      ast = esprima.parse("var x = 20;\nx = 300;");
      scopes = escope.analyze(ast).scopes;
      expect(scopes.map(function(scope) {
        return scope.variables.map(function(variable) {
          return variable.defs.map(function(def) {
            return def.type;
          });
        });
      })).to.be.eql([[['Variable']]]);
      return expect(scopes[0].implicit.variables.map(function(variable) {
        return variable.name;
      })).to.be.eql([]);
    });
    it('assignments global scope without definition', function() {
      var ast, scopes;
      ast = esprima.parse("x = 300;\nx = 300;");
      scopes = escope.analyze(ast).scopes;
      expect(scopes.map(function(scope) {
        return scope.variables.map(function(variable) {
          return variable.defs.map(function(def) {
            return def.type;
          });
        });
      })).to.be.eql([[]]);
      return expect(scopes[0].implicit.variables.map(function(variable) {
        return variable.name;
      })).to.be.eql(['x']);
    });
    it('assignments global scope without definition eval', function() {
      var ast, scopes;
      ast = esprima.parse("function inner() {\n    eval(str);\n    x = 300;\n}");
      scopes = escope.analyze(ast).scopes;
      expect(scopes.map(function(scope) {
        return scope.variables.map(function(variable) {
          return variable.defs.map(function(def) {
            return def.type;
          });
        });
      })).to.be.eql([[['FunctionName']], [[]]]);
      return expect(scopes[0].implicit.variables.map(function(variable) {
        return variable.name;
      })).to.be.eql([]);
    });
    it('assignment leaks', function() {
      var ast, scopes;
      ast = esprima.parse("function outer() {\n    x = 20;\n}");
      scopes = escope.analyze(ast).scopes;
      expect(scopes.map(function(scope) {
        return scope.variables.map(function(variable) {
          return variable.name;
        });
      })).to.be.eql([['outer'], ['arguments']]);
      return expect(scopes[0].implicit.variables.map(function(variable) {
        return variable.name;
      })).to.be.eql(['x']);
    });
    it('assignment doesn\'t leak', function() {
      var ast, scopes;
      ast = esprima.parse("function outer() {\n    function inner() {\n        x = 20;\n    }\n    var x;\n}");
      scopes = escope.analyze(ast).scopes;
      expect(scopes.map(function(scope) {
        return scope.variables.map(function(variable) {
          return variable.name;
        });
      })).to.be.eql([['outer'], ['arguments', 'inner', 'x'], ['arguments']]);
      return expect(scopes[0].implicit.variables.map(function(variable) {
        return variable.name;
      })).to.be.eql([]);
    });
    it('for-in-statement leaks', function() {
      var ast, scopes;
      ast = esprima.parse("function outer() {\n    for (x in y) { }\n}");
      scopes = escope.analyze(ast).scopes;
      expect(scopes.map(function(scope) {
        return scope.variables.map(function(variable) {
          return variable.name;
        });
      })).to.be.eql([['outer'], ['arguments']]);
      return expect(scopes[0].implicit.variables.map(function(variable) {
        return variable.name;
      })).to.be.eql(['x']);
    });
    return it('for-in-statement doesn\'t leaks', function() {
      var ast, scopes;
      ast = esprima.parse("function outer() {\n    function inner() {\n        for (x in y) { }\n    }\n    var x;\n}");
      scopes = escope.analyze(ast).scopes;
      expect(scopes.map(function(scope) {
        return scope.variables.map(function(variable) {
          return variable.name;
        });
      })).to.be.eql([['outer'], ['arguments', 'inner', 'x'], ['arguments']]);
      return expect(scopes[0].implicit.variables.map(function(variable) {
        return variable.name;
      })).to.be.eql([]);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltcGxpY2l0LWdsb2JhbC1yZWZlcmVuY2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNCQztBQUFBLEVBQUEsWUFBQSxDQUFBO0FBQUEsTUFBQSx1QkFBQTs7QUFBQSxFQUVELE1BQUEsR0FBUyxPQUFBLENBQVMsTUFBVCxDQUFlLENBQUMsTUFGeEIsQ0FBQTs7QUFBQSxFQUdELE1BQUEsR0FBUyxPQUFBLENBQVMsSUFBVCxDQUhSLENBQUE7O0FBQUEsRUFJRCxPQUFBLEdBQVUsT0FBQSxDQUFTLFNBQVQsQ0FKVCxDQUFBOztBQUFBLEVBTUQsUUFBQSxDQUFVLDJCQUFWLEVBQXNDLFNBQUEsR0FBQTtBQUNsQyxJQUFBLEVBQUEsQ0FBSSwwQkFBSixFQUErQixTQUFBLEdBQUE7QUFDM0IsVUFBQSxXQUFBO0FBQUEsTUFBQSxHQUFBLEdBQU0sT0FBTyxDQUFDLEtBQVIsQ0FBaUIsdUJBQWpCLENBQU4sQ0FBQTtBQUFBLE1BS0EsTUFBQSxHQUFTLE1BQU0sQ0FBQyxPQUFQLENBQWUsR0FBZixDQUFtQixDQUFDLE1BTDdCLENBQUE7QUFBQSxNQU9BLE1BQUEsQ0FBTyxNQUFNLENBQUMsR0FBUCxDQUFXLFNBQUMsS0FBRCxHQUFBO2VBQ2QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFoQixDQUFvQixTQUFDLFFBQUQsR0FBQTtpQkFDaEIsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFkLENBQWtCLFNBQUMsR0FBRCxHQUFBO21CQUFTLEdBQUcsQ0FBQyxLQUFiO1VBQUEsQ0FBbEIsRUFEZ0I7UUFBQSxDQUFwQixFQURjO01BQUEsQ0FBWCxDQUFQLENBRStDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUZ0RCxDQUdJLENBQ0ksQ0FDSSxDQUNLLFVBREwsQ0FESixDQURKLENBSEosQ0FQQSxDQUFBO2FBbUJBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUE3QixDQUFpQyxTQUFDLFFBQUQs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Q0FBQyxLQUFSLENBQWlCLDRGQUFqQixDQUFOLENBQUE7QUFBQSxNQVNBLE1BQUEsR0FBUyxNQUFNLENBQUMsT0FBUCxDQUFlLEdBQWYsQ0FBbUIsQ0FBQyxNQVQ3QixDQUFBO0FBQUEsTUFXQSxNQUFBLENBQU8sTUFBTSxDQUFDLEdBQVAsQ0FBVyxTQUFDLEtBQUQsR0FBQTtlQUNkLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBaEIsQ0FBb0IsU0FBQyxRQUFELEdBQUE7aUJBQWMsUUFBUSxDQUFDLEtBQXZCO1FBQUEsQ0FBcEIsRUFEYztNQUFBLENBQVgsQ0FBUCxDQUNzRCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FEN0QsQ0FFSSxDQUNJLENBQ0ssT0FETCxDQURKLEVBSUksQ0FDSyxXQURMLEVBRUssT0FGTCxFQUdLLEdBSEwsQ0FKSixFQVNJLENBQ0ssV0FETCxDQVRKLENBRkosQ0FYQSxDQUFBO2FBNEJBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUE3QixDQUFpQyxTQUFDLFFBQUQsR0FBQTtlQUFjLFFBQVEsQ0FBQyxLQUF2QjtNQUFBLENBQWpDLENBQVAsQ0FBcUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQTVFLENBQWdGLEVBQWhGLEVBN0JrQztJQUFBLENBQXRDLEVBaEtrQztFQUFBLENBQXRDLENBTkMsQ0FBQTtBQUFBIiwiZmlsZSI6ImltcGxpY2l0LWdsb2JhbC1yZWZlcmVuY2UuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyIjIENvcHlyaWdodCAoQykgMjAxMyBZdXN1a2UgU3V6dWtpIDx1dGF0YW5lLnRlYUBnbWFpbC5jb20+XG4jXG4jIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuIyBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiNcbiMgICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0XG4jICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4jICAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodFxuIyAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuIyAgICAgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiNcbiMgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCJcbiMgQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuIyBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuIyBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgPENPUFlSSUdIVCBIT0xERVI+IEJFIExJQUJMRSBGT1IgQU5ZXG4jIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4jIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbiMgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EXG4jIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4jIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRlxuIyBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuXG4ndXNlIHN0cmljdCdcblxuZXhwZWN0ID0gcmVxdWlyZSgnY2hhaScpLmV4cGVjdFxuZXNjb3BlID0gcmVxdWlyZSAnLi4nXG5lc3ByaW1hID0gcmVxdWlyZSAnZXNwcmltYSdcblxuZGVzY3JpYmUgJ2ltcGxpY2l0IGdsb2JhbCByZWZlcmVuY2UnLCAtPlxuICAgIGl0ICdhc3NpZ25tZW50cyBnbG9iYWwgc2NvcGUnLCAtPlxuICAgICAgICBhc3QgPSBlc3ByaW1hLnBhcnNlIFwiXCJcIlxuICAgICAgICB2YXIgeCA9IDIwO1xuICAgICAgICB4ID0gMzAwO1xuICAgICAgICBcIlwiXCJcblxuICAgICAgICBzY29wZXMgPSBlc2NvcGUuYW5hbHl6ZShhc3QpLnNjb3Blc1xuXG4gICAgICAgIGV4cGVjdChzY29wZXMubWFwKChzY29wZSkgLT5cbiAgICAgICAgICAgIHNjb3BlLnZhcmlhYmxlcy5tYXAoKHZhcmlhYmxlKSAtPlxuICAgICAgICAgICAgICAgIHZhcmlhYmxlLmRlZnMubWFwKChkZWYpIC0+IGRlZi50eXBlKSkpKS50by5iZS5lcWwoXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnVmFyaWFibGUnXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICBdXG4gICAgICAgIClcblxuICAgICAgICBleHBlY3Qoc2NvcGVzWzBdLmltcGxpY2l0LnZhcmlhYmxlcy5tYXAoKHZhcmlhYmxlKSAtPiB2YXJpYWJsZS5uYW1lKSkudG8uYmUuZXFsKFtdKVxuXG4gICAgaXQgJ2Fzc2lnbm1lbnRzIGdsb2JhbCBzY29wZSB3aXRob3V0IGRlZmluaXRpb24nLCAtPlxuICAgICAgICBhc3QgPSBlc3ByaW1hLnBhcnNlIFwiXCJcIlxuICAgICAgICB4ID0gMzAwO1xuICAgICAgICB4ID0gMzAwO1xuICAgICAgICBcIlwiXCJcblxuICAgICAgICBzY29wZXMgPSBlc2NvcGUuYW5hbHl6ZShhc3QpLnNjb3Blc1xuXG4gICAgICAgIGV4cGVjdChzY29wZXMubWFwKChzY29wZSkgLT5cbiAgICAgICAgICAgIHNjb3BlLnZhcmlhYmxlcy5tYXAoKHZhcmlhYmxlKSAtPlxuICAgICAgICAgICAgICAgIHZhcmlhYmxlLmRlZnMubWFwKChkZWYpIC0+IGRlZi50eXBlKSkpKS50by5iZS5lcWwoXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF1cbiAgICAgICAgKVxuXG4gICAgICAgIGV4cGVjdChzY29wZXNbMF0uaW1wbGljaXQudmFyaWFibGVzLm1hcCgodmFyaWFibGUpIC0+IHZhcmlhYmxlLm5hbWUpKS50by5iZS5lcWwoXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ3gnXG4gICAgICAgICAgICBdXG4gICAgICAgIClcblxuICAgIGl0ICdhc3NpZ25tZW50cyBnbG9iYWwgc2NvcGUgd2l0aG91dCBkZWZpbml0aW9uIGV2YWwnLCAtPlxuICAgICAgICBhc3QgPSBlc3ByaW1hLnBhcnNlIFwiXCJcIlxuICAgICAgICBmdW5jdGlvbiBpbm5lcigpIHtcbiAgICAgICAgICAgIGV2YWwoc3RyKTtcbiAgICAgICAgICAgIHggPSAzMDA7XG4gICAgICAgIH1cbiAgICAgICAgXCJcIlwiXG5cbiAgICAgICAgc2NvcGVzID0gZXNjb3BlLmFuYWx5emUoYXN0KS5zY29wZXNcblxuICAgICAgICBleHBlY3Qoc2NvcGVzLm1hcCgoc2NvcGUpIC0+XG4gICAgICAgICAgICBzY29wZS52YXJpYWJsZXMubWFwKCh2YXJpYWJsZSkgLT5cbiAgICAgICAgICAgICAgICB2YXJpYWJsZS5kZWZzLm1hcCgoZGVmKSAtPiBkZWYudHlwZSkpKSkudG8uYmUuZXFsKFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0Z1bmN0aW9uTmFtZSdcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF1cbiAgICAgICAgKVxuXG4gICAgICAgIGV4cGVjdChzY29wZXNbMF0uaW1wbGljaXQudmFyaWFibGVzLm1hcCgodmFyaWFibGUpIC0+IHZhcmlhYmxlLm5hbWUpKS50by5iZS5lcWwoW10pXG5cbiAgICBpdCAnYXNzaWdubWVudCBsZWFrcycsIC0+XG4gICAgICAgIGFzdCA9IGVzcHJpbWEucGFyc2UgXCJcIlwiXG4gICAgICAgIGZ1bmN0aW9uIG91dGVyKCkge1xuICAgICAgICAgICAgeCA9IDIwO1xuICAgICAgICB9XG4gICAgICAgIFwiXCJcIlxuXG4gICAgICAgIHNjb3BlcyA9IGVzY29wZS5hbmFseXplKGFzdCkuc2NvcGVzXG5cbiAgICAgICAgZXhwZWN0KHNjb3Blcy5tYXAoKHNjb3BlKSAtPlxuICAgICAgICAgICAgc2NvcGUudmFyaWFibGVzLm1hcCgodmFyaWFibGUpIC0+IHZhcmlhYmxlLm5hbWUpKSkudG8uYmUuZXFsKFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJ291dGVyJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICdhcmd1bWVudHMnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXVxuICAgICAgICApXG5cbiAgICAgICAgZXhwZWN0KHNjb3Blc1swXS5pbXBsaWNpdC52YXJpYWJsZXMubWFwKCh2YXJpYWJsZSkgLT4gdmFyaWFibGUubmFtZSkpLnRvLmJlLmVxbChcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAneCdcbiAgICAgICAgICAgIF1cbiAgICAgICAgKVxuXG4gICAgaXQgJ2Fzc2lnbm1lbnQgZG9lc25cXCd0IGxlYWsnLCAtPlxuICAgICAgICBhc3QgPSBlc3ByaW1hLnBhcnNlIFwiXCJcIlxuICAgICAgICBmdW5jdGlvbiBvdXRlcigpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlubmVyKCkge1xuICAgICAgICAgICAgICAgIHggPSAyMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB4O1xuICAgICAgICB9XG4gICAgICAgIFwiXCJcIlxuXG4gICAgICAgIHNjb3BlcyA9IGVzY29wZS5hbmFseXplKGFzdCkuc2NvcGVzXG5cbiAgICAgICAgZXhwZWN0KHNjb3Blcy5tYXAoKHNjb3BlKSAtPlxuICAgICAgICAgICAgc2NvcGUudmFyaWFibGVzLm1hcCgodmFyaWFibGUpIC0+IHZhcmlhYmxlLm5hbWUpKSkudG8uYmUuZXFsKFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJ291dGVyJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICdhcmd1bWVudHMnXG4gICAgICAgICAgICAgICAgICAgICdpbm5lcidcbiAgICAgICAgICAgICAgICAgICAgJ3gnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJ2FyZ3VtZW50cydcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICBdXG4gICAgICAgIClcblxuICAgICAgICBleHBlY3Qoc2NvcGVzWzBdLmltcGxpY2l0LnZhcmlhYmxlcy5tYXAoKHZhcmlhYmxlKSAtPiB2YXJpYWJsZS5uYW1lKSkudG8uYmUuZXFsKFtdKVxuXG5cbiAgICBpdCAnZm9yLWluLXN0YXRlbWVudCBsZWFrcycsIC0+XG4gICAgICAgIGFzdCA9IGVzcHJpbWEucGFyc2UgXCJcIlwiXG4gICAgICAgIGZ1bmN0aW9uIG91dGVyKCkge1xuICAgICAgICAgICAgZm9yICh4IGluIHkpIHsgfVxuICAgICAgICB9XG4gICAgICAgIFwiXCJcIlxuXG4gICAgICAgIHNjb3BlcyA9IGVzY29wZS5hbmFseXplKGFzdCkuc2NvcGVzXG5cbiAgICAgICAgZXhwZWN0KHNjb3Blcy5tYXAoKHNjb3BlKSAtPlxuICAgICAgICAgICAgc2NvcGUudmFyaWFibGVzLm1hcCgodmFyaWFibGUpIC0+IHZhcmlhYmxlLm5hbWUpKSkudG8uYmUuZXFsKFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJ291dGVyJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICdhcmd1bWVudHMnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXVxuICAgICAgICApXG5cbiAgICAgICAgZXhwZWN0KHNjb3Blc1swXS5pbXBsaWNpdC52YXJpYWJsZXMubWFwKCh2YXJpYWJsZSkgLT4gdmFyaWFibGUubmFtZSkpLnRvLmJlLmVxbChcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAneCdcbiAgICAgICAgICAgIF1cbiAgICAgICAgKVxuXG4gICAgaXQgJ2Zvci1pbi1zdGF0ZW1lbnQgZG9lc25cXCd0IGxlYWtzJywgLT5cbiAgICAgICAgYXN0ID0gZXNwcmltYS5wYXJzZSBcIlwiXCJcbiAgICAgICAgZnVuY3Rpb24gb3V0ZXIoKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBpbm5lcigpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHggaW4geSkgeyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgeDtcbiAgICAgICAgfVxuICAgICAgICBcIlwiXCJcblxuICAgICAgICBzY29wZXMgPSBlc2NvcGUuYW5hbHl6ZShhc3QpLnNjb3Blc1xuXG4gICAgICAgIGV4cGVjdChzY29wZXMubWFwKChzY29wZSkgLT5cbiAgICAgICAgICAgIHNjb3BlLnZhcmlhYmxlcy5tYXAoKHZhcmlhYmxlKSAtPiB2YXJpYWJsZS5uYW1lKSkpLnRvLmJlLmVxbChcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICdvdXRlcidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnYXJndW1lbnRzJ1xuICAgICAgICAgICAgICAgICAgICAnaW5uZXInXG4gICAgICAgICAgICAgICAgICAgICd4J1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICdhcmd1bWVudHMnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXVxuICAgICAgICApXG5cbiAgICAgICAgZXhwZWN0KHNjb3Blc1swXS5pbXBsaWNpdC52YXJpYWJsZXMubWFwKCh2YXJpYWJsZSkgLT4gdmFyaWFibGUubmFtZSkpLnRvLmJlLmVxbChbXSlcbiJdfQ==
;