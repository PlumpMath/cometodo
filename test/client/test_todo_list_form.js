(function (add_todo) {
  
TestCase("TestTodoListForm", sinon.testCase({
  setUp: function () {
    /*:DOC += 
      <form id="newTodo">
        <input type="text" name="newTodoText" value="" id="newTodoText">
      </form>
    */
    CT.todo_list_form.init();
  },

  "test should create add_todo event on form submit": function () {
    this.stub(add_todo, "create");
    $("#newTodoText").val("wash floor");
    $("#newTodo").submit();
    assertEquals(["wash floor"], add_todo.create.getCall(0).args);
  },
  
  "test should clear text area on form submit": function () {
    $("#newTodoText").val("wash floor");
    $("#newTodo").submit();
    assertEquals("", $("#newTodoText").val());
  }
}));

}(CT.events.add_todo));
