module.exports = function () {

  this.Given(/^I have configured a Stripe account$/, function (callback) {
    // do nothing, the step specification is valid but does not require automation
    callback();
  });

  this.Given(/^I have created content$/, function (callback) {
    this.server.call('fixtures/seedData').then(callback);
  });

  this.Given(/^I have set my payment plan to be subscription$/, function (callback) {
    this.server.call('fixtures/setPaymentPlan', 'subscription').then(callback)
  });

  this.When(/^a user pays using Stripe$/, function (callback) {

    this.browser.

      // go to the page first
      url(process.env.ROOT_URL).

      // stub the client & server stubs
      executeAsync(function (done) {Meteor.call('stripeStub/stub', {email: 'me@example.com'}, done)}).

      // click the buy button
      waitForExist('a[title="Buy It"]').
      click('a[title="Buy It"]').

      // tell cucumber we're done
      call(callback);

  });

  this.Then(/^they see a confirmation screen of their subscription$/, function (callback) {
    this.browser.url().should.eventually.have.property('value').that.contains('/subscription-confirmation').
      getText('div').should.eventually.contain('You are now subscribed').and.notify(callback);
  });

  this.Then(/^receive a confirmation email of their subscription$/, function (callback) {
    var self = this;
    self.server.call('fixtures/getSettings').then(function (settings) {
      self.server.call('emailStub/getEmails').then(function (emails) {
        global.expect(emails[0].to).to.equal('me@example.com');
        global.expect(emails[0].from).to.equal(settings.private.emails.from);
        global.expect(emails[0].subject).to.equal(settings.private.emails.subscription.subject);
        global.expect(emails[0].text).to.equal(settings.private.emails.subscription.text);
        callback();
      });
    });

  });



};