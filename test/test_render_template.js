/*jslint indent: 2*/
/*globals module, require*/

require('sinon-nodeunit');
var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
var renderTemplate = require('render_template');

module.exports = testCase({
  "should load file": function (test) {
    renderTemplate('./test/resources/template.html.tmpl', {}, function (err, html) {
      test.equals('Hello {{name}}!', html);
      test.done();
    });
  },
  
  "should replace mustaches": function (test) {
    var obj = {name: 'World'};
    renderTemplate('./test/resources/template.html.tmpl', obj, function (err, html) {
      test.equals('Hello World!', html);
      test.done();
    });
  }
  
});