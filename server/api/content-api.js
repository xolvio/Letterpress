Meteor.methods({

  'getSignedUrl': function (requestedResource) {

    if (!this.userId) {
      throw new Meteor.Error('403', 'You are not authorized to access this content');
    }

    var user = Meteor.users.findOne(this.userId);
    if (!Letterpress.Services.Account.isSubscribed(user)) {
      throw new Meteor.Error('403', 'You are not authorized to access this content');
    }

    var options = {
      s3ObjectPath: requestedResource,
      expireTime: moment().add(1, 'hour'),

      cfnDistribution: Meteor.settings.private.aws.cfnDistribution,
      keypairId: Meteor.settings.private.aws.keypairId,
    };

    if (process.env.CF_PRIVATE_KEY) {
      options.privateKeyString = process.env.CF_PRIVATE_KEY
    } else {
      options.privateKeyPath = Meteor.settings.private.aws.privateKeyPath
    }

    return CloudFront.sign(options);

  }

});