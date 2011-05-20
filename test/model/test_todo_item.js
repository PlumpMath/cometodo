var modelTestCase = modelTestCase || require('./helpers/model_test_case');
var module = module || null;

modelTestCase("add todo item", module, {
  server: {
    setUp: function (callback) {
      this.todo_item = require('todo_item');
      this.open_a_bar = this.todo_item.create('open a bar');
      callback();
    },
    
    "create should return new instance of todo_item": function (test) {
      var todo1 = this.todo_item.create();
      var todo2 = this.todo_item.create();
      test.ok(todo1 !== todo2);
      test.done();
    },
    
    "should have text": function (test) {
      test.equals('open a bar', this.open_a_bar.text);
      test.done();
    },
    
    "should be able to complete": function (test) {
      this.open_a_bar.complete();
      test.ok(this.open_a_bar.isComplete);
      test.done();
    },

    "should render": function (test) {
      test.equals('<li><input type="checkbox"><span>open a bar</span></li>', this.open_a_bar.render());
      test.done();
    },
    
    "should render complete as checked": function (test) {
      this.open_a_bar.complete();
      test.equals('<li><input type="checkbox" checked><span>open a bar</span></li>', this.open_a_bar.render());
      test.done();
    },
    
    "should escape html": function (test) {
      var nasty = this.todo_item.create("<script>");
      test.equals('&lt;script>', nasty.escapedText());
      test.done();
    },
    
    
  },
  
  client: {
    setUp: function () {
      /*:DOC += 
        <div id="todo"></div>
      */
    },
  }
});
