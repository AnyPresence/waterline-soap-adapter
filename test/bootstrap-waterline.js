var Waterline = require('waterline'),
  adapter = require('../'),
  _ = require('lodash');

//Stub the global sails object, for logging
sails = {
  log: {
    debug: function(msg) {
      console.log("[DEBUG] " + msg);
    }
  }
};

module.exports = function(connections, collections, cb) {
  var waterline = new Waterline();

  var adapters = {
    "waterline-soap": adapter
  };

  connections = connections || {};
  collections = collections || {};

  _(collections).each(function(c, key) {
    c.identity = c.identity || key;
    waterline.loadCollection(Waterline.Collection.extend(c));
  });

  waterline.initialize({
    adapters: adapters,
    connections: connections
  }, cb);

  return waterline;
};