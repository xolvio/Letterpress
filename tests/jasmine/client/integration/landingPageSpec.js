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

describe("The chapter previews", function() {

  it("should return all the chapters", function () {

    // SETUP
    // relying on fixtures

    // EXECUTE
    actualValue = Template.chapters.__helpers.get('chapters')().fetch();

    // VERIFY
    expect(actualValue).toEqual(Chapters.find({}, {sort: {chapterNumber: 1}}).fetch());
  });

});
