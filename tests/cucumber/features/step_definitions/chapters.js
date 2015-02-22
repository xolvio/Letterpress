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

      // do the login process
      helper.world.browser.
        waitForExist('#login-buttons-twitter').
        waitForVisible('#login-buttons-twitter').
        click('#login-buttons-twitter').
        waitForExist('.login-display-name').
        call(callback);

      // wait for the login to complete

      //.call(callback)

    });


    //
    //  this.Given(/^I am authenticated$/, function (callback) {
    //
    //    helper.world.browser.
    //      waitForExist('#login-buttons-twitter').
    //      waitForVisible('#login-buttons-twitter').
    //      saveScreenshot(process.env.PWD + '/auth1.png').
    //      click('#login-buttons-twitter').
    //      saveScreenshot(process.env.PWD + '/auth2.png').
    //      waitForExist('.login-display-name').
    //      saveScreenshot(process.env.PWD + '/auth3.png').
    //      call(callback)
    //  });
    //
  };

})();

