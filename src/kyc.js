const rpc = require('./rpc.js');

module.exports =  {
  start: (options, callback) => {
    const params = [options];
    const request = rpc.createRequest(rpc.getEndpoint('/kyc'), "kyc.Start", params);

    rpc.postRequest(request, callback)
  },
}
