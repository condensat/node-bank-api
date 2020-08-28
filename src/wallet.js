'use strict';
const rpc = require('./rpc.js');

module.exports =  {
  nextDeposit: (options, callback) => {
    const params = [options];
    const request = rpc.createRequest(rpc.getEndpoint('/wallet'), "wallet.NextDeposit", params);

    rpc.postRequest(request, callback);
  },
  sendFunds: (options, callback) => {
    const params = [options];
    const request = rpc.createRequest(rpc.getEndpoint('/wallet'), "wallet.SendFunds", params);

    rpc.postRequest(request, callback);
  },
  cancelWithdraw: (options, callback) => {
    const params = [options];
    const request = rpc.createRequest(rpc.getEndpoint('/wallet'), "wallet.CancelWithdraw", params);

    rpc.postRequest(request, callback);
  },
  sendHistory: (callback) => {
    const params = [];
    const request = rpc.createRequest(rpc.getEndpoint('/wallet'), "wallet.SendHistory", params);

    rpc.postRequest(request, callback);
  },
};
