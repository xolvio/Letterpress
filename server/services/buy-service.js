Stripe = StripeAPI(Meteor.settings.private.stripe.secretKey);

Letterpress.Services.BuyService = {};

Letterpress.Services.BuyService.subscribe = function (token) {

  Stripe.customers.create({
    source: token.id,
    plan: Meteor.settings.private.stripe.planId,
    email: token.email
  }, Meteor.bindEnvironment(function (err, customer) {

    // XXX we should store this customer & token objects for audit purposes

    // XXX handle errors

    Letterpress.Services.AccountService.createAccount(customer.email);

  }));

};

Letterpress.Services.BuyService.charge = function (token) {

  Stripe.charges.create({
    source: token.id,
    amount: Meteor.settings.public.price,
    currency: Meteor.settings.public.currency
  }, Meteor.bindEnvironment(function (err, charge) {

    // XXX we should store this charge & token objects for audit purposes

    // XXX handle errors

    Letterpress.Services.AccountService.createAccount(token.email);

  }));

};