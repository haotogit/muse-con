import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  access_token: String,
  user_type: String,
  name: String,
  actvity_id: [{ type: Schema.Types.ObjectId, ref: 'activity' }],
  notification_id: [{ type: Schema.Types.ObjectId, ref: 'Notification' }]
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

export default User
