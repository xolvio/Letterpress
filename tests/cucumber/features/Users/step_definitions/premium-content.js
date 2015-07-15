module.exports = function () {

  this.Given(/^I have signed up$/, function (callback) {
    this.server.call('fixtures/createAccount',
      {email: 'user@test.com', password: 'password1'}
    ).then(function() {callback()});
  });

  this.Given(/^I have logged in$/, function (callback) {
    this.client.executeAsync( function(done) {
      Meteor.loginWithPassword("user@test.com", "password1", done);
    }).call(callback);
  });

  this.Given(/^I am not logged in$/, function (callback) {
    this.client.executeAsync( function(done) {
      Meteor.logout(done);
    }).call(callback);
  });

  this.When(/^I navigate to the private content page$/, function (callback) {
    this.client.
      url(process.env.ROOT_URL+ 'chapter-1').
      call(callback);
  });

  this.When(/^I login$/, function (callback) {
    this.client.waitForExist('a#login-sign-in-link')
      .click('a#login-sign-in-link')
      .setValue('#login-email', 'user@test.com')
      .setValue('#login-password', 'password1')
      .click('.login-button-form-submit')
      .call(callback);
  });

  this.Then(/^I can see my premium content$/, function (callback) {
    this.client.
      waitForExist('#premuium-content').
      isVisible('#premuium-content').should.become(true).
      and.notify(callback);
  });

  this.Then(/^I see a "([^"]*)" button$/, function (button, callback) {
    this.client.
      waitForVisible('a=Buy Now').
      isVisible('a=Buy Now').should.become(true).
      and.notify(callback);
  });

  this.Then(/^I cannot not see premium content$/, function (callback) {
    this.client.
      waitForExist('#premuium-content', true).
      isVisible('#premuium-content').should.become(false).
      and.notify(callback);
  });

};
