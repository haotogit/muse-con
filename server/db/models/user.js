import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
  email: {  type: String,
            unique: true,
            lowercase: true,
            required: true
         },
  password: { type: String, required: true },
  user_type: { type: String },
  name: String,
  date_added: { Date },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  access_token: String,
  product_batch_id: [{ type: Schema.Types.ObjectId, ref: 'Products' }],
  actvity_id: [{ type: Schema.Types.ObjectId, ref: 'activity' }],
  notifications_id: [{ type: Schema.Types.ObjectId, ref: 'Notifications' }],
  client_id: [{ type: Schema.Types.ObjectId, ref: 'Clients' }]
})

const User = mongoose.model('User', UserSchema)

export default User
