(function () {

  'use strict';

  if (Meteor.isClient) {
    //if (Meteor.isClient || !process.env.IS_MIRROR) {
    return;
  }

  Meteor.methods({
    'clearState': function () {
      newsletterSignups.remove({});
    },
    // Note: this could also be achieved with a Meteor.publish + a DDP subscribe
    'findSignupByEmail': function (email) {
      return newsletterSignups.findOne({"email": email});
    }
  });

  Meteor.startup(function () {

    Chapters.remove({});
    Chapters.insert({title: "Item 2", description: "This chapter will cover item 2", chapterNumber: 2});
    Chapters.insert({title: "Item 1", description: "This chapter will cover item 1", chapterNumber: 1});

    _initFakeInbox();

  });

  function _initFakeInbox () {
    var emails = new Mongo.Collection('Emails');
    emails.remove({});
    Email.send = function (options) {
      emails.insert(options);
    };
    Router.route('fake/inbox', function () {
      this.response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
      });
      this.response.end(JSON.stringify(emails.find().fetch()));

    }, {where: 'server'});
  }

})();
