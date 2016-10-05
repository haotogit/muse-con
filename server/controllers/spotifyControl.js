import User from '../db/models/user'
import bluebird from 'bluebird'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import qString from 'query-string'
import popsicle from 'popsicle'
import request from 'request'

mongoose.Promise = bluebird

function authSpotify (req, res) {
  let scope = 'playlist-read-private user-top-read user-library-read'

  res.redirect('https://accounts.spotify.com/authorize?' + 
  qString.stringify({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    scope: scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT
  }))
}

function spotifyCallback (req, res) {
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
}

function evalSpotify (req, res) {
  console.log('perr::', req)
}

export { authSpotify, spotifyCallback, evalSpotify }
