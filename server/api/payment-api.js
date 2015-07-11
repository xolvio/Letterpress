Meteor.methods({

  'purchase': function (token) {

    this.unblock();

    var paymentPlan = Meteor.settings.private.paymentPlan;

    switch (paymentPlan) {

      case 'subscribe':
        Letterpress.Services.BuyService.subscribe(token);
        return 'subscribe';

      case 'charge':
        Letterpress.Services.BuyService.charge(token);
        return 'charge';

      default:
        throw Meteor.Error('501', 'Invalid payment plan ' + paymentPlan);
    }

  }

});