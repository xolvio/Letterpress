(function () {

  'use strict';

  var assert = require('assert');

  module.exports = function () {

    var helper = this;

    this.Given(/^I am a new visitor$/, function (callback) {
      callback();
    });

    this.Then(/^I see the heading "([^"]*)"$/, function (expectedHeading, callback) {
      helper.world.browser.
        getText('h1', function (error, actualHeading) {
          assert.equal(actualHeading, expectedHeading);
          callback();
        });
    });

    this.When(/^I click on "([^"]*)"$/, function (elementText, callback) {
      helper.world.browser.
        click('//*[contains(text(), "' + elementText + '")]').
        call(callback);
    });

    this.Then(/^I see "([^"]*)"$/, function (elementText, callback) {
      helper.world.browser.
        element('//*[contains(text(), "' + elementText + '")]', function (err, element) {
          assert.equal(err, null, '\n' + err);
          assert.notEqual(element, null, elementText + ' not found');
        }).
        call(callback);
    });

    this.Then(/^I do not see "([^"]*)"$/, function (arg1, callback) {
      callback();
    });

  };

})();
