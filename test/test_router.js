/*jslint indent: 2*/
/*globals module*/

require('sinon-nodeunit');
var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
var router = require('router');

module.exports = testCase({
  setUp: function (callback) {
    this.router = router.create();
    callback();
  },
  
  "should do routing asynchronously": function (test) {
    var destination = test.stub();
    this.router.addRoute("/", destination);
    this.router.route("/");
    test.notCalled(destination);
    process.nextTick(function () {
      test.called(destination);
      test.done();
    });
  }
});
