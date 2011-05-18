var CT = CT || {};

(function () {
  
  function add_todo() {
    var text = $("#newTodoText").val();
    var event = CT.events.add_todo.create(text);
    CT.event_handler.register(event);
    $("#newTodoText").val("");
    return false;
  }
  
  function init() {
    $("#newTodo").bind("submit", add_todo);
  }
  
  CT.todo_list_form = {
    init: init
  };
}());