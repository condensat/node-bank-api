'use strict';
const session = require('./session.js');
const kyc = require('./kyc.js');
const user = require('./user.js');
const accounting = require('./accounting.js');
const wallet = require('./wallet.js');
const swap = require('./swap.js');
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
        return session.renew(onSessionRenew);
    },

    closeSession: (onSessionClosed) => { 
        return session.close(onSessionClosed);
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
        user.info((err, result) => {
            if (err) {
                console.log(err);
                return onUserInfo(err, result);
            }
            store.Storage.setKey("bankApi:email", result.email);
            return onUserInfo(err, result);
        });
        return;
    },

    // Accounting

    accountList: (options, onAccountList) => {
        accounting.list(options, (err, result) => {
            if (err) {
                console.log(err);
            }

            return onAccountList(err, result);
        });
    },

    accountHistory: (options, onAccountHistory) => {
        accounting.history(options, (err, result) => {
            if (err) {
                console.log(err);
            }

            return onAccountHistory(err, result);
        });
    },

    // Wallet

    walletNextDeposit:  (options, onNextDeposit) => {
        wallet.nextDeposit(options, (err, result) => {
            if (err) {
                console.log(err);
            }

            return onNextDeposit(err, result);
        });
    },

    walletSendFunds:  (options, onSendFunds) => {
        wallet.sendFunds(options, (err, result) => {
            if (err) {
                console.log(err);
            }

            return onSendFunds(err, result);
        });
    },

    walletCancelWithdraw:  (options, onCancelWithdraw) => {
        wallet.cancelWithdraw(options, (err, result) => {
            if (err) {
                console.log(err);
            }

            return onCancelWithdraw(err, result);
        });
    },

    walletSendHistory:  (options, onSendHistory) => {
        wallet.sendHistory(options, (err, result) => {
            if (err) {
                console.log(err);
            }

            return onSendHistory(err, result);
        });
    },
    

    // Swap

    swapPropose: (options, onSwapPropose) => {
        swap.propose(options, (err, result) => {
            if (err) {
                console.log(err);
            }

            return onSwapPropose(err, result);
        });
    },

    swapInfo: (options, onSwapInfo) => {
        swap.info(options, (err, result) => {
            if (err) {
                console.log(err);
            }

            try {
                result.info = JSON.parse(result.payload)
            } catch (e) {}

            return onSwapInfo(err, result);
        });
    },

    swapFinalize: (options, onSwapFinalize) => {
        swap.finalize(options, (err, result) => {
            if (err) {
                console.log(err);
            }

            if (result && result.payload) {
                try {
                    result.info = JSON.parse(result.payload)
                } catch (e) {}
            }
            return onSwapFinalize(err, result);
        });
    },

    swapAccept: (options, onSwapAccept) => {
        swap.accept(options, (err, result) => {
            if (err) {
                console.log(err);
            }

            return onSwapAccept(err, result);
        });
    },

    // Synaps

    setupSynaps: (onSynapsEnd) => {
        synaps.setup((type, synapsCode) => {
            if (type === 'userOnboardSuccess') {
                console.log("BankApi - User onboard success:", synapsCode);
                const email = store.Storage.getKey("bankApi:email");
                module.exports.startKyc(email, synapsCode, (err, result) => {
                    if (err != null) {
                        console.error("BankApi - startKyc failed.", err);
                        return;
                    }
                    console.log("BankApi - startKyc:", result.kycId);
                    onSynapsEnd(type, result.kycId);
                });

            } else if (type === 'userOnboardDeclined') {
                console.error("BankApi - User onboard declined");

            } else if (type === 'userExited') {
                console.error("BankApi - User exited");

            }
        });
    }
};
