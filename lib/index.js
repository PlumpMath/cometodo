var http = require('http');

http.createServer(function (request, response) {
  response.end("Heisann! Du ba om: " + request.url);
}).listen(process.env.VMC_APP_PORT || 3000);
