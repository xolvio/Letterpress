module.exports = function () {

  this.Given(/^I have configured a Stripe account$/, function () {
    // do nothing, the step specification is valid but does not require automation
  });

  this.Given(/^I have created content$/, function () {
    server.call('fixtures/seedData');
  });

  this.Given(/^I have setup a "([^"]*)" payment plan$/, function (plan) {
    server.call('fixtures/setPaymentPlan', plan);
  });

  this.When(/^a user pays using Stripe$/, function () {
    client.waitForExist('a[title="Buy It"]');
    client.click('a[title="Buy It"]');
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
    client.waitForExist('.' + plan + '-confirmation');
    expect(client.url().value).toMatch('/' + plan + '-confirmation');
    expect(client.getText('body')).toMatch(message);
  });

  this.Then(/^receive a confirmation email of their "([^"]*)" purchase$/, function () {
    var settings = server.call('fixtures/getSettings');
    var emails = server.call('emailStub/getEmails');
    var email = emails[0];
    expect(email.to).toEqual('me@example.com');
    expect(email.from).toEqual(settings.private.emails.welcome.from);
    expect(email.subject).toEqual(settings.private.emails.welcome.subject);
    expect(email.text).toMatch(settings.private.emails.welcome.text);
  });

  this.Given(/^a user is subscribed$/, function () {
    return this.AuthenticationHelper.createAccount({
      stripeCustomerId: 'cust_0011',
      periodStart: 1436716844,
      periodEnd: 1436716844
    });
  });

  this.When(/^a subscription payment error is received from Stripe$/, function () {
    var meteorSettings = server.call('fixtures/getSettings');
    // make a webhook request pretending an existing customer's stripe invoice failed
    requestSync({
      url: process.env.ROOT_URL + meteorSettings.private.stripe.webhookEndpoint,
      method: 'POST',
      json: {
        type: 'invoice.payment_failed',
        data: {object: {customer: 'cust_0011'}}
      }
    });
  });

  this.Then(/^the user receives a repayment information email$/, function () {
    var settings = server.call('fixtures/getSettings');
    var emails = server.call('emailStub/getEmails');
    expect(emails.length).toEqual(1);
    var email = emails[0];
    expect(email.from).toEqual(settings.private.emails.failedPayment.from);
    expect(email.subject).toEqual(settings.private.emails.failedPayment.subject);
    expect(email.text).toMatch(settings.private.emails.failedPayment.text);
  });

  this.Given(/^a user subscription expired (\d+) month\(s\) ago$/, function (months) {
    var date = new Date();
    date.setMonth(date.getMonth() - months);
    var periodEnd = Math.floor(date.getTime() / 1000);

    return this.AuthenticationHelper.createAccount({
      periodEnd: periodEnd
    });
  });

  this.When(/^the user logs in$/, function () {
    client.waitForExist('a#login-sign-in-link');
    client.click('a#login-sign-in-link');
    client.setValue('#login-email', 'me@example.com');
    client.setValue('#login-password', 'letme1n');
    client.click('.login-button-form-submit');
    client.waitForExist('#login-name-link');
  });

  this.Then(/^the user is able to see my content$/, function () {
    client.url(process.env.ROOT_URL + 'chapter-1');
    client.waitForExist('#premuium-content');
    expect(client.isVisible('#premuium-content')).toBe(true);
  });

  this.Then(/^they are informed of their expired subscription$/, function () {
    client.waitForExist('.subscription-expired');
    expect(client.isVisible('.subscription-expired')).toBe(true);
  });

  this.Then(/^the user is not able to see my content$/, function () {
    client.click('a*=Home');
    client.waitForExist('a*=Chapter 1');
    client.click('a*=Chapter 1');
    client.waitForExist('.description');
    expect(client.isVisible('#premium-content')).toBe(false);
  });

};
