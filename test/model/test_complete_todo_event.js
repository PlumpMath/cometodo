var modelTestCase = modelTestCase || require('./helpers/model_test_case');
var module = module || null;

modelTestCase("TestCompleteTodoEvent", module, {
  server: {
    setUp: function (callback) {
      this.event = require('events/complete_todo').create("jam along");
      callback();
    },

    "should complete event": function (test) {
      var todo_list = { complete: test.stub() };
      this.event.updateModel(todo_list);
      test.calledWith(todo_list.complete, "jam along");
      test.done();
    },
    
    "should be of type complete_todo": function (test) {
      test.equals('complete_todo', this.event.type);
      test.done();
    },
    
  },
  
  client: {
    setUp: function () {
      /*:DOC += 
        <div>
          <div id='todo'><label>jam along</label></div>
          <div id='done'></div>
        </div>
      */
      this.event = CT.events.complete_todo.create("jam along");
    },
    
    "test should move item to #done": function () {
      this.event.updateDOM();
      assertEquals(0, $("#todo label").length);
      assertEquals(1, $("#done label").length);
    },
    
    "test shouldn't be confused by similar items": function () {
      $("<label>bring jam along</label>").appendTo("#todo");
      this.event.updateDOM();
      assertEquals(1, $("#todo label").length);
      assertEquals(1, $("#done label").length);
    }
    
  }
});
