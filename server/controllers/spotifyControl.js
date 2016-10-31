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

            User.findOne({username: session.user.username})
              .then((user) => {
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
          // need figure out a way to keep current session and resend user info to page
          res.redirect('/user')
          //res.redirect(`/user?spotify_access=${body.access_token}&spotify_refresh=${body.refresh_token}`)
        }
      })
  }

  
  function keyMaker (str) {
      return str.split(/\-|\s/).length === 1 ? str : str.split(/\-|\s/).map((each, i) => i === 0 ? each : each.replace(each[0], (match) => match.toUpperCase())).join('')
  }

  function sortArr (a, b) {
    if (a.value > b.value) {
      return -1
    }

    if (a.value < b.value) {
      return 1
    }

    return 0
  }

  function evalSpotify (req, res, next) {
    let genres = []

    User.findOne({_id: req.session.user._id})
        .then((user) => {
          let opts = {
            method: 'get',
            url: `${process.env.SPOTIFY_URL}/me/top/artists?limit=50`,
            headers: {
              Authorization: `Bearer ${user.spotify.access_token}`
            }
          }

          popsicle(opts)
            .then((resp) => {
              if (resp.body.items) {
                let artistList = resp.body.items.map(artist => {
                  artist.genres.forEach((each, i) => {
                    let currArtist = {},
                        genreKey = keyMaker(each),
                        genre,
                        genreIndex,
                        artistIndex

                    if (genres.find((ea) => ea.label === genreKey)) {
                      genreIndex = genres.findIndex((ea) => ea.label === genreKey)
                      genres[genres.findIndex((ea) => ea.label === genreKey)].value++

                    } else {
                      genre = {
                        label: genreKey,
                        value: 1,
                        artists: []
                      }

                      genres.push(genre)
                    }
                  })

                  return {
                    name: artist.name,
                    genres: artist.genres,
                    image: artist.images[1].url
                  }
                })
                
                genres = genres.sort(sortArr)
                user.spotify.top10 = genres.slice(0, 10)
                user.spotify.artists = artistList
                user.spotify.genres = genres
                user.save()
                res.json(user)
              } else {
                let base64Str = new Buffer(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')
                let opts = {
                  method: 'post',
                  url: 'https://accounts.spotify.com/api/token',
                  headers: {
                    Authorization: `Basic ${base64Str}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  body: {
                    grant_type: 'refresh_token',
                    refresh_token: user.spotify.refresh_token
                  }
                }

                popsicle(opts)
                  .then((response) => {
                    if (response.body.access_token) {
                      user.spotify.access_token = response.body.access_token
                      user.save()

                      res.json(user)
                    } else {
                      res.json({error: resp.body.error})
                    }
                  })
                  .catch((err) => res.json({error: err}))
              }
            })
            .catch((err) => res.json({error: err}))
        })
        .catch((err) => res.json({error: err}))
  }

  function refreshToken (req, res, user) {
    
  }

export { authSpotify, spotifyCallback, evalSpotify }
