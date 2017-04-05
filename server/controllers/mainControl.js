import User from '../db/models/user'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import popsicle from 'popsicle'

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

  req.session.user = newUser
  req.user = req.session.user
  req.session.save()

  res.json(newUser)
}

function userLocated (req, res, next) {
  User.findOne({_id: req.session.user._id})
      .then(user => {
        if (!user) {
          res.end({ error: 'No user found, please login' })
        }

        user.lat = req.body.lat
        user.long = req.body.long
        user.save().then(user => res.json(user))
      })
}

function userUpdate (req, res, next) {
  User.findOne({_id: req.session.user._id})
      .then(user => {


      })
}

export { authUser, checkUsername, createUser, userLocated }
