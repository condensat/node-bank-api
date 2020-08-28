'use strict';
const rpc = require('./rpc.js');

module.exports =  {
  info: (callback) => {
    const params = [];
    const request = rpc.createRequest(rpc.getEndpoint('/user'), "user.Info", params);

    rpc.postRequest(request, callback);
  },
};
