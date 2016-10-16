const gulp = require('gulp-help')(require('gulp'));
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const jsdoc = require('gulp-jsdoc3');
const sequence = require('run-sequence');
const babel = require('gulp-babel');
const isparta = require('isparta');
const babelRegister = require('babel/register');

const GULP_FILE = ['gulpfile.js'];
const SRC_FILES = ['server/**/*.js'];
const TEST_FILES = ['test/controllers/*.test.js','test/routes/*.test.js','test/service/*.test.js'];//public is handled with jasmin by karma
const TEST_CASE_FILES = ['test/controllers/*.test.js','test/routes/*.test.js','test/service/*.test.js'];
const COVERAGE_REPORT_DIR = 'build/coverage';
const COMPILED_SRC_DIR = 'build/source';
const JSDOC_DIR = 'build/jsdoc';
const spawn = require('child_process').spawn;
const Server = require('karma').Server;


/**
 * Run test once and exit
 */
gulp.task('test-client', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});

gulp.task('lint', 'Validates code with "eslint"', function (done) {
  gulp.src(GULP_FILE.concat(SRC_FILES, TEST_FILES))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('finish', done);
});

gulp.task('test', 'Runs tests and generates code coverage report', function (done) {
  gulp.src(SRC_FILES)
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: false
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(TEST_CASE_FILES)
        .pipe(mocha({compilers: {js: babelRegister}}))
        .pipe(istanbul.writeReports({
          dir: COVERAGE_REPORT_DIR
        }))
        .pipe(istanbul.enforceThresholds({
          thresholds: {
            global: 100
          }
        }))
        .on('finish', done);
    });
});

gulp.task('compile', 'Compiles source code from es6 to es5', function (done) {
  gulp.src(SRC_FILES)
    .pipe(babel())
    .pipe(gulp.dest(COMPILED_SRC_DIR))
    .on('finish', done);
});

gulp.task('jsdoc', 'Generates jsdoc', ['compile'], function (done) {
  gulp.src(SRC_FILES, {read: false})
    .pipe(jsdoc({
      opts: {destination: JSDOC_DIR},
      templates: {
        theme: 'cerulean'
      }
    }, done));
});




gulp.task('start', function() {
  spawn('node', ['app.js'], { stdio: 'inherit' });
});




gulp.task('build', 'Builds source code: validates it and provides artifacts', function (done) {
  sequence('lint', 'test', 'compile', 'jsdoc', 'start', done);
});

gulp.task('pre-commit', 'Being run automatically on a git pre-commit hook', ['build']);

gulp.task('ci', 'Being run on a CI', ['build']);

gulp.task('default', ['build']);
