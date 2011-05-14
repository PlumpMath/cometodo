TestCase("TestAddTodoEvent", sinon.testCase({
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
}));