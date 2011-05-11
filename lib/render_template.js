/*jslint indent: 2*/
/*globals module, require*/

var fs = require('fs');

module.exports = function (file_path, obj, callback) {
  fs.readFile(file_path, 'utf-8', function (err, data) {
    data = data.replace(/\{\{([\w\d _]+)\}\}/, function (mustache, key) {
      return obj.hasOwnProperty(key) ? obj[key] : mustache;
    });
    callback(err, data);
  });
};