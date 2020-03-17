require('jsdom-global')();


// for jsdom + ajax, fix CORS issue
window._origin = "https://bank.condensat.space";

module.exports = require('jquery');
