(function() { this.JST || (this.JST = {}); this.JST["ajv/lib/dot/_limitItems"] = {{# def.definitions }}
  {{# def.errors }}
  {{# def.setupKeyword }}
  {{# def.$data }}
  
  {{ var $op = $keyword == 'maxItems' ? '>' : '<'; }}
  if ({{# def.$dataNotType:'number' }} {{=$data}}.length {{=$op}} {{=$schemaValue}}) {
    {{ var $errorKeyword = $keyword; }}
    {{# def.error:'_limitItems' }}
  } {{? $breakOnError }} else { {{?}};
}).call(this);
