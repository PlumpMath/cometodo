/*jslint indent: 2*/
/*globals module, require*/

require('sinon-nodeunit');
var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
var redirect = require('redirect');

function redirectToIndex(test) {
  var response = { writeHead: test.stub(), end: test.stub() };
  redirect("/index.html", response);
  return response;
}

module.exports = testCase({
  "should write 302 and location to header": function (test) {
    var response = redirectToIndex(test);
    test.calledWith(response.writeHead, 302, {"Location": "/index.html"});
    test.done();
  },
  
  "should close response": function (test) {
    var response = redirectToIndex(test);
    test.called(response.end);
    test.done();
  },
  
  
});