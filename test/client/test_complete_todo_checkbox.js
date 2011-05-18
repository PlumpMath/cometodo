(function (complete_todo) {
  
  TestCase('TestCompleteTodoCheckbox', sinon.testCase({
    setUp: function () {
      /*:DOC += 
        <div id="todo">
          <label><input type="checkbox"><span>sing along</span></label>
        </div>
      */
      CT.todo_list_form.init();
      this.event = mockEvent();
      this.stub(complete_todo, 'create').returns(this.event);
    },

    "test should create complete_todo event on click": function () {
      $('#todo input:checkbox').click();
      assert(complete_todo.create.calledWith('sing along'));
    },

    "test should register event": function () {
      this.stub(CT.event_handler, "register");
      $('#todo input:checkbox').click();
      assert(CT.event_handler.register.calledWith(this.event));
    },

  }));

}(CT.events.complete_todo))