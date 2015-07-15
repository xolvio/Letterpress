module.exports = function () {

  this.Then(/^I can join the discussion about the private content$/, function () {
    return this.client.waitForExist('#disqus_thread');
  });

  this.Then(/^I cannot join the discussion about the private content$/, function () {
    return this.client.
      waitForExist('.sign-in-link'). // so we know the page has loaded in non-logged in mode
      isVisible('#disqus_thread').should.become(false);
  });

};