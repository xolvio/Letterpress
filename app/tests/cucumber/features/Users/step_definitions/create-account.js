module.exports = function () {

  this.Given(/^An author has created content$/, function () {
    server.call('fixtures/seedData');
  });

  this.Given(/^I just paid for content and received an enrollment email$/, function () {
    // purchase a charge using the api
    server.call('purchase', {id: 'notNull', email: 'me@example.com'});
  });

  this.When(/^I open the account creation link in my email$/, function () {
    var emails = server.call('emailStub/getEmails');

    // there will only be one email in the stub
    var message = emails[0].text;

    var enrollmentLinkRegex = /(https?:\/\/[^\s]+enroll-account[^\s]+)/g;

    // catch any issues here so that we have a friendly message
    expect(message).toMatch(enrollmentLinkRegex);

    // grab the enrollment link from it
    var confirmationLink = message.match(enrollmentLinkRegex)[0];

    // visit the enrollment link in the browser
    // FIXME: weird bug where you have to go to the URL twice for enrollment links
    client.url('about:blank');
    client.url(confirmationLink);
  });

  this.Then(/^I am able to create my account$/, function () {
    client.waitForExist('#enroll-account-password');
    client.setValue('#enroll-account-password', 'letme1n');
    client.click('#login-buttons-enroll-account-button');
    client.waitForExist('#login-name-link');
    expect(client.isVisible('#login-name-link')).toBe(true);
  });

  this.Then(/^I am able to access my content$/, function () {
    client.url(process.env.ROOT_URL + 'chapter-1');
    client.waitForExist('#premium-content');
    expect(client.isVisible('#premium-content')).toBe(true);
  });

  this.Given(/^I have already created an account$/, function () {
    this.AuthenticationHelper.createAccount();
  });

  this.When(/^I login with my username and password$/, function () {
    this.AuthenticationHelper.login();
  });

};
