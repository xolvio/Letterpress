module.exports = function () {

  this.Given(/^I have created a landing page with the heading "([^"]*)"$/, function (heading, callback) {
    this.server.call('page/create', {path: '/', heading: heading}).then(callback);
  });

  this.When(/^a user navigates to the landing page$/, function (callback) {
    this.client.url(process.env.ROOT_URL).call(callback);
  });

  this.Then(/^they see the heading "([^"]*)"$/, function (heading, callback) {
    this.client.waitForVisible('h1').
      getText('h1').should.become(heading).and.notify(callback);
  });

};