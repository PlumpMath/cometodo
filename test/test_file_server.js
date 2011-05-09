/*jslint indent: 2*/
/*globals module, require*/

(function () {
  "use strict";

  require('sinon-nodeunit');
  var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
  var yields = require('yields');

  var file_server = require('file_server');
  var path = require('path');
  var fs = require('fs');

  module.exports = testCase({
    "should look for files in public folder": function (test) {
      test.stub(path, 'exists');
      this.file_server.serve('/index.html');
      test.calledWith(path.exists, './public/index.html');
      test.done();
    },
    
    "file found: should respond with 200 OK": function (test) {
      var response = createDummyResponse(test);
      this.serveExistingFile(response, [null, 'file']);
      test.calledWith(response.writeHead, 200);
      test.done();
    },
    
    "file found: should respond with contents in binary": function (test) {
      var response = createDummyResponse(test);
      this.serveExistingFile(response, [null, 'file']);
      test.calledWith(response.write, 'file', 'binary');
      test.done();
    },
    
    "file found: should end response": function (test) {
      var response = createDummyResponse(test);
      this.serveExistingFile(response, [null, 'file']);
      test.called(response.end);
      test.done();
    },

    "file not found: should respond with 404": function (test) {
      var response = this.requestUnknownFile(test);
      test.calledWith(response.writeHead, 404);
      test.done();
    },

    "file not found: should write 404 error message": function (test) {
      var response = this.requestUnknownFile(test);
      test.calledWith(response.write, '404 Not Found: ./public/404.html');
      test.done();
    },

    "file not found: should end response": function (test) {
      var response = this.requestUnknownFile(test);
      test.called(response.end);
      test.done();
    },
    
    "file not found: can define own overriding callback": function (test) {
      var callback = test.stub();
      yields(path, 'exists', [false]);
      this.file_server.onFileNotFound(callback);
      this.file_server.serve();
      test.called(callback);
      test.done();
    },
    
    "can't read file: should respond with 500 internal server error": function (test) {
      var response = createDummyResponse(test);
      this.serveExistingFile(response, ['error', null]);
      test.calledWith(response.writeHead, 500);
      test.done();
    },

    "can't read file: should respond with contents": function (test) {
      var response = createDummyResponse(test);
      this.serveExistingFile(response, ['error', null]);
      test.calledWith(response.write, 'error');
      test.done();
    },
    
    "can't read file: should end response": function (test) {
      var response = createDummyResponse(test);
      this.serveExistingFile(response, ['error', null]);
      test.called(response.end);
      test.done();
    },
    
    setUp: function (callback) {
      this.realMethods = {
        path_exists: path.exists,
        fs_readFile: fs.readFile
      };
      this.file_server = file_server.create();
      this.serveExistingFile = serveExistingFile;
      this.requestUnknownFile = requestUnknownFile;
      callback();
    },

    tearDown: function (callback) {
      path.exists = this.realMethods.path_exists;
      fs.readFile = this.realMethods.fs_readFile;
      callback();
    }    
  });
  
  function createDummyResponse(test) {
    return {
      writeHead: test.stub(),
      write: test.stub(),
      end: test.stub()
    };
  }
  
  function serveExistingFile(response, read_file_result) {
    yields(path, 'exists', [true]);
    yields(fs, 'readFile', read_file_result);
    this.file_server.serve('/index.html', response);
  }
  
  function requestUnknownFile(test) {
    var response = createDummyResponse(test);
    yields(path, 'exists', [false]);
    this.file_server.serve('/404.html', response);
    return response;
  }
  
}());
