var http = require('http');

http.createServer(function (request, response) {
  response.end("Heisann! Du ba om: " + request.url);
}).listen(8000);