import express from 'express'
import User from './db/models/user'
import bluebird from 'bluebird'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

mongoose.Promise = bluebird

const router = express.Router()

export default (app) => {
  router.route('/api/users')
        .get( (req, res) => {
          User.find({}).then( (users) => res.json(users))
          .catch( (err) => console.log('err: ', err))
        })
        .post( (req, res) => {
          const newUser = Object.assign(new User(), req.body) 

          bcrypt.genSalt( (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              newUser.password = hash
              
              newUser.save( err => {
                if(err) console.log('err creating user: ', err)

                return res.json({ sucess: true, userCreated: newUser })
              })
            })
          })
        })

  router.route('/api/authenticate')
        .post( (req, res) => {
          console.log('reqb: ', req.body)
          User.findOne({email: req.body.email})
              .then( (user) => {
                if(!user) res.json({ success: false, message: 'Authentication failed, no user found' })
                else {
                  bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(!result) res.json({ success: false, message: 'Auth fail, wrong password' })

                    const jwtToken = jwt.sign(user, process.env.JWT_SECRET) 
                    res.json({ success: true, token: jwtToken })
                  })
                }
              })
        })
  return router
}

