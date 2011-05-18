var EventEmitter = require('events').EventEmitter;
var templates = require('../templates').create('./templates/');
var todo_list = require('../../model/todo_list').create();
var loadPostedData = require('../load_posted_data');
var url = require('url');

var events = [];
var eventObserver = new EventEmitter();

exports.addRoutes = function(router) {
  router.addRoute('/index.html', function (request, response) {
    templates.serve('index', {
      todo_list: todo_list,
      new_event_token: events.length
    }, response);
  });
  
  router.addRoute('/register_event', function (request, response) {
    loadPostedData(request, function (data) {
      var event = loadEvent(data);
      event.updateModel(todo_list);
      events.push(event);
      eventObserver.emit('new_events');
    });
  });
  
  router.addRoute('/get_new_events.json', function (request, response) {
    var new_event_token = url.parse(request.url, true).query.new_event_token;
    if (events.length > new_event_token) {
      respondWithEvents(events.slice(new_event_token), response);
    } else {
      var listener = function () {
        clearTimeout(timeout);
        respondWithEvents(events.slice(new_event_token), response);
      };
      eventObserver.once('new_events', listener);
      var timeout = setTimeout(function () {
        eventObserver.removeListener('new_events', listener);
        respondWithEvents([], response);
      }, 10000); // 10 seconds
    }
  });
};

function loadEvent(data) {
  var type = JSON.parse(data).type;
  return require('../../model/events/' + type).deserialize(data);
}

function respondWithEvents(newEvents, response) {
  response.writeHead(200, {'Content-Type': 'application/json'});
  response.write(JSON.stringify({
    events: newEvents,
    new_event_token: events.length
  }));
  response.end();
}