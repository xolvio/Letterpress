(function () {

  'use strict';

  Meteor.methods({
    'reset': function () {
      Pages.remove({});
    },
    'page/create': function (pages) {

      // convert page to an array just in case it's a single page
      pages = [].concat(pages);

      // then create all pages
      for (var i=0; i < pages.length; i++) {
        Pages.insert(pages[i]);
      }
    }
  });

})();