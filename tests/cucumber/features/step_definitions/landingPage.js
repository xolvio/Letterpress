(function () {

  'use strict';

  var assert = require('assert');
  var url = require('url');

  module.exports = function () {

    var helper = this;

    this.Given(/^The setting with key "([^"]*)" and value "([^"]*)" has been set$/, function (key, value, callback) {
      function _getPublicMeteorSettingForKey (key) {
        function getValueByKey (o, k) { return o[k]; }

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

    this.When(/^I navigate to the landing page$/, function (callback) {
      helper.world.browser.
        url(helper.world.mirrorUrl).
        call(callback);
    });


    this.When(/^I sign up for the newsletter with "([^"]*)"$/, function (myEmailAddress, callback) {
      helper.world.users['I'].emailAddress = myEmailAddress;
      helper.world.browser.
        setValue('input#newsletterEmail', myEmailAddress).
        click('button#submitNewsletterEmail').
        call(callback);
    });


    this.Then(/^I receive a confirmation email from "([^"]*)"$/, function (fromEmailAddress, callback) {
      var HTTP = Package['http'].HTTP;
      var sentEmail = HTTP.get(helper.world.mirrorUrl + 'fake/inbox').data[0];
      try {
        assert.equal(sentEmail.to, helper.world.users['I'].emailAddress);
        assert.equal(fromEmailAddress, sentEmail.from);
        callback();
      } catch (e) {
        callback.fail(e);
      }
    });

    //this.Then(/^my email address is stored$/, function (callback) {
    //
    //  var connection = DDP.connect(helper.world.mirrorUrl);
    //
    //  // fail in a 3 seconds if we don't have a DDP connection
    //  var timeout = Meteor.setTimeout(function () {
    //    if (!connection.status().connected) {
    //      callback.fail('DDP call timed out')
    //    }
    //  }, 3000);
    //
    //
    //  var emailAddress = helper.world.users['I'].emailAddress;
    //  connection.call('findSignupByEmail', emailAddress, function (err, res) {
    //
    //    // FIXME bug in cucumber not picking up exceptions
    //    if (err) {
    //      console.log('error', err, res)
    //      callback.fail(err);
    //    } else if (!res || typeof res === 'undefined') {
    //      callback.fail('User with email ' + emailAddress + ' not found');
    //    } else if (res.email !== emailAddress) {
    //      callback.fail('Emails did not match' + emailAddress + ' !== ' + res.email);
    //    } else {
    //      Meteor.clearTimeout(timeout);
    //      connection.disconnect();
    //      callback();
    //    }
    //  });
    //
    //});

    this.Given(/^I have entered chapter preview descriptions$/, function (callback) {
      callback();
    });

    this.Then(/^I see the chapters descriptions in the preview section$/, function (callback) {
      helper.world.browser.
        getText('p', function (error, actualHeading) {
          assert.equal(actualHeading[0], "This chapter will cover item 1");
          callback();
        });
    });

    this.Then(/^the chapters are in order$/, function (callback) {
      helper.world.browser.
        getText('h2', function (error, actualHeading) {
          assert.deepEqual(actualHeading, ["Item 1", "Item 2"]);
          callback();
        });
    });


    this.When(/^I click on the chapter link$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      helper.world.browser.
        click('.chapter-link').
        call(callback);
    });

    this.Then(/^I should be at the chapter preview page$/, function (callback) {
      helper.world.browser.
        url(function(err, url) {
          assert.equal(url.value, helper.world.mirrorUrl + "chapter/1" )
          callback();
        });
    });

  };

})();
