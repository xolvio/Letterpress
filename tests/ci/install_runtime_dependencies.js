var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs');

var DEBUG            = !!process.env.DEBUG,
    INTERVAL_SECONDS = 5,
    TIMEOUT_SECONDS  = 180;

// we want velocity to run but only for cucumber so that all npm modules will be downloaded and
// therefore cached
process.env.JASMINE_SERVER_UNIT = 0;
process.env.JASMINE_SERVER_INTEGRATION = 0;
process.env.JASMINE_CLIENT_UNIT = 0;
process.env.JASMINE_CLIENT_INTEGRATION = 0;
process.env.SELENIUM_BROWSER = 'chrome'; // tell cucumber to use chrome so it will download selenium
process.env.CUCUMBER_TAGS = '@someTagThatDoesNotExists'; // cucumber should not run any scenarios

var velocityMeteorRelease = 'velocity:METEOR@1.1.0.2_3';

var appPath = path.resolve(__dirname, '../..');
var cucumberLogFilePath = path.resolve(appPath, '.meteor', 'local', 'log', 'cucumber.log');
// remove the cucumber log file before starting
fs.existsSync(cucumberLogFilePath) && fs.unlinkSync(cucumberLogFilePath);

var meteorProcess = spawn(
  'meteor',
  [
    '--release',
    velocityMeteorRelease
  ],
  {
    cwd: appPath,
    stdio: 'pipe'
  }
);


console.log('Waiting to for Meteor to download', velocityMeteorRelease);

if (DEBUG) {
  meteorProcess.stdout.pipe(process.stdout);
  meteorProcess.stderr.pipe(process.stderr);
}

meteorProcess.stdout.on('data', function (line) {

  if (line.toString().indexOf('You can see the mirror logs') !== -1) {

    _waitForCucumberDeps(function (err) {

      if (err) {
        console.error(err);
      } else {
        console.log('Success!');
      }

      meteorProcess.kill('SIGINT');
      process.exit();

    });
  }
});

function _waitForCucumberDeps (callback) {

  console.log('Waiting for xolvio:cucumber to download its dependencies');

  var timeoutCounter = TIMEOUT_SECONDS / INTERVAL_SECONDS;
  var interval = setInterval(function waitForMirrorToFinish () {

    if (--timeoutCounter === 0) {
      clearInterval(interval);
      callback('ERROR: Timed out waiting for Meteor and Cucumber to download dependencies');
    }

    fs.existsSync(cucumberLogFilePath) && fs.readFile(cucumberLogFilePath,
      function checkForMirrorStartedMessage (err, data) {

        if (DEBUG) {
          console.log(data.toString());
        }

        if (err) {
          clearInterval(interval);
          callback(err)
        } else if (data.toString().indexOf('0 scenarios\n0 steps') !== -1) {
          clearInterval(interval);
          callback();
        }

      });

  }, INTERVAL_SECONDS * 1000);
}

