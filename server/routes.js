import express from 'express'
import { authSpotify, spotifyCallback, evalSpotify, authUser } from './controllers'

export default (app) => {
  const router = express.Router()

  app.get('/auth-spotify', authSpotify)

  app.get('/auth-spotify/callback', spotifyCallback)

  router.route('/api/evalSpotify')
        .get(isAuthenticated, evalSpotify)

  router.route('/api/authenticate')
        .post(authUser)

  return router
}

function isAuthenticated (req, res, next) {
  req.sessionStore.get(req.sessionID, (err, session) => {
    if (session && session.user) {
      console.log('authed::', session)
      next()
    } else {
      console.log('NOTauthed::', session)
      res.json({error: "No session found"})
    }
  })
}
