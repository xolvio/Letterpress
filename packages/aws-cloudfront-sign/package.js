Package.describe({
  name: 'xolvio:aws-cloudfront-sign',
  version: '0.1.0',
  summary: 'Serve private content from AWS CloudFront and S3'
});

Npm.depends({
  'aws-cloudfront-sign' : '2.0.1'
});

Package.onUse(function(api) {

  api.versionsFrom('1.1.0.2');

  api.addFiles('main.js', 'server');

  api.export('CloudFront', 'server');

});

Package.onTest(function(api) {

  api.use('sanjo:jasmine@0.14.0');

  api.use('velocity:html-reporter@0.7.0');

  api.addFiles([
    'tests/main-spec.js',
    'main.js'
  ], 'server');

});