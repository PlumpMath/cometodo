var http = require('http');
var file_server = require('./file_server').create();

http.createServer(function (request, response) {
  file_server.serve(request.url, response);
}).listen(process.env.VMC_APP_PORT || 3000);
