var _ = require('underscore');

function parallellize(func, list, callback) {
  if (list.length === 0) {
    return callback(null, []);
  }
  var results = [];
  _.each(list, function (elem) {
    func(elem, function (err, data) {
      if (err && !callback.called) {
        callback.called = true;
        callback(err);
      } else {
        results.push(data);
        if (results.length === list.length) {
          callback(null, results);
        }
      }
    });
  });
}

module.exports = parallellize;