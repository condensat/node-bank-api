'use strict';
const rpc = require('./rpc.js');

module.exports =  {
  info: (sessionId, callback) => {
    const params = [{sessionId}];
    const request = rpc.createRequest(rpc.getEndpoint('/user'), "user.Info", params);

    rpc.postRequest(request, callback);
  },
};
