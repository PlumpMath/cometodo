var CT = CT || {};

(function () {
  
  function add_todo() {
    var todoText = $("#newTodoText").val();
    CT.events.add_todo.create(todoText);
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