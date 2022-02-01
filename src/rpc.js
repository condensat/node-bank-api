'use strict';
const $ = global.$ ? global.$ : require('./dom.js');
const uuidv4 = require('uuid/v4');

const port = '4242'

const endpoint = document.location.hostname.endsWith('.onion')
  ? 'http://'+document.location.hostname+'/api/v1'
  : 'http://bank.condensat.space:' + port + '/api/v1';

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
        contentType: "application/json",
        dataType: "json",
        data: rpcBody(id, method, params),

        crossDomain: true,
        withCredentials: true,
        xhrFields: {
          withCredentials: true
        },
        beforeSend: function (xhr) {
          xhr.withCredentials = true;
        }
      };
    },

    postRequest: (requestData, callback) => {
      requestData.success = (body, status, xhr) => {
        handleRequest(null, { status, statusCode: xhr.status }, body, callback);
      }
      requestData.error = (xhr, status, error) => {
        handleRequest(error, { status, statusCode: xhr.status }, xhr.responseJSON, callback);
      }
      
      $.ajax(requestData);
    },
};

