/*jslint indent: 2*/
/*global module, require*/

var path = require('path');
var fs = require('fs');
var serveContentsCallback = require('./serve_contents_callback');

function loadAndServe(file_path, response) {
  fs.readFile(file_path, 'binary', serveContentsCallback(response));
}

function handleFileNotFound(file_path, response) {
  response.writeHead(404);
  response.write('404 Not Found: ' + file_path);
  response.end();
}

function serveFile(url, response) {
  var file_path = './public' + url;
  path.exists(file_path, function (exists) {
    if (!exists) {
      handleFileNotFound(file_path, response);
    } else {
      loadAndServe(file_path, response);
    }
  });
}

module.exports = serveFile;
