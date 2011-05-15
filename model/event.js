var CT = this.CT || {};

if (typeof module === 'object' && typeof require === 'function') {
  var _ = require('underscore');
}

(function () {
  CT.event = {
    create: function (members) {
      return _.extend(Object.create(this), members);
    },

    serialize: function () {
      return JSON.stringify(this);
    },

    deserialize: function (serialized) {
      return _.extend(Object.create(this), JSON.parse(serialized));
    }
  };

  if (typeof module === 'object') {
    module.exports = CT.event;
  }
}());
