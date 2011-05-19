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
  
  "should replace multiple mustaches": function (test) {
    var obj = {greeting: 'Hola', name: 'Hawaii'};
    test.equals('Hola Hawaii!', this.templates.render('{{greeting}} {{name}}!', obj));
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
  }

});