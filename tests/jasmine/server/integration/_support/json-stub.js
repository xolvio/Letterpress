// append an isolator object to the Router to hold objects for us
JsonRoutes._isolator = {
  _routes: {}
};

// keep track of the original add method
JsonRoutes._isolator.add = JsonRoutes.add;

// override the add method and...
JsonRoutes.add = function (method, path, handler) {

  // keep hold of the handler keyed on the method + path so unit tests can isolate the handler code
  JsonRoutes._isolator._routes[method + path] = handler;

  // call the original add method
  return JsonRoutes._isolator.add.apply(this, arguments);

};