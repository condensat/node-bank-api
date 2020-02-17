const session = require('./session.js')
const kyc = require('./kyc.js')
const store = require('./storage.js')
const hash = require('./hash.js')

module.exports =  {

    // Session API

    openSession: (options, onSessionOpen) => {
        options.login = hash.hashEntry(options.login)
        options.password = hash.hashEntry(options.password)
        session.open(options, (err, result) => {
            if (err) {
                return onSessionOpen(err, result);
            }
            store.Storage.setKey("bankApi:session", result.sessionId);
            return onSessionOpen(err, result);
        })
    },

    renewSession: (onSessionRenew) => {
        sessionId = store.Storage.getKey("bankApi:session");
        if (sessionId) {
            return session.renew(sessionId, onSessionRenew);
        }
        return
    },

    closeSession: (onSessionClosed) => { 
        sessionId = store.Storage.remKey("bankApi:session");
        if (sessionId) {
            return session.close(sessionId, onSessionClosed);
        }
        return
     },


    // Kyc API

    startKyc: (email, onKycStarted) => { 
        sessionId = store.Storage.getKey("bankApi:session");
        if (sessionId) {
            kyc.start({sessionId, email}, (err, result) => {
                if (err) {
                    console.log(err)
                    return onKycStarted(err, result);
                }
                store.Storage.setKey("bankApi:kyc", result.kycId);
                return onKycStarted(err, result);
            })
            return
        }
        return
    },
}
