(function (global) {
  var _ = global._ || require('underscore');

  var add_todo = {
    create: function (todo) {
      var self = Object.create(this);
      self.todo = todo;
      return self;
    },

    updateModel: function (todo_list) {
      todo_list.add(this.todo);
    },

    serialize: function () {
      return JSON.stringify(this);
    },

    deserialize: function (serialized) {
      var event = Object.create(this);
      return _.extend(event, JSON.parse(serialized));
    }
  };

  if (typeof module == "object" && typeof require == "function") {
    module.exports = add_todo;
  } else {
    this.add_todo = add_todo;
  }
  
}(this));