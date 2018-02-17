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
  //let newUser = new User()

  //newUser.username = req.body.username
  //newUser.password = req.body.password

  //newUser.searchOpts = {
  //  currSrc: 'spotify',
  //  by: 'artists'
  //}

  //newUser.save()

  //req.session.user = newUser
  //req.user = req.session.user
  //req.session.save()

  //res.json(newUser)
}

function userLocated (req, res, next) {
  User.findOne({_id: req.session.user._id})
      .then(user => {
        if (!user) {
          res.end({ error: 'No user found, please login' })
        }

        user.lat = req.body.lat
        user.long = req.body.long
        user.save().then(user => res.json(user))
      })
}

function userUpdate (req, res, next) {
  const opts = {
    method: 'PUT',
    uri: `/users/${req.params.id}`,
    body: req.body
  };

  httpClient(opts, res)
    .then((resp) => {
      res.json(resp);
    });
}

module.exports = { authUser, checkUsername, createUser, userLocated, userUpdate }
