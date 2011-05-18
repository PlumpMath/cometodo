var modelTestCase = modelTestCase || require('./helpers/model_test_case');
var module = module || null;

modelTestCase("add todo event", module, {
  server: {
    setUp: function (callback) {
      this.event = require('events/add_todo').create("join the army");
      callback();
    },

    "should specify type": function (test) {
      test.equals("add_todo", this.event.type);
      test.done();
    },
    

    "should update model": function (test) {
      var todo_list = { add: test.stub() };
      this.event.updateModel(todo_list);
      test.calledWith(todo_list.add, "join the army");
      test.done();
    }
  },
  
  client: {
    setUp: function () {
      /*:DOC += 
        <div id="todo"></div>
      */
    },

    "test should add to list": function () {
      var event = CT.events.add_todo.create("plow snow");
      event.updateDOM();
      assertEquals("plow snow", $("#todo").text());
      assertEquals(1, $("#todo :checkbox").length);
    },

    "test should add to top": function () {
      $("<label id='old'></label>").appendTo("#todo");
      CT.events.add_todo.create("new").updateDOM();
      assertEquals(1, $("#old").prevAll().length);
    }
  }
});
