const rpc = require('./rpc.js');

module.exports =  {
  withdraw: (options, callback) => {
    const params = [options];
    const request = rpc.createRequest(rpc.getEndpoint('/fiat'), "fiat.Withdraw", params);

    rpc.postRequest(request, callback);
  },
};
