describe('Payment API', function () {

  describe('purchase', function () {

    it('subscribes the user when the payment plan is subscribe and informs the user', function () {

      // - - SETUP
      Meteor.settings.private.paymentPlan = 'subscribe';
      spyOn(Letterpress.Services.Buy, 'subscribe');

      // - - EXECUTE
      var retVal = Meteor.call('purchase');

      // - - VERIFY
      expect(Letterpress.Services.Buy.subscribe).toHaveBeenCalled();
      expect(retVal).toBe('subscribe');

    });

    it('charges the user when the payment plan is charge and informs the caller', function () {

      // - - SETUP
      Meteor.settings.private.paymentPlan = 'charge';
      spyOn(Letterpress.Services.Buy, 'charge');

      // - - EXECUTE
      var retVal = Meteor.call('purchase');

      // - - VERIFY
      expect(Letterpress.Services.Buy.charge).toHaveBeenCalled();
      expect(retVal).toBe('charge');

    });

    it('throws an error when the payment plan is invalid', function () {

      // - - SETUP
      Meteor.settings.private.paymentPlan = 'invalid';

      // - - EXECUTE & VERIFY
      expect(function () {Meteor.call('purchase')}).toThrow();


    });

    it('does not wait for the payment processing to complete', function () {

      // - - SETUP
      Meteor.settings.private.paymentPlan = 'charge';
      spyOn(Letterpress.Services.Buy, 'charge');
      var spy = jasmine.createSpy('spy');

      // - - EXECUTE
      getMethods().purchase.apply({unblock: spy});

      // - - VERIFY
      expect(spy).toHaveBeenCalled();

    });

  });

});