import mongoose from 'mongoose'

const Schema = mongoose.Schema

const clientSchema = new mongoose.Schema({
  status: String,
  name: { type: String, required: true },
  email: String,
  password: String,
  access_token: String,
  phone: Number,
  address: String,
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  preferences: String,
}, { timestamps: true })

const Client = mongoose.model('Client', clientSchema)

export default Client
