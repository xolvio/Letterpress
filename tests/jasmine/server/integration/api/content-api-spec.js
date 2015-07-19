describe('Content API', function () {

  describe('getSignedUrl', function () {

    it('throws a 403 error when the user is not logged in', function () {

      // SETUP
      spyOn(CloudFront, 'sign');

      // EXECUTE & VERIFY
      expect(function () {
        getMethod('getSignedUrl').apply();
      }).toThrow();

    });

    it('throws a 403 error when the user is not subscribed', function () {

      // SETUP
      spyOn(CloudFront, 'sign');
      spyOn(Letterpress.Services.Account, 'isSubscribed').and.returnValue(false);

      // EXECUTE & VERIFY
      expect(function () {
        getMethod('getSignedUrl').apply({userId: 'myId'});
      }).toThrow();

    });

    it('gets a signed to the given content if the user is subscribed', function () {

      // SETUP
      Meteor.settings.private.aws.cfnDistribution = 'distro';
      Meteor.settings.private.aws.keypairId = 'keypair';
      Meteor.settings.private.aws.privateKeyPath = 'privateKey';
      spyOn(CloudFront, 'sign');
      spyOn(Letterpress.Services.Account, 'isSubscribed').and.returnValue(true);
      moment = function () {return {add: function () {return -1}}};

      // EXECUTE
      var requestedResource = '/some/path/somewhere';
      getMethod('getSignedUrl').apply({userId: 'myId'}, [requestedResource]);

      // VERIFY
      expect(CloudFront.sign).toHaveBeenCalledWith({
        s3ObjectPath: requestedResource,
        expireTime: -1,
        cfnDistribution: 'distro',
        keypairId: 'keypair',
        privateKeyPath: 'privateKey'
      });

    });
  });

});