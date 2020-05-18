'use strict';
const rpc = require('./rpc.js');

module.exports =  {
  nextDeposit: (options, callback) => {
    const params = [options];
    const request = rpc.createRequest(rpc.getEndpoint('/wallet'), "wallet.NextDeposit", params);

    rpc.postRequest(request, callback);
  },
};
