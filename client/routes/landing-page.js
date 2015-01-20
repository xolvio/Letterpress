Router.map(function() {
  this.route('landingPage', {
    path: '/',
    waitOn: function() {
      return Meteor.subscribe('chapters');
    }
  });
});
