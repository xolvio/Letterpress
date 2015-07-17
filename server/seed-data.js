Meteor.startup(function () {

  Meteor.call('fixtures/reset', function () {
    Meteor.call('fixtures/seedData');
  });

});