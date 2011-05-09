/*jslint indent: 2*/
/*global module, require*/

var path = require('path');
var fs = require('fs');

module.exports = {
  create: function () {
    return Object.create(this);
  },
  
  onFileNotFound: function (callback) {
    this._fileNotFoundCallback = callback;
  },
  
  serve: function (url, response) {
    var self = this;
    var file_path = './public' + url;
    path.exists(file_path, function (exists) {
      if (!exists) {
        self._fileNotFoundCallback(file_path, response);
      } else {
        self._serveFile(file_path, response);
      }
    });
  },
  
  _serveFile: function (file_path, response) {
    fs.readFile(file_path, 'binary', function (err, file) {
      if (err) {
        response.writeHead(500);
        response.write(err);
        response.end();
        return;
      }
      response.writeHead(200);
      response.write(file, 'binary');
      response.end();
    });
  },
  
  _fileNotFoundCallback: function (file_path, response) {
    response.writeHead(404);
    response.write('404 Not Found: ' + file_path);
    response.end();
  }
};