var path = require('path');

module.exports = {
  create: function () {
    return Object.create(this);
  },
  
  onFileNotFound: function (callback) {
    this.fileNotFoundCallback = callback;
  },
  
  serve: function (url) {
    var self = this;
    path.exists(url, function (exists) {
      if (!exists) {
        self.fileNotFoundCallback();
      } else {
        
      }
    });
  }
};