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
