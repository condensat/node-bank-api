const nacl = require("tweetnacl")


module.exports =  {
    hashEntry: (message) => {
        data = Buffer.from(message, 'utf-8');
        hash = nacl.hash(data)
        return Buffer.from(hash).toString("hex");
    },
}