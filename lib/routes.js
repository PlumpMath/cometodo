/*jslint indent: 2*/
/*globals exports, require*/

var router = require('./router').create();
var redirect = require('./redirect');

router.addRoute("/", function (request, response) {
  redirect("/index.html", response);
});

exports.router = router;