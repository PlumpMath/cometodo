/*jslint indent: 2, onevar: false*/
/*globals module, require*/

require('sinon-nodeunit');
var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
var todo_list = require('todo_list');

module.exports = testCase({
  setUp: function (callback) {
    this.list = todo_list.create();
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
      '<div id="todo" class="todos"></div><div id="done" class="todos"></div>',
      this.list.render()
    );
    test.done();
  },
  
  "should render todo items": function (test) {
    this.list.add("repair van");
    test.ok(this.list.render().indexOf('<label><input type="checkbox"><span>repair van</span></label>') > -1);
    test.done();
  },
  
  "should render done items": function (test) {
    this.list.add("repair van");
    this.list.complete("repair van");
    test.ok(this.list.render().indexOf('<label><input type="checkbox" checked><span>repair van</span></label>') > -1);
    test.done();
  },
  
});