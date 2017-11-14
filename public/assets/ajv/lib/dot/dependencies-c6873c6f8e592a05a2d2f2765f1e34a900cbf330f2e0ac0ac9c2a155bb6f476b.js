(function() { this.JST || (this.JST = {}); this.JST["ajv/lib/dot/dependencies"] = {{# def.definitions }}
  {{# def.errors }}
  {{# def.missing }}
  {{# def.setupKeyword }}
  {{# def.setupNextLevel }}
  
  
  {{## def.propertyInData:
    {{=$data}}{{= it.util.getProperty($property) }} !== undefined
    {{? $ownProperties }}
      && Object.prototype.hasOwnProperty.call({{=$data}}, '{{=it.util.escapeQuotes($property)}}')
    {{?}}
  #}}
  
  
  {{
    var $schemaDeps = {}
      , $propertyDeps = {}
      , $ownProperties = it.opts.ownProperties;
  
    for ($property in $schema) {
      var $sch = $schema[$property];
      var $deps = Array.isArray($sch) ? $propertyDeps : $schemaDeps;
      $deps[$property] = $sch;
    }
  }}
  
  var {{=$errs}} = errors;
  
  {{ var $currentErrorPath = it.errorPath; }}
  
  var missing{{=$lvl}};
  {{ for (var $property in $propertyDeps) { }}
    {{ $deps = $propertyDeps[$property]; }}
    {{? $deps.length }}
      if ({{# def.propertyInData }}
        {{? $breakOnError }}
            && ({{# def.checkMissingProperty:$deps }})) {
            {{# def.errorMissingProperty:'dependencies' }}
        {{??}}
          ) {
            {{~ $deps:$propertyKey }}
              {{# def.allErrorsMissingProperty:'dependencies' }}
            {{~}}
        {{?}}
      } {{# def.elseIfValid }}
    {{?}}
  {{ } }}
  
  {{
    it.errorPath = $currentErrorPath;
    var $currentBaseId = $it.baseId;
  }}
  
  
  {{ for (var $property in $schemaDeps) { }}
    {{ var $sch = $schemaDeps[$property]; }}
    {{? {{# def.nonEmptySchema:$sch }} }}
      {{=$nextValid}} = true;
  
      if ({{# def.propertyInData }}) {
        {{ 
          $it.schema = $sch;
          $it.schemaPath = $schemaPath + it.util.getProperty($property);
          $it.errSchemaPath = $errSchemaPath + '/' + it.util.escapeFragment($property);
        }}
  
        {{# def.insertSubschemaCode }}
      }
  
      {{# def.ifResultValid }}
    {{?}}
  {{ } }}
  
  {{? $breakOnError }} 
    {{= $closingBraces }}
    if ({{=$errs}} == errors) {
  {{?}}
  
  {{# def.cleanUp }};
}).call(this);
