(function() { this.JST || (this.JST = {}); this.JST["ajv/lib/dot/items"] = {{# def.definitions }}
  {{# def.errors }}
  {{# def.setupKeyword }}
  {{# def.setupNextLevel }}
  
  
  {{## def.validateItems:startFrom:
    for (var {{=$idx}} = {{=startFrom}}; {{=$idx}} < {{=$data}}.length; {{=$idx}}++) {
      {{
        $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
        var $passData = $data + '[' + $idx + ']';
        $it.dataPathArr[$dataNxt] = $idx;
      }}
  
      {{# def.generateSubschemaCode }}
      {{# def.optimizeValidate }}
  
      {{? $breakOnError }}
        if (!{{=$nextValid}}) break;
      {{?}}
    }
  #}}
  
  {{
    var $idx = 'i' + $lvl
      , $dataNxt = $it.dataLevel = it.dataLevel + 1
      , $nextData = 'data' + $dataNxt
      , $currentBaseId = it.baseId;
  }}
  
  var {{=$errs}} = errors;
  var {{=$valid}};
  
  {{? Array.isArray($schema) }}
    {{ /* 'items' is an array of schemas */}}
    {{ var $additionalItems = it.schema.additionalItems; }}
    {{? $additionalItems === false }}
      {{=$valid}} = {{=$data}}.length <= {{= $schema.length }};
      {{
        var $currErrSchemaPath = $errSchemaPath;
        $errSchemaPath = it.errSchemaPath + '/additionalItems';      
      }}
      {{# def.checkError:'additionalItems' }}
      {{ $errSchemaPath = $currErrSchemaPath; }}
      {{# def.elseIfValid}}
    {{?}}
  
    {{~ $schema:$sch:$i }}
      {{? {{# def.nonEmptySchema:$sch }} }}
        {{=$nextValid}} = true;
  
        if ({{=$data}}.length > {{=$i}}) {
          {{
            var $passData = $data + '[' + $i + ']';
            $it.schema = $sch;
            $it.schemaPath = $schemaPath + '[' + $i + ']';
            $it.errSchemaPath = $errSchemaPath + '/' + $i;
            $it.errorPath = it.util.getPathExpr(it.errorPath, $i, it.opts.jsonPointers, true);
            $it.dataPathArr[$dataNxt] = $i;
          }}
  
          {{# def.generateSubschemaCode }}
          {{# def.optimizeValidate }}
        }
  
        {{# def.ifResultValid }}
      {{?}}
    {{~}}
  
    {{? typeof $additionalItems == 'object' && {{# def.nonEmptySchema:$additionalItems }} }}
      {{
        $it.schema = $additionalItems;
        $it.schemaPath = it.schemaPath + '.additionalItems';
        $it.errSchemaPath = it.errSchemaPath + '/additionalItems';
      }}
      {{=$nextValid}} = true;
  
      if ({{=$data}}.length > {{= $schema.length }}) {
        {{# def.validateItems: $schema.length }}
      }
  
      {{# def.ifResultValid }}
    {{?}}
  
  {{?? {{# def.nonEmptySchema:$schema }} }}
    {{ /* 'items' is a single schema */}}
    {{
      $it.schema = $schema;
      $it.schemaPath = $schemaPath;
      $it.errSchemaPath = $errSchemaPath;
    }}
    {{# def.validateItems: 0 }}
  {{?}}
  
  {{? $breakOnError }}
    {{= $closingBraces }}
    if ({{=$errs}} == errors) {
  {{?}}
  
  {{# def.cleanUp }};
}).call(this);
