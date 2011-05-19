/*jslint indent: 2*/
/*globals exports, require*/

var router = require('./router').create();
var redirect = require('./redirect');
var serveClientScripts = require('./serve_client_scripts');

router.addRoute('/application.js', serveClientScripts);

router.addRoute("/", function (request, response) {
  redirect("/index.html", response);
});

require('./controllers/todo_lists').addRoutes(router);

exports.router = router;