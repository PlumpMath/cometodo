/*jslint indent: 2, onevar: false*/
/*globals module, require*/

require('sinon-nodeunit');
var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
var add_todo = require('events/add_todo');

module.exports = testCase({
  setUp: function (callback) {
    this.event = add_todo.create("join the army");
    callback();
  },
  
  "should update model": function (test) {
    var todo_list = { add: test.stub() };
    this.event.updateModel(todo_list);
    test.calledWith(todo_list.add, "join the army");
    test.done();
  },
  
  "should serialize": function (test) {
    test.equals('{"todo":"join the army"}', this.event.serialize());
    test.done();
  },
  
  "should deserialize": function (test) {
    var serialized = this.event.serialize();
    test.same(this.event, add_todo.deserialize(serialized));
    test.done();
  },
  
  
});