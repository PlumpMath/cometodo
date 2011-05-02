/*jslint indent: 2*/
/*globals module*/

var testCase = require('nodeunit').testCase;
var sinon = require('sinon');
var router = require('router');

module.exports = testCase({
  setUp: function (callback) {
    this.router = router.create();
    callback();
  },
  
  "should do routing asynchronously": function (test) {
    var destination = sinon.stub();
    this.router.addRoute("/", destination);
    this.router.route("/");
    test.ok(!destination.called);
    process.nextTick(function () {
      test.ok(destination.called);
      test.done();
    });
  }
});