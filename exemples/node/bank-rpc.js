const Promise = require('bluebird');
const client = Promise.promisifyAll(require('../../src/client.js'), {suffix: "Call"});

const login = "demo";
const password = "d3m0";

var handleError = function (err) {
  console.error(JSON.stringify(err, null, 0))
};

function onSessionOpen(result) {
  client.startKycCall("kyc@condensat.tech")
    .then(onKycStarted)
    .catch(handleError)

  sessionId = result.sessionId

  console.log("Session opened", sessionId)
  client.renewSessionCall()
    .then(onSessionRenew)
    .catch(handleError)        
}

function onSessionRenew(result) {
  sessionId = result.sessionId
  console.log("Session renewed", sessionId);
}

function onSessionClosed(result) {
  sessionId = result.sessionId
  console.log("Session closed", sessionId)
}

function onKycStarted(result) {
  kycId = result.kycId
  console.log("Kyc started", kycId)

    client.closeSessionCall()
    .then(onSessionClosed)
    .catch(handleError)        
}

client.openSessionCall({login, password})
  .then(onSessionOpen)
  .catch(handleError)
