'use strict';
const rpc = require('./rpc.js');

module.exports =  {
  list: (options, callback) => {
    const params = [options];
    const request = rpc.createRequest(rpc.getEndpoint('/accounting'), "accounting.List", params);

    rpc.postRequest(request, callback);
  },

  history: (options, callback) => {
    const params = [options];
    const request = rpc.createRequest(rpc.getEndpoint('/accounting'), "accounting.History", params);

    rpc.postRequest(request, callback);
  },
};
