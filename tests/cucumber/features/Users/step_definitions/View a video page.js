module.exports = function () {
  this.Given(/^An author has created a video page with the following header markdown$/, function (markdown, callback) {
    this.server.call(
      'fixtures/page/create', {
        template: 'chapter',
        path: '/file-structure',
        premiumContent: markdown,
        title: "File Structure",
        content: "A video all about file structures."
      }).then(callback);
  });

  this.Given(/^I have have registered$/, function (callback) {
    this.server.call('fixtures/createAccount',
        {email: "user@test.com", password: "password1"}
      ).then(function() {callback()});
  });


  this.Given(/^I am not logged in$/, function (callback) {
    this.client.executeAsync( function(done) {
      Meteor.logout(done);
    })
    .call(callback);
  });

  this.When(/^I navigate to the video page$/, function (callback) {
    this.client.
      url(process.env.ROOT_URL+ "file-structure").
      waitForExist('body *').
      waitForVisible('body *').
      call(callback);
  });

  this.When(/^I login$/, function (callback) {
    this.client.waitForExist('a#login-sign-in-link')
      .click('a#login-sign-in-link')
      .setValue('#login-email', "user@test.com")
      .setValue('#login-password', "password1")
      .click('.login-button-form-submit')
      .call(callback);
  });

  this.Then(/^I can access my premium video content$/, function (callback) {
    this.client.
      waitForVisible('iframe#youtube-video').
      isVisible('iframe#youtube-video').should.become(true).
      and.notify(callback);
  });

  this.Then(/^I can see the heading of this video$/, function (callback) {
    this.client.
      waitForVisible('h1').
      getText('h1').should.become('File Structure').
      and.notify(callback);
  });

  this.Then(/^I read the video description$/, function (callback) {
    this.client.
      waitForVisible('div.description').
      getText('div.description').should.become('A video all about file structures.').
      and.notify(callback);
  });

  this.Then(/^I see a "([^"]*)" button$/, function (button, callback) {
    this.client.
      waitForVisible('a=Buy Now').
      isVisible('a=Buy Now').should.become(true).
      and.notify(callback);
  });

  this.Then(/^I cannot not see a video$/, function (callback) {
    this.client.
      isVisible('iframe#youtube-video').should.become(false).
      and.notify(callback);
  });

  this.Then(/^I cannot join the discussion about this video$/, function (callback) {
    this.client.
      isVisible('#disqus_thread').should.become(false).
      and.notify(callback);
  });

  this.Given(/^I have authenticated$/, function (callback) {
    this.client.executeAsync( function(done) {
      Meteor.loginWithPassword("user@test.com", "password1", done);
    }).call(callback);
  });

  this.Then(/^I can join the discussion about this video$/, function (callback) {
    this.client.
      isExisting('#disqus_thread').should.become(true).
      and.notify(callback);
  });
};
