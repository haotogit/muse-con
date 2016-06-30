import mongoose from 'mongoose'

const Schema = mongoose.Schema

const activitySchema = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String
})

export default const activity = mongoose.model('activity', activitySchema)
