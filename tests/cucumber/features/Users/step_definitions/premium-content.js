module.exports = function () {

  this.Given(/^I have signed up$/, function () {
    return this.server.call('fixtures/createAccount',
      {email: 'user@test.com', password: 'password1'}
    );
  });

  this.Given(/^I have logged in$/, function () {
    return this.client.executeAsync(function (done) {
      Meteor.loginWithPassword("user@test.com", "password1", done);
    });
  });

  this.Given(/^I am not logged in$/, function () {
    return this.client.executeAsync(function (done) {
      Meteor.logout(done);
    });
  });

  this.When(/^I navigate to the private content page$/, function () {
    return this.client.url(process.env.ROOT_URL + 'chapter-1');
  });

  this.When(/^I login$/, function () {
    return this.client.waitForExist('a#login-sign-in-link')
      .click('a#login-sign-in-link')
      .setValue('#login-email', 'user@test.com')
      .setValue('#login-password', 'password1')
      .click('.login-button-form-submit');
  });

  this.Then(/^I can see my premium content$/, function () {
    return this.client.
      waitForExist('#premuium-content').
      isVisible('#premuium-content').should.become(true);
  });

  this.Then(/^I see a "([^"]*)" button$/, function (button) {
    return this.client.
      waitForVisible('a=' + button);
  });

  this.Then(/^I cannot not see premium content$/, function () {
    return this.client.
      waitForExist('.sign-in-link'). // so we know the page has loaded in non-logged in mode
      isVisible('#premuium-content').should.become(false);
  });

};
