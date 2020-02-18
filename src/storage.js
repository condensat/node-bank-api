const Storage = (function() {
    var data_store = {};
  
    return {
      getKey: (key) => {
        return data_store[key];
      },

      setKey: (key, value) => {
        data_store[key] = value;
      },

      remKey: (key) => {
        val = data_store[key];
        delete data_store[key]
        return val
      },
    }
  
  })();

  module.exports = {
    Storage: Storage
  }
  