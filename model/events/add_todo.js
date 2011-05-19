var CT = this.CT || {};
CT.events = CT.events || {};

if (typeof module === 'object' && typeof require === 'function') {
  CT.event = require('../event');
}

(function () {
  CT.events.add_todo = CT.event.create({
    create: function (todo) {
      var self = Object.create(this);
      self.todo = todo;
      self.type = "add_todo";
      return self;
    },

    updateModel: function (todo_list) {
      todo_list.add(this.todo);
    },
    
    updateDOM: function () {
      $('<label><input type="checkbox"><span>' + this.todo + '</span></label>').hide().prependTo("#todo").slideDown(300);
    }
  });

  if (typeof module === 'object') {
    module.exports = CT.events.add_todo;
  }
}());