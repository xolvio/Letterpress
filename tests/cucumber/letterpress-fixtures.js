(function () {

  'use strict';

  if (Meteor.isClient) {
    //if (Meteor.isClient || !process.env.IS_MIRROR) {
    return;
  }

  var _fakeInboxCollection = new Package['mongo'].Mongo.Collection('Emails');

  Meteor.startup(function () {
    _clearState();
    _initFakeInbox();
    _insertChapters();
  });

  Meteor.methods({
    'clearState': _clearState,
    'getEmailsFromInboxStub': function () {
      return _fakeInboxCollection.find().fetch()
    }
  });

  function _initFakeInbox () {
    _fakeInboxCollection.remove({});
    Email.send = function (options) {
      console.log('inserted email');
      _fakeInboxCollection.insert(options);
    };
    _createJsonServerRoute('fake/inbox', function () {
      return _fakeInboxCollection.find().fetch();
    });
  }

  function _clearState () {
    _fakeInboxCollection.remove({});
    Chapters.remove({});
    _insertChapters();
  }

  function _insertChapters () {
    Chapters.insert({
      title: "Item 2",
      description: "This chapter will cover item 2",
      previewContent: "",
      premiumContent: "",
      chapterNumber: 2
    });
    Chapters.insert({
      title: "Item 1",
      description: "This chapter will cover item 1",
      chapterNumber: 1
    });
  }

  function _createJsonServerRoute (route, object) {
    Router.route(route, function () {
      this.response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
      });
      if (typeof object === 'function') {
        this.response.end(JSON.stringify(object()));
      } else {
        this.response.end(JSON.stringify(object));
      }
    }, {where: 'server'});
  }

})();
