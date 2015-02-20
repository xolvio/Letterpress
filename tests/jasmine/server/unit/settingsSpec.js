describe('The settings checker', function () {

  var _check;
  var _processExit;
  var _consoleError;

  var _msgs;

  beforeEach(function () {
    _msgs = [];
    _check = check;

    _processExit = process.exit;
    process.exit = function () {};

    _consoleError = console.error;
    console.error = function (msg) { _msgs.push(msg); }
  });

  afterEach(function () {
    check = _check;
    console.error = _consoleError;
    process.exit = _processExit;
  });


  it('displays an error to the user if the check fails', function () {

    // SETUP
    check = function () {
      throw new Error('* * * An error message * * *');
    };

    // EXCECUTE
    App.checkSettings();

    // VERIFY
    expect(_msgs[0]).toBe('* * * An error message * * *');
    expect(_msgs[1]).toBeDefined();

  });

  it('does not display an error to the user if the check passes', function () {

    // SETUP
    check = function () {};

    // EXCECUTE
    App.checkSettings();

    // VERIFY
    expect(_msgs.length).toBe(0);

  });

});
