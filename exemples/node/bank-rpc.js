const Promise = require('bluebird');
const moment = require('moment');

const client = Promise.promisifyAll(require('../../src/client.js'), {suffix: "Call"});

const login = "demo";
const password = "d3m0";

var handleError = function (err) {
  console.error("Error: ", JSON.stringify(err, null, 0))
};

function onSessionOpen(result) {
  validUntil = moment(result.valid_until)
  console.log("Session opened", validUntil.diff(moment(), 'seconds'))

  client.userInfoCall()
    .then((userInfo) => {
      console.log("User info:", JSON.stringify(userInfo, null, 0))

      client.renewSessionCall()
        .then(onSessionRenew)
        .catch(handleError)        
    })
    .catch(handleError)
}

function onSessionRenew(result) {
  validUntil = moment(result.valid_until)
  console.log("Session renewed", validUntil.diff(moment(), 'seconds'));

  client.closeSessionCall()
    .then(onSessionClosed)
    .catch(handleError)        
}

function onSessionClosed(result) {
  validUntil = moment(result.valid_until)
  console.log("Session closed", validUntil.diff(moment(), 'seconds'))
}

client.openSessionCall({login, password})
  .then(onSessionOpen)
  .catch(handleError)
