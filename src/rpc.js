'use strict';
const $ = global.$ ? global.$ : require('./dom.js');
const uuidv4 = require('uuid/v4');

const endpoint = 'https://bank.condensat.space/api/v1';

function handleRequest(error, result, response, callback) {
  if (!response) response = {};
  if (response.error) error = response.error;

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

module.exports = {
    getEndpoint: (suffix) => { return endpoint+suffix; },

    createRequest: (endpoint, method, params, id) => {
      return {
        type: "POST",
        url: endpoint,
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        data: rpcBody(id, method, params),
      };
    },

    postRequest: (requestData, callback) => {
      const request = $.ajax(requestData);
      request
        .then((body, textStatus, response) => {
          handleRequest(null, { status: textStatus, statusCode: response.status }, body, callback);
        })
        .catch((response, textStatus, err) => {
          handleRequest(err, { status: textStatus, statusCode: response.status }, response.responseJSON, callback);
        });
    },
};

