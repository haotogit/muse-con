import express from 'express'
import * as control from './controllers'

export default (app) => {
  const router = express.Router()
  // how come these spotify routes need to be off app, and the others it's cool to router?

  app.get('/auth-spotify', control.authSpotify)

  app.get('/auth-spotify/callback', control.spotifyCallback)

  router.route('/api/evalSpotify')
        .get(isAuthenticated, control.evalSpotify)

  router.route('/api/authenticate')
        .post(control.authUser)

  router.route('/api/users')
        .put(control.userLocated)

  router.route('/test')
        .post(control.testing)


  return router
}

// look at potentially passing session.user with next()
function isAuthenticated (req, res, next) {
  req.sessionStore.get(req.sessionID, (err, session) => {
    if (session && session.user) {
      next()
    } else {
      res.json({error: "No session found, please login"})
    }
  })
}
