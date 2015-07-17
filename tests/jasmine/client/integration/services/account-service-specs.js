describe('Account service', function () {

  describe('onLogin', function () {

    it('does not redirect if the subscription is active', function () {

      // SETUP
      spyOn(Meteor, 'call').and.callFake(function (name, callback) {
        callback(null, true);
      });
      spyOn(Router, 'go');

      // EXECUTE
      Letterpress.Services.AccountService.onLogin();

      // VERIFY
      expect(Meteor.call).toHaveBeenCalledWith('isSubscribed', jasmine.any(Function));
      expect(Router.go).not.toHaveBeenCalled();

    });

    it('redirects to the payment page if the subscription is expired', function () {

      // SETUP
      spyOn(Meteor, 'call').and.callFake(function (name, callback) {
        callback(null, false);
      });
      spyOn(Router, 'go');

      // EXECUTE
      Letterpress.Services.AccountService.onLogin();

      // VERIFY
      expect(Meteor.call).toHaveBeenCalledWith('isSubscribed', jasmine.any(Function));
      expect(Router.go).toHaveBeenCalledWith('/subscription-expired');

    });

    it('redirects to the error page if there is an error in the call to the server', function () {

      // SETUP
      spyOn(Meteor, 'call').and.callFake(function (name, callback) {
        callback('error');
      });
      spyOn(Router, 'go');

      // EXECUTE
      Letterpress.Services.AccountService.onLogin();

      // VERIFY
      expect(Meteor.call).toHaveBeenCalledWith('isSubscribed', jasmine.any(Function));
      expect(Router.go).toHaveBeenCalledWith('/error');

    });

  });
  

});