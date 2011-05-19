var parseUrl = require('url').parse;
var _ = require('underscore');

var types = {
  'js'  : {contentType: 'application/javascript', fileEncoding: 'utf8'},
  'json': {contentType: 'application/json', fileEncoding: 'utf8'},
  'html': {contentType: 'text/html', fileEncoding: 'utf8'},
  'css' : {contentType: 'text/css',  fileEncoding: 'utf8'},
  'gif' : {contentType: 'image/gif', fileEncoding: 'binary'},
  'jpg' : {contentType: 'image/jpg', fileEncoding: 'binary'},
  'png' : {contentType: 'image/png', fileEncoding: 'binary'},
};

function parseFileExtension(url) {
  return _.last(parseUrl(url).pathname.split("."));
}

module.exports = function (request, response) {
  var extension = parseFileExtension(request.url);
  var type = types[extension];
  if (type) {
    response.setHeader("Content-Type", type.contentType);
    response.fileEncoding = type.fileEncoding;
  }
}