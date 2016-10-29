import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import bluebird from 'bluebird'

mongoose.Promise = bluebird

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  access_token: String,
  user_type: String,
  name: String,
  spotify: {
    id: String,
    profile_pic: String,
    access_token: String,
    refresh_token: String,
    genres: Array,
    top10: Array
  },
  actvity_id: [{ type: Schema.Types.ObjectId, ref: 'activity' }],
  notification_id: [{ type: Schema.Types.ObjectId, ref: 'Notification' }]
}, { timestamps: true })

UserSchema.pre('save', function(next) {
  var user = this
  if (!user.isModified('password')) return next() 

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

UserSchema.static.public = function() {
  delete this.hash
  return this
}

UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

const User = mongoose.model('User', UserSchema)

export default User
