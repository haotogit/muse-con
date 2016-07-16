import mongoose from 'mongoose'

const Schema = mongoose.Schema

const clientSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  email: String,
  password: String,
  phone: {},
  address: {},
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  status: {},
  preferences: [{}]
}, { timestamps: true })

const Client = mongoose.model('Client', clientSchema)

export default Client
