Jasmine.onTest(function () {

  describe('The settings checker', function () {

    var _actualCode;
    var _processExit;

    beforeEach(function () {
      _actualCode = null;
      _processExit = process.exit;
      process.exit = function (code) {
        _actualCode = code;
      };
    });

    afterEach(function () {
      process.exit = _processExit;
    });

    it('exists the system if the book title is not set', function () {

      // SETUP
      Meteor.settings = {};

      // EXCECUTE
      App.checkSettings();

      // VERIFY
      expect(_actualCode).toBe(1);

    });

    it('does not exist the system if the book title is set', function () {

      // SETUP
      Meteor.settings = {public: {book: {title: 'Is Set'}}};

      // EXCECUTE
      App.checkSettings();

      // VERIFY
      expect(_actualCode).toBe(null);

    });

  });

});