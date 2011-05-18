(function (add_todo) {
  
TestCase("TestTodoListForm", sinon.testCase({
  setUp: function () {
    /*:DOC += 
      <form id="newTodo">
        <input type="text" name="newTodoText" value="" id="newTodoText">
      </form>
    */
    CT.todo_list_form.init();
    this.event = Object.create(mockEvent);
    this.stub(add_todo, "create").returns(this.event);
  },

  "test should create add_todo event on form submit": function () {
    $("#newTodoText").val("wash floor");
    $("#newTodo").submit();
    assertEquals(["wash floor"], add_todo.create.getCall(0).args);
  },
  
  "test should register event": function () {
    this.stub(CT.event_handler, "register");
    $("#newTodo").submit();
    assert(CT.event_handler.register.calledWith(this.event));
  },
  
  "test should clear text area on form submit": function () {
    $("#newTodoText").val("wash floor");
    $("#newTodo").submit();
    assertEquals("", $("#newTodoText").val());
  }
}));

}(CT.events.add_todo));
