module.exports = function () {

  this.Given(/^I have created a landing page with the following header markdown$/, function (markdown, callback) {
    this.server.call('page/create', {
      path: '/',
      markdown: markdown
    }).then(callback);
  });

  this.When(/^a user navigates to the landing page$/, function (callback) {
    this.client.url(process.env.ROOT_URL).call(callback);
  });

  this.Then(/^they see the heading "([^"]*)"$/, function (heading, callback) {
    this.client.
      getText('h1').should.become(heading).and.notify(callback);
  });

  this.Then(/^they see the cover image from "([^"]*)"$/, function (source, callback) {
    this.client.
      getAttribute('img', 'src').should.eventually.contain(source).and.notify(callback);
  });

  this.Then(/^they see the tag-line "([^"]*)"$/, function (tagline, callback) {
    this.client.
      getText('p em').should.become(tagline).and.notify(callback);
  });

  this.Then(/^they can navigate to "([^"]*)" at "([^"]*)"$/, function (location, source, callback) {
    this.client.
      getAttribute('a[title="' + location + '"]', 'href').should.eventually.contain(source).and.notify(callback);
  });

};