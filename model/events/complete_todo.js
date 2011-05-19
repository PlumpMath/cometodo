var CT = this.CT || {};
CT.events = CT.events || {};

if (typeof module === 'object' && typeof require === 'function') {
  CT.event = require('../event');
}

(function () {
  CT.events.complete_todo = CT.event.create({
    create: function (todo) {
      var self = Object.create(this);
      self.todo = todo;
      self.type = "complete_todo";
      return self;
    },

    updateModel: function (todo_list) {
      todo_list.complete(this.todo);
    },
    
    updateDOM: function () {
      var my_text = this.todo;
      $('#todo li').filter(function () {
        return $(this).text() === my_text;
      }).hide().prependTo("#done").fadeIn(500);
    }
  });

  if (typeof module === 'object') {
    module.exports = CT.events.complete_todo;
  }
}());