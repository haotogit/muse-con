const rp = require('request-promise'),
  urlLib = require('url'),
  config = require('../config/config');

module.exports = (options, operationId) => {
  const opts = {
    uri: `${urlLib.format(config.app.api)}`,
    json: true
  };

  Object.keys(options).forEach((key) => {
    if (key === 'uri') opts.uri += options[key];

    else opts[key] = options[key];
  });

  return rp(opts)
    .catch((err) => {
      throw err;
    });
};
