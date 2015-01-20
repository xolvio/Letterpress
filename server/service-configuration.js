Meteor.startup(function () {
  ServiceConfiguration.configurations.remove({});
  ServiceConfiguration.configurations.insert({
    service: 'twitter',
    consumerKey: 'your_consumer_key',
    secret: 'your_secret',
    loginStyle: 'popup'
    //loginStyle: 'redirect'
  });
});