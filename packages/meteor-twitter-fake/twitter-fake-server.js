// Respondly specific HttpInterceptor and TwitterFake configuration
var _routeNameCache = {},
    url             = Npm.require('url');

HttpInterceptor = Package['xolvio:http-interceptor'].HttpInterceptor;

TwitterFake = TwitterFake || {};

Meteor.startup(function () {
  ServiceConfiguration.configurations.remove({});
  ServiceConfiguration.configurations.insert({
    service: 'twitter',
    consumerKey: 'long_consumer_key',
    secret: 'a_really_big_secret',
    loginStyle: 'popup'
    //loginStyle: 'redirect'
  });
  TwitterFake.init();
  TwitterFake.setupRoutes();
});

OAuth = Package['oauth'].OAuth;



_.extend(TwitterFake, {

  fakeData: {

    oauthToken: 'C4fDpmAHHA7r0EZRBVJoIywoPMt64yMq',
    oauthVerifier: 'uE5YqPdfjh2hsMTR7L3MhDrEnzWKIRzE',
    oauthTokenSecret: 'Ct44BiqYSEt3vF2dBSkqVbviLIQMicIY',

    accessTokenOauthTokenSecret: 'K14oVfWunYuaqUPhEW6WkRkE7BKEAMO81qgh6tljrnIOb',
    accessTokenOauthToken: '859186075-8RvREJv57qylZWN6UD3HyFAFxkTS6RPmMHnBN7tm',

    user : {
      id: 859186075,
      screen_name: 'sam_hatoum'
    }
  },

  init: function () {

    HttpInterceptor.registerInterceptor('https://api.twitter.com', Meteor.absoluteUrl('api.twitter.com'));

    var _state;
    var fakeServiceUrls = {
      requestToken: Meteor.absoluteUrl('api.twitter.com/oauth/request_token'),
      authorize: Meteor.absoluteUrl('api.twitter.com/oauth/authorize'),
      accessToken: Meteor.absoluteUrl('api.twitter.com/oauth/access_token'),
      authenticate: Meteor.absoluteUrl('api.twitter.com/oauth/authenticate')
    };

    var _requestHandlers = Package['oauth'].OAuth._requestHandlers['1'];
    Package['oauth'].OAuth._requestHandlers['1'] = function (service, query) {
      service.urls = fakeServiceUrls;
      _state = query.state;
      return _requestHandlers.apply(this, arguments);
    };

    Router.route('api.twitter.com/oauth/authenticate', function () {
      this.response.writeHead(302, {
        'Location': Meteor.absoluteUrl('_oauth/twitter') +
        '?state=' + _state +
        '&oauth_token=' + TwitterFake.fakeData.oauthToken +
        '&oauth_verifier=' + TwitterFake.fakeData.oauthVerifier
      });
      this.response.end();
    }, {where: 'server'});

    Router.route('api.twitter.com/oauth/request_token', function () {
      this.response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      this.response.end('oauth_token=' + TwitterFake.fakeData.oauthToken + '&oauth_token_secret=' + TwitterFake.fakeData.oauthTokenSecret + '&oauth_callback_confirmed=true');
    }, {where: 'server'});

    Router.route('api.twitter.com/oauth/access_token', function () {
      this.response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      this.response.end('oauth_token=' + TwitterFake.fakeData.accessTokenOauthToken + '&oauth_token_secret=' + TwitterFake.fakeData.accessTokenOauthTokenSecret + '&user_id=' + TwitterFake.fakeData.user.id + '&screen_name=' + TwitterFake.fakeData.user.screen_name);
    }, {where: 'server'});

    Router.route('api.twitter.com/1.1/account/verify_credentials.json', function () {
      this.response.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
      this.response.end('{"id":859186075,"id_str":"859186075","name":"Sam Hatoum","screen_name":"sam_hatoum","location":"","profile_location":null,"description":"","url":null,"entities":{"description":{"urls":[]}},"protected":false,"followers_count":71,"friends_count":64,"listed_count":3,"created_at":"Wed Oct 03 04:36:40 +0000 2012","favourites_count":2,"utc_offset":null,"time_zone":null,"geo_enabled":false,"verified":false,"statuses_count":22,"lang":"en","status":{"created_at":"Sun Jan 11 08:53:02 +0000 2015","id":554199291737030657,"id_str":"554199291737030657","text":"RT @PubNub: Blazing fast end-to-end testing with parallel CI. Talk from @sam_hatoum and @rissem: http:\\/\\/t.co\\/TfqoKimdLE","source":"\\u003ca href=\\"http:\\/\\/twitter.com\\" rel=\\"nofollow\\"\\u003eTwitter Web Client\\u003c\\/a\\u003e","truncated":false,"in_reply_to_status_id":null,"in_reply_to_status_id_str":null,"in_reply_to_user_id":null,"in_reply_to_user_id_str":null,"in_reply_to_screen_name":null,"geo":null,"coordinates":null,"place":null,"contributors":null,"retweeted_status":{"created_at":"Tue Jan 06 16:22:38 +0000 2015","id":552500498742648832,"id_str":"552500498742648832","text":"Blazing fast end-to-end testing with parallel CI. Talk from @sam_hatoum and @rissem: http:\\/\\/t.co\\/TfqoKimdLE","source":"\\u003ca href=\\"http:\\/\\/twitter.com\\" rel=\\"nofollow\\"\\u003eTwitter Web Client\\u003c\\/a\\u003e","truncated":false,"in_reply_to_status_id":null,"in_reply_to_status_id_str":null,"in_reply_to_user_id":null,"in_reply_to_user_id_str":null,"in_reply_to_screen_name":null,"geo":null,"coordinates":null,"place":null,"contributors":null,"retweet_count":5,"favorite_count":0,"entities":{"hashtags":[],"symbols":[],"user_mentions":[{"screen_name":"sam_hatoum","name":"Sam Hatoum","id":859186075,"id_str":"859186075","indices":[60,71]},{"screen_name":"rissem","name":"Michael Risse","id":20422514,"id_str":"20422514","indices":[76,83]}],"urls":[{"url":"http:\\/\\/t.co\\/TfqoKimdLE","expanded_url":"http:\\/\\/bit.ly\\/1Dfwqvu","display_url":"bit.ly\\/1Dfwqvu","indices":[85,107]}]},"favorited":false,"retweeted":true,"possibly_sensitive":false,"lang":"en"},"retweet_count":5,"favorite_count":0,"entities":{"hashtags":[],"symbols":[],"user_mentions":[{"screen_name":"PubNub","name":"PubNub","id":152773076,"id_str":"152773076","indices":[3,10]},{"screen_name":"sam_hatoum","name":"Sam Hatoum","id":859186075,"id_str":"859186075","indices":[72,83]},{"screen_name":"rissem","name":"Michael Risse","id":20422514,"id_str":"20422514","indices":[88,95]}],"urls":[{"url":"http:\\/\\/t.co\\/TfqoKimdLE","expanded_url":"http:\\/\\/bit.ly\\/1Dfwqvu","display_url":"bit.ly\\/1Dfwqvu","indices":[97,119]}]},"favorited":false,"retweeted":true,"possibly_sensitive":false,"lang":"en"},"contributors_enabled":false,"is_translator":false,"is_translation_enabled":false,"profile_background_color":"C0DEED","profile_background_image_url":"http:\\/\\/abs.twimg.com\\/images\\/themes\\/theme1\\/bg.png","profile_background_image_url_https":"https:\\/\\/abs.twimg.com\\/images\\/themes\\/theme1\\/bg.png","profile_background_tile":false,"profile_image_url":"http:\\/\\/pbs.twimg.com\\/profile_images\\/516296655549657088\\/wlmCsURx_normal.jpeg","profile_image_url_https":"https:\\/\\/pbs.twimg.com\\/profile_images\\/516296655549657088\\/wlmCsURx_normal.jpeg","profile_banner_url":"https:\\/\\/pbs.twimg.com\\/profile_banners\\/859186075\\/1411625729","profile_link_color":"0084B4","profile_sidebar_border_color":"C0DEED","profile_sidebar_fill_color":"DDEEF6","profile_text_color":"333333","profile_use_background_image":true,"default_profile":true,"default_profile_image":false,"following":false,"follow_request_sent":false,"notifications":false}');
    }, {where: 'server'});

  },


  setupRoutes: function () {
    _.each(TwitterFake.recording, function (call) {

      if (call.direction === 'OUT') {

        // setup a route on this guy
        var route = call.request.url.hostname + call.request.url.pathname;

        // keep track of the routes we create
        if (_routeNameCache[route]) {
          // we've already got a canned response for this route
          return;
        }
        _routeNameCache[route] = true;

        // create a server side route that behaved like the recording did
        Router.route(route, function () {
          var self = this;
          self.response.writeHead(call.response.statusCode, {'Content-Type': call.response.headers['content-type']});
          self.response.end(call.response.content);
        }, {where: 'server'});

      }
    });

  }

});

_initHttpInterceptor();

// this method is only used for watching traffic in the httpInterceptor. The ignores do not affect
// faking, only what is displayed (and used as recordings after)
function _initHttpInterceptor () {

  // ignore app calls we don't care about
  HttpInterceptor.ignore([
    '.map$',
    '.css$',
    '^\/packages',
    '^\/images',
    '^\/src',
    '^\/template.page.j',
    '\/api\/v0.1\/',
    '^https:\/\/api.mailgun.net'
  ]);

  HttpInterceptor.ignore([
    '\/_oauth\/',
    '\/oauth\/',
    '^https:\/\/api.twitter.com\/oauth\/authenticate',
    '^https:\/\/api.twitter.com\/oauth\/request_token',
    '^https:\/\/api.twitter.com\/oauth\/access_token',
    '^https:\/\/api.twitter.com\/1.1\/account/verify_credentials.json'
  ]);

}

