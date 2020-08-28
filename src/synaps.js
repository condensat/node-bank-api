'use strict';
require('jsdom-global')();
const store = require('./storage.js');

const SynapsClient = require('./synaps/synaps.js').default;

module.exports =  {
    setup: (callback) => {
        const email = store.Storage.getKey("bankApi:email");
        const client_id = 'S4334979392476738';
        const client = new SynapsClient(client_id);
        client.init({email});
        store.Storage.setKey("synaps:client", client);

        client.on('userOnboardSuccess', (code) => {
            callback('userOnboardSuccess', code);
        });
        client.on('userOnboardDeclined', () => {
            callback('userOnboardDeclined');
        });
        client.on('userExited', () => {
            callback('userExited');
        });
    },
  };
