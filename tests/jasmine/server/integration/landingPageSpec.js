Jasmine.onTest(function () {
  describe("Landing page", function () {

    beforeEach(function (done) {
      Meteor.call('clearState', done)
    });

    it("should only store an email once", function () {
      Meteor.call('newsletterSignup', 'yo@dude.com');
      Meteor.call('newsletterSignup', 'yo@dude.com');
      expect(NewsletterSignups.find().count()).toBe(1);
    });

  });
});
