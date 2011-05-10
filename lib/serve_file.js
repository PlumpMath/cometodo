/*jslint indent: 2*/
/*global module, require*/

var path = require('path');
var fs = require('fs');

function serveFile(file_path, response) {
  fs.readFile(file_path, 'binary', function (err, file) {
    if (err) {
      response.writeHead(500);
      response.write(err.toString());
      response.end();
      return;
    }
    response.writeHead(200);
    response.write(file, 'binary');
    response.end();
  });
}

function handleFileNotFound(file_path, response) {
  response.writeHead(404);
  response.write('404 Not Found: ' + file_path);
  response.end();
}

function serve(url, response) {
  var file_path = './public' + url;
  path.exists(file_path, function (exists) {
    if (!exists) {
      handleFileNotFound(file_path, response);
    } else {
      serveFile(file_path, response);
    }
  });
}

module.exports = serve;
