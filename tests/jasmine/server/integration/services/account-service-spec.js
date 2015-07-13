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

});