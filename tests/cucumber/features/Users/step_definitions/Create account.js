module.exports = function () {

  this.Given(/^I just paid for content and received an enrollment email$/, function (callback) {
    // purchase a charge using the api
    this.server.call('purchase', {id: 'notNull', email: 'me@example.com'}).then(function () {
      callback();
    });
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
      self.browser.
        url(confirmationLink).
        // FIXME weird bug where you have to go to the URL twice for enrollment links
        url(confirmationLink).
        call(callback);

    });

  });

  this.Then(/^I am able to create my account$/, function (callback) {

    this.browser.
      waitForExist('#enroll-account-password').
      setValue('#enroll-account-password', 'letme1n').
      click('#login-buttons-enroll-account-button').
      call(callback);
  });

  this.Then(/^I am able to access my content$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions

    // TODO check here that the private content is visible

    callback.pending();
  });

};