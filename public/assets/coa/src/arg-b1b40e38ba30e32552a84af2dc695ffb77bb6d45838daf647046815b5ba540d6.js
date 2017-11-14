(function() {
  var Arg, Cmd, Color, Opt;

  Color = require('./color').Color;

  Cmd = require('./cmd').Cmd;

  Opt = require('./opt').Opt;


  /**
  Argument
  
  Unnamed entity. From command line arguments passed as list of unnamed values.
  @namespace
  @class Presents argument
   */

  exports.Arg = Arg = (function() {

    /**
    @constructs
    @param {COA.Cmd} cmd parent command
     */
    function Arg(_cmd) {
      this._cmd = _cmd;
      this._cmd._args.push(this);
    }


    /**
    Set a canonical argument identifier to be used anywhere in text messages.
    @param {String} _name argument name
    @returns {COA.Arg} this instance (for chainability)
     */

    Arg.prototype.name = Opt.prototype.name;


    /**
    Set a long description for argument to be used anywhere in text messages.
    @param {String} _title argument title
    @returns {COA.Arg} this instance (for chainability)
     */

    Arg.prototype.title = Cmd.prototype.title;


    /**
    Makes an argument accepts multiple values.
    Otherwise, the value will be used by the latter passed.
    @returns {COA.Arg} this instance (for chainability)
     */

    Arg.prototype.arr = Opt.prototype.arr;


    /**
    Makes an argument required.
    @returns {COA.Arg} this instance (for chainability)
     */

    Arg.prototype.req = Opt.prototype.req;


    /**
    Set a validation (or value) function for argument.
    Value from command line passes through before becoming available from API.
    Using for validation and convertion simple types to any values.
    @param {Function} _val validating function,
        invoked in the context of argument instance
        and has one parameter with value from command line
    @returns {COA.Arg} this instance (for chainability)
     */

    Arg.prototype.val = Opt.prototype.val;


    /**
    Set a default value for argument.
    Default value passed through validation function as ordinary value.
    @param {Object} _def
    @returns {COA.Arg} this instance (for chainability)
     */

    Arg.prototype.def = Opt.prototype.def;


    /**
    Set custom additional completion for current argument.
    @param {Function} completion generation function,
        invoked in the context of argument instance.
        Accepts parameters:
            - {Object} opts completion options
        It can return promise or any other value treated as result.
    @returns {COA.Arg} this instance (for chainability)
     */

    Arg.prototype.comp = Cmd.prototype.comp;


    /**
    Make argument value inputting stream.
    It's add useful validation and shortcut for STDIN.
    @returns {COA.Arg} this instance (for chainability)
     */

    Arg.prototype.input = Opt.prototype.input;


    /**
    Make argument value outputing stream.
    It's add useful validation and shortcut for STDOUT.
    @returns {COA.Arg} this instance (for chainability)
     */

    Arg.prototype.output = Opt.prototype.output;

    Arg.prototype._parse = function(arg, args) {
      return this._saveVal(args, arg);
    };

    Arg.prototype._saveVal = Opt.prototype._saveVal;

    Arg.prototype._checkParsed = function(opts, args) {
      return !args.hasOwnProperty(this._name);
    };

    Arg.prototype._usage = function() {
      var res;
      res = [];
      res.push(Color('lpurple', this._name.toUpperCase()), ' : ', this._title);
      if (this._req) {
        res.push(' ', Color('lred', '(required)'));
      }
      return res.join('');
    };

    Arg.prototype._requiredText = function() {
      return 'Missing required argument:\n  ' + this._usage();
    };


    /**
    Return rejected promise with error code.
    Use in .val() for return with error.
    @param {Object} reject reason
        You can customize toString() method and exitCode property
        of reason object.
    @returns {Q.promise} rejected promise
     */

    Arg.prototype.reject = Cmd.prototype.reject;


    /**
    Finish chain for current option and return parent command instance.
    @returns {COA.Cmd} parent command
     */

    Arg.prototype.end = Cmd.prototype.end;


    /**
    Apply function with arguments in context of arg instance.
    @param {Function} fn
    @param {Array} args
    @returns {COA.Arg} this instance (for chainability)
     */

    Arg.prototype.apply = Cmd.prototype.apply;

    return Arg;

  })();

}).call(this);
