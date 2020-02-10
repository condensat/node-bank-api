const Promise = require('bluebird');
const client = Promise.promisifyAll(require('./dist/js/bank-api-min.js'), {suffix: "Call"});

const login = "demo";
const password = "d3m0";

var handleError = function (err) {
  console.error(JSON.stringify(err, null, 0))
};

function onSessionOpen(result) {
  sessionId = result.sessionId

  console.log("Session opened", sessionId)
  client.renewSessionCall()
    .then((sessionId) => onSessionRenew(sessionId))
    .catch(handleError)        
}

function onSessionRenew(result) {
  sessionId = result.sessionId
  console.log("Session renewed", sessionId);

  client.closeSessionCall()
    .then((sessionId) => onSessionClosed(sessionId))
    .catch(handleError)        
}

function onSessionClosed(result) {
  sessionId = result.sessionId
  console.log("Session closed", sessionId)
}

client.openSessionCall({login, password})
  .then((sessionId) => onSessionOpen(sessionId))
  .catch(handleError)

