import User from '../db/models/user'
import bluebird from 'bluebird'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import popsicle from 'popsicle'

function authUser (req, res, next) {
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

              res.json(user)
            }
          })
        }
      })
}

function userLocated (req, res, next) {
  User.findOne({id: req.session.user.id})
      .then(user => {
        if (!user) res.json({ error: 'No user found, please login' })
        else {
          user.lat = req.body.lat
          user.long = req.body.long
          user.save()

          res.json(user)
        }
      })
}

function testing (req, res) {
  popsicle({
    method: 'get',
    url: req.body.url,
    headers: {
      Authorization: req.body.headers
    }
  })
  .then(resp => res.json({user: resp.body}))
}

export { authUser, testing, userLocated }
