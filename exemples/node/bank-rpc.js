const Promise = require('bluebird');
const client = Promise.promisifyAll(require('../../src/client.js'), {suffix: "Call"});

const login = "demo";
const password = "d3m0";

var handleError = function (err) {
  console.error("Error: ", JSON.stringify(err, null, 0))
};

function onSessionOpen(result) {
  sessionId = result.sessionId
  console.log("Session opened", sessionId)

  client.userInfoCall()
    .then((userInfo) => {
      console.log("User info:", JSON.stringify(userInfo, null, 0))

      // start kyc
      client.startKycCall(userInfo.email, "42")
        .then(onKycStarted)
        .catch(handleError)

      client.renewSessionCall()
        .then(onSessionRenew)
        .catch(handleError)        
    })
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
