(function () {

  'use strict';

  //if (Meteor.isClient || !process.env.IS_MIRROR) {
  if (Meteor.isClient) {
    return;
  }

  // Note: this could also be a Meteor.publish
  Meteor.methods({
    'clearState': function () {
      newsletterSignups.remove({});
    },
    'findSignupByEmail': function (email) {
      return newsletterSignups.findOne({"email": email});
    }
  });

})();