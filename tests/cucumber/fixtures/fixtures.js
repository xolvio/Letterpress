(function () {

  'use strict';

  Meteor.methods({
    'reset': function () {
      Pages.remove({});
    },
    'page/create': function (page) {
      Pages.insert(page);
    }
  });

})();