const express = require('express');
const spotifyControl = require('./controllers/spotifyControl');
const mainControl = require('./controllers/mainControl');

module.exports = (app) => {
  const router = express.Router()
  // how come these spotify routes need to be off app, and the others it's cool to router?

  app.get('/auth-spotify', spotifyControl.authSpotify)

  app.get('/auth-spotify/callback', spotifyControl.spotifyCallback)

  router.route('/api/users/:id/evalSpotify')
    .post(isAuthenticated, spotifyControl.evalSpotify)

  //router.route('/api/authenticate')
  //  .post(mainControl.authUser)

  //router.route('/api/user')
  //  .put(isAuthenticated, mainControl.userUpdate)
  //  .post(mainControl.createUser)

  //router.route('/api/users/:id')
  //  .put(isAuthenticated, mainControl.userUpdate)

  return router
}

function isAuthenticated (req, res, next) {
  next();
}
