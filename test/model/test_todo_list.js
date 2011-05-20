var modelTestCase = modelTestCase || require('./helpers/model_test_case');
var module = module || null;

modelTestCase("todo list", module, {
  server: {
    setUp: function (callback) {
      this.list = require('todo_list').create();
      callback();
    },

    "should not have unknown items": function (test) {
      test.ok(!this.list.isTodo("buy milk"));
      test.done();
    },

    "should store todo items": function (test) {
      this.list.add("repair van");
      test.ok(this.list.isTodo("repair van"));
      test.ok(!this.list.isComplete("repair van"));
      test.done();
    },

    "should complete todo item": function (test) {
      this.list.add("repair van");
      this.list.complete("repair van");
      test.ok(this.list.isComplete("repair van"));
      test.ok(!this.list.isTodo("repair van"));
      test.done();
    },

    "should render empty todo lists": function (test) {
      test.equals(
        '<ul id="todo" class="todos"></ul><ul id="done" class="todos"></ul>',
        this.list.render()
      );
      test.done();
    },
    
    "should find todos": function (test) {
      var van = this.list.add("Repair van");
      this.list.add("Repair mac").complete();
      test.same([van], this.list.getAllTodos());
      test.done();
    },

    "should find complete": function (test) {
      this.list.add("Repair van");
      var mac = this.list.add("Repair mac");
      mac.complete();
      test.same([mac], this.list.getAllComplete());
      test.done();
    },
  
    "should render todo items": function (test) {
      this.list.add("repair van");
      test.ok(this.list.render().indexOf('<li><input type="checkbox"><span>repair van</span></li>') > -1);
      test.done();
    },

    "should render done items": function (test) {
      this.list.add("repair van");
      this.list.complete("repair van");
      test.ok(this.list.render().indexOf('<li><input type="checkbox" checked><span>repair van</span></li>') > -1);
      test.done();
    },
    
    "should render items just once": function (test) {
      this.list.add("repair van");
      this.list.complete("repair van");
      var html = this.list.render();
      test.equal(html.indexOf("repair van"), html.lastIndexOf("repair van"));
      test.done();
    },
    
  }
});