var CT = CT || {};

(function () {
  
  function add_todo() {
    var text = $("#newTodoText").val();
    var event = CT.events.add_todo.create(text);
    CT.event_handler.register(event);
    $("#newTodoText").val("");
    return false;
  }
  
  function complete_todo() {
    var text = $(this).closest("li").find("span").text();
    var event = CT.events.complete_todo.create(text);
    CT.event_handler.register(event);
  }
  
  function init() {
    $("#newTodo").bind("submit", add_todo);
    $("#todo").delegate("input:checkbox", "click", complete_todo);
  }
  
  CT.todo_list_form = {
    init: init
  };
}());