var http = require('http');
var file_server = require('./file_server').create();
var router = require('./routes').router;

router.setDefault(function (request, response) {
  file_server.serve(request.url, response);
});

http.createServer(function (request, response) {
  router.route(request, response);
}).listen(process.env.VMC_APP_PORT || 3000);
