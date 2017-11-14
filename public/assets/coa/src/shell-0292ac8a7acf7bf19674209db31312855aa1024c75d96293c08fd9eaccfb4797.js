(function() {
  exports.unescape = function(w) {
    w = w.charAt(0) === '"' ? w.replace(/^"|([^\\])"$/g, '$1') : w.replace(/\\ /g, ' ');
    return w.replace(/\\("|'|\$|`|\\)/g, '$1');
  };

  exports.escape = function(w) {
    w = w.replace(/(["'$`\\])/g, '\\$1');
    if (w.match(/\s+/)) {
      return '"' + w + '"';
    } else {
      return w;
    }
  };

}).call(this);
