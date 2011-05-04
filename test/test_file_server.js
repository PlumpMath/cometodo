/*jslint indent: 2*/
/*globals module*/

require('sinon-nodeunit');
var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
var yield = require('yield');

var file_server = require('file_server');
var path = require('path');

module.exports = testCase({
  setUp: function (callback) {
    this.realMethods = {
      path_exists: path.exists
    };
    callback();
  },
  
  tearDown: function (callback) {
    path.exists = this.realMethods.path_exists;
    callback();
  },
  
  "should callback if file not found": function (test) {
    var fnf = test.stub();
    this.file_server = file_server.create();
    this.file_server.onFileNotFound(fnf);
    yield(path, 'exists', [false]);
    this.file_server.serve();
    test.called(fnf);
    test.done();
  }
});