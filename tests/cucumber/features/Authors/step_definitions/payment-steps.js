module.exports = function () {

  var request = require('request');

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
    // need a delay here
    this.browser.
      waitForExist('.' + plan + '-confirmation').
      url().should.eventually.have.property('value').that.contains('/' + plan + '-confirmation').
      getText('div').should.eventually.contain(message).
      and.notify(callback);
  });

  this.Then(/^receive a confirmation email of their "([^"]*)" purchase$/, function (plan, callback) {
    var self = this;
    self.server.call('fixtures/getSettings').then(function (settings) {
      self.server.call('emailStub/getEmails').then(function (emails) {
        global.expect(emails[0].to).to.equal('me@example.com');
        global.expect(emails[0].from).to.equal(settings.private.emails.welcome.from);
        global.expect(emails[0].subject).to.equal(settings.private.emails.welcome.subject);
        global.expect(emails[0].text).to.contain(settings.private.emails.welcome.text);
        callback();
      }).catch(callback);
    });
  });

  this.Given(/^a user is subscribed$/, function (callback) {
    this.server.call('fixtures/createAccount', {
      email: 'me@example.com',
      password: 'letme1n',
      profile: {
        stripeCustomerId: 'cust_0011',
        periodStart: 1436716844,
        periodEnd: 1436716844
      }
    }).then(function () {
      callback();
    });
  });

  this.When(/^a subscription payment error is received from Stripe$/, function (callback) {
    this.server.call('fixtures/getSettings').then(function (meteorSettings) {
      // make a webhook request pretending an existing customer's stripe invoice failed
      request({
        url: process.env.ROOT_URL + meteorSettings.private.stripe.webhookEndpoint,
        method: 'POST',
        json: {
          type: 'invoice.payment_failed',
          data: {object: {customer: 'cust_0011'}}
        }
      }, callback);
    });
  });

  this.Then(/^the user receives a repayment information email$/, function (callback) {
    var self = this;
    self.server.call('fixtures/getSettings').then(function (meteorSettings) {
      self.server.call('emailStub/getEmails').then(function (emails) {
        global.chai.expect(emails.length).to.equal(1, 'Expected to see an email');
        global.chai.expect(emails[0].from).to.equal(meteorSettings.private.emails.failedPayment.from);
        global.chai.expect(emails[0].subject).to.equal(meteorSettings.private.emails.failedPayment.subject);
        global.chai.expect(emails[0].text).to.equal(meteorSettings.private.emails.failedPayment.text);
        callback();
      });
    });
  });

};