var templates = require('../templates').create('./templates/');
var todo_list = require('../models/todo_list').create();

todo_list.add('Use same code to render new todos on frontend')
todo_list.add('Long poll for todos')

todo_list.add('Render todos on backend')
todo_list.add('Create static file')
todo_list.add('Create simple')
todo_list.add('Publish to Cloud')
todo_list.complete('Render todos on backend')
todo_list.complete('Create static file')
todo_list.complete('Create simple')
todo_list.complete('Publish to Cloud')

exports.addRoutes = function(router) {
  router.addRoute('/index.html', function (request, response) {
    templates.serve('index', {
      todo_list: todo_list
    }, response);
  });
};