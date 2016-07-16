import mongoose from 'mongoose'

const Schema = mongoose.Schema

const serviceSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
})

const Service = mongoose.model('Service', serviceSchema)

export default Service
