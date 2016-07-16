import mongoose from 'mongoose'

const Schema = mongoose.Schema

const companySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  social_media: [{ type: Schema.Types.ObjectId, ref: 'SocialMedia' }]
})

const Company = mongoose.model('Company', companySchema)

export default Company
