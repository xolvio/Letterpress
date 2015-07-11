Letterpress.Services.BuyService = {};

Letterpress.Services.BuyService.purchase = function () {

  StripeCheckout.open({
    key: Meteor.settings.public.stripe.publicKey,
    name: 'Able',
    description: 'Velocity Sessions',
    amount: Meteor.settings.public.price,
    token: function(token) {
      Meteor.call('purchase', token, function (err, paymentPlan) {
        if (!err) {
          Router.go('/' + paymentPlan + '-confirmation')
        } else {
          // XXX handle error cases
          console.log(err);
        }

      });
    }
  });

};
