var CT = this.CT || {};

if (typeof module === 'object' && typeof require === 'function') {
  var _ = require('underscore');
  var todo_item = require('./todo_item');
}

(function () {
  CT.todo_list = {
    create: function () {
      var self = Object.create(this);
      self.todo_items = [];
      return self; 
    },

    add: function (text) {
      var new_item = todo_item.create(text);
      this.todo_items.unshift(new_item);
      return new_item;
    },

    getTodo: function (text) {
      return _.find(this.todo_items, function (todo) {
        return todo.text === text;
      });
    },
    
    getAllTodos: function()  {
      return _.filter(this.todo_items, function (todo) {
        return !todo.isComplete;
      });
    },

    getAllComplete: function()  {
      return _.filter(this.todo_items, function (todo) {
        return todo.isComplete;
      });
    },

    isTodo: function (text) {
      var todo = this.getTodo(text);
      return todo && !todo.isComplete;
    },

    complete: function (text) {
      var todo = this.getTodo(text);
      if (todo) {
        todo.complete();
      }
    },

    isComplete: function (text) {
      var todo = this.getTodo(text);
      return todo && todo.isComplete;
    },

    renderTodos: function () {
      var items = _.invoke(this.getAllTodos(), 'render').join("");
      return '<ul id="todo" class="todos">' + items + '</ul>'
    },

    renderDone: function () {
      var items = _.invoke(this.getAllComplete(), 'render').join("");
      return '<ul id="done" class="todos">' + items + '</ul>'
    },

    render: function () {
      return this.renderTodos() + this.renderDone();
    }
  };

  if (typeof module === 'object') {
    module.exports = CT.todo_list;
  }
}());


