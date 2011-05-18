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
  
  "should do routing synchronously": function (test) {
    var index = test.stub();
    this.router.addRoute("/", index);
    this.router.route({url: "/"});
    test.called(index);
    test.done();
  },
  
  "should set default route": function (test) {
    var def = test.stub();
    this.router.setDefault(def);
    this.router.route({url: "/404.html"});
    test.called(def);
    test.done();
  },
  
  "should fail fast without default route": function (test) {
    test.throws(function () {
      this.router.route({url: "/404.html"});
    });
    test.done();
  },
  
  "should pass on request and response": function (test) {
    var index = test.stub();
    var request = {url: "/"};
    var response = {};
    this.router.addRoute("/", index);
    this.router.route(request, response);
    test.calledWith(index, request, response);
    test.done();
  },
  
  
});
