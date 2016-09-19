import express from 'express'
import User from './db/models/user'
import bluebird from 'bluebird'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import qString from 'query-string'
import popsicle from 'popsicle'

mongoose.Promise = bluebird


export default (app) => {
  const router = express.Router()

  router.route('/login-spotify')
        .get((req, res) => {
          let scope = 'playlist-read-private'
          res.redirect('https://accounts.spotify.com/authorize?' + 
          qString.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            client_secret: process.env.SPOTIFY_CLIENT_SECRET,
            scope: scope,
            redirect_uri: process.env.SPOTIFY_REDIRECT
          }))
        })

  router.route('/spotify-redirect')
        .get((req, res) => {
          let authOptions = {
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            form: {
              code: req.query.code || null,
              redirect_uri: process.env.redirect_uri,
              grant_type: 'authorization_code'
            },
            headers: {
              'Authorization': `Basic ${new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')}`
            },
            json: true
          }

          popsicle.request(authOptions)
                  .then((err, response) =>{
                    console.log('haloo', response)
            
                  })
        })

  return router
}

