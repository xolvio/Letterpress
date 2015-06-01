Meteor.startup(function() {
  Pages.upsert({path: '/'}, {
    path: '/',
    heading: 'Letterpress by Xolv.io'
  })
});