(function () {

  'use strict';

  module.exports = function () {

    this.Before(function () {
      global.expect = require('@xolvio/jasmine-expect').expect;

      server.call('fixtures/reset');
      server.call('emailStub/reset');
      server.call('emailStub/stub');
      server.call('fixtures/stubCloudFrontClient');

      // go to the page first so we have access to the Meteor object
      client.url(process.env.ROOT_URL);
      client.executeAsync(function (done) {
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

  }
})();
