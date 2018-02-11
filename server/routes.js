import express from 'express'
import * as control from './controllers'

module.exports = (app) => {
  const router = express.Router()
  // how come these spotify routes need to be off app, and the others it's cool to router?

  app.get('/auth-spotify', control.authSpotify)

  app.get('/auth-spotify/callback', control.spotifyCallback)

  router.route('/api/users/:id/evalSpotify')
    .post(isAuthenticated, control.evalSpotify)

  router.route('/api/authenticate')
    .post(control.authUser)

  router.route('/api/username')
    .post(control.checkUsername)

  router.route('/api/user')
    .put(isAuthenticated, control.userUpdate)
    .post(control.createUser)

  router.route('/api/users')
    .put(isAuthenticated, control.userLocated)

  return router
}

function isAuthenticated (req, res, next) {
  next();
}
