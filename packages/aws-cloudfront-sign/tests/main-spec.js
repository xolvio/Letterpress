describe('CloudFront', function () {

  describe('Sign', function () {

    it('should call getSignedUrl with a formatter url and passes through the options', function () {

      spyOn(CloudFront.cf, 'getSignedUrl');

      var options = {
        cfnDistribution: 'boo.faz',
        s3ObjectPath: '/to/the/bar.mitzvah'
      };

      CloudFront.sign(options);

      var expctedUrl = 'http://boo.faz/to/the/bar.mitzvah';
      expect(CloudFront.cf.getSignedUrl).toHaveBeenCalledWith(expctedUrl, options);

    });

  });

});