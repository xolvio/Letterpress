describe('Buy Service', function () {

  describe('subscribe', function () {

    it('creates a customer on Stripe and subscribes them to the set plan', function () {

      // - - SETUP
      spyOn(Stripe.customers, 'create');
      Meteor.settings.private.stripe.planId = 'myPlan';

      // - - EXECUTE
      Letterpress.Services.BuyService.subscribe({id: 'notNull', email: 'me@example.com'});

      // - - VERIFY
      expect(Stripe.customers.create).toHaveBeenCalledWith({
        source: 'notNull',
        plan: 'myPlan',
        email: 'me@example.com'
      }, jasmine.any(Function));

    });

    it('creates an account on successful subscription and stores an audit entry', function () {

      // - - SETUP
      var callback = _getStripeCallback('customers', 'subscribe');
      spyOn(Letterpress.Services.AccountService, 'createAccount');
      spyOn(Letterpress.Collections.Audit, 'insert');

      // - - EXECUTE
      callback(null, {email: 'me@example.com'});

      // - - VERIFY
      expect(Letterpress.Collections.Audit.insert).toHaveBeenCalledWith({
        email: 'me@example.com',
        origin: 'Stripe.customers.create',
        token: {id: 'notNull', email: 'me@example.com'},
        request: {
          source: 'notNull',
          plan: Meteor.settings.private.stripe.planId,
          email: 'me@example.com'
        },
        response: {email: 'me@example.com'},
        err: null
      });
      expect(Letterpress.Services.AccountService.createAccount).toHaveBeenCalledWith('me@example.com');


    });

    it('fails an account on erroneous subscription and stores an audit entry', function () {

      // - - SETUP
      var callback = _getStripeCallback('customers', 'subscribe');
      spyOn(Letterpress.Services.AccountService, 'createAccount');
      spyOn(Letterpress.Collections.Audit, 'insert');
      spyOn(Meteor, 'Error');

      // - - EXECUTE
      callback({'some': 'error'});

      // - - VERIFY
      expect(Letterpress.Collections.Audit.insert).toHaveBeenCalledWith({
        email: 'me@example.com',
        origin: 'Stripe.customers.create',
        token: {id: 'notNull', email: 'me@example.com'},
        request: {
          source: 'notNull',
          plan: Meteor.settings.private.stripe.planId,
          email: 'me@example.com'
        },
        response: undefined,
        err: {'some': 'error'}
      });
      expect(Meteor.Error).toHaveBeenCalledWith(500, {'some': 'error'});
      expect(Letterpress.Services.AccountService.createAccount).not.toHaveBeenCalled();

    });

  });

  describe('charge', function () {

    it('creates a charge on Stripe and charges the the set amount and currency', function () {

      // - - SETUP
      spyOn(Stripe.charges, 'create');
      Meteor.settings.public.price = '499';
      Meteor.settings.public.currency = 'gbp';

      // - - EXECUTE
      Letterpress.Services.BuyService.charge({id: 'notNull', email: 'me@example.com'});

      // - - VERIFY
      expect(Stripe.charges.create).toHaveBeenCalledWith({
        source: 'notNull',
        amount: '499',
        currency: 'gbp'
      }, jasmine.any(Function));

    });

    it('creates an account on successful charge and stores an audit entry', function () {

      // - - SETUP
      var callback = _getStripeCallback('charges', 'charge');
      spyOn(Letterpress.Services.AccountService, 'createAccount');
      spyOn(Letterpress.Collections.Audit, 'insert');

      // - - EXECUTE
      callback(null, {email: 'me@example.com'});

      // - - VERIFY
      expect(Letterpress.Collections.Audit.insert).toHaveBeenCalledWith({
        email: 'me@example.com',
        origin: 'Stripe.charges.create',
        token: {id: 'notNull', email: 'me@example.com'},
        request: {
          source: 'notNull',
          amount: Meteor.settings.public.price,
          currency: Meteor.settings.public.currency
        },
        response: {email: 'me@example.com'},
        err: null
      });
      expect(Letterpress.Services.AccountService.createAccount).toHaveBeenCalledWith('me@example.com');

    });

    it('fails an account on erroneous charge and stores an audit entry', function () {

      // - - SETUP
      var callback = _getStripeCallback('charges', 'charge');
      spyOn(Letterpress.Services.AccountService, 'createAccount');
      spyOn(Letterpress.Collections.Audit, 'insert');
      spyOn(Meteor, 'Error');

      // - - EXECUTE
      callback({'some': 'error'});

      // - - VERIFY
      expect(Letterpress.Collections.Audit.insert).toHaveBeenCalledWith({
        email: 'me@example.com',
        origin: 'Stripe.charges.create',
        token: {id: 'notNull', email: 'me@example.com'},
        request: {
          source: 'notNull',
          amount: Meteor.settings.public.price,
          currency: Meteor.settings.public.currency
        },
        response: undefined,
        err: {'some': 'error'}
      });
      expect(Meteor.Error).toHaveBeenCalledWith(500, {'some': 'error'});
      expect(Letterpress.Services.AccountService.createAccount).not.toHaveBeenCalled();

    });

  });

  function _getStripeCallback (type, plan) {
    spyOn(Stripe[type], 'create');
    Letterpress.Services.BuyService[plan]({id: 'notNull', email: 'me@example.com'});
    var args = Stripe[type].create.calls.mostRecent().args;
    return args[args.length - 1];
  }

});