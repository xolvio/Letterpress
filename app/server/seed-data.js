Meteor.startup(function () {

  Meteor.call('fixtures/reset', true, function () {
    Meteor.call('fixtures/seedData');
  });

});
