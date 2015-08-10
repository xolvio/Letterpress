module.exports = function () {

  this.Then(/^I can join the discussion about the private content$/, function () {
    client.waitForExist('#disqus_thread');
    client.isVisible('#disqus_thread');
    expect(client.waitForVisible('#disqus_thread')).toBe(true);
  });

  this.Then(/^I cannot join the discussion about the private content$/, function () {
    client.waitForExist('.sign-in'); // so we know the page has loaded in non-logged in mode
    expect(client.isVisible('#disqus_thread')).toBe(false);
  });

};
