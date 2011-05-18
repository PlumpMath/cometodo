var url = require('url');

var router = {
  create: function create() {
    var self = Object.create(this);
    self.routes = {};
    return self;
  },
  
  addRoute: function addRoute(route, callback) {
    this.routes[route] = callback;
  },
  
  setDefault: function setDefault(callback) {
    this.defaultCallback = callback;
  },
  
  route: function route(request, response) {
    var pathname = url.parse(request.url).pathname;
    var callback = this.routes[pathname] || this.defaultCallback;
    callback(request, response);
  }
};

module.exports = router;