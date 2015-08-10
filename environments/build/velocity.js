console.log('velocity.js is running');

var spawn = require('child_process').spawn;
var path = require('path');

var velocityMeteorRelease = 'velocity:METEOR@1.1.0.3_2';

var args = [];
args.push('--raw-logs');
args.push('--release');
args.push(velocityMeteorRelease);
args.push('--settings');
args.push(path.resolve(process.cwd(), process.env.SETTINGS_FILE));



// Setting INSTALL_DEPENDENCIES downloads dependencies and exists. Used for build caching
if (!!process.env.INSTALL_DEPENDENCIES) {
  process.env.VELOCITY = 0;
}
// otherwise test the app
else {
  process.env.CUCUMBER_TAIL = 1;
  args.push('--test');
}

console.log('Starting Meteor');
var meteorProcess = spawn(
  'meteor', args, {
    cwd: process.cwd(),
    stdio: 'pipe',
    env: process.env
  }
);

meteorProcess.stderr.pipe(process.stderr);
meteorProcess.stdout.on('data', function (data) {

  var line = data.toString();

  // ignore this line
  if (line.indexOf('stream error Network error: ws://') !== -1 &&
    line.indexOf('/websocket: connect ECONNREFUSED') !== -1) {
    return;
  }

  process.stdout.write(data);

  // watch for Meteor startup message
  if (line.indexOf('App running at') !== -1) {
    if (!!process.env.INSTALL_DEPENDENCIES) {
      meteorProcess.kill('SIGINT');
    }
  }

  // watch for Meteor error messages
  if (line.indexOf('Your application is crashing') !== -1) {
    meteorProcess.kill('SIGINT');
    process.exit(1);
  }

});

meteorProcess.on('exit', function(code) {
  process.exit(code);
});
