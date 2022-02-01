const Promise = require('bluebird');
const moment = require('moment');
// const session = Promise.promisifyAll(require('../../src/session.js'));
// const prompt = require('prompt');

const client = Promise.promisifyAll(require('../../src/client.js'), {suffix: "Call"});

const login = "1909006945";
const password = "";
const totp = '';

var handleError = function (err) {
  console.error("Error: ", JSON.stringify(err, null, 0))
};

// const totp = function () {
//   prompt.start()

//   prompt.get(['totp'], function (err, totp) {
//     if (err) { return ''; }
//     return totp
//   });
// }

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

  client.accountListCall({rateBase: "CHF"})
    .then(onAccountList)
    .catch(handleError)     
}

function onAccountList(result) {
  console.log("Account list:", JSON.stringify(result, "\n", 2))

  Promise.each(result.accounts, function (account) {

    accountId = account.accountId;

    if (account.curency.isCrypto) {
      client.walletNextDepositCall({ accountId })
        .then(function (result) {
          console.log("Next Deposit:", result);
        })
        .catch(handleError);
    } 

    last = moment(account.timestamp);
    to = last.valueOf();
    from = last.subtract(1, 'day').valueOf();

    return client.accountHistoryCall({accountId, from, to})
      .then(onAccountHistory)
      .catch(handleError)

  }).then(function () {
    client.closeSessionCall()
      .then(onSessionClosed)
      .catch(handleError)        
  });
}

function onAccountHistory(result) {
  console.log("Account History:", JSON.stringify(result, "\n", 2))
}


function onSessionClosed(result) {
  validUntil = moment(result.valid_until)
  console.log("Session closed", validUntil.diff(moment(), 'seconds'))
}

client.openSessionCall({login, password, totp})
  .then(onSessionOpen)
  .catch(handleError)
