Letterpress.Services.BuyService = {};

Letterpress.Services.BuyService.buy = function () {

  var stripeTokenHandler = function(token) {
    Meteor.call('createCustomer', token, function (err) {
      if (!err) {
        Router.go('/subscription-confirmation')
      }
      // XXX handle error cases
    });
  };

  StripeCheckout.open({
    key: Meteor.settings.public.stripe.publicKey,
    name: 'Able',
    description: 'Velocity Sessions',
    amount: 999,
    token: stripeTokenHandler
  });

};
