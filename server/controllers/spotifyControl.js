import User from '../db/models/user'
import bluebird from 'bluebird'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import qString from 'query-string'
import request from 'request'
import popsicle from 'popsicle'

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
          
            if (session && session.user) {
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
            } else {
              res.redirect('/login')
            }
          
          })
          
        })
        // need figure out a way to keep current session and resend user info to page
        res.redirect('/user')
        //res.redirect(`/user?spotify_access=${body.access_token}&spotify_refresh=${body.refresh_token}`)
      }
    })
}

function evalSpotify (req, res) {
  User.findOne({_id: req.session.user._id})
      .then(user => {
        let artistObj = {},
            artistArr = []

        let opts = {
          method: 'get',
          url: `${process.env.SPOTIFY_BASE}/me/top/artists?limit=50`,
          headers: {
            Authorization: `Bearer ${user.spotify.access_token}`
          }
        }
        popsicle(opts)
          .then(res => {
            if (res.body.items) {
              console.log('fak::', res.body.items)
             
              res.body.items.forEach((artist) => {
                artistObj['name'] = artist['name']
                artistObj['genres'] = artist['genres']
                artistObj['image'] = artist['images'][1]['url']
                
                artistArr.push(artistObj)
              })

              console.log('artistarr::', artistArr)
              //user.spotify.artists = artistArr
              //user.save()
              //res.json(user)
            }
          })

      })
}

export { authSpotify, spotifyCallback, evalSpotify }
