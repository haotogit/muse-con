import User from '../db/models/user'
import bluebird from 'bluebird'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

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
              next()

              let currUser = {
                id: user._id,
                username: user.username,
                spotify: user.spotify
              }
              
              res.json(currUser)
            }
          })
        }
      })
}

export { authUser }
