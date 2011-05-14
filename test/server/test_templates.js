/*jslint indent: 2*/
/*globals module, require*/

require('sinon-nodeunit');
var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
var templates = require('templates');

module.exports = testCase({
  setUp: function (callback) {
    this.templates = templates.create('./test/resources/');
    callback();
  },

  "should replace mustaches": function (test) {
    var obj = {name: 'World'};
    test.equals('Hello World!', this.templates.render('Hello {{name}}!', obj));
    test.done();
  },

  "should call render on objects": function (test) {
    var obj = {item_collection: {
      render: function () { return "<li><li><li>"; }
    }};
    test.equals('<ul><li><li><li></ul>',
                this.templates.render('<ul>{{item_collection}}</ul>', obj));
    test.done();
  },

  "should find full path": function (test) {
    test.equals('./test/resources/template.html.tmpl',
                this.templates.pathTo('template'));
    test.done();
  },

  "should load file": function (test) {
    this.templates.load('template', {}, function (err, html) {
      test.equals('Hello {{name}}!', html);
      test.done();
    });
  },

  "load should fail properly": function (test) {
    this.templates.load('bad_file_name', {}, function (err, html) {
      test.ok(err);
      test.done();
    });
  },

  "should serve template": function (test) {
    var response = {
      writeHead: function (code, headers) {
        test.equals(200, code);
        test.equals("text/html", headers["Content-Type"]);
      },
      write: function (html) {
        test.equals('Hello {{name}}!', html);
      },
      end: function () {
        test.done();
      }
    };
    this.templates.serve('template', {}, response);
  },

  "serve should fail with 500": function (test) {
    var response = {
      writeHead: function (code, headers) {
        test.equals(500, code);
      },
      write: function (html) {
        test.ok(html);
      },
      end: function () {
        test.done();
      }
    };
    this.templates.serve('unknown_file', {}, response);
  }


});