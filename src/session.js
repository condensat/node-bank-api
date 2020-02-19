const rpc = require('./rpc.js');

module.exports =  {
  open: (options, callback) => {
    const login = options.login;
    const password = options.password;

    const params = [{login, password}];
    const request = rpc.createRequest(rpc.getEndpoint('/session'), "session.Open", params);

    rpc.postRequest(request, callback);
  },

  renew: (sessionId, callback) => {
    const params = [{sessionId}];
    const request = rpc.createRequest(rpc.getEndpoint('/session'), "session.Renew", params);

    rpc.postRequest(request, callback);
  },

  close: (sessionId, callback) => {
    const params = [{sessionId}];
    const request = rpc.createRequest(rpc.getEndpoint('/session'), "session.Close", params);

    rpc.postRequest(request, callback);
  },
};
