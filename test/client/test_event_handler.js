TestCase('TestEventHandler', sinon.testCase({
  setUp: function () {
    /*:DOC += 
      <input type="hidden" id="new_event_token" value="3">
    */
    this.handler = Object.create(CT.event_handler);
    this.event = mockEvent();
  },
  
  "test should notify server about new event": function () {
    this.stub(jQuery, 'ajax');
    this.handler.register(this.event);
    var params = jQuery.ajax.getCall(0).args[0];
    assertEquals('post', params.type);
    assertEquals('/register_event', params.url);
    assertEquals('{"type":"stub"}', params.data);
  },
  
  "test should poll for events": function () {
    this.stub(jQuery, 'ajax');
    this.handler.poll();
    assert(jQuery.ajax.called);
    var params = jQuery.ajax.getCall(0).args[0];
    assertEquals('get', params.type);
    assertEquals('/get_new_events.json', params.url);
    assertEquals({new_event_token: 3}, params.data);
  },
  
  "test should continue polling with new token": function () {
    this.stub(jQuery, 'ajax');
    this.handler.poll();
    var params = jQuery.ajax.getCall(0).args[0];
    params.success({new_event_token: 5});
    assert(jQuery.ajax.calledTwice);
    params = jQuery.ajax.getCall(1).args[0];
    assertEquals({new_event_token: 5}, params.data);
  },
  
  "test should update DOM with new events": function () {
    this.stub(jQuery, 'ajax');
    this.handler.poll();
    var params = jQuery.ajax.getCall(0).args[0];
    var events = [ mockEvent(), mockEvent() ];
    
    this.stub(CT.events.add_todo, 'deserialize').returns(events[0]);
    this.stub(CT.events.complete_todo, 'deserialize').returns(events[1]);
    params.success({events: [{type: 'add_todo'}, {type: 'complete_todo'}]});

    assert(events[0].updateDOM.called);
    assert(events[1].updateDOM.called);
  }
}));

/*
type: "POST",
url: url,
data: data,
success: callback,
dataType: "json"

*/