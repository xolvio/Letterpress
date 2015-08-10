module.exports = function () {

  var transactionDetails = null;
  var customerEmail = 'me@example.com';
  var tokenId = 'someId';

  this.Given(/^a customer made a purchase$/, function () {
    server.call('purchase', {id: tokenId, email: customerEmail});
  });

  // XXX it's likely this step will change to a better admin screen in the future
  this.When(/^I search for the transaction by their email$/, function () {
    transactionDetails = server.call('fixtures/findAudit', {email: customerEmail});
  });

  this.Then(/^I'm able to see their transaction details$/, function () {
    // this is the most important detail since it gives traceability in the stripe interface
    expect(transactionDetails[0].response.id).toEqual('randomId');
  });

};
