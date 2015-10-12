describe('Accounts API', function () {

  describe('isSubscribed', function () {

    it('gets the currently signed in user and checks if they are subscribed', function () {

      // SETUP
      var aUser = {a: 'user'};
      spyOn(Meteor.users, 'findOne').and.returnValue(aUser);
      spyOn(Letterpress.Services.Account, 'isSubscribed');

      // EXECUTE
      getMethod('isSubscribed').apply({userId: 'myId'});

      // VERIFY
      expect(Meteor.users.findOne).toHaveBeenCalledWith('myId');
      expect(Letterpress.Services.Account.isSubscribed).toHaveBeenCalledWith(aUser);

    });
  });

});
