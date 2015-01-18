(function () {

  'use strict';

  module.exports = function () {

    var helper = this;

    this.World = function (callback) {

      var world = helper.world = this;

      // set the app URL
      world.mirrorUrl = Package['xolvio:cucumber'].cucumber.mirror.rootUrl;

      Package['xolvio:webdriver'].wdio.getGhostDriver(function (browser) {
        world.browser = browser;
        browser.call(callback);
      });

    };

  };

})();