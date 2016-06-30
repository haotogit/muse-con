import express from 'express'
import User from './db/models/user'
import bluebird from 'bluebird'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

mongoose.Promise = bluebird

const router = express.Router()

export default (app) => {
  router.route('/api/users')
        .get( (req, res) => {
          User.find({}).then( (users) => res.json(users))
          .catch( (err) => console.log('err: ', err))
        })
        .post( (req, res) => {

        })

  router.route('/api/authenticate')
        .post( (req, res) => {
          User.findOne(req.body)
              .then( user => {
                if(!user) res.json({ success: false, message: 'Authentication failed, no user found' })
                else {
                  if(user.password !== req.body.password) {
                    res.json({ success: false, message: 'Auth failed, wrong password' })
                  } else {
                    const jwtToken = jwt.sign(user, process.env.JWT_SECRET) 
                    
                    res.json({ success: true, token: jwtToken })
                  }
                }
              })
        })
  return router
}

