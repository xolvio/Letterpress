Stripe = StripeAPI(Meteor.settings.private.stripe.secretKey);

Letterpress.Services.BuyService = {

  subscribe: function (token) {

    var request = {
      source: token.id,
      plan: Meteor.settings.private.stripe.planId,
      email: token.email
    };

    var stripeCustomersCreateSync = Meteor.wrapAsync(Stripe.customers.create, Stripe.customers);
    var customer;
    try {
      customer = stripeCustomersCreateSync(request);
    } catch (error) {
      throw new Meteor.Error(1001, error.message);
    }

    Letterpress.Collections.Audit.insert({
      email: token.email,
      origin: 'Stripe.customers.create',
      token: token,
      request: request,
      response: customer
    });

    var subscription = customer.subscriptions.data[0];

    Letterpress.Services.AccountService.createAccount(customer.email, {
      stripeCustomerId: customer.id,
      periodStart: subscription.current_period_start,
      periodEnd: subscription.current_period_end
    });

  },

  charge: function (token) {

    var request = {
      source: token.id,
      amount: Meteor.settings.public.price,
      currency: Meteor.settings.public.currency
    };

    var stripeChargeCreateSync = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);
    var charge;
    try {
      charge = stripeChargeCreateSync(request);
    } catch (error) {
      throw new Meteor.Error(1001, error.message);
    }

    Letterpress.Collections.Audit.insert({
      email: token.email,
      origin: 'Stripe.charges.create',
      token: token,
      request: request,
      response: charge
    });

    Letterpress.Services.AccountService.createAccount(token.email);

  },

  handleEvent: function (event) {

    // See https://support.stripe.com/questions/what-events-can-i-see-when-a-subscription-is-renewed
    switch (event.type) {
      case 'invoice.payment_failed': // when recurring payment fails
        var user = Meteor.users.findOne({'profile.stripeCustomerId': event.data.object.customer});
        Letterpress.Services.AccountService.sendPaymentEmail(user);
        break;
      //case 'charge.failed': // if due to a decline
      //  break;
      //case 'customer.updated': // delinquent flag
      //  break;
      //case 'customer.subscription.updated': // after a failure if customer updates TODO check
      //  // what do we do when a fail happens then a customer renews after a few days?
      //  break;
      //case 'customer.subscription.deleted': // after a failure if customer updates TODO check
      //  break;
      //default:

    }

  }

};
