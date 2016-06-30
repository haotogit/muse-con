import mongoose from 'mongoose'

const Schema = mongoose.Schema

//need to make it more detailed and broken down
const notificationsSchema = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  description: { type: String, required: true }
})

export default const Notifications = mongoose.model('Notifications', notificationsSchema)
