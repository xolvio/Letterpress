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

    it('prefers the environment set private key string over the one provided in settings', function () {

      // SETUP
      Meteor.settings.private.aws.cfnDistribution = 'distro';
      Meteor.settings.private.aws.keypairId = 'keypair';

      process.env.CF_PRIVATE_KEY =
        '-----BEGIN RSA PRIVATE KEY-----\n' +
        'MIIJKAIBAAKCAgEAwGPMqEvxPYQIffDimM9t3A7Z4aBFAUvLiITzmHRc4UPwryJp\n' +
        'EVi3C0sQQKBHlq2IOwrmqNiAk31/uh4FnrRR1mtQm4x4IID58cFAhKkKI/09+j1h\n' +
        'tuf/gLRcOgAXH9o3J5zWjs/y8eWTKtdWv6hWRxuuVwugciNckxwZVV0KewO02wJz\n' +
        'jBfDw9B5ghxKP95t7/B2AgRUMj+r47zErFwo3OKW0egDUpV+eoNSBylXPXXYKvsL\n' +
        'AlznRi9xNafFGy9tmh70pwlGG5mVHswD/96eUSuLOZ2srcNvd1UVmjtHL7P9/z4B\n' +
        'KdODlpb5Vx+54+Fa19vpgXEtHgfAgGW9DjlZMtl4wYTqyGAoa+SLuehjAQsxT8M1\n' +
        'BXqfMJwE7D9XHjxkqCvd93UGgP+Yxe6H+HczJeA05dFLzC87qdM45R5c74k=\n' +
        '-----END RSA PRIVATE KEY-----';

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
        privateKeyString: process.env.CF_PRIVATE_KEY
      });

    });

  });

});