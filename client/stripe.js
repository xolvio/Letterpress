Letterpress.Handlers.stripeTokenHandler = function (token) {
  Meteor.call('createCustomer', token, function (err) {
    if (!err) {
      Router.go('/subscription-confirmation')
    }
    // XXX handle error cases
  });
};

Template.body.events({

  // any link with the word "buy" in it will trigger the stripe checkout
  'click a:contains("Buy"), click a:contains("buy"), click a:contains("BUY")': function () {

    StripeCheckout.open({
      key: Meteor.settings.public.stripe.publicKey,
      name: 'Able',
      description: 'Velocity Sessions',
      amount: 999,
      token: Letterpress.Handlers.stripeTokenHandler
    });

  }

});
