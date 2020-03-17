'use strict';
const nacl = require("tweetnacl");

module.exports =  {
    hashEntry: (message) => {
        var data = Buffer.from(message, 'utf-8');
        var hash = nacl.hash(data);
        return Buffer.from(hash).toString("hex");
    }
};
