const httpClient = require('../library/httpClient');

function authUser (req, res, next) {
  const opts = {
    method: 'POST',
    uri: '/users/auth',
    body: req.body
  };

  httpClient(opts, res)
    .then((resp) => {
      res.json(resp);
    });
}

function checkUsername (req, res, next) {
  const opts = {
    method: 'POST',
    uri: '/users/username',
    body: {
      username: req.body.username,
    },
    headers: {
      Authorization: req.headers.authorization
    }
  };

  httpClient(opts)
    .then((resp) => {
      res.json(resp);
    });
}

function createUser (req, res) {
  const opts = {
    method: 'POST',
    uri: '/users',
    body: req.body
  };

  httpClient(opts)
    .then((resp) => {
      res.json(resp);
    });
}

function userUpdate (req, res, next) {
  const opts = {
    method: 'PUT',
    uri: `/users/${req.params.id}`,
    body: req.body,
    headers: {
      Authorization: req.headers.authorization
    }
  };

  httpClient(opts, res)
    .then((resp) => {
      res.json(resp);
    });
}

module.exports = { authUser, checkUsername, createUser, userUpdate }
