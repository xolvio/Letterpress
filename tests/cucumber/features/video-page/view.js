module.exports = function () {
  this.Given(/^An author has created a video page with the following header markdown$/, function (markdown, callback) {
    this.server.call(
      'fixtures/page/create', {
        template: 'chapter',
        path: '/file-structure',
        premiumContent: markdown
      }).then(callback);
  });

  this.Given(/^I have have registered$/, function (callback) {
    this.server.call('fixtures/createAccount',
                    {username: "user@test.com", password: "password1"}
      ).then(callback);
  });

  this.Given(/^I am not logged in$/, function (callback) {
    this.client.executeAsync( function(done) {
      Meteor.logout(done);
    })
    .call(callback);
  });

  this.When(/^I navigate to the video page$/, function (callback) {
    this.client.
      url(process.env.ROOT_URL+ "/file-structure").
      waitForExist('body *').
      waitForVisible('body *').
      call(callback);
  });

  this.When(/^I login$/, function (callback) {
    // this.client.waitForExist('a#login-sign-in-link')
    //   .click('a#login-sign-in-link')
    //   .call(callback);
    this.client.executeAsync( function(done) {
      Meteor.loginWithPassword("user@test.com", "password1", done);
    }).call(callback);
  });

  this.Then(/^I can access my premium video content$/, function (callback) {
    this.client.
      waitForVisible('iframe').
      isVisible('iframe').should.become(true).
      and.notify(callback);
  });
};
