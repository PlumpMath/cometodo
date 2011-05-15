var is_server = typeof module === 'object' && typeof require === 'function';

if (is_server) {
  module.exports = function (name, module, tests) {
    if (tests.server) {
      require('sinon-nodeunit');
      var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
      module.exports = testCase(tests.server);
    }
  }
} else {
  var modelTestCase = function (name, module, tests) {
    if (tests.client) {
      TestCase(name, sinon.testCase(tests.client));
    }
  };
}
