var http = require('http');
var serveFile = require('./serve_file');
var router = require('./routes').router;

router.setDefault(function (request, response) {
  serveFile(request.url, response);
});

http.createServer(function (request, response) {
  router.route(request, response);
}).listen(process.env.VMC_APP_PORT || 3000);
