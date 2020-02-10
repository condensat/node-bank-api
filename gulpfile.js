const source = require('vinyl-source-stream');
const { series, src, dest, buffer } = require('gulp');

const browserify = require('browserify');
var derequire = require('gulp-derequire');

const babel = require('gulp-babel');
const minify = require('gulp-babel-minify');
const rename = require('gulp-rename');

function bankApiBrowserify() {
  return browserify({
    standalone: 'bank_api',
    entries: ['src/index.js'],
    debug: false
  }).bundle()
  .pipe(source('bank-api.js'))
  .pipe(derequire())
  .pipe(dest('build'));
}

function bankApiBabel() {
  return src('build/bank-api.js')
    .pipe(babel())
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(rename('bank-api.min.js'))
    .pipe(dest('dist/js/'));
}

exports.default = series(bankApiBrowserify, bankApiBabel);