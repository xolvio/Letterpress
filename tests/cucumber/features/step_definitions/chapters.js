(function () {

  'use strict';

  var assert = require('assert');

  module.exports = function () {

    var helper = this;

    this.Given(/^I am not authenticated$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      // helper.world.browser.
      //   execute(function() {
      //     Meteor.logout();
      //   });
      callback();
    });

    this.Given(/^I am authenticated$/, function (callback) {

      helper.world.browser.
        click('#login-buttons-twitter')

      callback();
    });

  };

})();

