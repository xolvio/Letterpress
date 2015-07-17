Meteor.methods({

  'isSubscribed': function () {
    var user = Meteor.users.findOne(this.userId);
    return Letterpress.Services.AccountService.isSubscribed(user);
  }

});