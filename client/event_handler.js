var CT = CT || {};

CT.event_handler = {
  register: function (event) {
    event.updateDOM();
    $.post('/register_event', event.serialize());
  }
};