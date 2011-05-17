/*jslint indent: 2, onevar: false*/
/*globals module, require*/

require('sinon-nodeunit');
var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
var parallellize = require('parallellize');

module.exports = testCase({
  "should call back with empty list": function (test) {
    parallellize(function () {
      test.fail("should never call iterator with empty list");
    }, [], function () {
      test.done();
    });
  },
});