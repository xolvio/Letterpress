Letterpress.Services.AccountService = {

  createAccount: function (email, profile) {
    var newUserId = Accounts.createUser({email: email, profile: profile});
    Accounts.sendEnrollmentEmail(newUserId);
  },

  sendPaymentEmail: function (user) {
    Email.send({
      to: user.emails[0].address,
      from: Meteor.settings.private.emails.failedPayment.from,
      subject: Meteor.settings.private.emails.failedPayment.subject,
      text: Meteor.settings.private.emails.failedPayment.text
    });
  },

  isSubscribed: function (user) {

    if (Meteor.settings.private.paymentPlan !== 'subscribe') {
      return true;
    }

    if (!user) {
      return false;
     }

    var expiryDate = new Date(user.profile.periodEnd * 1000);
    expiryDate.setMonth(expiryDate.getMonth() + Meteor.settings.private.subscriptionDurationMonths);
    if (new Date().getTime() > expiryDate.getTime()) {
      return false;
    }

    return true;

  }

};