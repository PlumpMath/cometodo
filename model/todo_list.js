var CT = this.CT || {};

if (typeof module === 'object' && typeof require === 'function') {
  var _ = require('underscore');
}

(function () {
  function renderTodoItem (item) {
    return '<label><input type="checkbox"><span>' + item + '</span></label>';
  }

  function renderDoneItem (item) {
    return '<label><input type="checkbox" checked><span>' + item + '</span></label>';
  }

  CT.todo_list = {
    create: function () {
      var self = Object.create(this);
      self.todo_items = [];
      self.done_items = [];
      return self; 
    },

    add: function (item) {
      this.todo_items.unshift(item);
    },

    isTodo: function (item) {
      return this.todo_items.indexOf(item) > -1;
    },

    complete: function (item) {
      this.done_items.unshift(item);
      this.todo_items = _.reject(this.todo_items, function (i) {
        return i === item;
      });
    },

    isComplete: function (item) {
      return this.done_items.indexOf(item) > -1;
    },

    renderTodos: function () {
      var items = _.map(this.todo_items, renderTodoItem).join("");
      return '<div id="todo" class="todos">' + items + '</div>'
    },

    renderDone: function () {
      var items = _.map(this.done_items, renderDoneItem).join("");
      return '<div id="done" class="todos">' + items + '</div>'
    },

    render: function () {
      return this.renderTodos() + this.renderDone();
    }
  };

  if (typeof module === 'object') {
    module.exports = CT.todo_list;
  }
}());


