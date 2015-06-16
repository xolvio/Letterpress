// append an isolator object to the Router to hold objects for us
Router._isolator = {};

// keep track of the original route method
Router._isolator.route = Router.route;

// override the route method and...
Router.route = function (path, options) {

  // initialize the _routes store if it hasn't been initialized yet
  Router._isolator._routes = Router._isolator._routes || {};

  // keep hold of the options object for this path so unit tests can isolate individual methods
  Router._isolator._routes[path] = options;

  // call the original route method as usual
  Router._isolator.route.apply(this, arguments);
  
};