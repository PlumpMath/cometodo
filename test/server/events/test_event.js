/*jslint indent: 2, onevar: false*/
/*globals module, require*/

require('sinon-nodeunit');
var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
var event = require('event');

module.exports = testCase({
  "should be prototype for events": function (test) {
    var add_pet = event.create();
    test.equals(add_pet.__proto__, event);
    test.done();
  },
  
  "should extend in create": function (test) {
    var add_pet = event.create({ species: 'Cat' });
    test.equals('Cat', add_pet.species);
    test.done();
  },
  
  "should be serializeable": function (test) {
    var add_pet = event.create({ species: 'Cat' });
    test.equals('{"species":"Cat"}', add_pet.serialize());
    test.done();
  },
  
  "should be deserializeable": function (test) {
    var add_pet = event.create({ species: 'Cat' });
    test.same(add_pet, event.deserialize(add_pet.serialize()));
    test.done();
  }
  
});