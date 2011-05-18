/*jslint indent: 2, onevar: false*/
/*globals module, require*/

require('sinon-nodeunit');
var testCase = require('sinon-nodeunit/deps/nodeunit').testCase;
var loadPostedData = require('load_posted_data');
var EventEmitter = require('events').EventEmitter;

module.exports = testCase({
  setUp: function (callback) {
    this.request = new EventEmitter();
    callback();
  },
    
  "should concatenate chunks and callback on end": function (test) {
    var callback = test.stub();
    loadPostedData(this.request, callback);
    this.request.emit('data', 'abc');
    this.request.emit('data', 'def');
    this.request.emit('end');
    test.calledWith(callback, 'abcdef');
    test.done();
  },
  
});