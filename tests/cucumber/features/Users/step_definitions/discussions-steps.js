module.exports = function () {

  this.Then(/^I can join the discussion about the private content$/, function (callback) {
    return this.client.isExisting('#disqus_thread').should.become(true);
  });

  this.Then(/^I cannot join the discussion about the private content$/, function (callback) {
    return this.client.
      waitForExist('.sign-in-link'). // so we know the page has loaded in non-logged in mode
      isVisible('#disqus_thread').should.become(false);
  });

};
