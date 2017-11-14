(function() { this.JST || (this.JST = {}); this.JST["ajv-keywords/keywords/dot/switch"] = {{# def.definitions }}
  {{# def.errors }}
  {{# def.setupKeyword }}
  {{# def.setupNextLevel }}
  
  
  {{## def.validateIf:
    {{# def.setCompositeRule }}
    {{ $it.createErrors = false; }}
    {{# def._validateSwitchRule:if }}
    {{ $it.createErrors = true; }}
    {{# def.resetCompositeRule }}
    {{=$ifPassed}} = {{=$nextValid}};
  #}}
  
  {{## def.validateThen:
    {{? typeof $sch.then == 'boolean' }}
      {{? $sch.then === false }}
        {{# def.error:'switch' }}
      {{?}}
      var {{=$nextValid}} = {{= $sch.then }};
    {{??}}
      {{# def._validateSwitchRule:then }}
    {{?}}
  #}}
  
  {{## def._validateSwitchRule:_clause:
    {{
      $it.schema = $sch._clause;
      $it.schemaPath = $schemaPath + '[' + $caseIndex + ']._clause';
      $it.errSchemaPath = $errSchemaPath + '/' + $caseIndex + '/_clause';
    }}
    {{# def.insertSubschemaCode }}
  #}}
  
  {{## def.switchCase:
    {{? $sch.if && {{# def.nonEmptySchema:$sch.if }} }}
      var {{=$errs}} = errors;
      {{# def.validateIf }}
      if ({{=$ifPassed}}) {
        {{# def.validateThen }}  
      } else {
        {{# def.resetErrors }}
      }
    {{??}}
      {{=$ifPassed}} = true;
      {{# def.validateThen }}
    {{?}}
  #}}
  
  
  {{
    var $ifPassed = 'ifPassed' + it.level
      , $currentBaseId = $it.baseId
      , $shouldContinue;
  }}
  var {{=$ifPassed}};
  
  {{~ $schema:$sch:$caseIndex }}
    {{? $caseIndex && !$shouldContinue }}
      if (!{{=$ifPassed}}) {
      {{ $closingBraces+= '}'; }}
    {{?}}
  
    {{# def.switchCase }}
    {{ $shouldContinue = $sch.continue }}
  {{~}}
  
  {{= $closingBraces }}
  
  var {{=$valid}} = {{=$nextValid}};
  
  {{# def.cleanUp }};
}).call(this);
