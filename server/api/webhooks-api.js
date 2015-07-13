JsonRoutes.add('post', '/' + Meteor.settings.private.stripe.webhookEndpoint, function (req, res) {
  Letterpress.Services.BuyService.handleEvent(req.body);
  JsonRoutes.sendResult(res, 200);
});