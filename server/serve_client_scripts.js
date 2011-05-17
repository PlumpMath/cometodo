var servePackedFiles = require('./serve_packed_files');

module.exports = function (request, response) {
  servePackedFiles([
    'deps/',
    'model/',
    'model/events/',
    'client/'
  ], /\.js$/, response)
};