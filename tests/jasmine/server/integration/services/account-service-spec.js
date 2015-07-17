describe('Account Service', function () {

  describe('createAccount', function () {

    it('creates an account, stores the stripe customer id and invites the user to enroll', function () {

      spyOn(Accounts, 'createUser').and.returnValue('someId');
      spyOn(Accounts, 'sendEnrollmentEmail');

      Letterpress.Services.AccountService.createAccount('me@example.com', {stripeCustomerId: 'cust_00001'});

      expect(Accounts.createUser).toHaveBeenCalledWith({
        email: 'me@example.com',
        profile: {stripeCustomerId: 'cust_00001'}
      });
      expect(Accounts.sendEnrollmentEmail).toHaveBeenCalledWith('someId');

    });

  });

  describe('isSubscribed', function () {

    it('returns true if the payment plan is not "subscribe"', function () {

      Meteor.settings.private.paymentPlan = 'notSubscribe';

      var result = Letterpress.Services.AccountService.isSubscribed();

      expect(result).toBe(true);

    });

    it('returns false if the user subscription has ended', function () {

      Meteor.settings.private.paymentPlan = 'subscribe';

      Meteor.settings.private.subscriptionDurationMonths = 1;

      var result = Letterpress.Services.AccountService.isSubscribed({
        profile: {periodEnd: getExpiredSubscriptionDate()}
      });

      expect(result).toBe(false);

    });

    it('returns true if the current date is within the subscription period', function () {

      Meteor.settings.private.paymentPlan = 'subscribe';

      Meteor.settings.private.subscriptionDurationMonths = 1;

      var result = Letterpress.Services.AccountService.isSubscribed({
        profile: {periodEnd: getEdgeSubscriptionDate()}
      });

      expect(result).toBe(true);

    });

  });

  function getExpiredSubscriptionDate () {
    var date = new Date();
    date.setMonth(date.getMonth() - Meteor.settings.private.subscriptionDurationMonths);
    date.setDate(date.getDate() - 1);
    return Math.floor(date.getTime() / 1000);

  }

  function getEdgeSubscriptionDate () {
    var date = new Date();
    date.setMonth(date.getMonth() - Meteor.settings.private.subscriptionDurationMonths);
    date.setSeconds(date.getSeconds() + 60); // plenty for test runtime
    return Math.floor(date.getTime() / 1000);
  }

});

