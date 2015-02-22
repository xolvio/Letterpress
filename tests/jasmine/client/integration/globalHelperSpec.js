describe("The global helper", function () {

  beforeEach(function (done) {
    Meteor.call('clearState', done)
  });

  it("Should provide a value to the template", function () {

    // SETUP
    var expectedValue = Meteor.settings.public.book.title;

    // EXECUTE
    var actualValue = $('h1').text();

    // VERIFY
    expect(actualValue).toBe(expectedValue);

  });

  it("Should return the book title from Meteor settings object", function () {

    // SETUP
    var expectedValue = Meteor.settings.public.book.title;

    // EXECUTE
    var actualValue = UI._globalHelpers.bookTitle();

    // VERIFY
    expect(actualValue).toBe(expectedValue);

  });

  it("Should put the book title from Meteor settings object in the template", function () {

    // SETUP
    var expectedValue = Meteor.settings.public.book.title;

    // EXECUTE
    var actualValue = $('h1').text();

    // VERIFY
    expect(actualValue).toBe(expectedValue);

  });
});
