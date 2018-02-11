const rp = require('request-promise'),
  urlLib = require('url'),
  config = require('../config/config');

module.exports = (options, response) => {
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
      //let error = new Error(err.message || 'Error with request');

      //error.statusCode = err.statusCode || 500;

      console.log('====', err)
      response.set('Content-Type', 'application/json');
      response.status(err.statusCode || 500).end('error', { error: err });
    });
};
