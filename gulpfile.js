const source = require('vinyl-source-stream');
const { series, src, dest, buffer } = require('gulp');

const browserify = require('browserify');
const bundleCollapser = require('bundle-collapser/plugin');
var derequire = require('gulp-derequire');

const babel = require('gulp-babel');
const strip = require('gulp-strip-comments');
const minify = require('gulp-babel-minify');

const javascriptObfuscator = require('gulp-javascript-obfuscator');
const rename = require('gulp-rename');

function bankApiBrowserify() {
  return browserify({
    standalone: 'bank_api',
    entries: ['src/index.js'],
    debug: false
  })
  .ignore('./src/dom.js')
  .plugin(bundleCollapser)
  .bundle()
  .pipe(source('bank-api.js'))
  .pipe(derequire())
  .pipe(dest('build'));
}

function bankApiBabel() {
  return src('build/bank-api.js')
    .pipe(babel())
    .pipe(strip())
    .pipe(minify({
      mangle: {
        deadcode: true,
        comments: true,
        simplify: true,
        removeConsole: true,
        removeDebugger: true,
        removeUndefined: true,
        undefinedToVoid: true,
        keepFnName: false,
        keepClassName: false
      }
    }))
     .pipe(javascriptObfuscator({
      compact: true,
      disableConsoleOutput: true,
      identifierNamesGenerator: 'hexadecimal',
      log: false,
      renameGlobals: true,
      rotateStringArray: true,
      shuffleStringArray: true,
      splitStrings: true,
      splitStringsChunkLength: 3,
      stringArray: true,
      stringArrayEncoding: 'rc4',
      stringArrayThreshold: 0.75,
      transformObjectKeys: true,
      unicodeEscapeSequence: false
    }))
    .pipe(rename('bank-api.min.js'))
    .pipe(dest('dist/js/'));
}

function bankApiHtml() {
  return src('exemples/html/index.html')
    .pipe(rename('index.html'))
    .pipe(dest('dist/'));
}

var buildJS = series(bankApiBrowserify, bankApiBabel);
var buildHTML = series(bankApiHtml);

exports.js = buildJS;
exports.html = buildHTML;

exports.default = series(buildJS, buildHTML);
