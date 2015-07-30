Meteor.methods({

  'purchase': function (token) {

    this.unblock();

    var paymentPlan = Meteor.settings.private.paymentPlan;

    switch (paymentPlan) {

      case 'subscribe':
        Letterpress.Services.Buy.subscribe(token);
        break;

      case 'charge':
        Letterpress.Services.Buy.charge(token);
        break;

      default:
        throw Meteor.Error('501', 'Invalid payment plan ' + paymentPlan);
    }

    return paymentPlan;

  }

});