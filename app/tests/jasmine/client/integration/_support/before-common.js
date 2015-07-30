beforeAll(function () {

  VelocityHelpers.exportGlobals();

  var self = this;

  self.deferAfterFlush = function (callback) {
    Tracker.afterFlush(function () {
      Meteor.defer(callback);
    });
  };

  // Go into our blank testing sandbox
  self.initTestingSandbox = function (done) {
    Router.go('testingSandbox', {}, {query: {jasmine: 'true'}});
    waitForRouter(function () {
      // Don't change routes while testing in the sandbox
      self.routerGoSpy = spyOn(Router, 'go');
      self.deferAfterFlush(done);
    });
  };

  self.waitForElement = function (selector, successCallback) {
    var checkInterval = 50;
    var timeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    var startTime = Date.now();
    var intervalId = Meteor.setInterval(function () {
      if (Date.now() > startTime + timeoutInterval) {
        Meteor.clearInterval(intervalId);
        // Jasmine will handle the test timeout error
      } else if ($(selector).length > 0) {
        Meteor.clearInterval(intervalId);
        successCallback();
      }
    }, checkInterval);
  }

});

// Wait until iron:router has done its initial work
beforeEach(waitForRouter);

// Guarantee that tests don't run in a ongoing flush cycle.
beforeEach(function (done) {
  this.deferAfterFlush(done);
});