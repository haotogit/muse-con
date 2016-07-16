import mongoose from 'mongoose'

const Schema = mongoose.Schema

const orderSchema = new mongoose.Schema({
  invoice: Number,
  serviceType: {},
  client: {},
  items: [{}],
  pickup: {},
  dueDate: {},
  status: [],
  notes: {},
  isRush: {}
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

export default Order
