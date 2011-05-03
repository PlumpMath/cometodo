/*jslint indent: 2*/
/*globals module*/

require('sinon-nodeunit');
var router = require('router').create();

exports["should do routing asynchronously"] = function (test) {
  var destination = test.stub();
  router.addRoute("/", destination);
  router.route("/");
  test.notCalled(destination);
  process.nextTick(function () {
    test.called(destination);
    test.done();
  });
};
