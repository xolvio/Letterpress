Meteor.methods({

  'getSignedUrl': function (requestedResource) {

    if (!this.userId) {
      throw new Meteor.Error('403', 'You are not authorized to access this content');
    }

    var user = Meteor.users.findOne(this.userId);
    if (!Letterpress.Services.Account.isSubscribed(user)) {
      throw new Meteor.Error('403', 'You are not authorized to access this content');
    }

    return CloudFront.sign({
      s3ObjectPath: requestedResource,
      expireTime: moment().add(1, 'hour'),

      cfnDistribution: Meteor.settings.private.aws.cfnDistribution,
      keypairId: Meteor.settings.private.aws.cfnDistribution.keypairId,
      privateKeyPath: Meteor.settings.private.aws.privateKeyPath
      // privateKeyString: process.env.CFN_PRIVATE_KEY
    });

  }

});