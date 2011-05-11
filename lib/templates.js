/*jslint indent: 2*/
/*globals module, require*/

var fs = require('fs');
var _ = require('underscore');

module.exports = {
  create: function (directory) {
    return _.extend(Object.create(this), {
      directory: directory
    });
  },

  render: function (template, data) {
    return template.replace(/\{\{([\w\d _]+)\}\}/, function (mustache, key) {
      var obj = data.hasOwnProperty(key) ? data[key] : mustache;
      return obj.hasOwnProperty('render') ? obj.render() : obj;
    });
  },
  
  pathTo: function (file_name) {
    return this.directory + file_name + ".html.tmpl";
  },

  load: function (file_name, obj, callback) {
    var self = this;
    fs.readFile(self.pathTo(file_name), 'utf-8', function (err, data) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, self.render(data, obj));
      }
    });
  }
};
