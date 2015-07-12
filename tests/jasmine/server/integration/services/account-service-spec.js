describe('Email Service', function () {

  describe('createAccount', function () {

    it('creates an account and invites the user to enroll', function () {

      spyOn(Accounts, 'createUser').and.returnValue('someId');
      spyOn(Accounts, 'sendEnrollmentEmail');

      Letterpress.Services.AccountService.createAccount('me@example.com');

      expect(Accounts.createUser).toHaveBeenCalledWith({email: 'me@example.com'});
      expect(Accounts.sendEnrollmentEmail).toHaveBeenCalledWith('someId');

    });

  });

});