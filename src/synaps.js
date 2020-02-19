'use strict';
require('jsdom-global')();
const store = require('./storage.js');

const SynapsClient = require('./synaps/synaps.js').default;

module.exports =  {
    setup: (callback) => {
        const client_id = 'S8185362279011737';
        const client = new SynapsClient(client_id);
        client.init();
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
