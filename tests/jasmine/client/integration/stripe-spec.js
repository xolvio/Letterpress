describe('Stripe', function () {

  beforeEach(function () {
    // spy on the Meteor.call method that we will use to create a customer
    spyOn(Meteor, 'call').and.callThrough();
  });

  describe('successful payments', function () {

    it('should create a customer', function () {

      // - - SETUP
      // relies the beforeEac for setup

      // - - EXECUTE
      // trigger the stripe token handler
      var token = 'someToken';
      Letterpress.Handlers.stripeTokenHandler(token);

      // - - VERIFY
      // make sure the createCustomer method was called on the server with the token
      expect(Meteor.call).toHaveBeenCalledWith('createCustomer', token, jasmine.any(Function));

    });

  });

  it('should show the user a confirmation', function () {

    // - - SETUP
    // spy on the router since we'll be showing a confirmation using a new route
    spyOn(Router, 'go');
    // trigger the stripe token handler, which will call the Meteor method
    Letterpress.Handlers.stripeTokenHandler();

    // grab the most recent meteor method (createCustomer) and grab the callback
    var callback = Meteor.call.calls.mostRecent().args.pop();

    // - - EXECUTE
    // mimic a callback from the server without errors
    callback();

    // - - VERIFY
    // make sure the user is taken to the confirmation screen
    expect(Router.go).toHaveBeenCalledWith('/subscription-confirmation');

  });

});