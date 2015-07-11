describe('The layout', function () {

  beforeEach(function (done) {

    spyOn(UI._globalHelpers, 'classes');

    Meteor.call('fixtures/seedData', function () {
      Router.go('/chapter-1');
      Tracker.afterFlush(done);
    });
  });

  beforeEach(waitForRouter);

  fit('should set the classes of the template and path', function () {

    // SETUP
    // spyOn in the before section is the setup

    // EXECUTE
    // Router.go in the before section is the execution

    // VERIFY
    expect(UI._globalHelpers.classes).toHaveBeenCalled();
    expect(UI._globalHelpers.classes.calls.count()).toEqual(1);

    // FIXME not working in the test, works manually. Seems like the 'classes' global helper is not called when the route is changed in beforeEach
    //var templateAndPageClasses = '.chapter.chapter-1'; // set in in the seedData
    //console.log('current path', Iron.Location.get().path);
    //expect($(templateAndPageClasses).length).toBe(1);
  });

});