var url = require('url');
var EventEmitter = require('events').EventEmitter;
var loadPostedData = require('../load_posted_data');
var templates = require('../templates').create('./templates/');
var todo_list = require('../../model/todo_list').create();

var events = [];
var eventNotifier = new EventEmitter();

exports.addRoutes = function(router) {
  router.addRoute('/index.html', index);
  router.addRoute('/register_event', registerEvent);
  router.addRoute('/get_new_events.json', getNewEvents);
};

function index(request, response) {
  var model = {
    todo_list: todo_list,
    new_event_token: events.length
  };
  templates.serve('index', model, response);
}

function registerEvent(request, response) {
  loadPostedData(request, function (data) {
    var event = loadEvent(data);
    event.updateModel(todo_list);
    events.push(event);
    eventNotifier.emit('new_events');
  });
}

function getNewEvents(request, response) {
  var new_event_token = getNewEventToken(request);
  var any_new_events = events.length > new_event_token;

  var respondWithNewEvents = function () {
    respondWithEvents(events.slice(new_event_token), response);
  };

  if (any_new_events) {
    respondWithNewEvents();
  } else {
    listenForNewEventsThen(respondWithNewEvents);
  }
}

function listenForNewEventsThen(respondWithNewEvents) {
  var timeout;
  var clearEventsAndRespond = function () {
    eventNotifier.removeListener('new_events', clearEventsAndRespond);
    clearTimeout(timeout);
    respondWithNewEvents();
  };
  
  eventNotifier.on('new_events', clearEventsAndRespond);
  timeout = setTimeout(clearEventsAndRespond, 10 * 1000);
}

function getNewEventToken(request) {
  return url.parse(request.url, true).query.new_event_token;
}

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
