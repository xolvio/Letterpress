module.exports = function () {
  this.Before(function () {

    this.AuthenticationHelper = {
      login: function () {
        client.waitForExist('a#login-sign-in-link');
        client.click('a#login-sign-in-link');
        client.setValue('#login-email', 'me@example.com');
        client.setValue('#login-password', 'letme1n');
        client.click('.login-button-form-submit');
        client.waitForExist('#login-name-link');
      },

      logout: function () {
        client.executeAsync(function (done) {
          Meteor.logout(done);
        });
      },

      createAccount: function (profile) {
        profile = profile || {
          periodEnd: Math.floor(new Date().getTime() / 1000)
        };

        return server.call('fixtures/createAccount', {
          email: 'me@example.com',
          password: 'letme1n',
          profile: profile
        });
      },

      createAccountAndLogin : function(profile) {
        this.createAccount(profile);
        this.login();
      }
    };

  });
};
