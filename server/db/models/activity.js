import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userActivitySchema = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String
})

export default const userActivity = mongoose.mode('UserActivity', userActivitySchema)
