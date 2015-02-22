(function () {

  'use strict';

  module.exports = function () {

    var helper = this;

    this.Before(function setupUsers () {
      var world = helper.world;
      var callback = arguments[arguments.length - 1];

      world.users = {};
      world.users['I'] = {};

      callback();
    });

  };

})();