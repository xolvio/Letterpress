describe('Webhooks API', function () {

  describe('JSON Route', function () {

    it('delegates event handling to the buy service and responds with 200 on success', function () {

      // - - SETUP
      spyOn(Letterpress.Services.Buy, 'handleEvent');
      spyOn(JsonRoutes, 'sendResult');

      var handler = JsonRoutes._isolator._routes['post' + '/' + Meteor.settings.private.stripe.webhookEndpoint];

      // - - EXECUTE
      var req = {body: 'theEvent'};
      var res = {};
      handler(req, res);

      // - - VERIFY
      expect(Letterpress.Services.Buy.handleEvent).toHaveBeenCalledWith('theEvent');
      expect(JsonRoutes.sendResult).toHaveBeenCalledWith(res, 200);

    });

  });

});