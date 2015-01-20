describe("Chapters publication", function () {

  it("should return premium content to logged in users", function () {

    // SETUP
    var thisContext = {
      userId : true
    };

    var expectedCursor = 'chapter_cursor1';
    var _query = true, _modifiers = true;
    Chapters.find = function(query, modifiers) {
      _query = query;
      _modifiers = modifiers;
      return expectedCursor;
    };

    // execute
    var actualCursor = Meteor.publishFunctions['chapters'].apply(thisContext);

    // verify
    expect(actualCursor).toBe(expectedCursor);
    expect(_query).toBe(undefined);
    expect(_modifiers).toBe(undefined);

  });

  it("should not return premium content to non-logged in users", function () {

    // SETUP
    var thisContext = {
      userId : false
    };

    var expectedCursor = 'chapter_cursor2';
    var _query = true, _modifiers = true;
    Chapters.find = function(query, modifiers) {
      _query = query;
      _modifiers = modifiers;
      return expectedCursor;
    };

    // execute
    var actualCursor = Meteor.publishFunctions['chapters'].apply(thisContext);

    // verify
    expect(actualCursor).toBe(expectedCursor);
    expect(JSON.stringify(_query)).toBe(JSON.stringify({}));
    expect(JSON.stringify(_modifiers)).toBe(JSON.stringify({fields: {premium: 0}}));

  });

});


