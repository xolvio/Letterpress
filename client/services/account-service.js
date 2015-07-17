Letterpress.Services.AccountService = {
  onLogin: function () {
    Meteor.call('isSubscribed', function (err, isSubscribed) {

      if (err) {
        Router.go('/error');
        return;
      }

      Session.set('subscribed', isSubscribed);

      if (!isSubscribed) {
        Router.go('/subscription-expired');
      }

    });
  }
};

Accounts.onLogin(Letterpress.Services.AccountService.onLogin);
