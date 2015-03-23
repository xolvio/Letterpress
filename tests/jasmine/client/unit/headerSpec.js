describe("Header helpers", function () {

  it("Should return a value from the settings to the template", function () {

    // SETUP
    var expectedValue = Meteor.settings.public.book.header.imageSrc;

    // EXECUTE
    var actualValue = Template.header.__helpers.get('imageSrc');

    // VERIFY
    expect(actualValue).toBe(expectedValue);

  });
});
