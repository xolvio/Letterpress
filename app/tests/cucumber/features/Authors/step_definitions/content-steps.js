module.exports = function () {

  var url = require('url');

  this.Given(/^I created a landing page$/, function () {
    this.thePage = '/';
    // a landing-page is setup in the seed data
    server.call('fixtures/seedData');
  });

  this.Given(/^I uploaded a premium video called "([^"]*)"$/, function (video) {
    // this will be used in subsequent steps, so store it in the current world object
    this.uploadedPremiumVideo = video;
  });

  this.Given(/^I uploaded a preview video called "([^"]*)"$/, function (video) {
    // this will be used in subsequent steps, so store it in the current world object
    this.uploadedPreviewVideo = video;
  });

  this.Given(/^I created a "([^"]*)" called "([^"]*)" at "([^"]*)" with the following markdown$/, function (template, title, path, markdown) {
    template = template.toLocaleLowerCase().split(' ').join('-');

    // store the path so humans can use "the page" natural language in future steps
    this.thePage = path;

    server.call('fixtures/page/create', {
      template: template,
      path: path,
      title: title,
      description: markdown,
      premiumVideo: this.uploadedPremiumVideo,
      previewVideo: this.uploadedPreviewVideo
    });
  });

  this.When(/^a visitor navigates to the page$/, function () {
    client.url(url.resolve(process.env.ROOT_URL, this.thePage));
  });

  this.When(/^a user navigates to the page$/, function () {
    this.AuthenticationHelper.createAccountAndLogin();
    client.url(url.resolve(process.env.ROOT_URL, this.thePage));
  });

  this.Then(/^they see the heading "([^"]*)"$/, function (heading) {
    client.waitForExist('h1=' + heading);
    expect(client.isVisible('h1=' + heading)).toBe(true);
  });

  this.Then(/^they see the sub-heading "([^"]*)"$/, function (subHeading) {
    client.waitForExist('h2=' + subHeading);
    expect(client.isVisible('h2=' + subHeading)).toBe(true);
  });

  this.Then(/^they see the cover image from "([^"]*)"$/, function (source) {
    client.waitForExist('img');
    expect(client.getAttribute('img', 'src')).toMatch(source);
  });

  this.Then(/^they see the tag-line "([^"]*)"$/, function (tagline) {
    client.waitForExist('p');
    expect(client.getText('p em')).toEqual(tagline);
  });

  this.Then(/^they can navigate to "([^"]*)" at "([^"]*)"$/, function (location, source) {
    client.waitForExist('a[title="' + location + '"]')
    expect(client.getAttribute('a[title="' + location + '"]', 'href')).toMatch(source);
  });

  this.Given(/^I have created a chapter called "([^"]*)" with the description$/, function (title, text) {
    server.call('fixtures/page/create', {
      template: 'chapter',
      title: title,
      description: text
    });
  });

  this.Then(/^they see the chapter "([^"]*)" in the table of contents with the description$/, function (title, text) {
    client.waitForExist('//*[@class="chapter"]//a[contains(text(), "' + title + '")]');
    client.waitForExist('//*[@class="chapter"]//p[contains(text(), "' + text + '")]');
  });

  this.Then(/^they should see the preview video in the video player$/, function () {
    client.waitForExist('video source');
    expect(client.getAttribute('video source', 'src')).toEqual(this.uploadedPreviewVideo);
  });

  this.Then(/^they should see the premium video in the video player$/, function () {
    client.waitForExist('video source');
    expect(client.getAttribute('video source', 'src')).toMatch(this.uploadedPremiumVideo);
  });


  this.Then(/^the video should link should expire after the time I preset$/, function () {
    client.waitForExist('video');
    var src = client.getAttribute('video source', 'src');
    var expiresAt = new Date(url.parse(src, true).query.Expires * 1000);
    var diffInSeconds = (expiresAt.getTime() - new Date().getTime()) / 1000;

    // Since the automation itself will take some time to run, a bit of leeway
    // is is needed that still proves link will expire in reasonable time
    var oneHour = 60 * 60;
    var slightlyLessThenAnHour = 59 * 60; // one minute window
    expect(diffInSeconds).toBeGreaterThan(slightlyLessThenAnHour);
    expect(diffInSeconds).toBeLessThan(oneHour);
  });
};
