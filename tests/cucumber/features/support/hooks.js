(function () {

  'use strict';

  module.exports = function () {

    this.Before(function (callback) {

      var self = this;
      self.server.call('fixtures/reset').then(function () {
        self.server.call('emailStub/reset').then(function () {
          self.server.call('emailStub/stub').then(callback);
        });
      });

    });

  }

})();