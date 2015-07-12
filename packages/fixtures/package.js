Package.describe({
  name: 'letterpress:fixtures',
  version: '0.0.1',
  summary: '',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('seed-data.js', 'server');
  api.addFiles('fixtures.js', 'server');
});