var CT = CT || {};

(function ($) {
  var new_event_token;
  
  function register(event) {
    $.post('/register_event', event.serialize());
  }
  
  function poll() {
    if (typeof new_event_token === 'undefined') {
      new_event_token = $("#new_event_token").val();
    }
    $.getJSON('/get_new_events.json', {new_event_token: new_event_token}, function (data) {
      new_event_token = data.new_event_token || new_event_token;
      _.each(data.events, function (event) {
        CT.events[event.type].deserialize(event).updateDOM();
      });
      poll();
    });
  }
  
  CT.event_handler = {
    register: register,
    poll: poll
  };
    
}(jQuery));

