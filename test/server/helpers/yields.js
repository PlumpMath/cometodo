var _ = require('underscore');
var restoreCalls = [];

var yields = function yields(obj, method, args) {
  storeOriginal(obj, method);
  obj[method] = function () {
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] === 'function') {
        return arguments[i].apply(null, args);
      }
    }
  };
};

function storeOriginal(obj, method) {
  var original = obj[method];
  restoreCalls.push(function () {
    obj[method] = original;
  });
}

yields.restoreOriginals = function () {
  while (restoreCalls.length > 0) {
    (restoreCalls.pop())();
  }
};

module.exports = yields;