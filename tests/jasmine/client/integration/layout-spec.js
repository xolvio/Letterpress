describe('The layout', function () {

  beforeEach(function (done) {

    spyOn(UI._globalHelpers, 'classes').and.callThrough();

    Meteor.call('fixtures/seedData', function () {
      Router.go('/chapter-1');
      Tracker.afterFlush(done);
    });
  });

  fit('should set the classes of the template and path', function () {

    // SETUP
    // spyOn in the before section is the setup

    // EXECUTE
    // Router.go in the before section is the execution

    // VERIFY
    expect(UI._globalHelpers.classes).toHaveBeenCalled();
    expect(UI._globalHelpers.classes.calls.count()).toEqual(1);

    var templateAndPageClasses = '.chapter.chapter-1'; // set in in the seedData
    expect($(templateAndPageClasses).length).toBe(1);
  });

});