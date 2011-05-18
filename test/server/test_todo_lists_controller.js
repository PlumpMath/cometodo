/*jslint indent: 2, onevar: false*/
/*globals module, require*/

require('sinon-nodeunit');
var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
var todo_lists = require('controllers/todo_lists');

module.exports = testCase({
  
  "should add route: /index.html": function (test) {
    var router = { addRoute: test.stub() };
    todo_lists.addRoutes(router);
    test.called(router.addRoute);
    test.calledWith(router.addRoute, "/index.html");
    test.done();
  },
  
  "should add route: /register_event": function (test) {
    var router = { addRoute: test.stub() };
    todo_lists.addRoutes(router);
    test.called(router.addRoute);
    test.calledWith(router.addRoute, "/register_event");
    test.done();
  },
  
});