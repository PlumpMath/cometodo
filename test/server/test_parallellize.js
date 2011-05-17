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
  
  "should give return values in same order as list": function (test) {
    var callbacks = [];

    parallellize(function (x, callback) {
      callbacks.push(function () {
        callback(null, x * x);
      });
    }, [1, 2, 3], function (err, results) {
      test.same([1, 4, 9], results);
      test.done();
    });
    
    callbacks[2].call();
    callbacks[1].call();
    callbacks[0].call();
  },
  
});