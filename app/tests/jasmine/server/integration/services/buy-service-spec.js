describe('Buy Service', function () {

  describe('subscribe', function () {

    function getCustomer () {
      return {
        id: 'cust_0011',
        email: 'someone@example.com',
        subscriptions: {
          data: [{
            current_period_start: 1436716844,
            current_period_end: 1436716844
          }]
        }
      };
    }

    beforeEach(function () {
      spyOn(Stripe.customers, 'create').and.callFake(function () {
        // this is needed for the Meteor.wrapAsync to immediately callback
        arguments[arguments.length - 1](null, getCustomer());
      });
    });

    it('creates a customer on Stripe and subscribes them to the set plan', function () {

      // - - SETUP
      Meteor.settings.private.stripe.planId = 'myPlan';

      // - - EXECUTE
      Letterpress.Services.Buy.subscribe({id: 'notNull', email: 'me@example.com'});

      // - - VERIFY
      expect(Stripe.customers.create).toHaveBeenCalledWith({
        source: 'notNull',
        plan: 'myPlan',
        email: 'me@example.com'
      }, jasmine.any(Function));

    });

    it('creates an account on successful subscription', function () {

      // - - SETUP
      spyOn(Letterpress.Services.Account, 'createAccount');

      // - - EXECUTE
      Letterpress.Services.Buy.subscribe({id: 'notNull', email: 'not used'});

      // - - VERIFY
      expect(Letterpress.Services.Account.createAccount).toHaveBeenCalledWith('someone@example.com', {
        stripeCustomerId: 'cust_0011',
        periodStart: 1436716844,
        periodEnd: 1436716844
      });

    });

    it('stores an audit entry on successful subscription', function () {

      // - - SETUP
      spyOn(Letterpress.Services.Account, 'createAccount');
      spyOn(Letterpress.Collections.Audit, 'insert');

      // - - EXECUTE
      Letterpress.Services.Buy.subscribe({id: 'notNull', email: 'token@email.com'});

      // - - VERIFY
      expect(Letterpress.Collections.Audit.insert).toHaveBeenCalledWith({
        email: 'token@email.com',
        origin: 'Stripe.customers.create',
        token: {id: 'notNull', email: 'token@email.com'},
        request: {
          source: 'notNull',
          plan: Meteor.settings.private.stripe.planId,
          email: 'token@email.com'
        },
        response: getCustomer()
      });

    });

  });

  describe('charge', function () {

    var charge = {
      'charge': 'data'
    };

    beforeEach(function () {
      spyOn(Stripe.charges, 'create').and.callFake(function () {
        // this is needed for the Meteor.wrapAsync to immediately callback
        arguments[arguments.length - 1](null, charge);
      });
    });


    it('creates a charge on Stripe and charges the the set amount and currency', function () {

      // - - SETUP
      Meteor.settings.public.price = '499';
      Meteor.settings.public.currency = 'gbp';

      // - - EXECUTE
      Letterpress.Services.Buy.charge({id: 'notNull', email: 'me@example.com'});

      // - - VERIFY
      expect(Stripe.charges.create).toHaveBeenCalledWith({
        source: 'notNull',
        amount: '499',
        currency: 'gbp'
      }, jasmine.any(Function));

    });

    it('creates an account on successful charge and stores an audit entry', function () {

      // - - SETUP
      spyOn(Letterpress.Services.Account, 'createAccount');
      spyOn(Letterpress.Collections.Audit, 'insert');

      // - - EXECUTE
      Letterpress.Services.Buy.charge({id: 'notNull', email: 'me@example.com'});

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
        response: charge
      });
      expect(Letterpress.Services.Account.createAccount).toHaveBeenCalledWith('me@example.com');

    });

  });

  describe('handleEvent', function () {

    describe('invoice.payment_failed events', function () {

      beforeEach(function (done) {
        Meteor.call('fixtures/reset', done);
      });

      it('it finds the relevant user and sends them a warning email', function () {

        // - - SETUP
        var userId = Meteor.call('fixtures/createAccount', {
          email: 'me@example.com',
          password: 'letme1n',
          profile: {stripeCustomerId: 'cust_1234'}
        });
        spyOn(Letterpress.Services.Account, 'sendPaymentEmail');

        // - - EXECUTE
        var event = {
          type: 'invoice.payment_failed',
          data: {
            object: {
              customer: 'cust_1234'
            }
          }
        };
        Letterpress.Services.Buy.handleEvent(event);

        // - - VERIFY
        expect(Letterpress.Services.Account.sendPaymentEmail).toHaveBeenCalledWith(Meteor.users.findOne(userId));

      });
    });

  });

});