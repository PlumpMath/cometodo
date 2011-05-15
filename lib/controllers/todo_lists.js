var templates = require('../templates').create('./templates/');
var todo_list = require('../../model/todo_list').create();

exports.addRoutes = function(router) {
  router.addRoute('/index.html', function (request, response) {
    templates.serve('index', {
      todo_list: todo_list
    }, response);
  });
};