describe("The global helper", function () {

  it("Should provide a value to the template", function () {

    // SETUP
    var expectedValue = Meteor.settings.public.book.title;

    // EXECUTE
    var actualValue = $('h1').text();

    // VERIFY
    expect(actualValue).toBe(expectedValue);

  });
});