Letterpress.Services.Buy = {};

Letterpress.Services.Buy.purchase = function () {

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
          alert('Sorry There was an error.\n' +  err.message);
        }

      });
    }
  });

};
