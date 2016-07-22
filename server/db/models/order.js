import mongoose from 'mongoose'

const Schema = mongoose.Schema

const orderSchema = new mongoose.Schema({
  invoice: Number,
  serviceType: String,
  client_id: { type: Schema.Types.ObjectId, ref: 'Client' },
  items: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  delivery: Boolean,
  dueDate: { type: Date },
  status: String,
  notes: String,
  isRush: Boolean
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

export default Order
