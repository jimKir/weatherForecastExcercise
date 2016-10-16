// karma config file - project - test AngularJs
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],
    // start these browsers
    browsers: ['PhantomJS'],
    files: [
      'node_modules/angular/angular.js',
      'test/response.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/public/**/*.js',
      'node_modules/sinon/lib/*.js',
      'node_modules/sinon/pkg/*.js',
      'node_modules/sinon/lib/sinon/util/*.js',
      'node_modules/sinon/lib/sinon/*.js',
      'node_modules/whatwg-fetch/fetch.js',
      'node_modules/jasmine-sinon/lib/jasmine-sinon.js',
      'node_modules/babel-polyfill/dist/polyfill.js',
      'public/controllers/forecast.controller.js'
    ],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'public/controllers/*.js': ['coverage']
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage'
    },
    logLevel: config.LOG_INFO,
    singleRun: false
  });
};
