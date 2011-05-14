TestCase("TestAddTodoEvent", sinon.testCase({
  "test should create": function () {
    var event = CT.events.add_todo.create("plow snow");
  }
}));