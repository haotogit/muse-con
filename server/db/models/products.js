import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productsSchema = new mongoose.Schema({
  name: String,
  description: String
})

const Products = mongoose.model('Products', productsSchema)

export default Products
