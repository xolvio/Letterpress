(function () {

  'use strict';

  var assert = require('assert');
  var url = require('url');

  module.exports = function () {

    var helper = this;

    this.Given(/^The setting with key "([^"]*)" and value "([^"]*)" has been set$/, function (key, value, callback) {

      function _getPublicMeteorSettingForKey (key) {
        function getValueByKey (o, k) { return o[k] }

        return key.split(".").reduce(getValueByKey, Meteor.settings);
      }

      try {
        var publicMeteorSettingForKey = _getPublicMeteorSettingForKey(key);
        assert.equal(publicMeteorSettingForKey, value);
        callback();
      } catch (e) {
        callback.fail(e.message);
      }

    });

    this.Given(/^I am a new visitor$/, function (callback) {
      callback();
    });

    this.When(/^I navigate to the landing page$/, function (callback) {
      helper.world.browser.
        url(helper.world.mirrorUrl).
        call(callback);
    });

    this.Then(/^I see the heading "([^"]*)"$/, function (expectedHeading, callback) {
      helper.world.browser.
        getText('h1', function (error, actualHeading) {
          assert.equal(actualHeading, expectedHeading);
          callback();
        });
    });


    this.When(/^I sign up for the newsletter with "([^"]*)"$/, function (myEmailAddress, callback) {
      helper.world.users['I'].emailAddress = myEmailAddress;
      helper.world.browser.
        setValue('input#newsletterEmail', myEmailAddress).
        //saveScreenshot(process.env.PWD + '/hello.png').
        click('button#submitNewsletterEmail').
        call(callback);
    });


    this.Then(/^I receive a confirmation email from "([^"]*)"$/, function (fromEmailAddress, callback) {
      helper.world.browser.
        url(url.resolve(helper.world.mirrorUrl, '/fake/inbox')).
        element('//*[contains(text(), "' + fromEmailAddress + '")]', function (err, element) {
          assert.equal(err, null, '\n' + err);
          assert.notEqual(element, null, fromEmailAddress + ' not found');
        }).
        element('//*[contains(text(), "' + helper.world.users['I'].emailAddress + '")]', function (err, element) {
          assert.equal(err, null, '\n' + err);
          assert.notEqual(element, null, helper.world.users['I'].emailAddress + ' not found');
        }).
        call(callback);
    });

    this.Then(/^my email address is stored$/, function (callback) {

      var connection = DDP.connect(helper.world.mirrorUrl);

      // fail in a 3 seconds if we don't have a DDP connection
      var timeout = Meteor.setTimeout(function () {
        if (!connection.status().connected) {
          callback.fail('DDP call timed out')
        }
      }, 3000);

      var emailAddress = helper.world.users['I'].emailAddress;
      connection.call('findSignupByEmail', emailAddress, function (err, res) {

        // FIXME bug in cucumber not picking up exceptions
        if (err) {
          callback.fail(err);
        } else if (!res || typeof res === 'undefined') {
          callback.fail('User with email ' + emailAddress + ' not found');
        } else if (res.email !== emailAddress) {
          callback.fail('Emails did not match' + emailAddress + ' !== ' + res.email);
        } else {
          Meteor.clearTimeout(timeout);
          connection.disconnect();
          callback();
        }
      });

    })
  };

})();