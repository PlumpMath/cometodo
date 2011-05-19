var http = require('http');
var router = require('./routes').router;
var serveFile = require('./serve_file');
var setContentType = require('./set_content_type');

router.setDefault(serveFile);

http.createServer(function (request, response) {
  setContentType(request, response);
  router.route(request, response);
}).listen(process.env.VMC_APP_PORT || 3000);
