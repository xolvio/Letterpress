(function () {

  'use strict';

  Meteor.methods({

    'fixtures/seedData': Letterpress.Utils.seedData,

    'fixtures/reset': function () {
      Meteor.users.remove({});
      Letterpress.Collections.Audit.remove({});
      Letterpress.Collections.Pages.remove({});
    },

    'fixtures/page/create': function (pages) {

      // convert page to an array just in case it's a single page
      pages = [].concat(pages);

      // then create all pages
      for (var i = 0; i < pages.length; i++) {
        Letterpress.Collections.Pages.insert(pages[i]);
      }
    },

    'fixtures/findAudit': function (query) {
      return Letterpress.Collections.Audit.find(query).fetch();
    },

    'fixtures/getSettings': function () {
      return Meteor.settings;
    },

    'fixtures/setPaymentPlan': function (plan) {
      Meteor.settings.private.paymentPlan = plan;
    },

    'fixtures/createAccount': function (user) {
      return Accounts.createUser(user);
    },

    'fixtures/stubCloudFrontClient': function () {
      CloudFront.cf._getSignedUrl = CloudFront.cf.getSignedUrl;
      CloudFront.cf.getSignedUrl = function (url, options) {
        return url +
          options.s3ObjectPath +
          '?Expires=' + Math.floor(CloudFront.cf._getExpireTime(options) / 1000) +
          '&Signature=fiuOZjWX3VoZWLiQQPD6NCr-deU4FzFzHJVIJEVaTUzrHra0GIVTRwPYTjRmSKKHxBnoSwU3sYJDyIgwrTFwAdci7gL4aWZLIZFa-bpfdicCBWd39-l6pTZyadm4d1dgFGPEaz4mD9VltbZa5~TWuEvtHwXxqVaXIzncD6r2JS5viEmbTqvpzwKRlkAFza0PCVKc~ge7NNAA~KE0feaUxTZ267AUXgBvtw8mAfEOJTuBPd8WIkwwIH-cLA-6iPJ6jyA5qHqKL-J~gHwkWv9exn5Tb9OoRk6cUiTQ28~zxPo8krlRXf8HPo3euwttzNi8mA86YLvvPJ929JHLlZTInQ__' +
          '&Key-Pair-Id=' + options.keypairId;
      }
    }

  });

})();
