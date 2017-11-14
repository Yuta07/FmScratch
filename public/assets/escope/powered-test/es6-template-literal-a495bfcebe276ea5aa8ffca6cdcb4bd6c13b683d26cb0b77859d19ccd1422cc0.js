(function() {
  var escope, expect, harmony;

  expect = require('chai').expect;

  harmony = require('../third_party/esprima');

  escope = require('..');

  describe('ES6 template literal', function() {
    return it('refer variables', function() {
      var ast, scope, scopeManager;
      ast = harmony.parse("(function () {\n    let i, j, k;\n    function testing() { }\n    let template = testing`testing ${i} and ${j}`\n    return template;\n}());");
      scopeManager = escope.analyze(ast, {
        ecmaVersion: 6
      });
      expect(scopeManager.scopes).to.have.length(3);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.block.type).to.be.equal('FunctionExpression');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(6);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.variables[1].name).to.be.equal('i');
      expect(scope.variables[2].name).to.be.equal('j');
      expect(scope.variables[3].name).to.be.equal('k');
      expect(scope.variables[4].name).to.be.equal('testing');
      expect(scope.variables[5].name).to.be.equal('template');
      expect(scope.references).to.have.length(5);
      expect(scope.references[0].identifier.name).to.be.equal('template');
      expect(scope.references[1].identifier.name).to.be.equal('testing');
      expect(scope.references[2].identifier.name).to.be.equal('i');
      expect(scope.references[3].identifier.name).to.be.equal('j');
      return expect(scope.references[4].identifier.name).to.be.equal('template');
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi10ZW1wbGF0ZS1saXRlcmFsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1QkE7QUFBQSxNQUFBLHVCQUFBOztBQUFBLEVBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUyxNQUFULENBQWUsQ0FBQyxNQUF6QixDQUFBOztBQUFBLEVBQ0EsT0FBQSxHQUFVLE9BQUEsQ0FBUyx3QkFBVCxDQURWLENBQUE7O0FBQUEsRUFFQSxNQUFBLEdBQVMsT0FBQSxDQUFTLElBQVQsQ0FGVCxDQUFBOztBQUFBLEVBSUEsUUFBQSxDQUFVLHNCQUFWLEVBQWlDLFNBQUEsR0FBQTtXQUM3QixFQUFBLENBQUksaUJBQUosRUFBc0IsU0FBQSxHQUFBO0FBQ2xCLFVBQUEsd0JBQUE7QUFBQSxNQUFBLEdBQUEsR0FBTSxPQUFPLENBQUMsS0FBUixDQUFpQiw4SUFBakIsQ0FBTixDQUFBO0FBQUEsTUFTQSxZQUFBLEdBQWUsTUFBTSxDQUFDLE9BQVAsQ0FBZSxHQUFmLEVBQW9CO0FBQUEsUUFBQSxXQUFBLEVBQWEsQ0FBYjtPQUFwQixDQVRmLENBQUE7QUFBQSxNQVVBLE1BQUEsQ0FBTyxZQUFZLENBQUMsTUFBcEIsQ0FBMkIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQXBDLENBQTJDLENBQTNDLENBVkEsQ0FBQTtBQUFBLE1BWUEsS0FBQSxHQUFRLFlBQVksQ0FBQyxNQUFPLENBQUEsQ0FBQSxDQVo1QixDQUFBO0FBQUEsTUFhQSxNQUFBLENBQU8sS0FBSyxDQUFDLElBQWIsQ0FBa0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQXpCLENBQWdDLFFBQWhDLENBYkEsQ0FBQTtBQUFBLE1BY0EsTUFBQSxDQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBbkIsQ0FBd0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQS9CLENBQXNDLFNBQXRDLENBZEEsQ0FBQTtBQUFBLE1BZUEsTUFBQSxDQUFPLEtBQUssQ0FBQyxRQUFiLENBQXNCLENBQUMsRUFBRSxD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Q0EsTUFBQSxDQUFPLEtBQUssQ0FBQyxVQUFXLENBQUEsQ0FBQSxDQUFFLENBQUMsVUFBVSxDQUFDLElBQXRDLENBQTJDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFsRCxDQUF5RCxHQUF6RCxDQWpDQSxDQUFBO2FBa0NBLE1BQUEsQ0FBTyxLQUFLLENBQUMsVUFBVyxDQUFBLENBQUEsQ0FBRSxDQUFDLFVBQVUsQ0FBQyxJQUF0QyxDQUEyQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBbEQsQ0FBeUQsVUFBekQsRUFuQ2tCO0lBQUEsQ0FBdEIsRUFENkI7RUFBQSxDQUFqQyxDQUpBLENBQUE7QUFBQSIsImZpbGUiOiJlczYtdGVtcGxhdGUtbGl0ZXJhbC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIiMgLSotIGNvZGluZzogdXRmLTggLSotXG4jICBDb3B5cmlnaHQgKEMpIDIwMTQgWXVzdWtlIFN1enVraSA8dXRhdGFuZS50ZWFAZ21haWwuY29tPlxuI1xuIyAgUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4jICBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiNcbiMgICAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodFxuIyAgICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiMgICAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodFxuIyAgICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGVcbiMgICAgICBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuI1xuIyAgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCJcbiMgIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiMgIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4jICBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgPENPUFlSSUdIVCBIT0xERVI+IEJFIExJQUJMRSBGT1IgQU5ZXG4jICBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuIyAgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuIyAgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EXG4jICBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuIyAgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GXG4jICBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuXG5leHBlY3QgPSByZXF1aXJlKCdjaGFpJykuZXhwZWN0XG5oYXJtb255ID0gcmVxdWlyZSAnLi4vdGhpcmRfcGFydHkvZXNwcmltYSdcbmVzY29wZSA9IHJlcXVpcmUgJy4uJ1xuXG5kZXNjcmliZSAnRVM2IHRlbXBsYXRlIGxpdGVyYWwnLCAtPlxuICAgIGl0ICdyZWZlciB2YXJpYWJsZXMnLCAtPlxuICAgICAgICBhc3QgPSBoYXJtb255LnBhcnNlIFwiXCJcIlxuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGksIGosIGs7XG4gICAgICAgICAgICBmdW5jdGlvbiB0ZXN0aW5nKCkgeyB9XG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSB0ZXN0aW5nYHRlc3RpbmcgJHtpfSBhbmQgJHtqfWBcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgICAgfSgpKTtcbiAgICAgICAgXCJcIlwiXG5cbiAgICAgICAgc2NvcGVNYW5hZ2VyID0gZXNjb3BlLmFuYWx5emUgYXN0LCBlY21hVmVyc2lvbjogNlxuICAgICAgICBleHBlY3Qoc2NvcGVNYW5hZ2VyLnNjb3BlcykudG8uaGF2ZS5sZW5ndGggM1xuXG4gICAgICAgIHNjb3BlID0gc2NvcGVNYW5hZ2VyLnNjb3Blc1swXVxuICAgICAgICBleHBlY3Qoc2NvcGUudHlwZSkudG8uYmUuZXF1YWwgJ2dsb2JhbCdcbiAgICAgICAgZXhwZWN0KHNjb3BlLmJsb2NrLnR5cGUpLnRvLmJlLmVxdWFsICdQcm9ncmFtJ1xuICAgICAgICBleHBlY3Qoc2NvcGUuaXNTdHJpY3QpLnRvLmJlLmZhbHNlXG4gICAgICAgIGV4cGVjdChzY29wZS52YXJpYWJsZXMpLnRvLmhhdmUubGVuZ3RoIDBcblxuICAgICAgICBzY29wZSA9IHNjb3BlTWFuYWdlci5zY29wZXNbMV1cbiAgICAgICAgZXhwZWN0KHNjb3BlLnR5cGUpLnRvLmJlLmVxdWFsICdmdW5jdGlvbidcbiAgICAgICAgZXhwZWN0KHNjb3BlLmJsb2NrLnR5cGUpLnRvLmJlLmVxdWFsICdGdW5jdGlvbkV4cHJlc3Npb24nXG4gICAgICAgIGV4cGVjdChzY29wZS5pc1N0cmljdCkudG8uYmUuZmFsc2VcbiAgICAgICAgZXhwZWN0KHNjb3BlLnZhcmlhYmxlcykudG8uaGF2ZS5sZW5ndGggNlxuICAgICAgICBleHBlY3Qoc2NvcGUudmFyaWFibGVzWzBdLm5hbWUpLnRvLmJlLmVxdWFsICdhcmd1bWVudHMnXG4gICAgICAgIGV4cGVjdChzY29wZS52YXJpYWJsZXNbMV0ubmFtZSkudG8uYmUuZXF1YWwgJ2knXG4gICAgICAgIGV4cGVjdChzY29wZS52YXJpYWJsZXNbMl0ubmFtZSkudG8uYmUuZXF1YWwgJ2onXG4gICAgICAgIGV4cGVjdChzY29wZS52YXJpYWJsZXNbM10ubmFtZSkudG8uYmUuZXF1YWwgJ2snXG4gICAgICAgIGV4cGVjdChzY29wZS52YXJpYWJsZXNbNF0ubmFtZSkudG8uYmUuZXF1YWwgJ3Rlc3RpbmcnXG4gICAgICAgIGV4cGVjdChzY29wZS52YXJpYWJsZXNbNV0ubmFtZSkudG8uYmUuZXF1YWwgJ3RlbXBsYXRlJ1xuICAgICAgICBleHBlY3Qoc2NvcGUucmVmZXJlbmNlcykudG8uaGF2ZS5sZW5ndGggNVxuICAgICAgICBleHBlY3Qoc2NvcGUucmVmZXJlbmNlc1swXS5pZGVudGlmaWVyLm5hbWUpLnRvLmJlLmVxdWFsICd0ZW1wbGF0ZSdcbiAgICAgICAgZXhwZWN0KHNjb3BlLnJlZmVyZW5jZXNbMV0uaWRlbnRpZmllci5uYW1lKS50by5iZS5lcXVhbCAndGVzdGluZydcbiAgICAgICAgZXhwZWN0KHNjb3BlLnJlZmVyZW5jZXNbMl0uaWRlbnRpZmllci5uYW1lKS50by5iZS5lcXVhbCAnaSdcbiAgICAgICAgZXhwZWN0KHNjb3BlLnJlZmVyZW5jZXNbM10uaWRlbnRpZmllci5uYW1lKS50by5iZS5lcXVhbCAnaidcbiAgICAgICAgZXhwZWN0KHNjb3BlLnJlZmVyZW5jZXNbNF0uaWRlbnRpZmllci5uYW1lKS50by5iZS5lcXVhbCAndGVtcGxhdGUnXG5cbiMgdmltOiBzZXQgc3c9NCB0cz00IGV0IHR3PTgwIDpcbiJdfQ==
;
