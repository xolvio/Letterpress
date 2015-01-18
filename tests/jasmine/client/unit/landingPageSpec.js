describe("The global helper", function () {
  it("should return the book title from Meteor settings", function () {

    // SETUP
    var expectedTitle = 'The Joy of Eating Pistachios';
    Meteor.settings.public.book.title = expectedTitle;

    // EXECUTE
    var actualTitle = UI._globalHelpers.bookTitle();

    // VERIFY
    expect(actualTitle).toBe(expectedTitle);

  });
});

