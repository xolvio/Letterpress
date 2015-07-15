module.exports = function () {

  var transactionDetails = null;
  var customerEmail = 'me@example.com';
  var tokenId = 'someId';

  this.Given(/^a customer made a purchase$/, function () {
    return this.server.call('purchase', {id: tokenId, email: customerEmail});
  });

  // XXX it's likely this step will change to a better admin screen in the future
  this.When(/^I search for the transaction by their email$/, function (callback) {
    this.server.call('fixtures/findAudit', {email: customerEmail}).then(function (audit) {
      transactionDetails = audit;
      callback();
    });
  });

  this.Then(/^I'm able to see their transaction details$/, function (callback) {
    // this is the most important detail since it gives traceability in the stripe interface
    expect(transactionDetails[0].response.id).to.equal('randomId');
    callback();
  });

};