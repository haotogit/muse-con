import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: String
})

const Product = mongoose.model('Product', productSchema)

export default Product
