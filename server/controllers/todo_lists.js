var templates = require('../templates').create('./templates/');
var todo_list = require('../../model/todo_list').create();
var loadPostedData = require('../load_posted_data');

exports.addRoutes = function(router) {
  router.addRoute('/index.html', function (request, response) {
    templates.serve('index', {
      todo_list: todo_list,
      new_event_token: todo_list.length
    }, response);
  });
  
  router.addRoute('/register_event', function (request, response) {
    loadPostedData(request, function (data) {
      loadEvent(data).updateModel(todo_list);
    });
  });
};

function loadEvent(data) {
  var type = JSON.parse(data).type;
  return require('../../model/events/' + type).deserialize(data);
}
