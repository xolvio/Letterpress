Stripe = StripeAPI(Meteor.settings.private.stripe.secretKey);

Letterpress.Services.BuyService = {};

Letterpress.Services.BuyService.subscribe = function (token) {

  var request = {
    source: token.id,
    plan: Meteor.settings.private.stripe.planId,
    email: token.email
  };
  Stripe.customers.create(request, Meteor.bindEnvironment(function (err, response) {

    Letterpress.Collections.Audit.insert({
      email: token.email,
      origin: 'Stripe.customers.create',
      token: token,
      request: request,
      response: response,
      err: err
    });

    if (err) {
      throw Meteor.Error(500, err);
    }

    // TODO handle strange response codes from Stripe

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

    Letterpress.Collections.Audit.insert({
      email: token.email,
      origin: 'Stripe.charges.create',
      token: token,
      request: request,
      response: response,
      err: err
    });

    if (err) {
      throw Meteor.Error(500, err);
    }

    // TODO handle strange response codes from Stripe

    Letterpress.Services.AccountService.createAccount(token.email);

  }));

};