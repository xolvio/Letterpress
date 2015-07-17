module.exports = function () {

  this.Given(/^An author has created content$/, function () {
    return this.server.call('fixtures/seedData');
  });

  this.Given(/^I just paid for content and received an enrollment email$/, function () {
    // purchase a charge using the api
    return this.server.call('purchase', {id: 'notNull', email: 'me@example.com'});
  });

  this.When(/^I open the account creation link in my email$/, function (callback) {

    var self = this;
    self.server.call('emailStub/getEmails').then(function (emails) {

      // there will only be one email in the stub
      var message = emails[0].text;

      var enrollmentLinkRegex = /(https?:\/\/[^\s]+enroll-account[^\s]+)/g;

      // catch any issues here so that we have a friendly message
      global.chai.expect(enrollmentLinkRegex.test(message)).to.equal(true,
        'Could find the enrollment link in the email');

      // grab the enrollment link from it
      var confirmationLink = message.match(enrollmentLinkRegex)[0];

      // visit the enrollment link in the browser
      self.client.
        // FIXME weird bug where you have to go to the URL twice for enrollment links
        url('about:blank').
        url(confirmationLink).then(function () {
          callback();
        });

    });

  });

  this.Then(/^I am able to create my account$/, function () {
    return this.client.
      waitForExist('#enroll-account-password').
      setValue('#enroll-account-password', 'letme1n').
      click('#login-buttons-enroll-account-button').
      waitForExist('#login-name-link').
      isVisible('#login-name-link').should.become(true);
  });

  this.Then(/^I am able to access my content$/, function () {
    return this.client.
      url(process.env.ROOT_URL + 'chapter-1').
      waitForExist('#premium-content').
      isVisible('#premium-content').should.become(true);
  });

  this.Given(/^I have already created an account$/, function () {
    return this.Authentication.createAccount();
  });

  this.When(/^I login with my username and password$/, function () {
    return this.Authentication.login();
  });

};