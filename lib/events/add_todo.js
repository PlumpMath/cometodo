(function (global) {
  var _ = global._ || require('underscore');
  var event = global.event || require('./event');

  var add_todo = event.create({
    create: function (todo) {
      var self = Object.create(this);
      self.todo = todo;
      return self;
    },

    updateModel: function (todo_list) {
      todo_list.add(this.todo);
    }
  });

  if (typeof module == "object" && typeof require == "function") {
    module.exports = add_todo;
  } else {
    this.add_todo = add_todo;
  }
  
}(this));