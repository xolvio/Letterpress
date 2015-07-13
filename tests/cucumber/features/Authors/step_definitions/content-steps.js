module.exports = function () {

  this.Given(/^I have created a landing page with the following header markdown$/, function (markdown, callback) {
    this.server.call(
      'fixtures/page/create', {
        template: 'landing-page',
        path: '/',
        content: markdown
      }).then(callback);
  });

  this.When(/^a user navigates to the landing page$/, function (callback) {
    this.client.
      url(process.env.ROOT_URL).
      waitForExist('body *').
      waitForVisible('body *').
      call(callback);
  });

  this.Then(/^they see the heading "([^"]*)"$/, function (heading, callback) {
    this.client.
      getText('header h1').should.become(heading).and.notify(callback);
  });

  this.Then(/^they see the cover image from "([^"]*)"$/, function (source, callback) {
    this.client.
      getAttribute('header img', 'src').should.eventually.contain(source).and.notify(callback);
  });

  this.Then(/^they see the tag-line "([^"]*)"$/, function (tagline, callback) {
    this.client.
      getText('header p em').should.become(tagline).and.notify(callback);
  });

  this.Then(/^they can navigate to "([^"]*)" at "([^"]*)"$/, function (location, source, callback) {
    this.client.
      getAttribute('a[title="' + location + '"]', 'href').should.eventually.contain(source).and.notify(callback);
  });

  this.Given(/^I have created a chapter called "([^"]*)" with the description$/, function (title, text, callback) {
    this.server.call(
      'fixtures/page/create', {
        template: 'chapter',
        title: title,
        content: text
      }).then(callback);
  });

  this.Then(/^they see the chapter "([^"]*)" in the table of contents with the description$/, function (title, text, callback) {
    this.client.
      isExisting('//*[@class="chapter"]//a[contains(text(), "' + title + '")]').should.become(true).
      isExisting('//*[@class="chapter"]//p[contains(text(), "' + text + '")]').should.become(true).
      and.notify(callback);
  });

};
