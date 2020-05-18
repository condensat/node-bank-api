const Promise = require('bluebird');
const moment = require('moment');

const client = Promise.promisifyAll(require('../../src/client.js'), {suffix: "Call"});

const login = "demo";
const password = "d3m0";

var handleError = function (err) {
  console.error("Error: ", JSON.stringify(err, null, 0))
};

const payload = `eyJ0eCI6ICIwMjAwMDAwMDAwMDIyMjMxNmVjYWZjNmQ0NTE1NGE4NTEyNGExYjJhZjNkNDRkNjFi
NmQzNDkzMWM5NGFiNGE1MzRiMDUwNDRjZDUzMDAwMDAwMDAwMGZkZmZmZmZmOGY3NmMyMGM0ZDll
OWU2ODNjNTA2ZTZjZTI5YjkwZWZkN2FkMGYwYWRjOGU2MGRjOTczZWJmZTI5ODU3MjM5YzAwMDAw
MDAwMDBmZGZmZmZmZjA1MDFkMjdiYTM2NTk4ZmE4ZjI1MDJhZWZmZmM5YzNkNzZmMTYwMzdiYTEz
MjM2MzFhYjc4YmM3ODM4Yjk5MWMwOWNlMDEwMDAwMDAwMDAwMTZkM2MwMDM1YzY1NWE4NjhjMDAy
MGVkY2I4YmU5OGVmNzNjYWFkYjY2NzlhNTEzZDdlMDI3OGZjNDQwODRmODExOGVhMmQ4MTdhOTE0
ZTUwODgwZWY5Y2M4MDExOGM0NDI4NDU1OGRlYmY5N2M5YzIwMzViZjg3MDFkMjdiYTM2NTk4ZmE4
ZjI1MDJhZWZmZmM5YzNkNzZmMTYwMzdiYTEzMjM2MzFhYjc4YmM3ODM4Yjk5MWMwOWNlMDEwMDAw
MDAwMDAwMDAwM2U4MDAxN2E5MTQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAw
MDAwODcwMTZkNTIxYzM4ZWMxZWExNTczNGFlMjJiN2M0NjA2NDQxMjgyOWMwZDA1NzlmMGE3MTNk
MWMwNGVkZTk3OTAyNmYwMTAwMDAwMDAwMDAwMDFmNTEwMmE1ZDQxZTk3NWEwMDg3ODMxODkzMjNh
OTllMzgxMmFlZWZiMjU5Zjk5ZDNlMTUwYzkzNGY4MDMxMDhhZWFjMGUxN2E5MTQ2MTg1MDJlMTY3
OTZlMzJiMjUwNjEyOTM4YTdlNDgwODlhNmZkNjlhODcwMTBhYWIyYmY0NjVjMmM4YmZiY2E1MzNj
YmY2MDgwNjBkZDQ0OTA0Zjk5ZGZiNTE0MTFmOWQzN2RhYTZjMTk5MGUwMTAwMDAwMDAwMDAwMDA1
NzgwMjYxNTE1NzI0MjZhNmUzMWNkNTY5M2Y5YjhjYjhmODFmZGJhZmQ0OWNiZDEzMWI0Y2JmYzA4
MmQ3ZGVjODc3MzgxNjAwMTQxODk0NTAxZTNiYmFkNTNmMTExMjlhNjdlNjVhNWZhMjY3ZGZhODUw
MDE2ZDUyMWMzOGVjMWVhMTU3MzRhZTIyYjdjNDYwNjQ0MTI4MjljMGQwNTc5ZjBhNzEzZDFjMDRl
ZGU5NzkwMjZmMDEwMDAwMDAwMDAwMDAwMjNjMDAwMDAwMDAwMDAwIiwgInVfYWRkcmVzc19wIjog
ImV4MXFyejI5cTgzbWh0Mm43eWdqbmZuN3Zramw1Zm5hbDJ6c2VwNm00ZiIsICJtYXBfY29uZmlk
ZW50aWFsIjogeyJINDRZTDFWVXR5WFJ4TFhFQmJoeW01RGVHSGpQZHhGNGN0IjogIlZKTEV6MlRT
RUhQaVdueHZUZmczcW44aHJleVM0RFlia2NZcVdESHpMaGcyWXY5U2V1VVU1aUxCSkhXY0sxdkR1
aUxQUEtiOW8yNFdTYmtXIiwgIkdyNUFIZEtrQ2hzOU5hd3JtNXRaRXdWOTNQYUsxWmU5cVEiOiAi
VkpMQTNHRzJtRm5HYThMN2R0ejZMdFl3U3k1SG9zMjdKcTdnemQzcDJKazUxUTZ1dEM2M2lCNUZt
SmVqcjU4bXVIbWZkOENlMWpGazNZa2ciLCAiZXgxcXJ6MjlxODNtaHQybjd5Z2puZm43dmtqbDVm
bmFsMnpzZXA2bTRmIjogImxxMXFxZnM0ejRleXk2bnd4OHg0ZHlsZWhyOWNscTBhaHQ3NW5qNzN4
eDZ2aGxxZzk0NzdlcG1uc3h5NTJxMHJod2s0OHVnMzl4bjh1ZWQ5bGduOG03NTlxZHp2NXluODU3
dncyIn0sICJ1bnNwZW50c19kZXRhaWxzIjogW3sidHhpZCI6ICI1M2NkNDQ1MGIwMzRhNWI0NGFj
OTMxNDlkM2I2NjE0ZGQ0ZjMyYTFiNGExMjg1NGExNTQ1NmRmY2NhNmUzMTIyIiwgInZvdXQiOiAw
LCAiYW1vdW50IjogMTQ5NzAwMCwgImFzc2V0IjogImNlMDkxYzk5OGI4M2M3OGJiNzFhNjMyMzEz
YmEzNzYwZjE3NjNkOWNmY2ZmYWUwMjI1OGZmYTk4NjVhMzdiZDIiLCAiYW1vdW50YmxpbmRlciI6
ICIzNzQ0YTkxMDVhMWI2NWQ5ZDRhY2QxODgwNTExYjdlMmJjNTQ3YWUyMmEzMzc5YzhhNDlkMmQx
ZGUxMmRhNGQ0IiwgImFzc2V0YmxpbmRlciI6ICIyZTk1ZTNkNDI4NDA2NDgzNTBhOGZhNTcxZGM4
ZGIwNWEzMTk0MjQxYjA3OWRlMDc5YmYxZWNiZWZlNGQ3ODljIn0sIHsidHhpZCI6ICI5YzIzNTc5
OGUyYmYzZTk3ZGM2MDhlZGMwYTBmYWRkN2VmOTA5YmUyNmM2ZTUwM2M2ODllOWU0ZDBjYzI3Njhm
IiwgInZvdXQiOiAwLCAiYW1vdW50IjogODU4OSwgImFzc2V0IjogIjZmMDI3OWU5ZWQwNDFjM2Q3
MTBhOWY1N2QwYzAyOTI4NDE2NDYwYzRiNzIyYWUzNDU3YTExZWVjMzgxYzUyNmQiLCAiYW1vdW50
YmxpbmRlciI6ICIwZThmOGVjNjg2ZTIzMDQwZjAxMDU2YjFjYzJjNDIzZDk4MzRhZWVhNTZhMjA0
NWI3ZDE0MWUzNzI5ZjQ3OGQ0IiwgImFzc2V0YmxpbmRlciI6ICI4ZDUwMWI5MjIzOGU1MzFjYjM4
ZDJkMDM1NmE0ZGIxNzg5Zjk2NmI2ODEzMjU3Y2UyNWJhYzAwZDYyMTU1NDA5In1dfQ==`

function onSessionOpen(result) {
  validUntil = moment(result.valid_until)
  console.log("Session opened", validUntil.diff(moment(), 'seconds'))

   // [info=0, propose=1, finalize=2, accept=3]
   const command = 0;

  client.userInfoCall()
    .then((userInfo) => {
      console.log("User info:", JSON.stringify(userInfo, null, 0))

      var accountId = ""
      var swapId = ""
      switch (command) {
        // --------------- info ---------------
        case 0:
          client.swapInfoCall({payload})
            .then(onSwapInfo)
            .catch(handleError)
          break;

        // --------------- propose ---------------
        case 1:
          accountId = "v1.1:4f4f2c2e-8ce2-9682-8d54-3d3503e78040:c87c7968-884b-c1ad-f4ae-6799e2ed9f37"; // LCAD
          const proposal = {
            "proposerAssetId": "ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2", // USDt
            "proposerAmount": 1000 / 100000000.0, // USDt precision 8
            "receiverAssetId": "0e99c1a6da379d1f4151fb9df90449d40d0608f6cb33a5bcbfc8c265f42bab0a", // LCAD
            "receiverAmount": 1400 / 100000000.0, // LCAD precision 8
          };
          console.log("swapPropose", {accountId, proposal})
          client.swapProposeCall({accountId, proposal})
            .then(onSwapPropose)
            .catch(handleError)
          break;
      
        // --------------- finalize ---------------
        case 2:
          swapId = "v1.1:38a842cf-e0bd-1e5c-0764-d1baad5a82bc:c3273a04-d729-15b9-f123-ce7a9f66fdb3"
          console.log("swapFinalize", {swapId})
          client.swapFinalizeCall({swapId, payload})
            .then(onSwapFinalize)
            .catch(handleError)
          break;

      
        // --------------- accept ---------------
        case 3:
          accountId = "v1.1:f9b52f6a-d0e0-3597-8696-90a848bc21db:ce2243dd-fcf8-7d0e-78cc-59ed5fed268c"; // USDt
          client.swapAcceptCall({accountId, payload})
            .then(onSwapAccept)
            .catch(handleError)
          break;
    
    
        default:
          break;
      }
    })
    .catch(handleError)
}

function onSwapPropose(result) {
  console.log("Swap Proposal")
  console.log("swapId", result.swapId ? result.swapId : null)
  console.log(result.info ? result.info : null)
  console.log(result.payload ? result.payload : null)

  client.swapInfoCall({payload: result.payload})
    .then(onSwapInfo)
    .catch(handleError)        
}

function onSwapFinalize(result) {
  console.log("Swap Finalize")
  console.log("swapId", result.swapId ? result.swapId : null)
  console.log(result.info ? result.info : null)
  console.log(result.payload ? result.payload : null)

  client.closeSessionCall()
    .then(onSessionClosed)
    .catch(handleError)        
}

function onSwapAccept(result) {
  console.log("Swap Accept")
  console.log(result.swapId ? result.swapId : null)
  console.log(result.payload ? result.payload : null)

  client.closeSessionCall()
    .then(onSessionClosed)
    .catch(handleError)        
}


function onSwapInfo(result) {
  console.log("Swap Info")
  console.log(result.info)

  client.closeSessionCall()
    .then(onSessionClosed)
    .catch(handleError)        
}

function onSessionClosed(result) {
  validUntil = moment(result.valid_until)
  console.log("Session closed", validUntil.diff(moment(), 'seconds'))
}

client.openSessionCall({login, password})
  .then(onSessionOpen)
  .catch(handleError)
