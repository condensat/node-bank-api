'use strict';
const rpc = require('./rpc.js');

module.exports =  {
  list: (callback) => {
    const params = [];
    const request = rpc.createRequest(rpc.getEndpoint('/accounting'), "accounting.List", params);

    rpc.postRequest(request, callback);
  },

  history: (options, callback) => {
    const params = [options];
    const request = rpc.createRequest(rpc.getEndpoint('/accounting'), "accounting.History", params);

    rpc.postRequest(request, callback);
  },
};
