(function () {

  'use strict';

  module.exports = function () {

    this.Before(function () {

      var self = this;

      return self.server.call('fixtures/reset')
        .then(function () {
          return self.server.call('emailStub/reset');
        })
        .then(function () {
          return self.server.call('emailStub/stub');
        })
        .then(function () {
          return self.server.call('fixtures/stubCloudFrontClient');
        })
        .then(function () {
          // go to the page first so we have access to the Meteor object
          return self.browser
            .url(process.env.ROOT_URL)
            .executeAsync(function (done) {

              var customer = {
                id: 'randomId',
                email: 'me@example.com',
                subscriptions: {
                  data: [{
                    current_period_start: 1436716844,
                    current_period_end: 1436716844
                  }]
                }
              };
              // this call will stub stripe both on the client and server
              Meteor.call('stripeStub/stub', customer, done);
            });

        });
    });

  }
})();