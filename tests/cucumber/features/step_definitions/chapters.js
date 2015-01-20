(function () {

  'use strict';

  var assert = require('assert');

  module.exports = function () {

    this.Given(/^I am not authenticated$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback();
    });

    this.When(/^I navigate to "([^"]*)"$/, function (arg1, callback) {
      // Write code here that turns the phrase above into concrete actions
      callback();
    });

    this.Given(/^I am authenticated$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback();
    });

  };

})();

