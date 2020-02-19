'use strict';
const session = require('./session.js');
const kyc = require('./kyc.js');
const user = require('./user.js');
const synaps = require('./synaps.js');
const store = require('./storage.js');
const hash = require('./hash.js');

module.exports =  {

    // Session API

    openSession: (options, onSessionOpen) => {
        options.login = hash.hashEntry(options.login);
        options.password = hash.hashEntry(options.password);
        session.open(options, (err, result) => {
            if (err) {
                return onSessionOpen(err, result);
            }

            // store sessionId
            store.Storage.setKey("bankApi:session", result.sessionId);
            // fetch user info before calling onSessionOpen
            module.exports.userInfo((err, userInfo) => {
                if (err) {
                    console.log(err);
                    return onSessionOpen(err, result);
                }
                if (userInfo.email) {
                    result["email"] = userInfo.email;
                }
                return onSessionOpen(err, result);
            });
        });
    },

    renewSession: (onSessionRenew) => {
        const sessionId = store.Storage.getKey("bankApi:session");
        if (sessionId) {
            return session.renew(sessionId, onSessionRenew);
        }
        return;
    },

    closeSession: (onSessionClosed) => { 
        const sessionId = store.Storage.remKey("bankApi:session");
        if (sessionId) {
            return session.close(sessionId, onSessionClosed);
        }
        return;
     },


    // Kyc API

    startKyc: (email, synapsCode, onKycStarted) => { 
        const sessionId = store.Storage.getKey("bankApi:session");
        if (sessionId) {
            kyc.start({sessionId, email, synapsCode}, (err, result) => {
                if (err) {
                    console.log(err);
                    return onKycStarted(err, result);
                }
                store.Storage.setKey("bankApi:kyc", result.kycId);
                return onKycStarted(err, result);
            });
            return;
        }
        return;
    },

    // User API

    userInfo: (onUserInfo) => { 
        const sessionId = store.Storage.getKey("bankApi:session");
        if (sessionId) {
            user.info(sessionId, (err, result) => {
                if (err) {
                    console.log(err);
                    return onUserInfo(err, result);
                }
                store.Storage.setKey("bankApi:email", result.email);
                return onUserInfo(err, result);
            });
            return;
        }
        return;
    },

    // Synaps

    setupSynaps: (onSynapsEnd) => {
        synaps.setup((type, code) => {
            if (type === 'userOnboardSuccess') {
                console.log("BankApi - User onboard success:", code);

            } else if (type === 'userOnboardDeclined') {
                console.error("BankApi - User onboard declined");

            } else if (type === 'userExited') {
                console.error("BankApi - User exited");

                const email = store.Storage.getKey("bankApi:email");
                if (!code) {
                    code = "42"; // Todo: remove me, mock synaps onboarding code for now
                }

                module.exports.startKyc(email, code, (err, result) => {
                    if (err != null) {
                        console.log("kyc.start failed.", err);
                        onSynapsEnd('kyc.start failed');
                        return;
                    }
                    console.log("BankApi - startKyc:", result.kycId);
                    onSynapsEnd(type, result.kycId);
                });
            }
        });
    }
};
