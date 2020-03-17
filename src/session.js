const rpc = require('./rpc.js');

module.exports =  {
  open: (options, callback) => {
    const login = options.login;
    const password = options.password;

    const params = [{login, password}];
    const request = rpc.createRequest(rpc.getEndpoint('/session'), "session.Open", params);

    rpc.postRequest(request, callback);
  },

  renew: (callback) => {
    const params = [];
    const request = rpc.createRequest(rpc.getEndpoint('/session'), "session.Renew", params);

    rpc.postRequest(request, callback);
  },

  close: (callback) => {
    const params = [];
    const request = rpc.createRequest(rpc.getEndpoint('/session'), "session.Close", params);

    rpc.postRequest(request, callback);
  },
};
