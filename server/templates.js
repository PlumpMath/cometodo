/*jslint indent: 2*/
/*globals module, require*/

var fs = require('fs');
var _ = require('underscore');
var serveContentsCallback = require('./serve_contents_callback');

module.exports = {
  create: function (directory) {
    return _.extend(Object.create(this), {
      directory: directory
    });
  },

  render: function (template, data) {
    return template.replace(/\{\{([\w\d _]+)\}\}/g, function (mustache, key) {
      var obj = data.hasOwnProperty(key) ? data[key] : mustache;
      return obj['render'] ? obj.render() : obj;
    });
  },
  
  pathTo: function (template_name) {
    return this.directory + template_name + ".html.tmpl";
  },

  load: function (template_name, obj, callback) {
    var self = this;
    fs.readFile(self.pathTo(template_name), 'utf-8', function (err, data) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, self.render(data, obj));
      }
    });
  },
  
  serve: function (template_name, obj, response) {
    this.load(template_name, obj, serveContentsCallback(response));
  }
};
