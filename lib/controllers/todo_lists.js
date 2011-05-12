var templates = require('../templates').create('./templates/');

exports.addRoutes = function(router) {
  router.addRoute('/index.html', function (request, response) {
    templates.serve('index', {}, response);
  });
};