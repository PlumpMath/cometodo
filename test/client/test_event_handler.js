TestCase('TestEventHandler', sinon.testCase({
  setUp: function () {
    this.handler = Object.create(CT.event_handler);
    this.event = Object.create(mockEvent);;
  },
  
  "test should update DOM with new events": function () {
    this.handler.register(this.event);
    assert(this.event.updateDOM.called);
  },
  
  "test should notify server about new event": function () {
    this.stub(jQuery, 'ajax');
    this.handler.register(this.event);
    var params = jQuery.ajax.getCall(0).args[0];
    assertEquals('post', params.type);
    assertEquals('/register_event', params.url);
    assertEquals('{"type":"stub"}', params.data);
  }
}));

/*
type: "POST",
url: url,
data: data,
success: callback,
dataType: "json"

*/