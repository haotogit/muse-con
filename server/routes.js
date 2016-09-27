import express from 'express'
import User from './db/models/user'
import bluebird from 'bluebird'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import qString from 'query-string'
import popsicle from 'popsicle'
import request from 'request'

mongoose.Promise = bluebird

export default (app) => {
  const router = express.Router()

  app.get('/auth-spotify', (req, res) => {
    let scope = 'playlist-read-private user-top-read user-library-read'

    res.redirect('https://accounts.spotify.com/authorize?' + 
    qString.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      scope: scope,
      redirect_uri: process.env.SPOTIFY_REDIRECT
    }))
  })

  app.get('/auth-spotify/callback', (req, res) => {
    let code = req.query.code
    let authParam = new Buffer(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')

    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': `Basic ${authParam}` 
      },
      json: true
    }
    console.log('@spotifyCallback::', req)

    

    request.post(authOptions, (err, response, body) => {
      if (!err && response.statusCode === 200) {
        console.log('bod::', body)
        let spotifyObj = {
          url: 'https://api.spotify.com/v1/me',
          headers: {
            'Authorization': `Bearer ${body.access_token}`
          },
          json: true
        }
        let tokens = {
          access_token: body.access_token,
          refresh_token: body.refresh_token
        }
        let currUser
        request.get(spotifyObj, (err, resp, bod) => {
          tokens.id = bod.id

          req.sessionStore.get(req.sessionID, (err, session) => {

          console.log('SessionUSERRR:::', session)
            console.log('token:::', tokens)
          User.findOne({username: session.user.username})
              .then((user) => {
                console.log('fuken finally::', user)
                //look up how to make public method on user model work
                
                user.spotify = tokens
                user.save()
                
                currUser = {
                  id: user._id,
                  username: user.username,
                  spotify: user.spotify
                }
              })
          })
          
        })
        res.redirect('/user')
        //res.redirect(`/user?spotify_access=${body.access_token}&spotify_refresh=${body.refresh_token}`)
      }
    })
  })

  app.get('/test', (req, res) => {
          console.log('testRoute::', req.user)
          console.log('testRoute::', req.session)
        
          req.sessionStore.get(req.sessionID, (err, session) => {
            console.log('PUHLEASEEEE::', session)
          })

          
        })

  router.route('/api/evalSpotify')
        .get((req, res) => {
          req.sessionStore.get(req.sessionID, (err, session) => {
            console.log('PUHLEASEEEE::', session)
          })
        })

  router.route('/api/authenticate')
        .post( (req, res, next) => {
          User.findOne({username: req.body.username})
              .then( (user) => {
                if(!user) res.json({ success: false, message: 'Authentication failed, no user found' })
                else {
                  user.comparePassword(req.body.password, (err, result) => {
                    if(!result) res.json({ error: true, message: 'Auth fail, wrong password' })
                    else {
                      req.session.user = user
                      req.user = req.session.user
                      req.session.save()
                      next()

                      let currUser = {
                        id: user._id,
                        username: user.username,
                        spotify: user.spotify
                      }
                      
                      res.json(currUser)
                    }
                  })
                }
              })
        })

  return router
}

