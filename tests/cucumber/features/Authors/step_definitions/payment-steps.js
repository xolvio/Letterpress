module.exports = function () {

  var request = require('request');

  this.Given(/^I have configured a Stripe account$/, function (callback) {
    // do nothing, the step specification is valid but does not require automation
    callback();
  });

  this.Given(/^I have created content$/, function () {
    return this.server.call('fixtures/seedData');
  });

  this.Given(/^I have setup a "([^"]*)" payment plan$/, function (plan) {
    return this.server.call('fixtures/setPaymentPlan', plan);
  });

  this.When(/^a user pays using Stripe$/, function () {
    return this.browser.
      waitForExist('a[title="Buy It"]').
      click('a[title="Buy It"]');
  });

  this.Then(/^they see a confirmation screen of their "([^"]*)" purchase$/, function (plan) {
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
    return this.browser.
      waitForExist('.' + plan + '-confirmation').
      url().should.eventually.have.property('value').that.contains('/' + plan + '-confirmation').
      getText('body').should.eventually.contain(message);
  });

  this.Then(/^receive a confirmation email of their "([^"]*)" purchase$/, function () {
    var self = this;
    return self.server.call('fixtures/getSettings').then(function (settings) {
      return self.server.call('emailStub/getEmails').then(function (emails) {
        global.expect(emails[0].to).to.equal('me@example.com');
        global.expect(emails[0].from).to.equal(settings.private.emails.welcome.from);
        global.expect(emails[0].subject).to.equal(settings.private.emails.welcome.subject);
        global.expect(emails[0].text).to.contain(settings.private.emails.welcome.text);
      });
    });
  });

  this.Given(/^a user is subscribed$/, function () {
    return this.AuthenticationHelper.createAccount({
      stripeCustomerId: 'cust_0011',
      periodStart: 1436716844,
      periodEnd: 1436716844
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

  this.Then(/^the user receives a repayment information email$/, function () {
    var self = this;
    return self.server.call('fixtures/getSettings').then(function (meteorSettings) {
      return self.server.call('emailStub/getEmails').then(function (emails) {
        global.chai.expect(emails.length).to.equal(1, 'Expected to see an email');
        global.chai.expect(emails[0].from).to.equal(meteorSettings.private.emails.failedPayment.from);
        global.chai.expect(emails[0].subject).to.equal(meteorSettings.private.emails.failedPayment.subject);
        global.chai.expect(emails[0].text).to.equal(meteorSettings.private.emails.failedPayment.text);
      });
    });
  });


  this.Given(/^a user subscription expired (\d+) month\(s\) ago$/, function (months, callback) {

    var date = new Date();
    date.setMonth(date.getMonth() - months);
    var periodEnd = Math.floor(date.getTime() / 1000);

    return this.AuthenticationHelper.createAccount({
      periodEnd: periodEnd
    });

  });

  this.When(/^the user logs in$/, function () {
    return this.client.waitForExist('a#login-sign-in-link').
      click('a#login-sign-in-link').
      setValue('#login-email', 'me@example.com').
      setValue('#login-password', 'letme1n').
      click('.login-button-form-submit').
      waitForExist('#login-name-link');
  });

  this.Then(/^the user is able to see my content$/, function () {
    return this.client.
      url(process.env.ROOT_URL + 'chapter-1').
      waitForExist('#premuium-content').
      isVisible('#premuium-content').should.become(true);
  });

  this.Then(/^they are informed of their expired subscription$/, function () {
    return this.client.
      waitForExist('.subscription-expired').
      isVisible('.subscription-expired').should.become(true);
  });

  this.Then(/^the user is not able to see my content$/, function () {
    return this.client.
      click('a*=Home').
      waitForExist('a*=Chapter 1').
      click('a*=Chapter 1').
      waitForExist('.description').
      isVisible('#premium-content').should.become(false);
  });

};