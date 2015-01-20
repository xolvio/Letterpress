(function () {

  'use strict';

  var assert = require('assert');

  module.exports = function () {

    var helper = this;

    this.Given(/^I am not authenticated$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback();
    });

    this.Given(/^I am authenticated$/, function (callback) {

      helper.world.browser.
        waitForExist('#login-buttons-twitter').
        waitForVisible('#login-buttons-twitter').
        saveScreenshot(process.env.PWD + '/auth1.png').
        click('#login-buttons-twitter').
        saveScreenshot(process.env.PWD + '/auth2.png').
        waitForExist('.login-display-name').
        saveScreenshot(process.env.PWD + '/auth3.png').
        call(callback)
    });

  };

})();

