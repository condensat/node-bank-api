'use strict';
const rpc = require('./rpc.js');

module.exports =  {
  propose: (options, callback) => {
    const params = [options];
    const request = rpc.createRequest(rpc.getEndpoint('/swap'), "swap.Propose", params);

    rpc.postRequest(request, callback);
  },

  info: (options, callback) => {
    const params = [options];
    const request = rpc.createRequest(rpc.getEndpoint('/swap'), "swap.Info", params);

    rpc.postRequest(request, callback);
  },

  finalize: (options, callback) => {
    const params = [options];
    const request = rpc.createRequest(rpc.getEndpoint('/swap'), "swap.Finalize", params);

    rpc.postRequest(request, callback);
  },

  accept: (options, callback) => {
    const params = [options];
    const request = rpc.createRequest(rpc.getEndpoint('/swap'), "swap.Accept", params);

    rpc.postRequest(request, callback);
  }
};
