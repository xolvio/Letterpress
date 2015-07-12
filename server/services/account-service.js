Letterpress.Services.AccountService = {};

Letterpress.Services.AccountService.createAccount = function (to) {

  var newUserId = Accounts.createUser({email: to});
  Accounts.sendEnrollmentEmail(newUserId);

};