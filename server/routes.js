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
    request.post(authOptions, (err, result, body) => {
      if (!err && result.statusCode === 200) {
        let tokens = {
          url: 'http://localhost:8888/api/third-party',
          form: {
            accessToken: body.access_token,
            refreshToken: body.refresh_token
          }
        }
        request.post(tokens)
        res.redirect(`/`)
        //res.redirect(`/user?spotify_access=${body.access_token}&spotify_refresh=${body.refresh_token}`)
      }
    })
  })

  return router
}

