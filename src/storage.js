const Storage = (function() {
    var data_store = {};
  
    var getDataStore = function() {
      return data_store;
    };
  
    var setDataStore = function(dataStore) {
        data_store = dataStore;     
    };
  
    return {
      getKey: (key) => {
        data = getDataStore();
        return data[key];
      },

      setKey: (key, value) => {
        data = getDataStore();
        data[key] = value;
        setDataStore(data);
      },

      remKey: (key) => {
        data = getDataStore();
        val = data[key];
        delete data[key]
        setDataStore(data);
        return val
      },
    }
  
  })();

  module.exports = {
    Storage: Storage
  }
  