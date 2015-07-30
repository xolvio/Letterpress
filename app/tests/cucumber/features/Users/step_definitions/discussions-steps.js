module.exports = function () {

  this.Then(/^I can join the discussion about the private content$/, function () {
    return this.client.
      waitForExist('#disqus_thread').
      isVisible('#disqus_thread').
      waitForVisible('#disqus_thread').should.become(true);
  });

  this.Then(/^I cannot join the discussion about the private content$/, function () {
    return this.client.
      waitForExist('.sign-in'). // so we know the page has loaded in non-logged in mode
      isVisible('#disqus_thread').should.become(false);
  });

};