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