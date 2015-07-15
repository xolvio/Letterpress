module.exports = function () {

  this.Then(/^I can join the discussion about the private content$/, function (callback) {
    this.client.
      isExisting('#disqus_thread').should.become(true).
      and.notify(callback);
  });

  this.Then(/^I cannot join the discussion about the private content$/, function (callback) {
    this.client.
      isVisible('#disqus_thread').should.become(false).
      and.notify(callback);
  });

};
