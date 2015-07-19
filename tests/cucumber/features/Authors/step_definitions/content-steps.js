module.exports = function () {

  var url = require('url');

  this.Given(/^I created a landing page$/, function () {
    this.thePage = '/';
    // a landing-page is setup in the seed data
    return this.server.call('fixtures/seedData');
  });

  this.Given(/^I uploaded a premium video called "([^"]*)"$/, function (video, callback) {
    // this will be used in subsequent steps, so store it in the current world object
    this.uploadedPremiumVideo = video;
    callback();
  });

  this.Given(/^I uploaded a preview video called "([^"]*)"$/, function (video, callback) {
    // this will be used in subsequent steps, so store it in the current world object
    this.uploadedPreviewVideo = video;
    callback();
  });

  this.Given(/^I created a "([^"]*)" called "([^"]*)" at "([^"]*)" with the following markdown$/, function (template, title, path, markdown) {
    template = template.toLocaleLowerCase().split(' ').join('-');

    // store the path so humans can use "the page" natural language in future steps
    this.thePage = path;

    return this.server.call(
      'fixtures/page/create', {
        template: template,
        path: path,
        title: title,
        description: markdown,
        premiumVideo: this.uploadedPremiumVideo,
        previewVideo: this.uploadedPreviewVideo
      });
  });

  this.When(/^a visitor navigates to the page$/, function () {
    return this.client.
      url(url.resolve(process.env.ROOT_URL, this.thePage)).
      waitForExist('body *').
      waitForVisible('body *');
  });

  this.When(/^a user navigates to the page$/, function () {
    var self = this;
    return self.AuthenticationHelper.createAccountAndLogin().then(function () {
      return self.client.
        url(url.resolve(process.env.ROOT_URL, self.thePage)).
        waitForExist('body *').
        waitForVisible('body *');
    });
  });


  this.Then(/^they see the heading "([^"]*)"$/, function (heading) {
    return this.client.
      waitForExist('h1=' + heading).
      isVisible('h1=' + heading);
  });

  this.Then(/^they see the sub-heading "([^"]*)"$/, function (subHeading) {
    return this.client.
      waitForExist('h2=' + subHeading).
      isVisible('h2=' + subHeading);
  });

  this.Then(/^they see the cover image from "([^"]*)"$/, function (source) {
    return this.client.
      waitForExist('img').
      getAttribute('img', 'src').should.eventually.contain(source);
  });

  this.Then(/^they see the tag-line "([^"]*)"$/, function (tagline) {
    return this.client.
      waitForExist('p').
      getText('p em').should.become(tagline);
  });

  this.Then(/^they can navigate to "([^"]*)" at "([^"]*)"$/, function (location, source) {
    return this.client.
      waitForExist('a[title="' + location + '"]').
      getAttribute('a[title="' + location + '"]', 'href').should.eventually.contain(source);
  });

  this.Given(/^I have created a chapter called "([^"]*)" with the description$/, function (title, text) {
    return this.server.call(
      'fixtures/page/create', {
        template: 'chapter',
        title: title,
        description: text
      });
  });

  this.Then(/^they see the chapter "([^"]*)" in the table of contents with the description$/, function (title, text) {
    return this.client.
      waitForExist('//*[@class="chapter"]//a[contains(text(), "' + title + '")]').
      waitForExist('//*[@class="chapter"]//p[contains(text(), "' + text + '")]');
  });

  this.Then(/^they should see the preview video in the video player$/, function () {
    return this.client.
      waitForExist('video').
      getAttribute('video source', 'src').should.become(this.uploadedPreviewVideo);
  });

  this.Then(/^they should see the premium video in the video player$/, function () {
    return this.client.
      waitForExist('video').
      getAttribute('video source', 'src').should.eventually.contain(this.uploadedPremiumVideo);
  });


  this.Then(/^the video should link should expire after the time I preset$/, function () {
    return this.client.
      waitForExist('video').
      getAttribute('video source', 'src', function (err, src) {

        console.log(src);

        var expiresAt = new Date(url.parse(src, true).query.Expires * 1000);
        var diffInSeconds = (expiresAt.getTime() - new Date().getTime()) / 1000;

        // Since the automation itself will take some time to run, a bit of leeway
        // is is needed that still proves link will expire in reasonable time
        var oneHour = 60 * 60;
        var slightlyLessThenAnHour = 59 * 60; // one minute window
        expect(diffInSeconds).to.be.within(slightlyLessThenAnHour, oneHour);
      });
  });
};
