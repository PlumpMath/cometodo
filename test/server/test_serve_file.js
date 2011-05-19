/*jslint indent: 2, onevar: false*/
/*globals module, require*/

(function () {
  "use strict";

  require('sinon-nodeunit');
  var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
  var yields = require('./helpers/yields');

  var serveFile = require('serve_file');
  var path = require('path');
  var fs = require('fs');

  module.exports = testCase({
    "should look for files in public folder": function (test) {
      test.stub(path, 'exists');
      serveFile({ url: '/index.html' });
      test.calledWith(path.exists, './public/index.html');
      test.done();
    },
    
    "file found: should read as binary": function (test) {
      yields(path, 'exists', [true]);
      test.stub(fs, 'readFile');
      serveFile({ url: '/index.html' }, null);
      test.calledWith(fs.readFile, './public/index.html', 'binary');
      test.done();
    },
    
    "file found: should respond with 200 OK": function (test) {
      var response = createDummyResponse(test);
      serveExistingFile(response, [null, 'file']);
      test.calledWith(response.writeHead, 200);
      test.done();
    },
    
    "file found: should respond with contents in fileEncoding": function (test) {
      var response = createDummyResponse(test);
      response.fileEncoding = 'binary';
      serveExistingFile(response, [null, 'file']);
      test.calledWith(response.write, 'file', 'binary');
      test.done();
    },
    
    "file found: should end response": function (test) {
      var response = createDummyResponse(test);
      serveExistingFile(response, [null, 'file']);
      test.called(response.end);
      test.done();
    },

    "file not found: should respond with 404": function (test) {
      var response = requestUnknownFile(test);
      test.calledWith(response.writeHead, 404);
      test.done();
    },

    "file not found: should write 404 error message": function (test) {
      var response = requestUnknownFile(test);
      test.calledWith(response.write, '404 Not Found: ./public/404.html');
      test.done();
    },

    "file not found: should end response": function (test) {
      var response = requestUnknownFile(test);
      test.called(response.end);
      test.done();
    },
    
    "can't read file: should respond with 500 internal server error": function (test) {
      var response = createDummyResponse(test);
      serveExistingFile(response, ['error', null]);
      test.calledWith(response.writeHead, 500);
      test.done();
    },

    "can't read file: should respond with contents": function (test) {
      var response = createDummyResponse(test);
      serveExistingFile(response, ['error', null]);
      test.calledWith(response.write, 'error');
      test.done();
    },
    
    "can't read file: should end response": function (test) {
      var response = createDummyResponse(test);
      serveExistingFile(response, ['error', null]);
      test.called(response.end);
      test.done();
    },
    
    tearDown: function (callback) {
      yields.restoreOriginals();
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
    serveFile({ url: '/index.html' }, response);
  }
  
  function requestUnknownFile(test) {
    var response = createDummyResponse(test);
    yields(path, 'exists', [false]);
    serveFile({ url: '/404.html' }, response);
    return response;
  }
  
}());
