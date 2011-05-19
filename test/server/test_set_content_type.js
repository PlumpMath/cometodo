/*jslint indent: 2, onevar: false*/
/*globals module, require*/

require('sinon-nodeunit');
var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
var setContentType = require('set_content_type');

function assertContentType(fileName, contentType, test) {
  var request = {url: fileName};
  var response = {setHeader: test.stub()};
  setContentType(request, response);
  test.called(response.setHeader);
  test.calledWith(response.setHeader, "Content-Type", contentType);
}

module.exports = testCase({
  "should support .js content type": function (test) {
    assertContentType("/application.js", "application/javascript", test);
    test.done();
  },
  
  "should support .html content type": function (test) {
    assertContentType("/index.html", "text/html", test);
    test.done();
  },
  
  "should support .css content type": function (test) {
    assertContentType("/main.css", "text/css", test);
    test.done();
  },
  
  "should support image content types": function (test) {
    assertContentType("/img.gif", "image/gif", test);
    assertContentType("/img.jpg", "image/jpg", test);
    assertContentType("/img.png", "image/png", test);
    test.done();
  }
  
});