// TODO Talk to Sanjo
// FLAKY - Fails the first time, passes after the test is saved.

//describe('The layout', function () {
//
//  beforeEach(function (done) {
//
//    spyOn(UI._globalHelpers, 'classes');
//
//    Meteor.call('reset', function () {
//      Meteor.call(
//        'page/create', {
//          path: 'somePath',
//          template: 'chapter'
//        }, function () {
//          Router.go('/somePath');
//          Tracker.afterFlush(done);
//        });
//    });
//  });
//
//  beforeEach(waitForRouter);
//
//  it('should call the classes helper', function () {
//
//    // use the locator to ensure we only have one item that matches all the classes
//    expect(UI._globalHelpers.classes).toHaveBeenCalled();
//    expect(UI._globalHelpers.classes.calls.count()).toEqual(1);
//
//  });
//
//});