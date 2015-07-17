module.exports = function () {
  this.Before(function (done) {

    var client = this.client;
    var server = this.server;

    this.Authentication = {

      login: function () {
        return client.waitForExist('a#login-sign-in-link').
          click('a#login-sign-in-link').
          setValue('#login-email', 'me@example.com').
          setValue('#login-password', 'letme1n').
          click('.login-button-form-submit').
          waitForExist('#login-name-link');
      },

      logout: function () {
        return client.executeAsync(function (done) {
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
      }
    };

    done();

  });
};