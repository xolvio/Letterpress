Stripe = StripeAPI(Meteor.settings.private.stripe.secretKey);

Letterpress.Services.BuyService = {};

Letterpress.Services.BuyService.subscribe = function (token) {

  var request = {
    source: token.id,
    plan: Meteor.settings.private.stripe.planId,
    email: token.email
  };
  Stripe.customers.create(request, Meteor.bindEnvironment(function (err, response) {

    // XXX handle errors
    console.log('here')

    Letterpress.Collections.Audit.insert({
      email: token.email,
      origin: 'Stripe.customers.create',
      token: token,
      request: request,
      response: response
    });

    Letterpress.Services.AccountService.createAccount(response.email);

  }));

};

Letterpress.Services.BuyService.charge = function (token) {

  var request = {
    source: token.id,
    amount: Meteor.settings.public.price,
    currency: Meteor.settings.public.currency
  };
  Stripe.charges.create(request, Meteor.bindEnvironment(function (err, response) {

    // XXX handle errors

    Letterpress.Collections.Audit.insert({
      email: token.email,
      origin: 'Stripe.charges.create',
      token: token,
      request: request,
      response: response
    });

    Letterpress.Services.AccountService.createAccount(token.email);

  }));

};