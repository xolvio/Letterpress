describe("The header", function () {

  it("Should render the image set a caption from the Meteor settings object", function (done) {

    // SETUP
    var imageLocator = 'header figure img',
        imageCaptionLocator = 'header figure figcaption';

    // EXECUTE
    var imageUrl = $(imageLocator).attr("src");
    $("<img/>")
      .load(function () {
        doVerification('loaded');
      })
      .error(function () {
        doVerification('image');
      })
      .attr("src", imageUrl);

    // VERIFY
    expect(imageUrl).toBe(Meteor.settings.public.book.header.imageSrc);
    var doVerification = function (imageState) {
      expect(imageState).toBe('loaded');
      done();
    };
    expect($(imageCaptionLocator).text()).toBe(Meteor.settings.public.book.header.imageCaption);

  });

});

describe("Header helpers", function () {
  it("Should set the image source from Meteor settings", function () {

    // SETUP
    var expectedValue = Template.header.__helpers.get('imageSrc');

    // EXECUTE
    var actualValue = $('header figure img').attr("src");

    // VERIFY
    expect(actualValue).toBe(expectedValue);

  });
  it("should return the image source from Meteor settings object", function () {

    // SETUP
    var expectedValue = Meteor.settings.public.book.header.imageSrc;

    // EXECUTE
    var actualValue = Template.header.__helpers.get('imageSrc');

    // VERIFY
    expect(actualValue).toBe(expectedValue);

  });

  it("Should put the image source from Meteor settings object in the template", function () {

    // SETUP
    var expectedValue = Meteor.settings.public.book.header.imageSrc;

    // EXECUTE
    var actualValue = $('header figure img').attr("src");

    // VERIFY
    expect(actualValue).toBe(expectedValue);

  });
});