JsonRoutes.add('post', '/' + Meteor.settings.private.stripe.webhookEndpoint, function (req, res) {
  Letterpress.Services.Buy.handleEvent(req.body);
  JsonRoutes.sendResult(res, 200);
});