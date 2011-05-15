var modelTestCase = modelTestCase || require('./helpers/model_test_case');
var module = module || null;

modelTestCase("todo list", module, {
  server: {
    setUp: function (callback) {
      this.event = require('event');
      callback();
    },
    
    "should be prototype for events": function (test) {
      var add_pet = this.event.create();
      test.equals(add_pet.__proto__, this.event);
      test.done();
    },

    "should extend in create": function (test) {
      var add_pet = this.event.create({ species: 'Cat' });
      test.equals('Cat', add_pet.species);
      test.done();
    },

    "should be serializeable": function (test) {
      var add_pet = this.event.create({ species: 'Cat' });
      test.equals('{"species":"Cat"}', add_pet.serialize());
      test.done();
    },

    "should be deserializeable": function (test) {
      var add_pet = this.event.create({ species: 'Cat' });
      test.same(add_pet, this.event.deserialize(add_pet.serialize()));
      test.done();
    }
  }
});