(function () {

  'use strict';

  module.exports = function () {

    var helper = this;

    this.Before(function () {
      var world = helper.world;
      var callback = arguments[arguments.length - 1];

      var connection = DDP.connect(helper.world.mirrorUrl);
      connection.call('clearState', function () {

        world.browser.
          init().
          setViewportSize({
            width: 1280,
            height: 1024
          }).
          call(callback);

      });
    });

    this.After(function () {
      var world = helper.world;
      var callback = arguments[arguments.length - 1];
      world.browser.
        end().
        call(callback);
    });

  };

})();