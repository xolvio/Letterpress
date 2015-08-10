module.exports = function () {

  this.Given(/^I have signed up$/, function () {
    var periodEnd = Math.floor(new Date().getTime() / 1000) + ( 7 * 24 * 60 * 60 );
    this.AuthenticationHelper.createAccount({
      periodEnd: periodEnd
    });
  });

  this.Given(/^I have logged in$/, function () {
    this.AuthenticationHelper.login();
  });

  this.Given(/^I am not logged in$/, function () {
    this.AuthenticationHelper.logout();
  });

  this.When(/^I navigate to the private content page$/, function () {
    client.url(process.env.ROOT_URL + 'chapter-1');
  });

  this.When(/^I login$/, function () {
    this.AuthenticationHelper.login();
  });

  this.Then(/^I can see my premium content$/, function () {
    client.waitForExist('#premium-content');
    expect(client.isVisible('#premium-content')).toBe(true);
  });

  this.Then(/^I see a "([^"]*)" button$/, function (button) {
    client.waitForExist('a=' + button);
    client.isVisible('a=' + button);
  });

  this.Then(/^I cannot not see premium content$/, function () {
    client.waitForExist('.sign-in'); // so we know the page has loaded in non-logged in mode
    expect(client.isVisible('#premuium-content')).toBe(false);
  });

};
