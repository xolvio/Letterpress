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
  }

};