import User from '../db/models/user'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import popsicle from 'popsicle'

mongoose.Promise = require('bluebird')

function authUser (req, res, next) {
  User.findOne({username: req.body.username})
      .then( (user) => {
        if(!user) res.json({ error: 'No user' })
        else {
          user.comparePassword(req.body.password, (err, result) => {
            if(!result) res.json({ error: 'Wrong password' })
            else {
              req.session.user = user
              req.user = req.session.user
              req.session.save()

              res.json(user)
            }
          })
        }
      })
}

function checkUsername (req, res, next) {
  User.findOne({username: req.body.username})
      .then(user => res.json(user))
}

function createUser (req, res) {
  let newUser = new User()

  newUser.username = req.body.username
  newUser.password = req.body.password

  newUser.searchOpts = {
    currSrc: 'spotify',
    by: 'artists'
  }

  newUser.save()

  res.json(newUser)
}

function userLocated (req, res, next) {
  console.log('FILHADAPUTA', req)
  User.findAsync({id: req.session.user.id})
      .then(user => {
        if (!user) res.json({ error: 'No user found, please login' })
        else {
          user.lat = req.body.lat
          user.long = req.body.long
          user.save().then(user => res.json(user))
        }
      })
}

export { authUser, checkUsername, createUser, userLocated }
