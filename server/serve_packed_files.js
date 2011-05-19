var fs = require('fs');
var _ = require('underscore');
var async = require('./async');
var serveContentsCallback = require('./serve_contents_callback');

function join(array) {
  return array.join("\n");
}

function map_file_names_to_file_paths(file_names, directory) {
  return _.map(file_names, function (file_name) {
    return directory + file_name;
  });
}

function loadFilesFromDir(directory, filter, callback) {
  fs.readdir(directory, function (err, file_names) {
    var file_names = _.select(file_names, filter);
    var file_paths = map_file_names_to_file_paths(file_names, directory);
    async.map(fs.readFile, file_paths, callback);
  });
}

function packAndServeContentsCallback(response) {
  var serve = serveContentsCallback(response);
  return function (err, dirContents) {
    var packed = join(_.map(dirContents, join));
    serve(err, packed);
  };
}

function matchRegexpCallback(regexp) {
  return function (string) {
    return string.match(regexp);
  };
}

var servePackedFiles = function (dirs, filter_regexp, response) {
  var filter = matchRegexpCallback(filter_regexp);
  async.map(function (directory, callback) {
    loadFilesFromDir(directory, filter, callback);
  }, dirs, packAndServeContentsCallback(response));
};

module.exports = servePackedFiles;