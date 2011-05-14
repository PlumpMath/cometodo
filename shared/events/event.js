var _ = require('underscore');

module.exports = {
  create: function (members) {
    return _.extend(Object.create(this), members);
  },
  
  serialize: function () {
    return JSON.stringify(this);
  },
  
  deserialize: function (serialized) {
    return _.extend(Object.create(this), JSON.parse(serialized));
  }
}