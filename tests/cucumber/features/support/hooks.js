(function () {

  'use strict';

  module.exports = function () {

    var helper = this;

    this.Before(function () {
      var world = helper.world;
      var callback = arguments[arguments.length - 1];
      world.browser.
        init().
        call(callback);
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