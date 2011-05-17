/*jslint indent: 2, onevar: false*/
/*globals module, require*/

require('sinon-nodeunit');
var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
var servePackedFiles = require('serve_packed_files');
var yields = require('./helpers/yields');
var fs = require('fs');

function stubResponse(test) {
  return {
    writeHead: test.stub(),
    write: test.stub(),
    end: test.stub()
  };
}

module.exports = testCase({
  "should list files in folder": function (test) {
    test.stub(fs, 'readdir');
    servePackedFiles(['directory/'], /./, stubResponse(test));
    test.calledWith(fs.readdir, 'directory/');
    test.done();
  },
  
  "should load files in folder": function (test) {
    yields(fs, 'readdir', [null, ['file1.js', 'file2.js']]);
    test.stub(fs, 'readFile');
    servePackedFiles(['directory/'], /./, stubResponse(test));
    test.calledTwice(fs.readFile);
    test.calledWith(fs.readFile, 'directory/file1.js');
    test.calledWith(fs.readFile, 'directory/file2.js');
    test.done();
  },
  
  "should respond with file contents": function (test) {
    var response = stubResponse(test);
    yields(fs, 'readdir', [null, ['file1.js', 'file2.js']]);
    yields(fs, 'readFile', [null, 'contents']);
    servePackedFiles(['directory/'], /./, response);
    test.calledOnce(response.write);
    test.calledWith(response.write, 'contents\ncontents');
    test.done();
  },
  
  "should support multiple directories": function (test) {
    var response = stubResponse(test);
    yields(fs, 'readdir', [null, ['file.js']]);
    yields(fs, 'readFile', [null, 'file contents']);
    servePackedFiles(['directory1/', 'directory2/'], /./, response);
    test.calledOnce(response.write);
    test.calledWith(response.write, 'file contents\nfile contents');
    test.done();
  },
  
  "should filter files by regexp": function (test) {
    yields(fs, 'readdir', [null, ['file1.js', 'file2.php']]);
    test.stub(fs, 'readFile');
    servePackedFiles(['directory/'], /\.js$/, stubResponse(test));
    test.calledOnce(fs.readFile);
    test.done();
  },
  
  
  tearDown: function (callback) {
    yields.restoreOriginals();
    callback();
  }
  
});