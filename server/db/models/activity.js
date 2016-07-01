import mongoose from 'mongoose'

const Schema = mongoose.Schema

const activitySchema = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String
})

const Activity = mongoose.model('Activity', activitySchema)

export default Activity
