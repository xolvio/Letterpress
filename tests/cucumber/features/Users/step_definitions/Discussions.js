module.exports = function () {

  this.Then(/^I can join the discussion about the private content$/, function (callback) {
    this.client.
      waitForExist('#disqus_thread').then(callback);
  });

  this.Then(/^I cannot join the discussion about the private content$/, function (callback) {
    this.client.
      waitForExist('.sign-in-link'). // so we know the page has loaded in non-logged in mode
      isVisible('#disqus_thread').should.become(false).
      and.notify(callback);
  });

};
