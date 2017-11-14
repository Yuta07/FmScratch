(function() { this.JST || (this.JST = {}); this.JST["ajv/lib/dot/format"] = {{# def.definitions }}
  {{# def.errors }}
  {{# def.setupKeyword }}
  
  {{## def.skipFormat:
    {{? $breakOnError }} if (true) { {{?}}
    {{ return out; }}
  #}}
  
  {{? it.opts.format === false }}{{# def.skipFormat }}{{?}}
  
  
  {{# def.$data }}
  
  
  {{## def.$dataCheckFormat:
    {{# def.$dataNotType:'string' }}
    ({{? $unknownFormats != 'ignore' }}
       ({{=$schemaValue}} && !{{=$format}}
        {{? $allowUnknown }}
          && self._opts.unknownFormats.indexOf({{=$schemaValue}}) == -1
        {{?}}) ||
     {{?}}
     ({{=$format}} && {{=$formatType}} == '{{=$ruleType}}'
                   && !(typeof {{=$format}} == 'function'
                       ? {{? it.async}}
                          (async{{=$lvl}} ? {{=it.yieldAwait}} {{=$format}}({{=$data}}) : {{=$format}}({{=$data}}))
                         {{??}}
                          {{=$format}}({{=$data}})
                         {{?}}
                       : {{=$format}}.test({{=$data}}))))
  #}}
  
  {{## def.checkFormat:
    {{
      var $formatRef = 'formats' + it.util.getProperty($schema);
      if ($isObject) $formatRef += '.validate';
    }}
    {{? typeof $format == 'function' }}
      {{=$formatRef}}({{=$data}})
    {{??}}
      {{=$formatRef}}.test({{=$data}})
    {{?}}
  #}}
  
  
  {{
    var $unknownFormats = it.opts.unknownFormats
      , $allowUnknown = Array.isArray($unknownFormats);
  }}
  
  {{? $isData }}
    {{
      var $format = 'format' + $lvl
        , $isObject = 'isObject' + $lvl
        , $formatType = 'formatType' + $lvl;
    }}
    var {{=$format}} = formats[{{=$schemaValue}}];
    var {{=$isObject}} = typeof {{=$format}} == 'object'
                          && !({{=$format}} instanceof RegExp)
                          && {{=$format}}.validate;
    var {{=$formatType}} = {{=$isObject}} && {{=$format}}.type || 'string';
    if ({{=$isObject}}) {
      {{? it.async}}
        var async{{=$lvl}} = {{=$format}}.async;
      {{?}}
      {{=$format}} = {{=$format}}.validate;
    }
    if ({{# def.$dataCheckFormat }}) {
  {{??}}
    {{ var $format = it.formats[$schema]; }}
    {{? !$format }}
      {{? $unknownFormats == 'ignore' }}
        {{ console.warn('unknown format "' + $schema + '" ignored in schema at path "' + it.errSchemaPath + '"'); }}
        {{# def.skipFormat }}
      {{?? $allowUnknown && $unknownFormats.indexOf($schema) >= 0 }}
        {{# def.skipFormat }}
      {{??}}
        {{ throw new Error('unknown format "' + $schema + '" is used in schema at path "' + it.errSchemaPath + '"'); }}
      {{?}}
    {{?}}
    {{
      var $isObject = typeof $format == 'object'
                      && !($format instanceof RegExp)
                      && $format.validate;
      var $formatType = $isObject && $format.type || 'string';
      if ($isObject) {
        var $async = $format.async === true;
        $format = $format.validate;
      }
    }}
    {{? $formatType != $ruleType }}
      {{# def.skipFormat }}
    {{?}}
    {{? $async }}
      {{
        if (!it.async) throw new Error('async format in sync schema');
        var $formatRef = 'formats' + it.util.getProperty($schema) + '.validate';
      }}
      if (!({{=it.yieldAwait}} {{=$formatRef}}({{=$data}}))) {
    {{??}}
      if (!{{# def.checkFormat }}) {
    {{?}}
  {{?}}
      {{# def.error:'format' }}
    } {{? $breakOnError }} else { {{?}};
}).call(this);
