CloudFront = {

  cf: Npm.require('aws-cloudfront-sign'),
  url: Npm.require('url'),

  sign: function (options) {

    var cfnUrl = this.url.format({
      protocol: options.protocol || 'http',
      host: options.cfnDistribution,
      pathname: options.s3ObjectPath
    });

    return this.cf.getSignedUrl(cfnUrl, options);

  }
};

