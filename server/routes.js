import express from 'express'
import User from './db/models/user'
import bluebird from 'bluebird'
import mongoose from 'mongoose'

mongoose.Promise = bluebird

const router = express.Router()

export default (app) => {
  router.route('/api/users')
        .get( (req, res) => {
          User.find({}).then( (users) => res.json(users))
          .catch( (err) => console.log('err: ', err))

        })

  return router
}

