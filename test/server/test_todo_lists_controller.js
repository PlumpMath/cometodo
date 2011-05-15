/*jslint indent: 2, onevar: false*/
/*globals module, require*/

require('sinon-nodeunit');
var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
var todo_lists = require('controllers/todo_lists');

module.exports = testCase({
  "should add route: index.html": function (test) {
    var router = { addRoute: test.stub() };
    todo_lists.addRoutes(router);
    test.called(router.addRoute);
    test.equals("/index.html", router.addRoute.getCall(0).args[0]);
    test.done();
  },
});