/*jslint indent: 2, onevar: false*/
/*globals module, require*/

require('sinon-nodeunit');
var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
var todo_lists = require('controllers/todo_lists');

function assertRoute(route, test) {
  var router = { addRoute: test.stub() };
  todo_lists.addRoutes(router);
  test.called(router.addRoute);
  test.calledWith(router.addRoute, route);
}

module.exports = testCase({
  
  "should add route: /index.html": function (test) {
    assertRoute('/index.html', test);
    test.done();
  },
  
  "should add route: /register_event": function (test) {
    assertRoute('/register_event', test);
    test.done();
  },
  
  "should add route: /get_new_events.json": function (test) {
    assertRoute('/get_new_events.json', test);
    test.done();
  },
  
});