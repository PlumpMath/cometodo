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
  
  route: function route(url) {
    process.nextTick(this.routes[url] || this.defaultCallback);
  }
};

module.exports = router;