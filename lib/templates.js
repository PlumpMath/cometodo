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
    this.load(template_name, obj, function (err, html) {
      if (err) {
        response.writeHead(500);
        response.write(err);
        response.end();
        return;
      }
      response.writeHead(200, {
        "Content-Type": "text/html"
      });
      response.write(html);
      response.end();
    });
  }
};
