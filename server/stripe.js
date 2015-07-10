Stripe = StripeAPI(Meteor.settings.private.stripe.secretKey);

Meteor.methods({

  'createCustomer': function (stripeToken) {

    this.unblock();

    Stripe.customers.create({
      source: stripeToken.id,
      plan: "velocitySessions",
      email: stripeToken.email
    }, function (err, customer) {

      // XXX we should store this customer object for audit purposes

      Email.send({
        to: customer.email,
        from: Meteor.settings.private.emails.from,
        subject: Meteor.settings.private.emails.subscription.subject,
        text: Meteor.settings.private.emails.subscription.text
      });

    });

  }

});