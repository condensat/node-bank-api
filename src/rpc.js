'use strict';
const unirest = require('unirest');
const uuidv4 = require('uuid/v4');

const endpoint = 'https://bank.condensat.space/api/v1' ;

function handleRequest(error, result, response, callback) {
  if (error) {
    var statusCode = result ? result.statusCode : "N/A";
    callback({error, statusCode}, null);
    return;
  }
  if (result.statusCode != 200) {
    callback({error: response.error, statusCode: result.statusCode}, null);
    return;
  }
  callback(null, response ? response.result : null);
}

function rpcBody(id, method, params) {
  return JSON.stringify({
    jsonrpc: "2.0",
    id: id ? id : uuidv4(),
    method: method,
    params: params,
  }, null, 0);
}

module.exports =  {
    getEndpoint: (suffix) => { return endpoint+suffix; },

    createRequest: (endpoint, method, params, id) => {
      return unirest
        .post(endpoint)
        .headers({"content-type": "application/json"})
        .send(rpcBody(id, method, params));
    },

    postRequest:(request, callback) => {
      request
        .then((response) => {
          handleRequest(null, response, response.body, callback);
        })
        .catch((err) => {
          handleRequest(err, null, null, callback);
        });
    },
};
