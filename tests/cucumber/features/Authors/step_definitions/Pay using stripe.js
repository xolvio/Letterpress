module.exports = function () {

  this.Given(/^I have configured a Stripe account$/, function (callback) {
    // do nothing, the step specification is valid but does not require automation
    callback();
  });

  this.Given(/^I have created content$/, function (callback) {
    this.server.call('fixtures/seedData').then(callback);
  });

  this.Given(/^I have setup a "([^"]*)" payment plan$/, function (plan, callback) {
    this.server.call('fixtures/setPaymentPlan', plan).then(callback)
  });

  this.When(/^a user pays using Stripe$/, function (callback) {

    this.browser.

      // click the buy button
      waitForExist('a[title="Buy It"]').
      click('a[title="Buy It"]').

      // tell cucumber we're done
      call(callback);

  });


  this.Then(/^they see a confirmation screen of their "([^"]*)" purchase$/, function (plan, callback) {

    var message;
    switch (plan) {
      case 'subscribe':
        message = 'You are now subscribed';
        break;
      case 'charge':
        message = 'You have completed your purchase';
        break;
    }

    this.browser.url().should.eventually.have.property('value').that.contains('/' + plan + '-confirmation').
      getText('div').should.eventually.contain(message).and.notify(callback);
  });

  this.Then(/^receive a confirmation email of their "([^"]*)" purchase$/, function (plan, callback) {
    var self = this;
    self.server.call('fixtures/getSettings').then(function (settings) {
      self.server.call('emailStub/getEmails').then(function (emails) {
        global.expect(emails[0].to).to.equal('me@example.com');
        global.expect(emails[0].from).to.equal(settings.private.emails.from);
        global.expect(emails[0].subject).to.equal(settings.private.emails.subject);
        global.expect(emails[0].text).to.equal(settings.private.emails.text);
        callback();
      });
    });

  });

};