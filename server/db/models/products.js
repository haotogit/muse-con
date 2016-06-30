import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productsSchema = new mongoose.Schema({
  name: String,
  description: String
})

export default const Products = mongoose.model('Products', productsSchema)
