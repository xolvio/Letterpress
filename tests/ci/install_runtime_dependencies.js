var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs');

var INTERVAL_SECONDS = 5,
    TIMEOUT_SECONDS  = 60;

// we want velocity to run but only for cucumber so that all npm modules will be downloaded and
// therefore cached
process.env.JASMINE_SERVER_UNIT = 0;
process.env.JASMINE_SERVER_INTEGRATION = 0;
process.env.JASMINE_CLIENT_UNIT = 0;
process.env.JASMINE_CLIENT_INTEGRATION = 0;
process.env.SELENIUM_BROWSER = 'chrome'; // tell cucumber to use chrome so it will download selenium
process.env.CUCUMBER_TAGS = '@someTagThatDoesNotExists'; // cucumber should not run any scenarios

var appPath = path.resolve(__dirname, '../..');
var meteorProcess = spawn(
  'meteor',
  [
    '--release',
    'velocity:METEOR@1.1.0.2_3'
  ],
  {
    cwd: appPath,
    stdio: 'pipe'
  }
);

meteorProcess.stdout.pipe(process.stdout);
meteorProcess.stderr.pipe(process.stderr);

var cucumberLogFilePath = path.resolve(appPath, '.meteor', 'local', 'log', 'cucumber.log');

// remove the cucumber log file before starting
fs.existsSync(cucumberLogFilePath) && fs.unlinkSync(cucumberLogFilePath);

var timeoutCounter = TIMEOUT_SECONDS / INTERVAL_SECONDS;
var interval = setInterval(function waitForMirrorToFinish () {

  if (--timeoutCounter === 0) {
    console.error('ERROR: Timed out waiting for Meteor and Cucumber to download dependencies');
    clearInterval(interval);
    meteorProcess.kill('SIGINT');
    return;
  }

  console.log('Waiting for xolvio:cucumber to download its dependencies');

  fs.existsSync(cucumberLogFilePath) && fs.readFile(cucumberLogFilePath,
    function checkForMirrorStartedMessage (err, data) {
      if (err) {
        console.error(err);
      } else if (data.toString().indexOf('0 scenarios\n0 steps') !== -1) {
        console.log('Success!');
        clearInterval(interval);
        meteorProcess.kill('SIGINT');
        process.exit();
      }

    });

}, INTERVAL_SECONDS * 1000);