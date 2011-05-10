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
    var callback = this.routes[request.url] || this.defaultCallback;
    process.nextTick(function () {
      callback(request, response);
    });
  }
};

module.exports = router;