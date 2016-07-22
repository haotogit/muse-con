import mongoose from 'mongoose'

const Schema = mongoose.Schema

//need to make it more detailed and broken down
const notificationSchema = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  description: { type: String, required: true }
})

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification
