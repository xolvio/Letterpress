  describe("The global helper", function () {
    it("should return the book title from Meteor settings", function () {

      // SETUP
      var expectedValue = Meteor.settings.public.book.title;

      // EXECUTE
      var actualValue = $('h1').text();

      // VERIFY
      expect(actualValue).toBe(expectedValue);

    });
  });
