var CT = CT || {};

(function ($) {
  var url = '/get_new_events.json';
  var new_event_token;
  
  function executeEvents(events) {
    _.each(events, function (event) {
      CT.events[event.type].deserialize(event).updateDOM();
    });
  }

  function getNewEvents(callback) {
    $.getJSON(url, {new_event_token: new_event_token}, function (data) {
      new_event_token = data.new_event_token || new_event_token;
      callback(data);
    });
  }
  
  function poll() {
    getNewEvents(function (data) {
      executeEvents(data.events);
      poll();
    });
  }
  
  function register(event) {
    $.post('/register_event', event.serialize());
  }
  
  function startPolling() {
    new_event_token = $("#new_event_token").val();
    poll();
  }
  
  CT.event_handler = {
    register: register,
    startPolling: startPolling
  };
    
}(jQuery));
