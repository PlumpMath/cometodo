module.exports = function yield(obj, method, args) {
  obj[method] = function () {
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] === 'function') {
        return arguments[i].apply(null, args);
      }
    }
  };
};
