/*jslint indent: 2*/
/*globals module, require*/

require('sinon-nodeunit');
var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
var router = require('routes').router;
var _ = require('underscore');

module.exports = testCase({
  "should create router": function (test) {
    // todo: use assertPrototypeOf 
    test.equals('function', typeof router.route);
    test.equals(2, router.route.length);
    test.done();
  },
  
  "should define route for /": function (test) {
    test.equals('function', typeof router.routes["/"]);
    test.done();
  },
  
  "routes should accept two parameters": function (test) {
    _(router.routes).each(function (f) {
      test.equals(2, f.length);
    });
    test.done();
  }
  
  
});